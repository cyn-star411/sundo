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

assert.strictEqual(app.days.length, 5, 'the weekly plan should cover five weekdays');
assert.strictEqual(week.Lunch.length, 5, 'the lunch rotation should cover five weekdays');
assert.strictEqual(week.Dinner.length, 5, 'the dinner rotation should cover five weekdays');

[
  'Chicken Larb Bulk Prep',
  'Chicken Larb Tahini Noodles',
  'Chicken Larb Crunchy Rice Bowl',
  'Chicken Larb Cabbage Cups',
  'Sticky Beef Mince Bulk Prep',
  'Sticky Beef Mince Brothy Rice',
  'Sticky Beef Mince Crunchy Rice Bowl',
].forEach((recipe) => assert.ok(app.recipes[recipe], `${recipe} should be available in Sundō`));

const mains = [...week.Lunch, ...week.Dinner];
const chickenMeals = mains.filter((meal) => meal.startsWith('Chicken Larb'));
const beefMeals = mains.filter((meal) => meal === 'Sticky Beef Mince Brothy Rice' || meal === 'Sticky Beef Mince Crunchy Rice Bowl');
assert.strictEqual(chickenMeals.length, 5, 'the main rotation should contain five chicken-larb meals');
assert.strictEqual(beefMeals.length, 5, 'the main rotation should contain five beef meals');
assert.strictEqual(app.recipes['Chicken Larb Bulk Prep'].base, 10, 'chicken bulk prep should make ten portions for the five planned larb meals');
assert.strictEqual(app.recipes['Sticky Beef Mince Bulk Prep'].base, 10, 'beef bulk prep should make ten portions for the five planned beef meals');
assert.ok(source.includes("Prep:['Chicken Larb Bulk Prep','Sticky Beef Mince Bulk Prep']"), 'both bulk-prep recipes should be directly available in the in-app recipe browser');
assert.ok(app.recipes['Chicken Larb Bulk Prep'].method.some((step) => step.includes('2 kg chicken mince')) && app.recipes['Chicken Larb Bulk Prep'].method.some((step) => step.includes('160 g jasmine rice')), 'the chicken bulk-prep method should repeat its gram measurements');
assert.ok(app.recipes['Sticky Beef Mince Bulk Prep'].method.some((step) => step.includes('4 tbsp oyster sauce') && step.includes('4 tbsp light soy sauce')), 'the beef bulk-prep method should repeat its sauce measurements');
assert.ok(app.recipes['Chicken Larb Tahini Noodles'].method.some((step) => step.includes('60 g tahini') && step.includes('1 tbsp light soy sauce') && step.includes('2 tsp sesame oil')), 'the tahini-noodle method should include exact dressing measurements');
assert.ok(app.recipes['Sticky Beef Mince Brothy Rice'].method.some((step) => step.includes('700 ml beef stock') && step.includes('20 g fresh ginger')), 'the brothy-rice method should include its stock and ginger measurements');
chickenMeals.forEach((meal) => assert.ok(
  app.recipes[meal].ingredients.some((ingredient) => ingredient.n === 'Prepared chicken larb'),
  `${meal} should be built from the shared chicken larb prep`,
));
beefMeals.forEach((meal) => assert.ok(
  app.recipes[meal].ingredients.some((ingredient) => ingredient.n === 'Prepared sticky beef mince'),
  `${meal} should be built from the shared sticky beef prep`,
));
week.Lunch.forEach((meal, day) => {
  const dinner = week.Dinner[day];
  assert.notStrictEqual(
    meal.startsWith('Chicken Larb'),
    dinner.startsWith('Chicken Larb'),
    `day ${day + 1} should alternate chicken and beef rather than serving chicken twice`,
  );
});

const grocery = app.groceryFor();
assert.strictEqual(grocery.label, '5-day Chicken Larb & Beef Week', 'the cart should identify this week’s plan');
const groceryItems = grocery.groups.flatMap((group) => group.items);
assert.ok(
  groceryItems.some((item) => item.n === 'Chicken mince' && item.q === '2 kg'),
  'the cart should include the 2 kg chicken mince required for five larb meals',
);
assert.ok(
  groceryItems.some((item) => item.n === 'Lean beef mince' && item.q === '2 kg'),
  'the cart should include the 2 kg beef bulk prep required for five beef meals',
);
assert.ok(
  groceryItems.some((item) => item.n === 'Beef stock' && item.q === '2.1 L'),
  'the cart should include broth for the three brothy beef rice meals',
);
['Fresh mint', 'Baby spinach', 'Little Gem lettuce', 'Thai basil', 'Green beans'].forEach((item) => {
  assert.ok(!groceryItems.some((groceryItem) => groceryItem.n === item), `${item} should not be on the condensed shopping list`);
});
assert.ok(source.includes("' / 20 cooked'"), 'the progress label should use the five-day, 20-meal total');
assert.deepStrictEqual(
  Array.from(app.thisWeekMains()),
  ['Chicken Larb Tahini Noodles', 'Sticky Beef Mince Brothy Rice', 'Chicken Larb Crunchy Rice Bowl', 'Chicken Larb Cabbage Cups', 'Sticky Beef Mince Crunchy Rice Bowl'],
  'the home screen should preview the balanced chicken-larb and beef rotation',
);

console.log('larb five-day plan checks passed');
