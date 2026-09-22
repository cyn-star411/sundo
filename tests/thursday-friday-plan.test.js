const assert=require('assert'),fs=require('fs'),vm=require('vm');
const source=fs.readFileSync('sundo-component.js','utf8');
const sw=fs.readFileSync('sw.js','utf8');
const context={React:{createElement:()=>({})},DCLogic:class {setState(p){this.state={...(this.state||{}),...p}}},setTimeout,clearTimeout};
vm.createContext(context);vm.runInContext(`${source}\n;globalThis.App=Component;`,context);
const app=new context.App(), week=app.buildWeek();
const planned={
  Breakfast:'Coconut Mango Oats',
  Snack:'Edamame Sesame',
  Lunch:'Honey Garlic Chicken & Miso Sesame Bean Salad',
  Dinner:'Crispy Tofu Red Cabbage Noodle Bowls',
  Dessert:'Sweet Potato Brownies',
};
const exclude=new Set([
  'Pumpkin Protein Overnight Oats','Cottage Cheese Protein Balls','Beef Bulgogi Bibimbap','Ginger Beef, Mushroom & Spinach Rice Soup',
  'Apple & Yogurt','Matcha Yogurt Cup','Salted Date & Banana Chia Pots','Healthy Cinnamon Roll Protein Muffins',
  'Turkey Bean Vegetable Pasta','Turkey Chilli Loaded Potatoes','High-Protein Carrot Cake Squares','Banana Protein Yogurt','Cottage Cheese Berry Cup',
]);
assert.deepStrictEqual(Array.from(app.days.map(d=>d.k)),['Wed','Thu','Fri']);
for (const [slot,name] of Object.entries(planned)) {
  assert.deepStrictEqual(Array.from(week[slot]),Array(3).fill(name),`${slot} should use its genuinely fresh Wednesday–Friday recipe`);
  assert.ok(app.recipes[name],`${name} must resolve to a complete recipe card`);
  assert.ok(!exclude.has(name),`${name} must not repeat either of the recent plans`);
  assert.ok(app.recipes[name].ingredients.length>0&&app.methodFor(app.recipes[name]).length>0,`${name} needs ingredients and a self-contained method`);
}
assert.deepStrictEqual(Array.from(app.recipeOrder),Object.values(planned),'Home, recipes, and plan order must use the new roster');
const lunch=app.weeklyRecipeTotals(app.recipes[planned.Lunch]);
const dinner=app.weeklyRecipeTotals(app.recipes[planned.Dinner]);
assert.strictEqual(lunch.occurrences,3); assert.strictEqual(dinner.occurrences,3);
assert.ok(lunch.Gabriel.ingredients['Chicken thighs, raw']>lunch.Cynthia.ingredients['Chicken thighs, raw'],'Gabriel receives the larger profile-driven chicken allocation');
assert.ok(dinner.Gabriel.ingredients['Firm tofu']>dinner.Cynthia.ingredients['Firm tofu'],'Gabriel receives the larger profile-driven tofu allocation');
const cart=app.groceryFor().groups.flatMap(g=>g.items), cartNames=new Set(cart.map(x=>x.n));
for (const recipe of Object.values(planned).map(name=>app.recipes[name])) for (const ingredient of recipe.ingredients) assert.ok(cartNames.has(ingredient.n),`cart must include active ingredient ${ingredient.n}`);
const chicken=cart.find(x=>x.n==='Chicken thighs, raw');
assert.strictEqual(chicken.q,Math.ceil(lunch.totalIngredients['Chicken thighs, raw'])+' g','cart chicken must equal the profile-driven lunch batch');
assert.strictEqual(app.groceryFor().label,'Wednesday–Friday Meal Prep');
assert.ok(app.prepSections.find(x=>x.id==='mains').steps.join(' ').includes('chicken'),'prep must describe the active chicken batch');
assert.ok(sw.includes("const CACHE = 'sundo-app-v38';"),'new plan must invalidate the prior offline cache');
console.log('genuinely new Wednesday–Friday recipes exclude the two most recent plans and keep batches, cart, and portions synchronized');
