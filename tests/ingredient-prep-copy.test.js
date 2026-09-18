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
app.setState({ currentRecipe: 'High-Protein Carrot Cake Squares' });
const renderedIngredients = JSON.stringify(app.ingredientsPanel());
assert.ok(!renderedIngredients.includes('Prep:'), 'ingredient list must remain a simple list without a separate prep direction under each ingredient');
assert.ok(!renderedIngredients.includes('PROTEIN') && !renderedIngredients.includes('SAUCE & EXTRAS'), 'ingredient list must not force cooks to jump between nutrition categories');

const customerFacingCopy = [
  ...app.methodFor(app.recipes['High-Protein Carrot Cake Squares']),
  ...app.methodFor(app.recipes['Turkey Bean Vegetable Pasta']),
].join(' ');
assert.ok(!/home.{0,80}protein|protein.{0,80}home/i.test(customerFacingCopy), 'recipe copy must not mention Home protein calculations');

console.log('simple ingredient list and concise method copy checks passed');
