const assert=require('assert'),fs=require('fs'),vm=require('vm');
const source=fs.readFileSync('sundo-component.js','utf8');
const context={React:{createElement:()=>({})},DCLogic:class {setState(p){this.state={...(this.state||{}),...p}}},setTimeout,clearTimeout};
vm.createContext(context);vm.runInContext(`${source}\n;globalThis.App=Component;`,context);
const app=new context.App();
app.state.currentRecipe='Pumpkin Protein Overnight Oats';
assert.deepStrictEqual(Array.from(app.methodFor()),[
  'This Wednesday–Friday Sundō batch makes six pumpkin overnight-oat jars.',
  'Whisk milk, pumpkin purée, maple syrup, pumpkin pie spice and vanilla. Fold in Greek yogurt and oats until smooth.',
  'Divide between six labelled jars, refrigerate overnight, and add diced apple only when serving.'
]);
assert.ok(!source.includes("'Prep: '+this.prepNoteFor(ing)"),'recipe cards must not add separate prep instructions');
assert.ok(source.includes('return this.coreMethodFor(recipe);'),'recipe cards must show recipe methods directly');
console.log('Recipe cards use direct, self-contained source methods without prep detours');
