const assert = require('assert');
const fs = require('fs');

const source = fs.readFileSync('sw.js', 'utf8');

assert.ok(
  source.includes("const CACHE = 'sundo-app-v5';"),
  'the service-worker cache must be bumped so existing Safari installs fetch the current recipe bundle',
);
assert.ok(source.includes('self.skipWaiting();'), 'the new worker should activate without waiting for the old worker to close');
assert.ok(source.includes('self.clients.claim();'), 'the new worker should control open app pages after activation');

console.log('service-worker cache refresh checks passed');
