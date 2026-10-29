/*
 * Vexunori service worker — offline app shell only.
 *
 * - Navigations inside /app/: network first (5 s limit once a copy is cached), falling back to the
 *   cached /app/index.html, so a reload while offline still opens the app (your data lives in this browser's IndexedDB).
 * - Same-origin build assets (/assets/*, hashed file names) and icons: cache first.
 * - Everything else is left alone: cross-origin requests, non-GET requests, Range requests and
 *   WebSockets (relay connections never pass through a service worker) are never cached.
 * - Nothing here handles push: Vexunori uses no push service. The worker only routes clicks on
 *   notifications the open app itself created.
 *
 * Bump VERSION when this file's caching logic changes; old caches are deleted on activate.
 */
const VERSION = 'v2'
const SHELL_CACHE = `vx-shell-${VERSION}`
const ASSET_CACHE = `vx-assets-${VERSION}`
const KEEP = [SHELL_CACHE, ASSET_CACHE]
const MAX_ASSETS = 300
const NAV_TIMEOUT_MS = 5000

const SCOPE = new URL(self.registration.scope)
const SHELL_URL = new URL('index.html', SCOPE).href
// The site may live under a sub-path (e.g. GitHub Pages /vexunori/); the app is at <root>app/.
const SITE_ROOT = new URL('../', SCOPE).pathname

function isAssetPath(pathname) {
  return pathname.startsWith(SITE_ROOT + 'assets/') || pathname.startsWith(SITE_ROOT + 'icons/')
}

/*
 * Hosts with "pretty URLs" redirect /app/index.html to /app/. Browsers refuse to use a redirected
 * response for a navigation, so the stored copy is rebuilt as a plain (non-redirected) response.
 */
async function storable(res) {
  if (!res.redirected) return res
  return new Response(await res.blob(), { status: res.status, statusText: res.statusText, headers: res.headers })
}

async function precache() {
  const shell = await caches.open(SHELL_CACHE)
  const res = await fetch(SHELL_URL, { cache: 'no-cache' })
  if (!res.ok) throw new Error('shell fetch failed')
  const html = await res.clone().text()
  await shell.put(SHELL_URL, await storable(res))
  // Pre-cache the entry scripts and styles the shell references so the first offline start works.
  const assets = new Set()
  for (const m of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    try {
      const u = new URL(m[1], SHELL_URL)
      if (u.origin === self.location.origin && u.pathname.startsWith(SITE_ROOT + 'assets/')) assets.add(u.href)
    } catch {
      /* ignore malformed references */
    }
  }
  const cache = await caches.open(ASSET_CACHE)
  await Promise.all([...assets].map((u) => cache.add(u).catch(() => undefined)))
}

self.addEventListener('install', (event) => {
  // A failed precache must not block installing; the shell is cached on the next online visit.
  event.waitUntil(precache().catch(() => undefined))
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys()
      await Promise.all(names.filter((n) => n.startsWith('vx-') && !KEEP.includes(n)).map((n) => caches.delete(n)))
      await self.clients.claim()
    })(),
  )
})

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'vx-skip-waiting') self.skipWaiting()
})

async function trimAssets(cache) {
  const keys = await cache.keys()
  if (keys.length <= MAX_ASSETS) return
  await Promise.all(keys.slice(0, keys.length - MAX_ASSETS).map((k) => cache.delete(k)))
}

async function cacheFirst(request) {
  const cache = await caches.open(ASSET_CACHE)
  const hit = await cache.match(request)
  if (hit) return hit
  const res = await fetch(request)
  if (res.ok && res.type === 'basic') {
    await cache.put(request, res.clone())
    void trimAssets(cache)
  }
  return res
}

async function networkFirstShell(request) {
  const cache = await caches.open(SHELL_CACHE)
  const network = fetch(request).then(async (res) => {
    const path = new URL(request.url).pathname
    // Only the app page itself is stored as the shell (never other site pages).
    if (res.ok && res.type === 'basic' && (path === SCOPE.pathname || path === new URL(SHELL_URL).pathname)) {
      await cache.put(SHELL_URL, await storable(res.clone())).catch(() => undefined)
    }
    return res
  })
  const cached = await cache.match(SHELL_URL)
  if (!cached) return network
  // On a very slow or captive network, fall back to the cached shell instead of a blank page.
  network.catch(() => undefined)
  let timer
  const slow = new Promise((resolve) => {
    timer = setTimeout(() => resolve(null), NAV_TIMEOUT_MS)
  })
  try {
    const res = await Promise.race([network, slow])
    if (res) return res
  } catch {
    /* offline: use the cached shell */
  } finally {
    clearTimeout(timer)
  }
  return cached
}

self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.method !== 'GET') return
  if (req.headers.has('range')) return
  let url
  try {
    url = new URL(req.url)
  } catch {
    return
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') return
  if (url.origin !== self.location.origin) return // never cache cross-origin

  if (req.mode === 'navigate') {
    if (url.pathname.startsWith(SCOPE.pathname)) event.respondWith(networkFirstShell(req))
    return
  }
  if (isAssetPath(url.pathname)) event.respondWith(cacheFirst(req))
})

/* Clicks on notifications created by the open app (see src/platform/notify.ts). */
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const data = event.notification.data || {}
  const convId = typeof data.convId === 'string' && data.convId.length < 200 ? data.convId : ''
  event.waitUntil(
    (async () => {
      const all = await self.clients.matchAll({ type: 'window', includeUncontrolled: true })
      const client = all.find((c) => new URL(c.url).pathname.startsWith(SCOPE.pathname))
      if (client) {
        await client.focus()
        client.postMessage({ type: 'vx-open-conversation', convId })
        return
      }
      const hash = convId ? `#/chats/${encodeURIComponent(convId)}` : '#/chats'
      await self.clients.openWindow(new URL(`./${hash}`, SCOPE).href)
    })(),
  )
})
