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
const scheduled = app.slots.flatMap((slot) => week[slot]);

assert.deepStrictEqual(Array.from(app.days.map((day) => day.k)), ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], 'the active plan should cover Monday through Friday');
assert.deepStrictEqual(Array.from(app.slots), ['Breakfast', 'Snack', 'Lunch', 'Dinner'], 'all four daily slots should remain active');
app.slots.forEach((slot) => assert.strictEqual(week[slot].length, 5, `${slot} needs one meal per weekday`));
assert.strictEqual(scheduled.length, 20, 'the plan should contain 20 meal slots');

assert.deepStrictEqual(Array.from(week.Breakfast), ['Berry Protein Overnight Oats', 'Egg & Bean Breakfast Wraps', 'Berry Protein Overnight Oats', 'Egg & Bean Breakfast Wraps', 'Berry Protein Overnight Oats']);
assert.deepStrictEqual(Array.from(week.Snack), ['Apple & Yogurt', 'Crunchy Veg & Hummus', 'Cottage Cheese Berry Cup', 'Banana Protein Yogurt', 'Apple, Yogurt & Nuts']);
assert.deepStrictEqual(Array.from(week.Lunch), ['Lemon Parsley Chicken Lentil Rice Bowls', 'Lemon Parsley Chicken Lentil Rice Bowls', 'Lemon Parsley Chicken Lentil Rice Bowls', 'Turkey Bean Vegetable Pasta', 'Turkey Bean Vegetable Pasta']);
assert.deepStrictEqual(Array.from(week.Dinner), ['Crispy Tofu Red Cabbage Noodle Bowls', 'Chicken Chickpea Potato Traybake', 'Red Lentil Spinach Curry', 'Turkey Chilli Loaded Potatoes', 'Chicken Fajita Rice Bowls']);
assert.ok(!scheduled.includes('Miso Salmon Bowl') && !scheduled.includes('Matcha Chia Pudding'), 'no stale salmon or two-day-clearout meals should remain in the current plan');

scheduled.forEach((meal) => {
  assert.ok(app.recipes[meal], `${meal} must have a live recipe card`);
  assert.strictEqual(app.resolveRecipe(meal), meal, `${meal} must not resolve to a stale fallback recipe`);
  assert.ok(app.recipes[meal].ingredients.length > 0 && app.recipes[meal].method.length > 0, `${meal} needs ingredients and method`);
});
assert.deepStrictEqual(Array.from(app.thisWeekMains()), Array.from(week.Lunch.concat(week.Dinner)), 'Home and See all should use the active main-meal order');
assert.ok(app.recipeOrder.every((meal) => scheduled.includes(meal)), 'Recipes screen should not foreground stale-week meals');

assert.deepStrictEqual(JSON.parse(JSON.stringify(app.state.people.me)), { name: 'Cynthia', heightLabel: '163 cm', weight: 60, age: 30, workouts: 3, activity: 'desk job + 2–3 training sessions', goal: 'fat loss + muscle gain', sex: 'female', color: '#CB9C8B' });
assert.deepStrictEqual(JSON.parse(JSON.stringify(app.state.people.partner)), { name: 'Gabriel', heightLabel: '180 cm', weight: 85, age: 30, workouts: 3, activity: 'mostly seated + some walking + 2–3 training sessions', goal: 'lean muscle gain + cardio support', sex: 'male', color: '#8FB3C8' });
assert.deepStrictEqual(JSON.parse(JSON.stringify(app.targetsFor(app.state.people.me))), { kcal: 1650, protein: 120, fiber: 30 });
assert.deepStrictEqual(JSON.parse(JSON.stringify(app.targetsFor(app.state.people.partner))), { kcal: 2750, protein: 153, fiber: 38 });

const groceries = app.groceryFor().groups.flatMap((group) => group.items);
['Firm tofu', 'Red cabbage', 'Spring onions', 'Parsley', 'Cucumber', 'Coriander'].forEach((item) => {
  assert.ok(groceries.some((grocery) => grocery.n === item && grocery.q === 'already have'), `${item} should use the supplied leftovers`);
});
assert.ok(groceries.some((item) => item.n === 'Chicken thighs or breast' && item.q === '2.6 kg'), 'the cart should cover the chicken meals');
assert.ok(groceries.some((item) => item.n === 'Turkey mince' && item.q === '1.5 kg'), 'the cart should cover turkey meals');
assert.ok(groceries.some((item) => item.n === 'Greek yogurt' && item.q === '2 kg'), 'the cart should cover breakfast and snack yogurt');
assert.ok(groceries.some((item) => item.n === 'Red lentils' && item.q === '500 g'), 'the cart should cover the high-fibre curry');

const tofu = app.recipes['Crispy Tofu Red Cabbage Noodle Bowls'];
assert.ok(tofu.ingredients.some((item) => item.n === 'Firm tofu' && item.q === 400), 'the tofu dinner should use all supplied tofu');
assert.ok(tofu.ingredients.some((item) => item.n === 'Red cabbage') && tofu.ingredients.some((item) => item.n === 'Spring onions') && tofu.ingredients.some((item) => item.n === 'Coriander'), 'the tofu dinner should use supplied vegetables and herbs');
assert.ok(tofu.portions && tofu.portions.Cynthia && tofu.portions.Gabriel, 'meal cards should retain Cynthia and Gabriel portion guidance');
assert.ok(tofu.portions.Gabriel.kcal > tofu.portions.Cynthia.kcal, 'Gabriel serving should be larger than Cynthia serving');
assert.ok(app.recipes['Lemon Parsley Chicken Lentil Rice Bowls'].portions.Gabriel.protein >= app.recipes['Lemon Parsley Chicken Lentil Rice Bowls'].portions.Cynthia.protein, 'lunch portions should scale for Gabriel');

const chickenPrep = app.prepSections.find((section) => section.id === 'mains');
assert.ok(chickenPrep, 'Prep must include the shared chicken batch-cook section');
const prepText = chickenPrep.steps.join(' ');
['2.6 kg', '1.2 kg', '600 g', '800 g', '75°C', 'Thursday', 'Friday'].forEach((detail) => {
  assert.ok(prepText.includes(detail), `chicken prep must state ${detail}`);
});
assert.ok(prepText.includes('freeze') && prepText.includes('refrigerator'), 'chicken prep must give explicit fridge and freezer storage guidance');
['Lemon Parsley Chicken Lentil Rice Bowls', 'Chicken Chickpea Potato Traybake', 'Chicken Fajita Rice Bowls'].forEach((meal) => {
  assert.ok(app.recipes[meal].method.some((step) => step.toLowerCase().includes('prepped chicken')), `${meal} must explain how to use the shared batch-cooked chicken`);
});

assert.ok(source.includes("'MON–FRI · THIS PLAN'"), 'Home header should name the five-day plan');
assert.ok(swSource.includes("const CACHE = 'sundo-app-v10';"), 'service-worker cache must refresh for the batch-chicken prep update');
console.log('five-day Cynthia and Gabriel plan checks passed');
