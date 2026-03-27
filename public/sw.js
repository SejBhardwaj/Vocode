// Service Worker for aggressive caching of Spline assets
const CACHE_NAME = 'vocode-v1'
const SPLINE_CACHE = 'spline-assets-v1'

const SPLINE_URLS = [
  'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode'
]

// Install event - cache Spline assets immediately
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SPLINE_CACHE).then((cache) => {
      return cache.addAll(SPLINE_URLS).catch(err => {
        console.log('Spline cache failed:', err)
      })
    })
  )
  self.skipWaiting()
})

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== SPLINE_CACHE) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  self.clients.claim()
})

// Fetch event - serve from cache first for Spline assets
self.addEventListener('fetch', (event) => {
  const url = event.request.url
  
  // Aggressive caching for Spline assets
  if (url.includes('prod.spline.design')) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response
        }
        return fetch(event.request).then((response) => {
          if (response.ok) {
            const responseClone = response.clone()
            caches.open(SPLINE_CACHE).then((cache) => {
              cache.put(event.request, responseClone)
            })
          }
          return response
        })
      })
    )
  }
})
