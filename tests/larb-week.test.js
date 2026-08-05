const assert = require('assert');
const fs = require('fs');
const vm = require('vm');

const source = fs.readFileSync('sundo-component.js', 'utf8');
const swSource = fs.readFileSync('sw.js', 'utf8');
const context = {
  React: { createElement: () => ({}) },
  DCLogic: class { setState(patch) { this.state = { ...(this.state || {}), ...patch }; } },
  setTimeout,
  clearTimeout,
};
vm.createContext(context);
vm.runInContext(`${source}\n;globalThis.SundoComponent = Component;`, context);
const app = new context.SundoComponent();
const week = app.buildWeek();

assert.deepStrictEqual(Array.from(app.days.map((day) => day.k)), ['Thu', 'Fri'], 'the new fridge-clearout plan should run Thursday and Friday');
assert.deepStrictEqual(
  Array.from(week.Lunch),
  ['Chicken, Cucumber & Herb Salad', 'Egg, Spinach & Cucumber Salad'],
  'lunches should match the supplied Thursday and Friday recipes',
);
assert.deepStrictEqual(
  Array.from(week.Dinner),
  ['Chicken, Cabbage & Carrot Stir-Fry', 'Five-Spice Chicken, Cabbage & Kale Noodles'],
  'dinners should match the supplied Thursday and Friday recipes',
);

const activeMains = [
  'Chicken, Cucumber & Herb Salad',
  'Egg, Spinach & Cucumber Salad',
  'Chicken, Cabbage & Carrot Stir-Fry',
  'Five-Spice Chicken, Cabbage & Kale Noodles',
];
activeMains.forEach((recipe) => assert.ok(app.recipes[recipe], `${recipe} should be available in Sundō`));
assert.deepStrictEqual(Array.from(app.thisWeekMains()), activeMains, 'the home preview should show all four new meals');
assert.ok(activeMains.every((meal) => app.recipes[meal].fixedPlan), 'active recipes should keep their displayed ingredient totals aligned with the fixed grocery plan');
const eggRecipeTotal = app.recipes['Egg, Spinach & Cucumber Salad'].ingredients.find((item) => item.n === 'Eggs').q;
assert.strictEqual(eggRecipeTotal, 4, 'the recipe card must retain the four eggs purchased and prepped for two people');
assert.deepStrictEqual(Array.from(app.recipeOrder), activeMains, 'the recipe list should focus on the active chicken-and-eggs plan');

const stirFry = app.recipes['Chicken, Cabbage & Carrot Stir-Fry'];
assert.ok(stirFry.ingredients.some((item) => item.n === 'Chicken breast' && item.q === 320), 'the Thursday stir-fry should use chicken breast');
assert.ok(stirFry.ingredients.some((item) => item.n === 'Savoy cabbage') && stirFry.ingredients.some((item) => item.n === 'Kale'), 'the Thursday stir-fry should use cabbage and kale');
assert.ok(stirFry.method.some((step) => step.includes('browned bits')), 'the Thursday stir-fry method should scrape up the browned bits');

const noodles = app.recipes['Five-Spice Chicken, Cabbage & Kale Noodles'];
['Garlic', 'Fresh ginger', 'Chinese five spice', 'Light soy sauce', 'Honey', 'Toasted sesame seeds'].forEach((ingredient) => {
  assert.ok(noodles.ingredients.some((item) => item.n === ingredient), `the five-spice noodles should include ${ingredient}`);
});
assert.ok(noodles.ingredients.some((item) => item.n === 'Red cabbage') && noodles.ingredients.some((item) => item.n === 'Kale') && noodles.ingredients.some((item) => item.n === 'Carrots'), 'the Friday noodles should use the specified vegetables');

const chickenSalad = app.recipes['Chicken, Cucumber & Herb Salad'];
assert.ok(chickenSalad.ingredients.some((item) => item.n === 'Chicken breast') && chickenSalad.ingredients.some((item) => item.n === 'Cucumber') && chickenSalad.ingredients.some((item) => item.n === 'Fresh coriander') && chickenSalad.ingredients.some((item) => item.n === 'Parsley'), 'the Thursday lunch should include chicken, cucumber, and both herbs');
assert.ok(chickenSalad.method.some((step) => step.includes('lime')) && chickenSalad.method.some((step) => step.includes('sesame oil')), 'the Thursday lunch dressing should use lime and sesame oil');

