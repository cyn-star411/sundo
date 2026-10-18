const assert=require('assert'),fs=require('fs'),vm=require('vm');
const source=fs.readFileSync('sundo-component.js','utf8');const c={React:{createElement:()=>({})},DCLogic:class{setState(p){this.state={...(this.state||{}),...p}}},setTimeout,clearTimeout};vm.createContext(c);vm.runInContext(source+';globalThis.App=Component;',c);
const app=new c.App();app.state.currentRecipe='Apple-Cinnamon Protein Overnight Oats';const method=Array.from(app.methodFor());
assert.ok(method[0].includes('14'));assert.ok(method[0].includes('Cynthia'));assert.ok(method[0].includes('Gabriel'));assert.ok(method.at(-1).includes('Friday–Sunday'));
assert.ok(!source.includes("'Prep: '+this.prepNoteFor(ing)"));
console.log('recipe cards use direct, self-contained batch methods');
