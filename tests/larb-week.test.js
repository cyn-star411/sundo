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

assert.deepStrictEqual(Array.from(app.days.map((day) => day.k)), ['Wed', 'Thu', 'Fri'], 'the active plan should cover the remaining Wednesday through Friday window');
assert.deepStrictEqual(Array.from(app.slots), ['Breakfast', 'Snack', 'Lunch', 'Dinner'], 'all four daily slots should remain active');
app.slots.forEach((slot) => assert.strictEqual(week[slot].length, 3, `${slot} needs one meal per remaining weekday`));
assert.strictEqual(scheduled.length, 12, 'the plan should contain 12 rest-of-week meal slots');

assert.deepStrictEqual(Array.from(week.Breakfast), ['Pumpkin Chia Seed Pudding', 'Pumpkin Chia Seed Pudding', 'Pumpkin Chia Seed Pudding']);
assert.deepStrictEqual(Array.from(week.Snack), ['Apple & Yogurt', 'Apple & Yogurt', 'Apple & Yogurt']);
assert.deepStrictEqual(Array.from(week.Lunch), ['Honey Garlic Chicken & Miso Sesame Bean Salad', 'Honey Garlic Chicken & Miso Sesame Bean Salad', 'Honey Garlic Chicken & Miso Sesame Bean Salad']);
assert.deepStrictEqual(Array.from(week.Dinner), ['Ginger-Scallion Tofu & Enoki Soba', 'Ginger-Scallion Tofu & Enoki Soba', 'Ginger-Scallion Tofu & Enoki Soba']);

scheduled.forEach((meal) => {
  assert.ok(app.recipes[meal], `${meal} must have a live recipe card`);
  assert.strictEqual(app.resolveRecipe(meal), meal, `${meal} must not resolve to a stale fallback recipe`);
  assert.ok(app.recipes[meal].ingredients.length > 0 && app.recipes[meal].method.length > 0, `${meal} needs ingredients and method`);
});
assert.deepStrictEqual(Array.from(app.thisWeekMains()), Array.from(week.Lunch.concat(week.Dinner)), 'Home and See all should use the active main-meal order');
assert.ok(app.recipeOrder.every((meal) => scheduled.includes(meal)), 'Recipes screen should not foreground stale-plan meals');

assert.deepStrictEqual(JSON.parse(JSON.stringify(app.state.people.me)), { name: 'Cynthia', heightLabel: '163 cm', weight: 60, age: 30, workouts: 3, activity: 'desk job + 2–3 training sessions', goal: 'fat loss + muscle gain', sex: 'female', color: '#CB9C8B' });
assert.deepStrictEqual(JSON.parse(JSON.stringify(app.state.people.partner)), { name: 'Gabriel', heightLabel: '180 cm', weight: 85, age: 30, workouts: 3, activity: 'mostly seated + some walking + 2–3 training sessions', goal: 'lean muscle gain + cardio support', sex: 'male', color: '#8FB3C8' });
assert.deepStrictEqual(JSON.parse(JSON.stringify(app.targetsFor(app.state.people.me))), { kcal: 1650, protein: 120, fiber: 30 });
assert.deepStrictEqual(JSON.parse(JSON.stringify(app.targetsFor(app.state.people.partner))), { kcal: 2750, protein: 136, fiber: 38 });

const groceries = app.groceryFor().groups.flatMap((group) => group.items);
assert.ok(groceries.some((item) => item.n === 'Chicken thighs' && item.q === '960 g'), 'the cart should cover the calculated chicken lunch portions');
assert.ok(groceries.some((item) => item.n === 'Firm tofu' && item.q === '1200 g'), 'the cart should cover the three tofu-and-enoki dinner pairs');
assert.ok(groceries.some((item) => item.n === 'Pumpkin purée' && item.q === '1 × 425 g tin'), 'the cart should cover the breakfast chia jars');
assert.ok(groceries.some((item) => item.n === 'Soba noodles' && item.q === '600 g'), 'the cart should cover the tofu-and-enoki dinners');

const lunch = app.recipes['Honey Garlic Chicken & Miso Sesame Bean Salad'];
assert.ok(lunch.portions && lunch.portions.Cynthia && lunch.portions.Gabriel, 'meal cards should retain Cynthia and Gabriel portion guidance');
assert.ok(lunch.weeklyReference && app.weeklyRecipeTotals(lunch).Gabriel.ingredients['Chicken thighs, raw'] > app.weeklyRecipeTotals(lunch).Cynthia.ingredients['Chicken thighs, raw'], 'Cynthia and Gabriel should receive calculated unequal lunch portions');

const mainPrep = app.prepSections.find((section) => section.id === 'mains');
assert.ok(mainPrep, 'Prep must include the shared chicken batch-cook section');
const prepText = mainPrep.steps.join(' ');
['6 lunch portions', '75°C', 'Wednesday', 'Friday'].forEach((detail) => {
  assert.ok(prepText.includes(detail), `chicken prep must state ${detail}`);
});
assert.ok(prepText.includes('bean salad') && prepText.includes('tofu'), 'chicken prep must explain both daily meal formats');

assert.ok(source.includes("'WED–FRI · REST OF WEEK'"), 'Home header should name the three-day plan');
assert.ok(swSource.includes("const CACHE = 'sundo-app-v18';"), 'service-worker cache must refresh for profile-driven portions and shopping totals');
console.log('rest-of-week Cynthia and Gabriel plan checks passed');