const eggSalad = app.recipes['Egg, Spinach & Cucumber Salad'];
assert.ok(eggSalad.ingredients.some((item) => item.n === 'Eggs' && item.q === 4), 'the Friday lunch should provide two soft-boiled eggs per person');
assert.ok(eggSalad.ingredients.some((item) => item.n === 'Baby spinach') && eggSalad.ingredients.some((item) => item.n === 'Cucumber') && eggSalad.ingredients.some((item) => item.n === 'Fresh coriander'), 'the Friday lunch should use spinach, cucumber, and coriander');
assert.ok(eggSalad.method.some((step) => step.includes('four egg halves') && step.includes('two eggs per bowl')), 'the Friday lunch method should clearly allocate two eggs to each person');

const planIngredients = activeMains.flatMap((meal) => app.recipes[meal].ingredients.map((item) => item.n));
['Savoy cabbage', 'Red cabbage', 'Carrots', 'Kale', 'Baby spinach', 'Cucumber', 'Fresh coriander', 'Parsley'].forEach((vegetable) => {
  assert.ok(planIngredients.includes(vegetable), `${vegetable} should be used across the four new meals`);
});

const groceryItems = app.groceryFor().groups.flatMap((group) => group.items);
assert.ok(groceryItems.some((item) => item.n === 'Chicken breast' && item.q === '960 g'), 'the shopping list should total the three chicken meals');
assert.ok(groceryItems.some((item) => item.n === 'Eggs' && item.q === '4'), 'the shopping list should include the Friday lunch eggs');
['Cucumber', 'Fresh coriander', 'Parsley', 'Shallot', 'Garlic', 'Fresh ginger', 'Chinese five spice', 'Toasted sesame seeds', 'Noodles'].forEach((item) => {
  assert.ok(groceryItems.some((groceryItem) => groceryItem.n === item), `${item} should be included in the consolidated grocery list`);
});
assert.ok(groceryItems.some((item) => item.n === 'Carrots' && item.q === 'already have'), 'the grocery list should retain fridge vegetables as already owned');
assert.ok(groceryItems.some((item) => item.n === 'Fresh coriander' && item.q === '1 × 40 g pack'), 'the grocery list should cover the 35 g coriander required by the recipes');
assert.ok(app.recipes['Chicken & Egg Meal Prep'].ingredients.some((item) => item.n === 'Fresh coriander' && item.q === 35), 'the prep card should match the planned coriander total');
assert.ok(app.recipes['Chicken & Egg Meal Prep'].ingredients.some((item) => item.n === 'Parsley' && item.q === 20), 'the prep card should match the planned parsley total');
assert.ok(app.recipes['Chicken & Egg Meal Prep'].ingredients.some((item) => item.n === 'Garlic' && item.q === 4), 'the prep card should match the planned garlic total');
assert.ok(source.includes("totalCooked+' / '+(this.days.length*this.slots.length)+' cooked'"), 'the cooked counter should match the dynamic number of displayed meal slots');
assert.ok(source.includes("'THU–FRI · THIS PLAN'"), 'the Home header should match the active Thursday–Friday plan');
['chicken-cucumber-herb-salad', 'egg-spinach-cucumber-salad', 'chicken-cabbage-carrot-stir-fry', 'five-spice-chicken-kale-noodles'].forEach((slug) => {
  assert.ok(swSource.includes(`'${slug}'`), `${slug} should be precached for offline use`);
  assert.ok(fs.existsSync(`assets/dish-${slug}.png`), `${slug} should have a dish image`);
});
assert.ok(!groceryItems.some((item) => item.n === 'Minced beef'), 'the grocery list should no longer foreground the old beef plan');
assert.ok(source.includes("Prep:['Chicken & Egg Meal Prep']"), 'the shared prep should remain discoverable in Recipes');
assert.ok(swSource.includes("const CACHE = 'sundo-app-v8';"), 'the app should invalidate the old cached recipe bundle after this update');

console.log('chicken and eggs fridge-clearout plan checks passed');
