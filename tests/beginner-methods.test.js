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
for (const name of app.recipeOrder) {
  const recipe=app.recipes[name];
  app.setState({ currentRecipe: name });
  const method = app.methodFor(recipe);
  assert.ok(method.length >= 1 && method.length <= 5, `${name} needs a concise, source-relevant method`);
  assert.ok(method.every(step => step.length <= 440), `${name} has a method step that is too long to scan while cooking`);
  assert.ok(method.every(step => !/^Quick start:|^Prep:|^Finish:/i.test(step)), `${name} must not add generic prep coaching to the recipe method`);
}

app.setState({ currentRecipe: 'Turkey Bean Vegetable Pasta' });
const rendered = JSON.stringify(app.methodPanel());
assert.ok(!rendered.includes('Quick start:'), 'the recipe screen must not show generic setup instructions');
assert.ok(!rendered.includes('Prep:'), 'the recipe screen must not require a separate prep list');

console.log('direct recipe method checks passed');
