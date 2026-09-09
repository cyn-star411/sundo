const assert = require('assert');
const fs = require('fs');
const vm = require('vm');
const source = fs.readFileSync('sundo-component.js', 'utf8');
const context = { React:{createElement:()=>({})}, DCLogic:class { setState(p){ this.state={...(this.state||{}),...p}; } }, setTimeout, clearTimeout };
vm.createContext(context);
vm.runInContext(`${source}\n;globalThis.SundoComponent=Component;`, context);
const app = new context.SundoComponent();
const week = app.buildWeek();
const expected = ['Pumpkin Protein Overnight Oats','Cottage Cheese Protein Balls','Beef Bulgogi Bibimbap','Ginger Beef, Mushroom & Spinach Rice Soup'];
expected.forEach((meal)=>{
  assert.ok(app.recipes[meal], `${meal} must be available`);
  assert.ok(fs.existsSync(app.dishSrc(meal)), `${meal} needs an existing offline image`);
  assert.ok(app.recipes[meal].portions.Cynthia && app.recipes[meal].portions.Gabriel, `${meal} needs per-person guidance`);
});
assert.ok(!week.Lunch.includes('Honey Garlic Chicken & Miso Sesame Bean Salad'), 'the old lunch must not remain scheduled');
assert.ok(!week.Dinner.includes('Ginger-Scallion Tofu & Enoki Soba'), 'the old dinner must not remain scheduled');
console.log('active inbox plan recipes, portions, and offline images check passed');
