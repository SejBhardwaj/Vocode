import { useState, useCallback, useEffect } from 'react'
import LoadingPage from './components/LoadingPage'
import MainPage from './components/MainPage'
import HowItWorksPage from './components/HowItWorksPage'
import PricingPage from './components/PricingPage'
import PlanSelectionPage from './components/PlanSelectionPage'
import EditorPage from './components/EditorPage'

export default function App() {
  const [page, setPage] = useState('loading')
  const [idea, setIdea] = useState('')
  const [selectedPlan, setSelectedPlan] = useState(null)

  // ULTRA-AGGRESSIVE Spline robot preloading
  useEffect(() => {
    // DNS prefetch
    const dns = document.createElement('link')
    dns.rel = 'dns-prefetch'
    dns.href = 'https://prod.spline.design'
    document.head.appendChild(dns)

    // Preconnect with high priority
    const preconnect = document.createElement('link')
    preconnect.rel = 'preconnect'
    preconnect.href = 'https://prod.spline.design'
    preconnect.crossOrigin = 'anonymous'
    document.head.appendChild(preconnect)

    // Multiple aggressive fetch attempts
    const robotUrl = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode'
    
    // Attempt 1: High priority fetch
    fetch(robotUrl, {
      mode: 'cors',
      cache: 'force-cache',
      priority: 'high'
    }).catch(() => {})

    // Attempt 2: Prefetch link
    const prefetch = document.createElement('link')
    prefetch.rel = 'prefetch'
    prefetch.href = robotUrl
    prefetch.as = 'fetch'
    prefetch.crossOrigin = 'anonymous'
    document.head.appendChild(prefetch)

    // Attempt 3: Preload link
    const preload = document.createElement('link')
    preload.rel = 'preload'
    preload.href = robotUrl
    preload.as = 'fetch'
    preload.crossOrigin = 'anonymous'
    document.head.appendChild(preload)
  }, [])

  const handleLoadingComplete = useCallback(() => setPage('main'), [])
  const handleNavigate = useCallback((p) => setPage(p), [])
  const handleIdeaSubmit = useCallback((text) => { setIdea(text); setPage('planSelection') }, [])
  const handlePlanSelected = useCallback((plan) => { setSelectedPlan(plan); setPage('editor') }, [])
  const handleBackToMain = useCallback(() => { setPage('main'); setIdea(''); setSelectedPlan(null) }, [])

  return (
    <>
      {page === 'loading' && <LoadingPage onComplete={handleLoadingComplete} />}
      {page === 'main' && <MainPage onSubmit={handleIdeaSubmit} onNavigate={handleNavigate} currentPage={page} />}
      {page === 'howItWorks' && <HowItWorksPage onSubmit={handleIdeaSubmit} onNavigate={handleNavigate} currentPage={page} />}
      {page === 'pricing' && <PricingPage onNavigate={handleNavigate} currentPage={page} />}
      {page === 'planSelection' && (
        <PlanSelectionPage
          userIdea={idea}
          onSelectPlan={handlePlanSelected}
          onBack={() => setPage('howItWorks')}
          onNavigate={handleNavigate}
          currentPage={page}
        />
      )}
      {page === 'editor' && (
        <EditorPage
          initialIdea={idea}
          selectedPlan={selectedPlan}
          onBack={handleBackToMain}
          onNavigate={handleNavigate}
          currentPage={page}
        />
      )}
    </>
  )
}
