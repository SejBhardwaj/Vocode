import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Register service worker for caching
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {})
  })
}

// Render immediately - robot is already preloading from HTML
createRoot(document.getElementById('root')).render(<App />)
