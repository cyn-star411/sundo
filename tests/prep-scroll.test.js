const assert = require('assert');
const fs = require('fs');

const source = fs.readFileSync('sundo-component.js', 'utf8');
const prepStart = source.indexOf('  renderPrep() {');
const prepEnd = source.indexOf('  prepCard(sec,si) {', prepStart);
const prepSource = source.slice(prepStart, prepEnd);

assert.ok(prepSource.includes("height:'100%',minHeight:0,display:'flex',flexDirection:'column'"), 'Prep screen must be allowed to shrink within the fixed phone frame so its content can scroll');
assert.ok(prepSource.includes("flex:1,minHeight:0,overflowY:'auto'"), 'Prep-card area must have a constrained scroll region rather than clipping expanded text');
assert.ok(prepSource.includes("WebkitOverflowScrolling:'touch'"), 'Prep-card area must support touch scrolling on iPhone');
assert.ok(prepSource.includes("overscrollBehavior:'contain'"), 'Prep-card scrolling must stay inside the app frame');

console.log('prep screen scroll containment checks passed');
