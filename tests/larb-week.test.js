const assert = require('assert');
const fs = require('fs');
const vm = require('vm');
const source = fs.readFileSync('sundo-component.js', 'utf8');
const context = { React:{createElement:()=>({})}, DCLogic:class { setState(p){ this.state={...(this.state||{}),...p}; } }, setTimeout, clearTimeout };
vm.createContext(context);
vm.runInContext(`${source}\n;globalThis.SundoComponent=Component;`, context);
const app = new context.SundoComponent();
const week = app.buildWeek();
const expected = ['Berry Protein Overnight Oats','Banana Protein Yogurt','Turkey Bean Vegetable Pasta','Turkey Chilli Loaded Potatoes','Cottage Cheese Berry Cup'];
expected.forEach((meal)=>{
  assert.ok(app.recipes[meal], `${meal} must be available`);
  assert.ok(fs.existsSync(app.dishSrc(meal)), `${meal} needs an existing offline image`);
  assert.ok(app.recipes[meal].weeklyReference && app.weeklyRecipeTotals(app.recipes[meal]).occurrences === 5, `${meal} must scale through the five-day active window`);
});
['Pumpkin Protein Overnight Oats','Cottage Cheese Protein Balls','Beef Bulgogi Bibimbap','Ginger Beef, Mushroom & Spinach Rice Soup','Matcha Yogurt Cup'].forEach((meal) => assert.ok(!week.Breakfast.concat(week.Snack, week.Lunch, week.Dinner, week.Dessert).includes(meal), `${meal} from last week must not remain scheduled`));
console.log('fresh active-plan recipes, portions, and offline images check passed');
