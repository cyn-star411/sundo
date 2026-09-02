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
const mains = app.prepSections.find((section) => section.id === 'mains');
const groceries = app.groceryFor().groups.flatMap((group) => group.items);

assert.strictEqual(lunch.base, 2, 'the recipe card should remain a two-person recipe');
assert.ok(lunch.ingredients.some((item) => item.n === 'Chicken thighs, raw' && item.q === 300 && item.u === 'g'), 'the recipe card must state its chicken is 300 g raw, not an ambiguous cooked amount');
assert.ok(lunch.method[0].includes('3×') && lunch.method[0].includes('900 g raw'), 'the recipe card must explain how its single recipe relates to the weekly batch');
assert.ok(mains.title.includes('Batch lunches'), 'the ritual must be labelled as batch prep rather than a dinner recipe');
const ritual = mains.steps.join(' ');
['900 g raw chicken thighs', '6 lunch portions, labelled', '150 g edamame', 'not a three-day cooked dinner batch', '300 g tofu', '200 g enoki', '180 g soba'].forEach((detail) => {
  assert.ok(ritual.includes(detail), `batch ritual must state ${detail}`);
});
assert.ok(groceries.some((item) => item.n === 'Chicken thighs' && item.q === '900 g'), 'shopping must match three 300 g raw-chicken recipe batches');
assert.ok(groceries.some((item) => item.n === 'Shelled edamame' && item.q === '150 g'), 'shopping must match three 50 g bean-salad recipe batches');
assert.ok(groceries.some((item) => item.n === 'Firm tofu' && item.q === '900 g'), 'shopping must match three 300 g fresh dinner recipes');
console.log('batch ritual and individual recipe quantities stay in sync');
