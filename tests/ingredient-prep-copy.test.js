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
app.setState({ currentRecipe: 'Beef Bulgogi Bibimbap' });
assert.strictEqual(app.prepNoteFor({ n: 'Mushrooms' }), 'Wipe clean, trim and finely chop.', 'bibimbap mushrooms need a specific cut');
assert.strictEqual(app.prepNoteFor({ n: 'Carrots' }), 'Peel, then cut into fine matchsticks (julienne).', 'carrots need a usable cut instruction');
assert.strictEqual(app.prepNoteFor({ n: 'Yellow onion' }), 'Peel, halve and dice finely.', 'onions need a usable cut instruction');
app.setState({ currentRecipe: 'Ginger Beef, Mushroom & Spinach Rice Soup' });
assert.strictEqual(app.prepNoteFor({ n: 'Mushrooms' }), 'Wipe clean, trim and thinly slice.', 'soup mushrooms need a distinct cut');
assert.strictEqual(app.prepNoteFor({ n: 'Fresh ginger' }), 'Peel with a spoon, then finely grate.', 'ginger needs a clear prep instruction');
const renderedIngredients = JSON.stringify(app.ingredientsPanel());
assert.ok(renderedIngredients.includes('Prep: Wipe clean, trim and thinly slice.'), 'ingredient tab must show the cut/prep direction beside the ingredient');

const customerFacingCopy = [
  ...app.prepSectionsForCurrentPlan().flatMap((section) => section.steps),
  ...app.methodFor(app.recipes['Beef Bulgogi Bibimbap']),
  ...app.methodFor(app.recipes['Ginger Beef, Mushroom & Spinach Rice Soup']),
].join(' ');
assert.ok(!/home.{0,80}protein|protein.{0,80}home/i.test(customerFacingCopy), 'prep and recipe copy must not mention Home protein calculations');

console.log('ingredient prep directions and concise portion copy checks passed');
