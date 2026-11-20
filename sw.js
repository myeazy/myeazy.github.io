const CACHE = 'eazy-v21';
const SHELL = [
  './',
  './index.html',
  './app/',
  './info/',
  './support/',
  './task/',
  './assets/styles.css',
  './assets/task.css',
  './assets/fonts.css',
  './404.html',
  './assets/app.js',
  './assets/tasks.js',
  './assets/tasks/informatika/01.js',
  './assets/tasks/informatika/02.js',
  './assets/tasks/informatika/08.js',
  './assets/tasks/informatika/13.js',
  './assets/tasks/informatika/25.js',
  './assets/tasks/matematika/01.js',
  './assets/tasks/matematika/02.js',
  './assets/tasks/matematika/04.js',
  './assets/tasks/matematika/06.js',
  './assets/tasks/matematika/10.js',
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

// Network-first с ревалидацией: не отдаём закешированные 10 минут старые версии.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== self.location.origin) return;
  e.respondWith(
    fetch(e.request, { cache: 'no-cache' }).then(resp => {
      if (resp && resp.status === 200) {
        const copy = resp.clone();
        e.waitUntil(caches.open(CACHE).then(c => c.put(e.request, copy)));
      }
      return resp;
    }).catch(() => caches.match(e.request, { ignoreSearch: true }).then(m => m || (e.request.mode === 'navigate' ? caches.match('./404.html') : undefined)))
  );
});
