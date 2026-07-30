const assert = require('assert');
const fs = require('fs');
const vm = require('vm');

const source = fs.readFileSync('sundo-component.js', 'utf8');
const context = {
  React: { createElement: () => ({}) },
  DCLogic: class { setState(patch) { this.state = { ...(this.state || {}), ...patch }; } },
  setTimeout,
  clearTimeout,
};
vm.createContext(context);
vm.runInContext(`${source}\n;globalThis.SundoComponent = Component;`, context);
const app = new context.SundoComponent();
const week = app.buildWeek();

assert.strictEqual(app.days.length, 3, 'the leftovers meal prep should remain a practical three-day plan');
assert.strictEqual(app.recipes['Leftover Beef & Greens Bulk Prep'].base, 6, '1 kg beef should still yield six portions');
assert.ok(app.recipes['Leftover Beef & Greens Bulk Prep'].ingredients.some((item) => item.n === 'Minced beef' && item.q === 1000), 'the plan must use exactly the supplied 1 kg beef');

const variedMains = [
  'Sticky Beef Mince Brothy Rice',
  'Gochujang Beef & Tenderstem Bowl',
  'Peanut-Lime Savoy Beef Noodles',
  'Sesame-Ginger Kale Fried Rice',
];
['Leftover Beef & Greens Bulk Prep', ...variedMains].forEach((recipe) => {
  assert.ok(app.recipes[recipe], `${recipe} should be available in Sundō`);
});
assert.deepStrictEqual(
  Array.from([...week.Lunch, ...week.Dinner]),
  [
    'Sticky Beef Mince Brothy Rice',
    'Gochujang Beef & Tenderstem Bowl',
    'Peanut-Lime Savoy Beef Noodles',
    'Sesame-Ginger Kale Fried Rice',
    'Sticky Beef Mince Brothy Rice',
    'Peanut-Lime Savoy Beef Noodles',
  ],
  'the schedule should use four distinct recipes across its six portions',
);
assert.ok(app.recipes['Sticky Beef Ginger Rice Soup'].method.some((step) => step.includes('700 ml beef stock')) && app.recipes['Sticky Beef Ginger Rice Soup'].method.some((step) => step.includes('20 g thinly sliced ginger')), 'the sticky beef soup should keep its ginger-stock flavour');
const mobBrothyRice = app.recipes['Sticky Beef Mince Brothy Rice'];
assert.strictEqual(mobBrothyRice.base, 4, 'the saved Mob sticky beef brothy rice recipe should retain its four-serving yield');
assert.ok(mobBrothyRice.ingredients.some((item) => item.n === 'Beef stock (for broth)' && item.q === 700) && mobBrothyRice.ingredients.some((item) => item.n === 'Beef stock (for sticky sauce)' && item.q === 40), 'the Mob recipe should show the broth and sauce stock quantities separately');
assert.ok(mobBrothyRice.ingredients.some((item) => item.n === 'Star anise' && item.q === 1), 'the Mob broth must include its star anise');
assert.ok(mobBrothyRice.ingredients.some((item) => item.n === 'Cardamom pods' && item.q === 4), 'the Mob broth must include its four cardamom pods');
assert.ok(mobBrothyRice.method.some((step) => step.includes('Toast 1 star anise and 4 crushed cardamom pods')), 'the Mob method must toast the whole spices before making the broth');
assert.ok(app.recipes['Gochujang Beef & Tenderstem Bowl'].ingredients.some((item) => item.n === 'Gochujang'), 'the broccoli bowl should use gochujang rather than a soy-vinegar dressing');
assert.ok(app.recipes['Peanut-Lime Savoy Beef Noodles'].ingredients.some((item) => item.n === 'Peanut butter') && app.recipes['Peanut-Lime Savoy Beef Noodles'].ingredients.some((item) => item.n === 'Lime'), 'the noodles should have a peanut-lime flavour');
assert.ok(app.recipes['Sesame-Ginger Kale Fried Rice'].ingredients.some((item) => item.n === 'Fresh ginger'), 'the fried rice should have a distinct sesame-ginger flavour');

const requiredVegetables = ['Carrots', 'Red cabbage', 'Savoy cabbage', 'Spinach', 'Parsley', 'Tenderstem broccoli', 'Kale'];
requiredVegetables.forEach((vegetable) => assert.ok(
  variedMains.some((meal) => app.recipes[meal].ingredients.some((item) => item.n === vegetable)),
  `${vegetable} should be used by at least one leftovers recipe`,
));
assert.ok(source.includes("Prep:['Leftover Beef & Greens Bulk Prep']"), 'the shared beef prep should remain discoverable in Recipes');

const groceryItems = app.groceryFor().groups.flatMap((group) => group.items);
assert.ok(groceryItems.some((item) => item.n === 'Minced beef' && item.q === '1 kg · already have'), 'the cart should retain the supplied beef');
['Beef stock', 'Gochujang', 'Peanut butter', 'Lime', 'Fresh ginger'].forEach((item) => {
  assert.ok(groceryItems.some((groceryItem) => groceryItem.n === item && groceryItem.q === 'only if needed'), `${item} should be an optional pantry item for flavour variety`);
});
assert.deepStrictEqual(Array.from(app.thisWeekMains()), variedMains, 'the home preview should present all four flavour profiles');

console.log('varied leftover beef plan checks passed');
