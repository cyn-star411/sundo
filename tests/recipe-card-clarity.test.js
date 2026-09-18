const assert=require('assert'),fs=require('fs'),vm=require('vm');
const source=fs.readFileSync('sundo-component.js','utf8');
const context={React:{createElement:()=>({})},DCLogic:class {setState(p){this.state={...(this.state||{}),...p}}},setTimeout,clearTimeout};
vm.createContext(context);vm.runInContext(`${source}\n;globalThis.App=Component;`,context);
const app=new context.App();
app.state.currentRecipe='High-Protein Carrot Cake Squares';
assert.deepStrictEqual(Array.from(app.methodFor()),[
  'Combine the cake ingredients. Bake at 350°F / 175°C for 28–30 minutes, then cool.',
  'Mix the icing ingredients and spread over the cooled cake.'
]);
assert.ok(!source.includes("'Prep: '+this.prepNoteFor(ing)"),'recipe cards must not add separate prep instructions');
assert.ok(source.includes('return this.coreMethodFor(recipe);'),'recipe cards must show recipe methods directly');
console.log('Recipe cards use direct, self-contained source methods without prep detours');
