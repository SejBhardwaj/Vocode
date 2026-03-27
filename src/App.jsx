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
