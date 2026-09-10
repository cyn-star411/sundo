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
vm.runInContext(`${source}\n;globalThis.SundoComponent=Component;`, context);

const app = new context.SundoComponent();
const batch = app.sharedBeefBatchPrep();
const lunch = app.weeklyRecipeTotals(app.recipes['Beef Bulgogi Bibimbap']);
const dinner = app.weeklyRecipeTotals(app.recipes['Ginger Beef, Mushroom & Spinach Rice Soup']);
const expectedRaw = lunch.totalIngredients['Lean beef mince, raw'] + dinner.totalIngredients['Lean beef mince, raw'];

assert.strictEqual(Math.round(batch.totalRawGrams), Math.round(expectedRaw), 'shared beef batch must equal both scheduled recipes combined');
assert.strictEqual(batch.allocations.length, 4, 'batch prep must state lunch and dinner allocations for both people');
assert.strictEqual(Math.round(batch.allocations.reduce((sum, allocation) => sum + allocation.totalRawGrams, 0)), Math.round(expectedRaw), 'all shared beef must be assigned to a meal and person');
assert.ok(batch.method.some(step => step.includes('75°C')), 'shared batch needs a food-safety completion target');
assert.ok(batch.method.some(step => /refrigerate.*Wednesday.*Thursday/i.test(step) && /freeze.*Friday/i.test(step)), 'shared batch needs fridge/freezer allocation guidance');
assert.ok(app.methodFor(app.recipes['Beef Bulgogi Bibimbap']).join(' ').includes('shared neutral beef batch'), 'lunch method must use the shared batch');
assert.ok(app.methodFor(app.recipes['Ginger Beef, Mushroom & Spinach Rice Soup']).join(' ').includes('shared neutral beef batch'), 'dinner method must use the shared batch');
assert.ok(app.prepSections.find(section => section.id === 'mains').steps.join(' ').includes('shared neutral beef batch'), 'Sunday prep must make the shared batch discoverable without opening recipe tabs');

console.log('shared beef batch prep stays allocated across lunch and dinner');
