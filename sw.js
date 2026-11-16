const CACHE = 'eazy-v12';
const SHELL = [
  './',
  './index.html',
  './app/',
  './info/',
  './support/',
  './ege/informatika/8/',
  './ege/informatika/13/',
  './ege/informatika/25/',
  './assets/styles.css',
  './assets/task.css',
  './assets/fonts.css',
  './404.html'',
  './assets/app.js',
  './assets/tasks.js',
  './assets/task.js',
  './assets/selects.js',
  './assets/logo.svg',
  './manifest.webmanifest'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

// Network-first: свежие файлы при онлайне, кэш — офлайн-запас
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || !e.request.url.startsWith(self.location.origin)) return;
  e.respondWith(
    fetch(e.request).then(resp => {
      if (resp && resp.status === 200) {
        const copy = resp.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
      }
      return resp;
    }).catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});
