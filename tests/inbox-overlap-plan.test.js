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

assert.deepStrictEqual(Array.from(week.Breakfast), ['Pumpkin Protein Overnight Oats', 'Pumpkin Protein Overnight Oats', 'Pumpkin Protein Overnight Oats']);
assert.deepStrictEqual(Array.from(week.Snack), ['Cottage Cheese Protein Balls', 'Cottage Cheese Protein Balls', 'Cottage Cheese Protein Balls']);
assert.deepStrictEqual(Array.from(week.Lunch), ['Beef Bulgogi Bibimbap', 'Beef Bulgogi Bibimbap', 'Beef Bulgogi Bibimbap']);
assert.deepStrictEqual(Array.from(week.Dinner), ['Ginger Beef, Mushroom & Spinach Rice Soup', 'Ginger Beef, Mushroom & Spinach Rice Soup', 'Ginger Beef, Mushroom & Spinach Rice Soup']);

const scheduled = app.slots.flatMap((slot) => week[slot]);
const activeMeals = ['Pumpkin Protein Overnight Oats', 'Cottage Cheese Protein Balls', 'Beef Bulgogi Bibimbap', 'Ginger Beef, Mushroom & Spinach Rice Soup'];
activeMeals.forEach((meal) => {
  assert.ok(app.recipes[meal], `${meal} needs a live recipe card`);
  assert.strictEqual(app.resolveRecipe(meal), meal, `${meal} must resolve directly`);
  assert.ok(app.recipes[meal].ingredients.length > 0, `${meal} needs ingredients`);
  assert.ok(app.recipes[meal].method.length > 0, `${meal} needs a method`);
  assert.ok(app.recipes[meal].portions.Cynthia && app.recipes[meal].portions.Gabriel, `${meal} needs portion guidance`);
});

const lunch = app.recipes['Beef Bulgogi Bibimbap'];
const dinner = app.recipes['Ginger Beef, Mushroom & Spinach Rice Soup'];
const lunchTotals = app.weeklyRecipeTotals(lunch);
const dinnerTotals = app.weeklyRecipeTotals(dinner);
assert.ok(lunchTotals.Gabriel.ingredients['Lean beef mince, raw'] > lunchTotals.Cynthia.ingredients['Lean beef mince, raw'], 'Gabriel needs a larger bibimbap beef portion');
assert.ok(dinnerTotals.Gabriel.ingredients['Lean beef mince, raw'] > dinnerTotals.Cynthia.ingredients['Lean beef mince, raw'], 'Gabriel needs a larger dinner beef portion');

const groceries = app.groceryFor().groups.flatMap((group) => group.items);
['Lean beef mince', 'Mushrooms', 'Spinach', 'Carrots', 'Spring onions', 'Jasmine rice', 'Greek yogurt', 'Pumpkin purée', 'Cottage cheese'].forEach((name) => {
  assert.ok(groceries.some((item) => item.n === name), `cart should include shared-base ${name}`);
});
assert.ok(app.recipeOrder.every((meal) => scheduled.includes(meal)), 'Recipes should show only the active plan');
assert.deepStrictEqual(Array.from(app.thisWeekMains()), Array.from(week.Lunch.concat(week.Dinner)), 'Home and See all must show the active main-meal order');

const prep = app.prepSections.map((section) => section.steps.join(' ')).join(' ');
['overnight oats', 'protein balls', 'bibimbap', 'rice soup', '75°c'].forEach((detail) => {
  assert.ok(prep.toLowerCase().includes(detail), `prep must explain ${detail}`);
});

console.log('inbox-overlap rest-of-week plan checks passed');
