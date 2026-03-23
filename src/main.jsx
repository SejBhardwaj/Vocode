import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

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
  
  // Preload
  const preload = document.createElement('link')
  preload.rel = 'preload'
  preload.href = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode'
  preload.as = 'fetch'
  preload.crossOrigin = 'anonymous'
  document.head.appendChild(preload)
}

// Start preloading immediately
preloadRobotImmediately()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
