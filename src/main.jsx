import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Register service worker for aggressive caching
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Silently fail if service worker registration fails
    })
  })
}

// ULTRA-EARLY robot preloading - before React even starts
const preloadRobotImmediately = () => {
  // DNS prefetch
  const dns = document.createElement('link')
  dns.rel = 'dns-prefetch'
  dns.href = 'https://prod.spline.design'
  document.head.appendChild(dns)
  
  // Preconnect
  const preconnect = document.createElement('link')
  preconnect.rel = 'preconnect'
  preconnect.href = 'https://prod.spline.design'
  preconnect.crossOrigin = 'anonymous'
  document.head.appendChild(preconnect)
  
  // Aggressive prefetch with high priority
  const prefetch = document.createElement('link')
  prefetch.rel = 'prefetch'
  prefetch.href = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode'
  prefetch.as = 'fetch'
  prefetch.crossOrigin = 'anonymous'
  document.head.appendChild(prefetch)

  // Start fetching immediately in background
  fetch('https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode', {
    mode: 'cors',
    cache: 'force-cache',
    priority: 'high'
  }).catch(() => {})
}

// Start preloading immediately
preloadRobotImmediately()

// Remove StrictMode for production performance
createRoot(document.getElementById('root')).render(<App />)
