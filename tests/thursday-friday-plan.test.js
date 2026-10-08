const assert=require('assert'),fs=require('fs'),vm=require('vm');
const source=fs.readFileSync('sundo-component.js','utf8');
const sw=fs.readFileSync('sw.js','utf8');
const context={React:{createElement:()=>({})},DCLogic:class {setState(p){this.state={...(this.state||{}),...p}}},setTimeout,clearTimeout};
vm.createContext(context);vm.runInContext(`${source}\n;globalThis.App=Component;`,context);
const app=new context.App(), week=app.buildWeek();
const planned={
  Breakfast:'Egg & Bean Breakfast Wraps',
  Snack:'Crab, Tofu & Corn Fritters',
  Lunch:'Lemon Parsley Chicken Lentil Rice Bowls',
  Dinner:'Red Lentil Spinach Curry',
  Dessert:'No-Bake Fudge Brownie Cheesecake Bars',
};
const exclude=new Set([
  'Coconut Mango Oats','Edamame Sesame','Honey Garlic Chicken & Miso Sesame Bean Salad','Crispy Tofu Red Cabbage Noodle Bowls','Sweet Potato Brownies',
  'Pumpkin Protein Overnight Oats','Apple & Yogurt','Beef Bulgogi Bibimbap','Ginger Beef, Mushroom & Spinach Rice Soup','Matcha Yogurt Cup',
  'Salted Date & Banana Chia Pots','Healthy Cinnamon Roll Protein Muffins','Turkey Bean Vegetable Pasta','Turkey Chilli Loaded Potatoes','High-Protein Carrot Cake Squares',
  'Berry Protein Overnight Oats','Banana Protein Yogurt','Cottage Cheese Berry Cup',
]);
assert.deepStrictEqual(Array.from(app.days.map(d=>d.k)),['Wed','Thu','Fri','Sat','Sun']);
for (const [slot,name] of Object.entries(planned)) {
  assert.deepStrictEqual(Array.from(week[slot]),Array(5).fill(name),`${slot} should use its new Wednesday–Sunday recipe`);
  assert.ok(app.recipes[name],`${name} must resolve to a complete recipe card`);
  assert.ok(!exclude.has(name),`${name} must not repeat a recent plan`);
  assert.ok(app.recipes[name].ingredients.length>0&&app.methodFor(app.recipes[name]).length>0,`${name} needs ingredients and a self-contained method`);
  assert.strictEqual(app.recipes[name].base,10,`${name} should be one true ten-portion batch`);
}
assert.deepStrictEqual(Array.from(app.recipeOrder),Object.values(planned),'Home, recipes, and plan order must use the new roster');
const lunch=app.weeklyRecipeTotals(app.recipes[planned.Lunch]);
const dinner=app.weeklyRecipeTotals(app.recipes[planned.Dinner]);
assert.strictEqual(lunch.occurrences,5); assert.strictEqual(dinner.occurrences,5);
assert.ok(lunch.Gabriel.ingredients['Chicken breast, raw']>lunch.Cynthia.ingredients['Chicken breast, raw'],'Gabriel receives the larger profile-driven chicken allocation');
assert.ok(dinner.Gabriel.ingredients['Red lentils']>dinner.Cynthia.ingredients['Red lentils'],'Gabriel receives the larger profile-driven curry allocation');
const cart=app.groceryFor().groups.flatMap(g=>g.items), cartNames=new Set(cart.map(x=>x.n));
for (const recipe of Object.values(planned).map(name=>app.recipes[name])) for (const ingredient of recipe.ingredients) assert.ok(cartNames.has(ingredient.n),`cart must include active ingredient ${ingredient.n}`);
const chicken=cart.find(x=>x.n==='Chicken breast, raw');
assert.strictEqual(chicken.q,Math.ceil(lunch.totalIngredients['Chicken breast, raw'])+' g','cart chicken must equal the profile-driven lunch batch');
assert.strictEqual(app.groceryFor().label,'Wednesday–Sunday Meal Prep');
assert.ok(app.prepSections.find(x=>x.id==='mains').steps.join(' ').includes('lentil'),'prep must describe the new chicken and lentil batches');
assert.ok(app.prepSections.find(x=>x.id==='store').steps.join(' ').includes('Friday–Sunday'),'storage must cover Friday–Sunday frozen portions');
assert.ok(sw.includes("const CACHE = 'sundo-app-v41';"),'replacement plan must invalidate the prior offline cache');
console.log('new Wednesday–Sunday recipes exclude recent plans and keep ten-portion batches, cart, portions, storage, and cache in sync');
