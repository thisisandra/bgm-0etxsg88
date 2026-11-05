// Offline support: saves every page and photo on the phone the first time the app opens.
// When you change the app, raise the version number so phones pick up the new files.
var VERSION = "bergamo-v2";
var FILES = [
  "./",
  "index.html", "style.css", "app.js", "data.js", "credits.js", "manifest.webmanifest",
  "icon-192.png", "icon-512.png", "apple-touch-icon.png", "fonts/pjs-latin.woff2", "fonts/pjs-latin-ext.woff2",
  "img/battistero.jpg",
  "img/campanone.jpg",
  "img/casa_donizetti.jpg",
  "img/citta_bassa.jpg",
  "img/colleoni.jpg",
  "img/dante.jpg",
  "img/duomo.jpg",
  "img/fiera.jpg",
  "img/funicolare.jpg",
  "img/gamec.jpg",
  "img/gombito.jpg",
  "img/matteotti.jpg",
  "img/moroni.jpg",
  "img/mura.jpg",
  "img/piazza_vecchia.jpg",
  "img/pontida.jpg",
  "img/porta_nuova.jpg",
  "img/porta_sagostino.jpg",
  "img/santa_croce.jpg",
  "img/santalessandro.jpg",
  "img/sentierone.jpg",
  "img/smm.jpg",
  "img/teatro.jpg",
  "img/torre.jpg",
  "img/vveneto.jpg",
  "img/xxsettembre.jpg"
];
self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
// Show the saved copy at once (fast, works offline), then quietly fetch a fresh copy for next time.
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(caches.open(VERSION).then(function (cache) {
    return cache.match(e.request, { ignoreSearch: true }).then(function (hit) {
      var fresh = fetch(e.request).then(function (res) {
        if (res && res.ok) cache.put(e.request.url.split("?")[0].split("#")[0], res.clone());
        return res;
      }).catch(function () {
        return hit || (e.request.mode === "navigate" ? cache.match("index.html") : undefined);
      });
      if (hit) { e.waitUntil(fresh.catch(function () {})); return hit; }
      return fresh;
    });
  }));
});
