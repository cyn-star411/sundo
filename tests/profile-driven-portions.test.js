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
const recipe = app.recipes['Honey Garlic Chicken & Miso Sesame Bean Salad'];

const initial = app.weeklyRecipeTotals(recipe);
assert.strictEqual(app.targetsFor(app.state.people.me).protein, 120, 'Cynthia’s home target should derive from her current profile');
assert.strictEqual(app.targetsFor(app.state.people.partner).protein, 136, 'Gabriel’s home target should derive from his current profile');
assert.strictEqual(initial.Cynthia.protein, 30, 'Cynthia’s lunch portion should receive a quarter of her daily protein target');
assert.strictEqual(initial.Gabriel.protein, 34, 'Gabriel’s lunch portion should receive a quarter of his daily protein target');
assert.ok(initial.Gabriel.ingredients['Chicken thighs, raw'] > initial.Cynthia.ingredients['Chicken thighs, raw'], 'Gabriel’s chicken portion should be larger');
assert.strictEqual(initial.totalIngredients['Chicken thighs, raw'], initial.Cynthia.ingredients['Chicken thighs, raw'] * 3 + initial.Gabriel.ingredients['Chicken thighs, raw'] * 3, 'the recipe total must equal three lunch portions for each person');
assert.strictEqual(app.groceryFor().groups.flatMap((group) => group.items).find((item) => item.n === 'Chicken thighs').q, initial.totalIngredients['Chicken thighs, raw'] + ' g', 'the shopping list must use the calculated recipe total');

app.updatePerson('me', { weight: 65 });
const changed = app.weeklyRecipeTotals(recipe);
assert.strictEqual(app.targetsFor(app.state.people.me).protein, 130, 'changing Cynthia’s weight must recalculate her home protein target');
assert.strictEqual(changed.Cynthia.protein, 33, 'changing Cynthia’s home protein target must recalculate her lunch protein portion');
assert.ok(changed.Cynthia.ingredients['Chicken thighs, raw'] > initial.Cynthia.ingredients['Chicken thighs, raw'], 'changing Cynthia’s target must increase her recipe portion');
assert.ok(changed.totalIngredients['Chicken thighs, raw'] > initial.totalIngredients['Chicken thighs, raw'], 'changing Cynthia’s target must increase the weekly shopping total');
console.log('profile-driven portions and shopping totals stay in sync');
