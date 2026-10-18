const assert=require('assert'),fs=require('fs'),vm=require('vm');
const source=fs.readFileSync('sundo-component.js','utf8'),sw=fs.readFileSync('sw.js','utf8'),refresh=fs.readFileSync('refresh.html','utf8');
const context={React:{createElement:()=>({})},DCLogic:class {setState(p){this.state={...(this.state||{}),...p}}},setTimeout,clearTimeout};
vm.createContext(context);vm.runInContext(`${source}\n;globalThis.App=Component;`,context);
const app=new context.App(),week=app.buildWeek();
const planned={
  Breakfast:'Apple-Cinnamon Protein Overnight Oats',
  'Snack 1':'Cottage Cheese Berry Crunch Pots',
  Lunch:'Lemon-Herb Chicken, Lentil & Couscous Bowls',
  'Snack 2':'Miso-Sesame Edamame & Orange Packs',
  Dinner:'Thai Peanut Turkey, Broccoli & Rice Noodle Bowls',
};
const prior=['Green Tea Protein Overnight Oats','Edamame & Clementine Snack','Korean Gochujang Chicken Rice Bowls','Matcha Yogurt Cups','Vietnamese Lemongrass Turkey & Tofu Bowls'];
assert.deepStrictEqual(Array.from(app.days.map(d=>d.k)),['Mon','Tue','Wed','Thu','Fri','Sat','Sun']);
assert.deepStrictEqual(Array.from(app.slots),Object.keys(planned));
for(const [slot,name] of Object.entries(planned)) {
  assert.deepStrictEqual(Array.from(week[slot]),Array(7).fill(name),`${slot} must cover Monday–Sunday`);
  const recipe=app.recipes[name], totals=app.weeklyRecipeTotals(recipe);
  assert.ok(recipe&&recipe.ingredients.length&&app.methodFor(recipe).length,`${name} needs a complete card`);
  assert.strictEqual(recipe.base,14);assert.strictEqual(recipe.weeklyReferenceDays,7);assert.strictEqual(recipe.batchPrep,true);
  assert.strictEqual(totals.occurrences,7);assert.ok(recipe.batchReferenceKcal>0);
  assert.ok(!prior.includes(name),`${name} must not repeat the prior plan`);
}
assert.deepStrictEqual(Array.from(app.recipeOrder),Object.values(planned));
const cynthia=app.state.people.me,gabriel=app.state.people.partner;
assert.strictEqual(app.plannedDailyFor(cynthia).kcal,1600);assert.strictEqual(app.plannedDailyFor(cynthia).protein,120);
assert.strictEqual(app.plannedDailyFor(gabriel).kcal,2760);assert.strictEqual(app.plannedDailyFor(gabriel).protein,136);
const lunch=app.weeklyRecipeTotals(app.recipes[planned.Lunch]),before=lunch.totalIngredients['Chicken breast, raw'];
assert.ok(lunch.Gabriel.ingredients['Chicken breast, raw']>lunch.Cynthia.ingredients['Chicken breast, raw']);
assert.strictEqual(lunch.Cynthia.ingredients['Chicken breast, raw']*7+lunch.Gabriel.ingredients['Chicken breast, raw']*7,before);
app.updatePerson('partner',{weight:90});assert.ok(app.weeklyRecipeTotals(app.recipes[planned.Lunch]).totalIngredients['Chicken breast, raw']>before,'Gabriel profile changes resize the batch');
const grocery=app.groceryFor(),cart=grocery.groups.flatMap(g=>g.items);
assert.strictEqual(grocery.label,'Monday–Sunday Meal Prep · 19–25 Oct');assert.strictEqual(grocery.budget,115);
assert.ok(cart.some(x=>x.n==='Chicken breast, raw'));assert.ok(cart.some(x=>x.n==='Turkey mince, raw'));
assert.ok(cart.every(x=>/^(\d+(\.\d+)? (g|kg|mL|L)|\d+( |$))/.test(x.q)),'cart uses practical metric or whole-item units');
assert.ok(app.prepSections.find(x=>x.id==='store').steps.join(' ').includes('Thursday–Sunday'));
assert.ok(!/Tue–Thu|through Thursday|Green tea oats|Matcha Yogurt Cups|Lemongrass turkey/i.test(app.prepSections.join(' ')));
assert.ok(sw.includes("const CACHE = 'sundo-app-v46';"));assert.ok(refresh.includes('updated=mixed-menu-oct-19-25'));
console.log('Mon–Sun mixed Asian and Western plan, fourteen-portion batches, profiles, cart, prep, and PWA are in sync');
