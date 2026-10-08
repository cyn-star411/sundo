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
assert.deepStrictEqual(
  JSON.parse(JSON.stringify(yogurtOptions)),
  ['g', 'kg'],
  'weighable ingredients measured in cups should offer only g/kg choices'
);
assert.strictEqual(
  app.displayIngredientQuantity(yogurt, 4, 'g'),
  '980 g',
  'four cups of Greek yogurt should convert to 980 g'
);
assert.strictEqual(
  app.displayIngredientQuantity(yogurt, 4, 'kg'),
  '0.98 kg',
  'the kg alternative should remain available for larger dry quantities'
);
assert.strictEqual(
  app.displayIngredientQuantity({ n: 'Test liquid', q: 1.6, u: 'ml' }, 1.6, 'ml'),
  '2 ml',
  'millilitres should round up to a whole number'
);
assert.strictEqual(
  app.displayIngredientQuantity({ n: 'Test liquid', q: 1.01, u: 'L' }, 1.01, 'L'),
  '2 L',
  'litres should round up to a whole number'
);
assert.strictEqual(
  app.displayIngredientQuantity({ n: 'Test liquid', q: 1, u: 'cups' }, 1, 'L'),
  '1 L',
  'converted litres should round up to a whole number'
);

// Active-plan liquids must use volume units, while weighable dry ingredients use g/kg —
// both in the ingredient view and in the self-contained Method-tab amount guide.
const curry = app.recipes['Red Lentil Spinach Curry'];
const coconutMilk = curry.ingredients.find(ing => ing.n === 'Light coconut milk');
const lentils = curry.ingredients.find(ing => ing.n === 'Red lentils');
assert.deepStrictEqual(
  JSON.parse(JSON.stringify(app.unitOptionsFor(coconutMilk))),
  ['ml', 'L'],
  'liquid ingredients should only offer L/ml conversion choices'
);
assert.deepStrictEqual(
  JSON.parse(JSON.stringify(app.unitOptionsFor(lentils))),
  ['g', 'kg'],
  'dry ingredients should only offer g/kg conversion choices'
);
assert.strictEqual(
  app.displayIngredientQuantity({ n: 'Milk', q: 2, u: 'cups' }, 2, app.canonicalIngredientUnit({ n: 'Milk', q: 2, u: 'cups' }, 2)),
  '480 ml',
  'a liquid cup amount should render as millilitres by default'
);
assert.strictEqual(
  app.displayIngredientQuantity({ n: 'Almond flour', q: 5, u: 'cups' }, 5, app.canonicalIngredientUnit({ n: 'Almond flour', q: 5, u: 'cups' }, 5)),
  '480 g',
  'a dry cup amount should render as grams by default'
);
assert.ok(
  app.methodIngredientsFor(curry).includes('1920 g Red lentils') && app.methodIngredientsFor(curry).includes('3 L Light coconut milk'),
  'Method-tab ingredient amounts must keep dry ingredients in grams and liquids in litres'
);
assert.deepStrictEqual(
  JSON.parse(JSON.stringify(app.unitOptionsFor({ n: 'Medjool dates', q: 4, u: '' }))),
  [],
  'whole produce must not offer misleading weight conversions'
);

app.setState({ currentRecipe: 'No-Bake Fudge Brownie Cheesecake Bars', ingredientUnits: {} });
let rendered = JSON.stringify(app.ingredientsPanel());
assert.ok(rendered.includes('Choose unit for Almond flour'), 'convertible ingredients need an accessible unit selector');
assert.ok(rendered.includes('"grams"'), 'the selector must visibly offer grams');
app.setState({ ingredientUnits: { 'No-Bake Fudge Brownie Cheesecake Bars::Almond flour': 'g' } });
rendered = JSON.stringify(app.ingredientsPanel());
assert.ok(rendered.includes('480 g'), 'selecting grams must update the amount displayed in the active ten-bar batch');

for (const name of app.recipeOrder) {
  const recipe = app.recipes[name];
  for (const ingredient of recipe.ingredients) {
    const options = JSON.parse(JSON.stringify(app.unitOptionsFor(ingredient)));
    if (app.isLiquidIngredient(ingredient) && app.volumeMl[ingredient.u]) {
      assert.deepStrictEqual(options, ['ml', 'L'], `${name}: ${ingredient.n} must use only liquid units`);
    } else if (ingredient.u === 'g' || ingredient.u === 'kg' || (app.conversionFactorsFor(ingredient) && app.conversionFactorsFor(ingredient)[ingredient.u])) {
      assert.deepStrictEqual(options, ['g', 'kg'], `${name}: ${ingredient.n} must use only dry-weight units`);
    }
  }
}

console.log('ingredient unit conversion checks passed');
