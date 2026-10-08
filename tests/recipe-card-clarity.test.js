const assert=require('assert'),fs=require('fs'),vm=require('vm');
const source=fs.readFileSync('sundo-component.js','utf8');
const context={React:{createElement:()=>({})},DCLogic:class {setState(p){this.state={...(this.state||{}),...p}}},setTimeout,clearTimeout};
vm.createContext(context);vm.runInContext(`${source}\n;globalThis.App=Component;`,context);
const app=new context.App();
app.state.currentRecipe='Egg & Bean Breakfast Wraps';
assert.deepStrictEqual(Array.from(app.methodFor()),[
  'This Wednesday–Sunday batch makes ten egg-and-bean breakfast wraps: five for Cynthia and five for Gabriel.',
  'Warm the beans with salsa until thick. Scramble the eggs, wilt in the spinach, then fold through the beans and cheddar.',
  'Fill and roll ten wraps. Cool quickly; refrigerate Wednesday–Thursday wraps and freeze Friday–Sunday wraps. Thaw overnight and reheat until steaming.'
]);
assert.ok(!source.includes("'Prep: '+this.prepNoteFor(ing)"),'recipe cards must not add separate prep instructions');
assert.ok(source.includes('return this.coreMethodFor(recipe);'),'recipe cards must show recipe methods directly');
console.log('Recipe cards use direct, self-contained source methods without prep detours');
