const assert=require('assert'),fs=require('fs'),vm=require('vm');
const source=fs.readFileSync('sundo-component.js','utf8');
const sw=fs.readFileSync('sw.js','utf8');
const context={React:{createElement:()=>({})},DCLogic:class {setState(p){this.state={...(this.state||{}),...p}}},setTimeout,clearTimeout};
vm.createContext(context);vm.runInContext(`${source}\n;globalThis.App=Component;`,context);
const app=new context.App(), week=app.buildWeek();
const planned={
  Breakfast:'Pumpkin Protein Overnight Oats',
  Snack:'Apple & Yogurt',
  Lunch:'Beef Bulgogi Bibimbap',
  Dinner:'Ginger Beef, Mushroom & Spinach Rice Soup',
  Dessert:'Matcha Yogurt Cup',
};
const priorPlan=new Set(['Salted Date & Banana Chia Pots','Healthy Cinnamon Roll Protein Muffins','Turkey Bean Vegetable Pasta','Turkey Chilli Loaded Potatoes','High-Protein Carrot Cake Squares']);
assert.deepStrictEqual(Array.from(app.days.map(d=>d.k)),['Wed','Thu','Fri']);
for (const [slot,name] of Object.entries(planned)) {
  assert.deepStrictEqual(Array.from(week[slot]),Array(3).fill(name),`${slot} should use its fresh Wednesday–Friday recipe`);
  assert.ok(app.recipes[name],`${name} must resolve to a complete recipe card`);
  assert.ok(!priorPlan.has(name),`${name} must not repeat a dish from the immediately preceding plan`);
  assert.ok(app.recipes[name].ingredients.length>0&&app.methodFor(app.recipes[name]).length>0,`${name} needs ingredients and a self-contained method`);
}
assert.deepStrictEqual(Array.from(app.recipeOrder),Object.values(planned),'Home, recipes, and plan order must use the active fresh roster');
const lunch=app.weeklyRecipeTotals(app.recipes[planned.Lunch]);
const dinner=app.weeklyRecipeTotals(app.recipes[planned.Dinner]);
assert.strictEqual(lunch.occurrences,3); assert.strictEqual(dinner.occurrences,3);
assert.ok(lunch.Gabriel.ingredients['Lean beef mince, raw']>lunch.Cynthia.ingredients['Lean beef mince, raw'],'Gabriel receives the larger profile-driven lunch allocation');
assert.ok(dinner.Gabriel.ingredients['Lean beef mince, raw']>dinner.Cynthia.ingredients['Lean beef mince, raw'],'Gabriel receives the larger profile-driven dinner allocation');
const cart=app.groceryFor().groups.flatMap(g=>g.items);
const cartNames=new Set(cart.map(x=>x.n));
['Lean beef mince, raw','Plain non-fat Greek yogurt','Greek yogurt','Apples','Pumpkin purée','Mushrooms','Jasmine rice, dry','Matcha powder'].forEach(name=>assert.ok(cartNames.has(name),`cart must include ${name} used by the active recipes`));
for (const recipe of Object.values(planned).map(name=>app.recipes[name])) {
  for (const ingredient of recipe.ingredients) assert.ok(cartNames.has(ingredient.n),`cart must include active ingredient ${ingredient.n}`);
}
const beef=cart.find(x=>x.n==='Lean beef mince, raw');
assert.strictEqual(beef.q,Math.ceil(lunch.totalIngredients['Lean beef mince, raw']+dinner.totalIngredients['Lean beef mince, raw'])+' g','cart beef must equal both profile-driven main batches');
assert.strictEqual(app.groceryFor().label,'Wednesday–Friday Meal Prep');
assert.ok(app.prepSections.find(x=>x.id==='mains').steps.join(' ').includes('beef'),'prep must describe the shared active beef batch');
assert.ok(sw.includes("const CACHE = 'sundo-app-v37';"),'new plan must invalidate the prior offline cache');
console.log('fresh Wednesday–Friday plan excludes prior dishes and keeps batches, cart, and portions synchronized');
