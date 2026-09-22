const assert = require('assert');
const fs = require('fs');

const sw = fs.readFileSync('sw.js', 'utf8');
const recovery = fs.readFileSync('refresh.html', 'utf8');

assert.ok(sw.includes("const CACHE = 'sundo-app-v36';"), 'the active plan must invalidate the old cache');
assert.ok(recovery.includes('navigator.serviceWorker.getRegistrations()'), 'recovery page must enumerate active service workers');
assert.ok(recovery.includes('registration.unregister()'), 'recovery page must unregister stale workers');
assert.ok(recovery.includes('caches.keys()'), 'recovery page must enumerate Cache Storage');
assert.ok(recovery.includes('caches.delete(key)'), 'recovery page must delete stale caches');
assert.ok(recovery.includes("location.replace('./?updated=wed-fri-1dc745b')"), 'recovery page must return to the current app release after clearing offline state');
console.log('service-worker cache recovery is available');
