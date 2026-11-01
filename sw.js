// Service worker: permite abrir la app sin conexión.
var V = 'presupuesto-web-v1';
var SHELL = ['./', 'index.html', 'manifest.webmanifest', 'icon-180.png', 'icon-192.png', 'icon-512.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(V).then(function (c) { return c.addAll(SHELL); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (ks) { return Promise.all(ks.filter(function (k) { return k !== V; }).map(function (k) { return caches.delete(k); })); })
      .then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var r = e.request;
  if (r.method !== 'GET') return;
  var u = new URL(r.url);
  if (u.origin === location.origin) {
    // Archivos propios: primero la red (para recibir actualizaciones), si no hay conexión, la copia guardada.
    e.respondWith(
      fetch(r).then(function (res) {
        var copy = res.clone();
        caches.open(V).then(function (c) { c.put(r, copy); });
        return res;
      }).catch(function () {
        return caches.match(r).then(function (m) { return m || caches.match('index.html'); });
      })
    );
  } else if (u.hostname === 'cdnjs.cloudflare.com') {
    // Librerías de PDF y Excel: se guardan la primera vez para usarlas sin conexión.
    e.respondWith(
      caches.match(r).then(function (m) {
        return m || fetch(r).then(function (res) {
          var copy = res.clone();
          caches.open(V).then(function (c) { c.put(r, copy); });
          return res;
        });
      })
    );
  }
});
