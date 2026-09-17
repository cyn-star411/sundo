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
for (const [name, recipe] of Object.entries(app.recipes)) {
  app.setState({ currentRecipe: name });
  const method = app.methodFor(recipe);
  assert.ok(method.length >= 4 && method.length <= 7, `${name} needs a quick, scannable method with only the relevant details`);
  assert.match(method[0], /^Quick start:/i, `${name} must start with a compact beginner setup step`);
  assert.ok(method.some(step => /^Prep:/i.test(step)), `${name} must retain a quick, recipe-relevant preparation step`);
  assert.ok(method.some(step => /until|hot|cooked|tender|golden|firm|steaming|set/i.test(step)), `${name} needs a visible doneness or completion cue`);
  assert.ok(method.every(step => step.length <= 440), `${name} has a method step that is too long to scan while cooking`);
}

app.setState({ currentRecipe: 'Turkey Bean Vegetable Pasta' });
const rendered = JSON.stringify(app.methodPanel());
assert.ok(rendered.includes('Quick start:'), 'the recipe method screen must show the compact beginner setup instruction');
assert.ok(rendered.includes('Wash hands'), 'the recipe method screen must show concise food-safety guidance');

console.log('beginner method checks passed');
