const assert = require('assert');
const fs = require('fs');

const source = fs.readFileSync('sw.js', 'utf8');

assert.ok(
  source.includes("const CACHE = 'sundo-app-v10';"),
  'the service-worker cache must refresh so existing installs fetch the batch-chicken prep update',
);
assert.ok(source.includes('self.skipWaiting();'), 'the new worker should activate without waiting for the old worker to close');
assert.ok(source.includes('self.clients.claim()'), 'the new worker should control open app pages after activation');
assert.ok(source.includes('client.navigate(client.url)'), 'the activated worker should reload open pages into the fresh recipe bundle');

console.log('service-worker cache refresh checks passed');
