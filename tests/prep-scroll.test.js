const assert = require('assert');
const fs = require('fs');

const source = fs.readFileSync('sundo-component.js', 'utf8');
const prepStart = source.indexOf('  renderPrep() {');
const prepEnd = source.indexOf('  prepCard(sec,si) {', prepStart);
const prepSource = source.slice(prepStart, prepEnd);
const recipeStart = source.indexOf('  renderRecipe(swipe) {');
const recipeEnd = source.indexOf('\n  // ============ SUNDAY PREP', recipeStart);
const recipeSource = source.slice(recipeStart, recipeEnd);

assert.ok(prepSource.includes("height:'100%',minHeight:0,display:'flex',flexDirection:'column'"), 'Prep screen must be allowed to shrink within the fixed phone frame so its content can scroll');
assert.ok(prepSource.includes("flex:1,minHeight:0,overflowY:'auto'"), 'Prep-card area must have a constrained scroll region rather than clipping expanded text');
assert.ok(prepSource.includes("WebkitOverflowScrolling:'touch'"), 'Prep-card area must support touch scrolling on iPhone');
assert.ok(prepSource.includes("overscrollBehavior:'contain'"), 'Prep-card scrolling must stay inside the app frame');

assert.ok(recipeSource.includes("flex:1,minHeight:0,overflow:'hidden',position:'relative'"), 'Recipe swipe body must be allowed to shrink inside the fixed phone frame');
assert.ok(recipeSource.includes("onScroll:onRecipeScroll,style:{width:'50%',minHeight:0,overflowY:'auto',WebkitOverflowScrolling:'touch',overscrollBehavior:'contain',paddingBottom:'calc(56px + env(safe-area-inset-bottom, 0px))'"), 'Ingredient and method pages must have their own touch-scroll region and enough bottom clearance for the swipe dots');
assert.ok(recipeSource.includes("onScroll:onRecipeScroll,style:{flex:1,minHeight:0,overflowY:'auto',WebkitOverflowScrolling:'touch',overscrollBehavior:'contain',paddingBottom:'calc(32px + env(safe-area-inset-bottom, 0px))'"), 'Segmented recipe panels must remain touch-scrollable to their final row');
assert.ok(recipeSource.includes("flex:1,minHeight:0,display:'flex',flexDirection:'column'"), 'Recipe sheet must be shrinkable so its scrollable body is not clipped');
assert.ok(recipeSource.includes("'Back to plan'"), 'Recipe detail must retain an accessible back control');
assert.ok(recipeSource.includes("width:170,height:170"), 'Recipe detail must preserve the preferred full visual recipe header before scrolling');
assert.ok(recipeSource.includes('const onRecipeScroll = (ev) =>'), 'Recipe details must respond to content scrolling');
assert.ok(recipeSource.includes('ev.currentTarget.scrollTop > 12'), 'Recipe headers must collapse shortly after the user starts scrolling');
assert.ok(recipeSource.includes("maxHeight:st.recipeHeaderCollapsed?0:360"), 'The full visual recipe header must fully collapse while recipe content is being read');
assert.ok(source.includes('recipeHeaderCollapsed:false'), 'A newly opened recipe must start with its header visible');
assert.ok(source.includes('currentRecipe:key, recipeGlow:true, recipeHeaderCollapsed:false'), 'Opening another recipe must restore its header before any scrolling');

console.log('prep screen scroll containment checks passed');
