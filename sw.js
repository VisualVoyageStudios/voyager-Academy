const CACHE_NAME = "va-academy-v1";

// Static app-shell files only. Never cache API_BASE calls (auth/progress) —
// those must always hit the network.
const APP_SHELL = [
  "index.html",
  "courses.html",
  "lesson.html",
  "auth.html",
  "css/variables.css",
  "css/main.css",
  "js/main.js",
  "js/auth.js",
  "js/courses-data.js",
  "js/lessons-content.js",
  "js/diagrams.js",
  "js/video-content.js",
  "manifest.json",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Only handle same-origin GET requests for the app shell.
  // Backend API calls (different origin) pass straight through, untouched.
  if (event.request.method !== "GET" || url.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const network = fetch(event.request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});