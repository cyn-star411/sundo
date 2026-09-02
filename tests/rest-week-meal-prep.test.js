const assert = require('assert');
const fs = require('fs');
const vm = require('vm');

const source = fs.readFileSync('sundo-component.js', 'utf8');
const swSource = fs.readFileSync('sw.js', 'utf8');
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
const scheduled = app.slots.flatMap((slot) => week[slot]);

assert.deepStrictEqual(Array.from(app.days.map((day) => day.k)), ['Wed', 'Thu', 'Fri'], 'the active plan should cover the remaining Wednesday–Friday window');
assert.deepStrictEqual(Array.from(app.slots), ['Breakfast', 'Snack', 'Lunch', 'Dinner'], 'all four daily slots should remain active');
app.slots.forEach((slot) => assert.strictEqual(week[slot].length, 3, `${slot} needs one meal for each remaining day`));
assert.strictEqual(scheduled.length, 12, 'the rest-of-week plan should contain 12 meal slots');

assert.deepStrictEqual(Array.from(week.Breakfast), ['Pumpkin Chia Seed Pudding', 'Pumpkin Chia Seed Pudding', 'Pumpkin Chia Seed Pudding']);
assert.deepStrictEqual(Array.from(week.Snack), ['Apple & Yogurt', 'Apple & Yogurt', 'Apple & Yogurt']);
assert.deepStrictEqual(Array.from(week.Lunch), ['Honey Garlic Chicken & Miso Sesame Bean Salad', 'Honey Garlic Chicken & Miso Sesame Bean Salad', 'Honey Garlic Chicken & Miso Sesame Bean Salad']);
assert.deepStrictEqual(Array.from(week.Dinner), ['Ginger-Scallion Tofu & Enoki Soba', 'Ginger-Scallion Tofu & Enoki Soba', 'Ginger-Scallion Tofu & Enoki Soba']);

['Pumpkin Chia Seed Pudding', 'Honey Garlic Chicken & Miso Sesame Bean Salad', 'Ginger-Scallion Tofu & Enoki Soba'].forEach((meal) => {
  assert.ok(app.recipes[meal], `${meal} must have a live recipe card`);
  assert.strictEqual(app.resolveRecipe(meal), meal, `${meal} must resolve directly rather than through a stale fallback`);
  assert.ok(app.recipes[meal].ingredients.length > 0, `${meal} needs an ingredient list`);
  assert.ok(app.recipes[meal].method.length > 0, `${meal} needs a method`);
  assert.ok(app.recipes[meal].portions.Cynthia && app.recipes[meal].portions.Gabriel, `${meal} needs Cynthia and Gabriel portion guidance`);
});
assert.ok(app.recipes['Honey Garlic Chicken & Miso Sesame Bean Salad'].portions.Gabriel.kcal > app.recipes['Honey Garlic Chicken & Miso Sesame Bean Salad'].portions.Cynthia.kcal, 'Gabriel should receive the larger chicken-and-bean-salad lunch portion');
assert.deepStrictEqual(Array.from(app.thisWeekMains()), Array.from(week.Lunch.concat(week.Dinner)), 'Home and See all should use the active rest-of-week main-meal order');
assert.ok(app.recipeOrder.every((meal) => scheduled.includes(meal)), 'Recipes screen should foreground only active rest-of-week meals');

const groceries = app.groceryFor().groups.flatMap((group) => group.items);
[
  ['Chicken thighs', '900 g'],
  ['Firm tofu', '900 g'],
  ['Apples', '9'],
  ['Plain non-fat Greek yogurt', '1 kg'],
  ['Pumpkin purée', '1 × 425 g tin'],
  ['Chia seeds', '250 g'],
  ['White miso', '1 small tub'],
  ['Soba noodles', '600 g'],
  ['Pak choi', '900 g'],
].forEach(([name, quantity]) => {
  assert.ok(groceries.some((item) => item.n === name && item.q === quantity), `shopping list should include ${quantity} ${name}`);
});

const prep = app.prepSections;
const breakfastPrep = prep.find((section) => section.id === 'breakfast');
const mainPrep = prep.find((section) => section.id === 'mains');
const storagePrep = prep.find((section) => section.id === 'store');
assert.ok(breakfastPrep && mainPrep && storagePrep, 'the plan needs breakfast, main, and storage prep sections');
assert.ok(breakfastPrep.steps.join(' ').includes('6'), 'breakfast prep should make six pumpkin chia portions');
['900 g', '6 lunch portions', '75°C', 'Wednesday', 'Friday'].forEach((detail) => assert.ok(mainPrep.steps.join(' ').includes(detail), `main prep must state ${detail}`));
assert.ok(mainPrep.steps.join(' ').includes('bean salad') && mainPrep.steps.join(' ').includes('tofu'), 'main prep must explain the bean-salad and tofu components');
assert.ok(storagePrep.steps.join(' ').includes('3 days') && storagePrep.steps.join(' ').includes('75°C'), 'storage guidance must cover the remaining three days and safe reheating');

assert.ok(source.includes("'WED–FRI · REST OF WEEK'"), 'Home header should identify the shortened plan window');
assert.ok(swSource.includes("const CACHE = 'sundo-app-v15';"), 'service-worker cache must refresh for the Prep scrolling fix');
console.log('rest-of-week Cynthia and Gabriel meal-prep checks passed');
