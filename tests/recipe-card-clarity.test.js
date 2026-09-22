const assert=require('assert'),fs=require('fs'),vm=require('vm');
const source=fs.readFileSync('sundo-component.js','utf8');
const context={React:{createElement:()=>({})},DCLogic:class {setState(p){this.state={...(this.state||{}),...p}}},setTimeout,clearTimeout};
vm.createContext(context);vm.runInContext(`${source}\n;globalThis.App=Component;`,context);
const app=new context.App();
app.state.currentRecipe='Coconut Mango Oats';
assert.deepStrictEqual(Array.from(app.methodFor()),[
  'This Wednesday–Friday batch makes six coconut-mango overnight-oat jars.',
  'Stir oats, chia and coconut milk together, then refrigerate overnight.',
  'Layer with Greek yogurt and diced mango; add toasted coconut just before breakfast.'
]);
assert.ok(!source.includes("'Prep: '+this.prepNoteFor(ing)"),'recipe cards must not add separate prep instructions');
assert.ok(source.includes('return this.coreMethodFor(recipe);'),'recipe cards must show recipe methods directly');
console.log('Recipe cards use direct, self-contained source methods without prep detours');
