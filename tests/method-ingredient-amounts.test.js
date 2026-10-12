const assert=require('assert'),fs=require('fs'),vm=require('vm');
const source=fs.readFileSync('sundo-component.js','utf8');const c={React:{createElement:(type,props,...children)=>({type,props,children})},DCLogic:class{setState(p){this.state={...(this.state||{}),...p}}},setTimeout,clearTimeout};vm.createContext(c);vm.runInContext(source+';globalThis.App=Component;',c);
const app=new c.App(), recipe=app.recipes['Lemon Chicken Rice & Bean Bowls'];
const guide=app.methodIngredientsFor(recipe); assert.ok(guide.includes('Chicken breast, raw'));assert.ok(/\d+ g Chicken breast, raw/.test(guide));
assert.strictEqual(app.methodIngredientAmount({n:'Test sauce',q:1.6,u:'tsp'},1.6),'8 ml');
app.setState({currentRecipe:'Lemon Chicken Rice & Bean Bowls'});assert.ok(JSON.stringify(app.methodPanel()).includes('INGREDIENT AMOUNTS FOR THIS BATCH'));
console.log('method ingredient amounts stay profile-driven and metric');
