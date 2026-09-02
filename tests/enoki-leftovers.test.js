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

assert.deepStrictEqual(
  Array.from(week.Dinner),
  ['Honey Garlic Chicken & Enoki Rice Bowls', 'Honey Garlic Chicken & Enoki Rice Bowls', 'Honey Garlic Chicken & Enoki Rice Bowls'],
  'each remaining dinner should use the leftover enoki mushrooms',
);

const recipe = app.recipes['Honey Garlic Chicken & Enoki Rice Bowls'];
assert.ok(recipe, 'the active enoki dinner needs a live recipe card');
assert.ok(recipe.ingredients.some((item) => item.n === 'Enoki mushrooms' && item.q === 200 && item.u === 'g'), 'each dinner pair should use 200 g enoki mushrooms');
assert.ok(recipe.method.some((step) => step.toLowerCase().includes('cook') && step.toLowerCase().includes('enoki')), 'the recipe should tell the cook how to cook enoki safely');
assert.ok(recipe.portions.Cynthia && recipe.portions.Gabriel, 'the enoki dinner needs portion guidance for Cynthia and Gabriel');

const groceries = app.groceryFor().groups.flatMap((group) => group.items);
assert.ok(groceries.some((item) => item.n === 'Enoki mushrooms' && item.q === '600 g leftover / use what you have'), 'the cart should explicitly use the leftover enoki rather than buying more');

const mainsPrep = app.prepSections.find((section) => section.id === 'mains');
assert.ok(mainsPrep.steps.join(' ').includes('enoki'), 'prep guidance should account for the enoki dinner component');
console.log('leftover enoki dinner checks passed');
