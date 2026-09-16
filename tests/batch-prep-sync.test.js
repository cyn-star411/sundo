const assert = require('assert');
const fs = require('fs');
const vm = require('vm');
const source = fs.readFileSync('sundo-component.js', 'utf8');
const context = { React:{createElement:()=>({})}, DCLogic:class { setState(p){ this.state={...(this.state||{}),...p}; } }, setTimeout, clearTimeout };
vm.createContext(context);
vm.runInContext(`${source}\n;globalThis.SundoComponent=Component;`, context);
const app = new context.SundoComponent();
const lunch = app.recipes['Beef Bulgogi Bibimbap'];
const dinner = app.recipes['Ginger Beef, Mushroom & Spinach Rice Soup'];
const lunchTotals = app.weeklyRecipeTotals(lunch);
const dinnerTotals = app.weeklyRecipeTotals(dinner);
const groceries = app.groceryFor().groups.flatMap((group) => group.items);

[lunch, dinner].forEach((recipe) => assert.strictEqual(app.weeklyRecipeTotals(recipe).occurrences, 5, `${app.recipeNameFor(recipe)} must occur five times`));
[lunchTotals, dinnerTotals].forEach((totals) => {
  assert.ok(totals.Gabriel.ingredients['Lean beef mince, raw'] > totals.Cynthia.ingredients['Lean beef mince, raw'], 'Gabriel needs the larger calculated beef portion');
  assert.strictEqual(Math.round(totals.totalIngredients['Lean beef mince, raw']), Math.round((totals.Cynthia.ingredients['Lean beef mince, raw'] + totals.Gabriel.ingredients['Lean beef mince, raw']) * 5), 'weekly beef must equal five calculated meals each');
});
const expectedBeef = Math.round(lunchTotals.totalIngredients['Lean beef mince, raw'] + dinnerTotals.totalIngredients['Lean beef mince, raw']) + ' g';
assert.ok(groceries.some((item) => item.n === 'Lean beef mince' && item.q === expectedBeef), 'cart must combine both calculated beef batches');
assert.ok(app.methodFor(lunch).join(' ').includes('75°C'), 'bulgogi method must state the safe cooking temperature');
assert.ok(app.methodFor(dinner).join(' ').includes('75°C'), 'rice soup method must state the safe cooking temperature');
console.log('weekly beef batches, calculated portions, and cart totals stay in sync');
