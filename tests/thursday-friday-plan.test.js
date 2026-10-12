const assert=require('assert'),fs=require('fs'),vm=require('vm');
const source=fs.readFileSync('sundo-component.js','utf8');
const sw=fs.readFileSync('sw.js','utf8');
const context={React:{createElement:()=>({})},DCLogic:class {setState(p){this.state={...(this.state||{}),...p}}},setTimeout,clearTimeout};
vm.createContext(context);vm.runInContext(`${source}\n;globalThis.App=Component;`,context);
const app=new context.App(), week=app.buildWeek();
const planned={Breakfast:'Berry Protein Overnight Oats','Snack 1':'Yogurt & Fruit Pots',Lunch:'Lemon Chicken Rice & Bean Bowls','Snack 2':'Cocoa Peanut Protein Yogurt',Dinner:'Turkey Chilli Sweet Potatoes'};
assert.deepStrictEqual(Array.from(app.days.map(d=>d.k)),['Mon','Tue','Wed','Thu','Fri','Sat','Sun']);
assert.deepStrictEqual(Array.from(app.slots),Object.keys(planned));
for(const [slot,name] of Object.entries(planned)) {
  assert.deepStrictEqual(Array.from(week[slot]),Array(7).fill(name),`${slot} must cover the full week`);
  const recipe=app.recipes[name];
  assert.ok(recipe&&recipe.ingredients.length&&app.methodFor(recipe).length,`${name} needs a complete card`);
  assert.strictEqual(recipe.base,14,`${name} must be one 14-portion batch`);
}
assert.deepStrictEqual(Array.from(app.recipeOrder),Object.values(planned));
const cynthia=app.state.people.me,gabriel=app.state.people.partner;
assert.strictEqual(app.plannedDailyFor(cynthia).kcal,1600);assert.strictEqual(app.plannedDailyFor(cynthia).protein,120);
assert.strictEqual(app.plannedDailyFor(gabriel).kcal,2760);assert.strictEqual(app.plannedDailyFor(gabriel).protein,136);
assert.ok(app.plannedDailyFor(cynthia).kcal<app.targetsFor(cynthia).maintenance,'Cynthia plan must be in a deficit');
const lunch=app.weeklyRecipeTotals(app.recipes[planned.Lunch]);
assert.strictEqual(lunch.occurrences,7);
assert.ok(lunch.Gabriel.ingredients['Chicken breast, raw']>lunch.Cynthia.ingredients['Chicken breast, raw'],'Gabriel must receive the larger saved-profile portion');
const cart=app.groceryFor().groups.flatMap(g=>g.items), chicken=cart.find(x=>x.n==='Chicken breast, raw');
assert.strictEqual(chicken.q,Math.ceil(lunch.totalIngredients['Chicken breast, raw'])+' g','cart must use active profile-driven totals');
assert.strictEqual(app.groceryFor().label,'Monday–Sunday Meal Prep');
assert.ok(app.prepSections.find(x=>x.id==='store').steps.join(' ').includes('Thursday–Sunday'));
assert.ok(sw.includes("const CACHE = 'sundo-app-v44';"));
console.log('Monday–Sunday calorie-deficit plan, true batches, cart, and Gabriel portions are in sync');
