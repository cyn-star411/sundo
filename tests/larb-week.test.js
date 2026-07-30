const assert = require('assert');
const fs = require('fs');
const vm = require('vm');

const source = fs.readFileSync('sundo-component.js', 'utf8');
const context = {
  React: { createElement: () => ({}) },
  DCLogic: class {
    setState(patch) { this.state = { ...(this.state || {}), ...patch }; }
  },
  setTimeout,
  clearTimeout,
};
vm.createContext(context);
vm.runInContext(`${source}\n;globalThis.SundoComponent = Component;`, context);
const app = new context.SundoComponent();
const week = app.buildWeek();

assert.strictEqual(app.days.length, 3, 'the leftovers meal prep should be a practical three-day plan');
assert.deepStrictEqual(Array.from(app.days, (day) => day.k), ['Mon', 'Tue', 'Wed'], 'the plan should run Monday through Wednesday');
assert.strictEqual(week.Lunch.length, 3, 'the lunch prep rotation should cover three days');
assert.strictEqual(week.Dinner.length, 3, 'the dinner prep rotation should cover three days');

const leftoverMains = [
  'Beef & Tenderstem Broccoli Rice Bowl',
  'Savoy Cabbage Beef Noodles',
  'Beef, Kale & Spinach Fried Rice',
];
[
  'Leftover Beef & Greens Bulk Prep',
  ...leftoverMains,
].forEach((recipe) => assert.ok(app.recipes[recipe], `${recipe} should be available in Sundō`));

const mains = [...week.Lunch, ...week.Dinner];
assert.deepStrictEqual(
  Array.from(mains),
  [
    'Beef & Tenderstem Broccoli Rice Bowl',
    'Savoy Cabbage Beef Noodles',
    'Beef, Kale & Spinach Fried Rice',
    'Savoy Cabbage Beef Noodles',
    'Beef, Kale & Spinach Fried Rice',
    'Beef & Tenderstem Broccoli Rice Bowl',
  ],
  'each of the three recipes should appear twice for six ready-to-reheat portions',
);
assert.strictEqual(app.recipes['Leftover Beef & Greens Bulk Prep'].base, 6, 'the bulk prep should make six portions from the 1 kg beef supply');
assert.ok(
  app.recipes['Leftover Beef & Greens Bulk Prep'].ingredients.some((item) => item.n === 'Minced beef' && item.q === 1000 && item.u === 'g'),
  'the bulk prep must use exactly the supplied 1 kg minced beef',
);
assert.ok(
  app.recipes['Leftover Beef & Greens Bulk Prep'].method.some((step) => step.includes('1 kg minced beef')) &&
  app.recipes['Leftover Beef & Greens Bulk Prep'].method.some((step) => step.includes('six portions')),
  'bulk-prep instructions should state the real beef quantity and yield',
);

const requiredVegetables = ['Carrots', 'Red cabbage', 'Savoy cabbage', 'Spinach', 'Parsley', 'Tenderstem broccoli', 'Kale'];
requiredVegetables.forEach((vegetable) => {
  assert.ok(
    leftoverMains.some((meal) => app.recipes[meal].ingredients.some((item) => item.n === vegetable)),
    `${vegetable} should be used by at least one new leftover recipe`,
  );
});
assert.ok(source.includes("Prep:['Leftover Beef & Greens Bulk Prep']"), 'the bulk prep should be discoverable in the recipe browser');

const grocery = app.groceryFor();
assert.strictEqual(grocery.label, '3-day Beef & Greens Leftover Prep', 'the cart should identify the new leftovers plan');
const groceryItems = grocery.groups.flatMap((group) => group.items);
assert.ok(groceryItems.some((item) => item.n === 'Minced beef' && item.q === '1 kg · already have'), 'the cart should mark the supplied beef as already in the fridge');
requiredVegetables.forEach((vegetable) => {
  assert.ok(groceryItems.some((item) => item.n === vegetable && item.q.includes('already have')), `${vegetable} should be marked as a fridge leftover`);
});
assert.ok(groceryItems.some((item) => item.n === 'Jasmine rice or noodles' && item.q === 'only if needed'), 'only staple carbs should be optional purchases');
assert.ok(source.includes("' / 12 cooked'"), 'progress should match the three-day plan: breakfast, snack, lunch and dinner');
assert.deepStrictEqual(Array.from(app.thisWeekMains()), leftoverMains, 'the home preview should show the three new recipes');

console.log('leftover beef plan checks passed');
