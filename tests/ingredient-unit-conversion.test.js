const assert = require('assert');
const fs = require('fs');
const vm = require('vm');

const source = fs.readFileSync('sundo-component.js', 'utf8');
const context = {
  React: { createElement: (type, props, ...children) => ({ type, props, children }) },
  DCLogic: class { setState(patch) { this.state = { ...(this.state || {}), ...patch }; } },
  setTimeout,
  clearTimeout,
};
vm.createContext(context);
vm.runInContext(`${source}\n;globalThis.SundoComponent=Component;`, context);

const app = new context.SundoComponent();
const yogurt = { n: 'Greek yogurt', q: 4, u: 'cups' };

assert.deepStrictEqual(
  JSON.parse(JSON.stringify(app.unitOptionsFor(yogurt))),
  ['cups', 'g'],
  'Greek yogurt measured in cups should offer a grams conversion'
);
assert.strictEqual(
  app.displayIngredientQuantity(yogurt, 4, 'g'),
  '980 g',
  'four cups of Greek yogurt should convert to 980 g'
);
assert.strictEqual(
  app.displayIngredientQuantity(yogurt, 4, 'cups'),
  '4 cups',
  'the source unit should remain available after conversion'
);
assert.deepStrictEqual(
  JSON.parse(JSON.stringify(app.unitOptionsFor({ n: 'Medjool dates', q: 4, u: '' }))),
  [],
  'whole produce must not offer misleading weight conversions'
);

app.setState({ currentRecipe: 'Salted Date & Banana Chia Pots', ingredientUnits: {} });
let rendered = JSON.stringify(app.ingredientsPanel());
assert.ok(rendered.includes('Choose unit for Greek yogurt'), 'convertible ingredients need an accessible unit selector');
assert.ok(rendered.includes('"grams"'), 'the selector must visibly offer grams');
app.setState({ ingredientUnits: { 'Salted Date & Banana Chia Pots::Greek yogurt': 'g' } });
rendered = JSON.stringify(app.ingredientsPanel());
assert.ok(rendered.includes('980 g'), 'selecting grams must update the amount displayed in the ingredient row');

console.log('ingredient unit conversion checks passed');
