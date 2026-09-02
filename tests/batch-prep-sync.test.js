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
const lunch = app.recipes['Honey Garlic Chicken & Miso Sesame Bean Salad'];
const mains = app.prepSections.find((section) => section.id === 'mains');
const groceries = app.groceryFor().groups.flatMap((group) => group.items);
const week = app.buildWeek();
const chicken = lunch.ingredients.find((item) => item.n === 'Chicken thighs, raw');
const cabbage = lunch.ingredients.find((item) => item.n === 'Purple cabbage, shredded');

assert.strictEqual(lunch.base, 6, 'the chicken recipe card must make the full six-lunch batch');
assert.strictEqual(week.Lunch.filter((meal) => meal === lunch ? false : meal === 'Honey Garlic Chicken & Miso Sesame Bean Salad').length, 3, 'the home plan must show three lunch days per person');
assert.ok(chicken && chicken.q === 900 && chicken.u === 'g', 'the ingredient list must show the complete 900 g raw-chicken batch');
assert.ok(cabbage && cabbage.q === 150 && cabbage.u === 'g', 'the ingredient list must show the complete vegetable batch');
assert.strictEqual(chicken.q / lunch.base, 150, 'each of the six home-plan portions must receive the same 150 g raw-chicken allocation');
assert.strictEqual(cabbage.q / lunch.base, 25, 'each of the six home-plan portions must receive the same 25 g cabbage allocation');
assert.deepStrictEqual(JSON.parse(JSON.stringify(lunch.portions.Cynthia)), JSON.parse(JSON.stringify(lunch.portions.Gabriel)), 'the recipe portion metadata must be even for Cynthia and Gabriel');
assert.ok(lunch.method[0].includes('six equal portions') && lunch.method[1].includes('900 g raw chicken'), 'method quantities must match the ingredient-list total');
assert.ok(lunch.method.at(-1).includes('evenly into six containers'), 'method must direct an even food split');
assert.ok(mains.steps[0].includes('already lists the full six-lunch batch'), 'the ritual must not present a different chicken quantity than the recipe');
assert.ok(source.includes("const totalLabel = r.fixedPlan && r.base>2 ? 'TOTAL TO PREP' : 'TOTAL TO COOK';"), 'weekly recipe cards must label their complete ingredient total clearly');
assert.ok(groceries.some((item) => item.n === 'Chicken thighs' && item.q === '900 g'), 'shopping must match the 900 g recipe total');
assert.ok(groceries.some((item) => item.n === 'Shelled edamame' && item.q === '150 g'), 'shopping must match the recipe total');
console.log('weekly chicken batch, even portions, and ingredient totals stay in sync');
