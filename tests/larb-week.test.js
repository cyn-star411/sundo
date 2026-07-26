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
  'Chicken Larb Lettuce Cups',
  'Sticky Beef Mince Brothy Rice',
].forEach((recipe) => assert.ok(app.recipes[recipe], `${recipe} should be available in Sundō`));

assert.ok(
  week.Lunch.filter((meal) => meal.startsWith('Chicken Larb')).length >= 4,
  'the five-day lunch plan should reuse chicken larb across multiple meals',
);
assert.ok(
  week.Dinner.some((meal) => meal.includes('Beef')),
  'the five-day dinner plan should include the approved beef protein',
);

const grocery = app.groceryFor();
assert.strictEqual(grocery.label, '5-day Chicken Larb & Beef Week', 'the cart should identify this week’s plan');
assert.ok(
  grocery.groups.flatMap((group) => group.items).some((item) => item.n === 'Chicken mince'),
  'the cart should include the chicken mince required for bulk larb prep',
);
assert.ok(
  grocery.groups.flatMap((group) => group.items).some((item) => item.n === 'Lean beef mince'),
  'the cart should include the beef for this week’s dinners',
);
assert.ok(source.includes("' / 20 cooked'"), 'the progress label should use the five-day, 20-meal total');
assert.deepStrictEqual(
  Array.from(app.thisWeekMains()),
  ['Chicken Larb Tahini Noodles', 'Chicken Larb Crunchy Rice Bowl', 'Chicken Larb Lettuce Cups', 'Beef Pad Krapow', 'Sticky Beef Mince Brothy Rice'],
  'the home screen should preview this week’s larb and beef meals rather than the old rotation',
);

console.log('larb five-day plan checks passed');
