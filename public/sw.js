// CaiberOne service worker: caches hashed build assets + fonts; HTML is network-first with offline fallback.
const V = "cb-v1", STATIC = `${V}-static`, PAGES = `${V}-pages`;
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil((async () => {
  for (const k of await caches.keys()) if (!k.startsWith(V)) await caches.delete(k);
  await self.clients.claim();
})()));
const cacheFirst = async (r, name) => { const c = await caches.open(name); const hit = await c.match(r); if (hit) return hit; const res = await fetch(r); if (res.ok) c.put(r, res.clone()); return res; };
const swr = async (r, name) => { const c = await caches.open(name); const hit = await c.match(r); const net = fetch(r).then((res) => { if (res.ok) c.put(r, res.clone()); return res; }).catch(() => hit); return hit || net; };
const networkFirst = async (r) => { const c = await caches.open(PAGES); try { const res = await fetch(r); if (res.ok) c.put("/", res.clone()); return res; } catch { return (await c.match("/")) || Response.error(); } };
self.addEventListener("fetch", (e) => {
  const r = e.request; if (r.method !== "GET") return;
  const u = new URL(r.url);
  if (r.headers.has("range") || /\.(mp4|webm)$/i.test(u.pathname)) return; // media: browser HTTP cache (range requests)
  if (u.origin === location.origin && u.pathname.startsWith("/assets/")) return e.respondWith(cacheFirst(r, STATIC)); // hashed → immutable
  if (u.hostname === "fonts.googleapis.com" || u.hostname === "fonts.gstatic.com") return e.respondWith(swr(r, STATIC));
  if (r.mode === "navigate") return e.respondWith(networkFirst(r));
});
