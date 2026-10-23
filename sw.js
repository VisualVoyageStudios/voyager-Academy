const CACHE_NAME = "va-academy-v11";

// Core files that make lessons and quizzes work offline. Anything else is cached
// the first time it's visited (see the fetch handler below).
const APP_SHELL = [
  "index.html", "courses.html", "lesson.html", "quiz.html", "dashboard.html", "auth.html", "offline.html",
  "css/variable.css", "css/main.css", "css/theme.css", "css/loader.css",
  "js/main.js", "js/shell.js", "js/ux.js", "js/delight.js", "js/toast.js", "js/auth.js", "js/badges.js",
  "js/lesson-ux.js", "js/courses-data.js", "js/diagrams.js", "js/diagrams-2.js",
  "js/lessons-content.js", "js/lessons-2.js", "js/lesson-extras.js", "js/lesson-figures.js", "js/lesson-charts.js",
  "js/quizzes.js", "js/quizzes-2.js", "js/quiz-why.js", "js/video-content.js",
  "manifest.json",
];

// These pages render from cached scripts, so any ?slug= / ?track= can use the cached shell offline.
const SEARCH_AGNOSTIC = /\/(lesson|quiz|courses)\.html$/;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      // Add each file separately so one missing file can't break the whole install.
      // cache: "reload" skips the browser's HTTP cache so we never precache a stale copy.
      Promise.allSettled(APP_SHELL.map((url) => cache.add(new Request(url, { cache: "reload" }))))
    )
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

// Network-first: always the freshest files when online, cached copy when offline.
self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== self.location.origin) return;
  if (url.searchParams.has("token")) return;

  event.respondWith(
    fetch(req, { cache: "no-cache" })
      .then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(req, copy));
        }
        return res;
      })
      .catch(() =>
        caches.match(req).then((cached) => {
          if (cached) return cached;
          if (req.mode !== "navigate") return Response.error();
          const shell = SEARCH_AGNOSTIC.test(url.pathname)
            ? caches.match(req, { ignoreSearch: true })
            : Promise.resolve(null);
          return shell.then((page) => page || caches.match("offline.html"));
        })
      )
  );
});