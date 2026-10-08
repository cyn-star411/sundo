const assert=require('assert'),fs=require('fs'),vm=require('vm');
const source=fs.readFileSync('sundo-component.js','utf8');
const sw=fs.readFileSync('sw.js','utf8');
const context={React:{createElement:()=>({})},DCLogic:class {setState(p){this.state={...(this.state||{}),...p}}},setTimeout,clearTimeout};
vm.createContext(context);vm.runInContext(`${source}\n;globalThis.App=Component;`,context);
const app=new context.App(), week=app.buildWeek();
const planned={
  Breakfast:'Coconut Mango Oats', Snack:'Edamame Sesame',
  Lunch:'Honey Garlic Chicken & Miso Sesame Bean Salad',
  Dinner:'Crispy Tofu Red Cabbage Noodle Bowls', Dessert:'Sweet Potato Brownies',
};
assert.deepStrictEqual(Array.from(app.days.map(d=>d.k)),['Wed','Thu','Fri','Sat','Sun']);
for (const [slot,name] of Object.entries(planned)) {
  assert.deepStrictEqual(Array.from(week[slot]),Array(5).fill(name),`${slot} should cover Wednesday–Sunday`);
  assert.ok(app.recipes[name]?.ingredients.length && app.methodFor(app.recipes[name]).length,`${name} needs a complete recipe card`);
}
assert.deepStrictEqual(Array.from(app.recipeOrder),Object.values(planned));
const lunch=app.weeklyRecipeTotals(app.recipes[planned.Lunch]);
const dinner=app.weeklyRecipeTotals(app.recipes[planned.Dinner]);
assert.strictEqual(lunch.occurrences,5); assert.strictEqual(dinner.occurrences,5);
assert.ok(lunch.Gabriel.ingredients['Chicken thighs, raw']>lunch.Cynthia.ingredients['Chicken thighs, raw']);
assert.ok(dinner.Gabriel.ingredients['Firm tofu']>dinner.Cynthia.ingredients['Firm tofu']);
const cart=app.groceryFor().groups.flatMap(g=>g.items), cartNames=new Set(cart.map(x=>x.n));
for (const recipe of Object.values(planned).map(name=>app.recipes[name])) for (const ingredient of recipe.ingredients) assert.ok(cartNames.has(ingredient.n),`cart must include ${ingredient.n}`);
assert.strictEqual(app.groceryFor().label,'Wednesday–Sunday Meal Prep');
assert.ok(app.prepSections.find(x=>x.id==='store').steps.join(' ').includes('Friday–Sunday'),'storage must cover Friday–Sunday frozen portions');
assert.ok(app.methodFor(app.recipes[planned.Lunch]).join(' ').includes('ten equal portions — five for Cynthia and five for Gabriel'),'lunch recipe must state the five-day batch yield');
assert.ok(sw.includes("const CACHE = 'sundo-app-v39';"),'new plan must invalidate the prior offline cache');
console.log('five-day Wednesday–Sunday plan keeps schedule, batches, cart, storage, and cache in sync');
