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
  assert.ok(method.length >= 5, `${name} needs a complete beginner-friendly method, not a short recipe summary`);
  assert.match(method[0], /Before you start/i, `${name} must start with a clear beginner setup step`);
  assert.ok(method.some(step => /prep|prepare|wash|rinse|pat dry|chop/i.test(step)), `${name} must explain how to prepare ingredients before cooking`);
  assert.ok(method.some(step => /look for|until|hot|cooked|tender|golden|firm|steaming/i.test(step)), `${name} needs a visible doneness or completion cue`);
}

app.setState({ currentRecipe: 'Turkey Bean Vegetable Pasta' });
const rendered = JSON.stringify(app.methodPanel());
assert.ok(rendered.includes('Before you start'), 'the recipe method screen must show the beginner setup instruction');
assert.ok(rendered.includes('Wash your hands'), 'the recipe method screen must show basic food-safety guidance');

console.log('beginner method checks passed');
