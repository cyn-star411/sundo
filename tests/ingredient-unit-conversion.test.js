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

const yogurtOptions = app.unitOptionsFor(yogurt);
assert.ok(yogurtOptions.includes('cups') && yogurtOptions.includes('g'), 'Greek yogurt measured in cups should offer a grams conversion');
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

app.setState({ currentRecipe: 'Pumpkin Protein Overnight Oats', ingredientUnits: {} });
let rendered = JSON.stringify(app.ingredientsPanel());
assert.ok(rendered.includes('Choose unit for Plain non-fat Greek yogurt'), 'convertible ingredients need an accessible unit selector');
assert.ok(rendered.includes('"grams"'), 'the selector must visibly offer grams');
app.setState({ ingredientUnits: { 'Pumpkin Protein Overnight Oats::Plain non-fat Greek yogurt': 'g' } });
rendered = JSON.stringify(app.ingredientsPanel());
assert.ok(rendered.includes('900 g'), 'selecting grams must update the amount displayed in the active six-jar batch');

for (const recipe of Object.values(app.recipes)) {
  for (const ingredient of recipe.ingredients) {
    if (['g', 'ml', 'cup', 'cups', 'tbsp', 'tsp'].includes(ingredient.u)) {
      assert.ok(
        app.unitOptionsFor(ingredient).length > 1,
        `${ingredient.n} (${ingredient.u}) needs a safe conversion choice in every recipe`
      );
    }
  }
}

console.log('ingredient unit conversion checks passed');
