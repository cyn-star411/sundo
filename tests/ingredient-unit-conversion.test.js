const assert=require('assert'),fs=require('fs'),vm=require('vm');
const source=fs.readFileSync('sundo-component.js','utf8');const c={React:{createElement:()=>({})},DCLogic:class{setState(p){this.state={...(this.state||{}),...p}}},setTimeout,clearTimeout};vm.createContext(c);vm.runInContext(source+';globalThis.App=Component;',c);
const app=new c.App(), r=app.recipes['Korean Gochujang Chicken Rice Bowls'];
const guide=app.methodIngredientsFor(r);assert.ok(/\d+ g Chicken breast, raw/.test(guide));assert.ok(/\d+ ml Soy sauce/.test(guide));
assert.strictEqual(app.displayIngredientQuantity({n:'Milk',u:'cup'},4,'ml'),'960 ml');assert.strictEqual(app.displayIngredientQuantity({n:'Milk',u:'cup'},5,'L'),'2 L');
console.log('active-plan ingredients use practical metric units');
