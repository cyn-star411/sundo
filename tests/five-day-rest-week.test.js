const assert=require('assert'),fs=require('fs'),vm=require('vm');
const source=fs.readFileSync('sundo-component.js','utf8');
const sw=fs.readFileSync('sw.js','utf8');
const context={React:{createElement:()=>({})},DCLogic:class {setState(p){this.state={...(this.state||{}),...p}}},setTimeout,clearTimeout};
vm.createContext(context);vm.runInContext(`${source}\n;globalThis.App=Component;`,context);
const app=new context.App(), week=app.buildWeek();
const planned=['Egg & Bean Breakfast Wraps','Crab, Tofu & Corn Fritters','Lemon Parsley Chicken Lentil Rice Bowls','Red Lentil Spinach Curry','No-Bake Fudge Brownie Cheesecake Bars'];
assert.deepStrictEqual(Array.from(app.days.map(d=>d.k)),['Wed','Thu','Fri','Sat','Sun']);
assert.deepStrictEqual(Array.from(app.recipeOrder),planned);
for (const name of planned) {
  const recipe=app.recipes[name], totals=app.weeklyRecipeTotals(recipe);
  assert.ok(recipe.ingredients.length&&app.methodFor(recipe).length,`${name} needs a complete recipe card`);
  assert.strictEqual(recipe.base,10,`${name} must be a true ten-portion batch`);
  assert.strictEqual(totals.occurrences,5,`${name} must occur five times`);
  assert.ok(Object.values(totals.totalIngredients).every(Number.isFinite),`${name} batch quantities must calculate`);
}
assert.ok(app.prepSections.find(x=>x.id==='store').steps.join(' ').includes('Friday–Sunday'),'storage must cover Friday–Sunday');
assert.strictEqual(app.groceryFor().label,'Wednesday–Sunday Meal Prep');
assert.ok(sw.includes("const CACHE = 'sundo-app-v43';"),'new plan must invalidate the prior offline cache');
console.log('five-day Wednesday–Sunday replacement has ten-portion batches, storage, cart, and cache in sync');
