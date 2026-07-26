// Offline service worker for Sundō. Bump CACHE when app files change.
// v6 clears Safari's old cached recipe bundle and refreshes open pages after activation.
const CACHE = 'sundo-app-v6';
const FONTS = Array.from({ length: 22 }, (_, i) => './fonts/f' + (i + 1) + '.woff2');
const DISHES = ['banana-smoothie','beef-bibimbap','beef-krapow','char-siu-pork','chicken-satay','edamame-sesame','eggs-apple','garlic-prawn-don','ginger-soy-salmon','hainanese-chicken','honey-garlic-salmon','katsu-curry','lemongrass-pork','mango-oats','mapo-tofu','matcha-chia','matcha-yogurt','miso-salmon','pad-thai','prawn-pad-see-ew','rice-cakes-pb','salmon-eggs','salmon-sushi-bowl','sesame-tofu-soba','teriyaki-tofu-soba','thai-basil-tofu','tofu-bibimbap','tofu-poke','tom-kha-salmon'];
const GROCERY = ['gr-carrots','gr-chicken','gr-miso','gr-rice','gr-salmon','gr-spinach','gr-spring-onions'];
const CORE = [
  './', './index.html', './app.css', './fonts.css', './manifest.webmanifest',
  ...FONTS,
  './boot-pre.js', './sundo-component.js', './boot-app.js',
  './vendor/react.js', './vendor/react-dom.js',
  './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png',
  ...DISHES.map((d) => './assets/dish-' + d + '.png'),
  ...GROCERY.map((g) => './assets/' + g + '.png'),
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)));
  self.skipWaiting();
});
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
      .then(() => self.clients.matchAll({ type: 'window' }))
      .then((clients) => Promise.all(clients.map((client) => client.navigate(client.url).catch(() => undefined))))
  );
});
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then((hit) => hit || fetch(e.request).then((res) => {
      if (res && res.status === 200 && res.type === 'basic') {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy));
      }
      return res;
    }).catch(() => caches.match('./index.html')))
  );
});
