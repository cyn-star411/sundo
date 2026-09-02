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
const lunch = app.recipes['Honey Garlic Chicken & Miso Sesame Bean Salad'];
const totals = app.weeklyRecipeTotals(lunch);
const groceries = app.groceryFor().groups.flatMap((group) => group.items);
const methods = app.methodFor(lunch);

assert.strictEqual(lunch.weeklyReference, true, 'the chicken recipe must identify its weekly reference quantities');
assert.strictEqual(totals.occurrences, 3, 'the home plan must schedule three lunches');
assert.strictEqual(totals.Cynthia.protein, 30, 'Cynthia’s lunch target must follow Home');
assert.strictEqual(totals.Gabriel.protein, 34, 'Gabriel’s lunch target must follow Home');
assert.strictEqual(Math.round(totals.Cynthia.ingredients['Chicken thighs, raw']), 150, 'Cynthia should receive 150 g raw chicken per lunch');
assert.strictEqual(Math.round(totals.Gabriel.ingredients['Chicken thighs, raw']), 170, 'Gabriel should receive a larger 170 g raw-chicken portion per lunch');
assert.strictEqual(Math.round(totals.totalIngredients['Chicken thighs, raw']), 960, 'the weekly chicken total must sum the three calculated portions for each person');
assert.ok(methods[1].includes('960 g raw chicken'), 'the cooking method must use the live ingredient total');
assert.ok(methods.at(-1).includes('150 g chicken') && methods.at(-1).includes('170 g chicken'), 'the method must label the unequal portions');
assert.ok(groceries.some((item) => item.n === 'Chicken thighs' && item.q === '960 g'), 'shopping must match the calculated chicken total');
assert.ok(groceries.some((item) => item.n === 'Shelled edamame' && item.q === '160 g'), 'shopping must match the calculated vegetable total');
console.log('weekly chicken batch, calculated portions, and ingredient totals stay in sync');
