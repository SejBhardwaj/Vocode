import { useState, useEffect } from 'react'

function Navbar({ onBack }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-white font-bold text-lg tracking-wide">VOCODE</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          {['01 / Features', '02 / How it Works', '03 / Examples', '04 / Pricing'].map((item, i) => (
            <span key={i} className="nav-item text-sm cursor-pointer">{item}</span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="btn-outline text-sm px-4 py-1.5 rounded-lg text-white/60 flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>
        <button className="btn-primary text-sm px-5 py-2 rounded-lg text-white font-medium">
          Get Started
        </button>
      </div>
    </nav>
  )
}

function StepIndicator({ step }) {
  const steps = ['Describe', 'Choose Plan', 'Build']
  return (
    <div className="flex items-center gap-2">
      {steps.map((s, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className={`flex items-center gap-2 text-xs font-medium transition-all ${
            i + 1 === step ? 'text-blue-400' : i + 1 < step ? 'text-white/50' : 'text-white/25'
          }`}>
            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs border transition-all ${
              i + 1 === step
                ? 'border-blue-500 bg-blue-600 text-white'
                : i + 1 < step
                ? 'border-white/30 bg-white/10 text-white/50'
                : 'border-white/15 text-white/25'
            }`}>
              {i + 1 < step ? (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : i + 1}
            </div>
            {s}
          </div>
          {i < steps.length - 1 && (
            <div className={`w-8 h-px ${i + 1 < step ? 'bg-white/30' : 'bg-white/10'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

function PlanCard({ plan, selected, onClick, index }) {
  const colorDots = plan.colors || ['#2563eb', '#7c3aed', '#f97316']
  return (
    <div
      onClick={onClick}
      className={`plan-card glass-card rounded-2xl p-6 cursor-pointer relative overflow-hidden ${selected ? 'selected' : ''}`}
      style={{
        border: selected ? '1px solid rgba(37,99,235,0.7)' : '1px solid rgba(255,255,255,0.07)',
        boxShadow: selected ? '0 0 40px rgba(37,99,235,0.2), inset 0 0 40px rgba(37,99,235,0.05)' : 'none',
      }}
    >
      {/* Card number */}
      <div className="card-number mb-4">0{index + 1} / PLAN</div>

      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-white font-semibold text-base mb-1">{plan.name}</h3>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-white/40 bg-white/5 px-2 py-0.5 rounded-full border border-white/8">
              {plan.style}
            </span>
          </div>
        </div>
        {/* Color swatches */}
        <div className="flex gap-1.5">
          {colorDots.slice(0, 3).map((c, i) => (
            <div
              key={i}
              className="w-4 h-4 rounded-full border border-white/20"
              style={{ background: c }}
            />
          ))}
        </div>
      </div>

      {/* Description */}
      <p className="text-white/45 text-sm leading-relaxed mb-5">{plan.description}</p>

      {/* Sections */}
      <div className="mb-4">
        <div className="text-xs text-white/30 uppercase tracking-widest mb-2">Sections</div>
        <div className="flex flex-wrap gap-1.5">
          {(plan.sections || []).slice(0, 5).map((s, i) => (
            <span
              key={i}
              className="text-xs px-2 py-1 rounded-lg bg-white/5 border border-white/8 text-white/55"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="space-y-1.5">
        {(plan.features || []).map((f, i) => (
          <div key={i} className="flex items-center gap-2 text-xs text-white/50">
            <div className="w-3.5 h-3.5 rounded-full bg-blue-600/40 flex items-center justify-center flex-shrink-0">
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17l-5-5" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            {f}
          </div>
        ))}
      </div>

      {/* Selected indicator */}
      {selected && (
        <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}

      {/* Hover top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
    </div>
  )
}

export default function PlanSelector({ idea, onSelectPlan, onBack }) {
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [refinedIdea, setRefinedIdea] = useState('')
  const [selected, setSelected] = useState(null)
  const [building, setBuilding] = useState(false)
  const [loadingStep, setLoadingStep] = useState('Analyzing your idea...')
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        setLoadingStep('Analyzing your idea...')
        // Backend integration removed - frontend only
        const refined = idea
        if (cancelled) return
        setRefinedIdea(refined)
        setLoadingStep('Generating design plans...')
        // Mock plans for frontend demo
        const generatedPlans = [
          { name: 'Modern', description: 'Clean and minimal design', features: ['Responsive', 'Fast'] },
          { name: 'Classic', description: 'Traditional layout', features: ['Elegant', 'Professional'] },
          { name: 'Bold', description: 'Eye-catching design', features: ['Vibrant', 'Dynamic'] }
        ]
        if (cancelled) return
        setPlans(generatedPlans)
        setLoading(false)
      } catch (err) {
        if (!cancelled) {
          setError('Failed to generate plans. Please check your API key and try again.')
          setLoading(false)
        }
      }
    }
    load()
    return () => { cancelled = true }
  }, [idea])

  const handleBuild = async () => {
    if (!selected && plans.length === 0) return
    const plan = selected !== null ? plans[selected] : plans[0]
    setBuilding(true)
    onSelectPlan(refinedIdea || idea, plan)
  }

  return (
    <div className="relative min-h-screen bg-space-black overflow-hidden">
      <Navbar onBack={onBack} />

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-blue-600/10 via-blue-500/30 to-blue-600/10" />
        <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-blue-600/10 via-blue-500/30 to-blue-600/10" />
        <div
          className="absolute rounded-full"
          style={{
            width: '700px', height: '400px',
            top: '-100px', left: '50%',
            transform: 'translateX(-50%)',
            background: 'radial-gradient(ellipse, rgba(37,99,235,0.12) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute rounded-full animate-float"
          style={{
            width: '70px', height: '70px',
            top: '120px', right: '12%',
            background: 'radial-gradient(circle, #60a5fa 0%, #2563eb 50%, #1d4ed8 100%)',
            boxShadow: '0 0 30px rgba(37,99,235,0.5)',
          }}
        />
        <div
          className="absolute rounded-full animate-float-delayed"
          style={{
            width: '45px', height: '45px',
            top: '30%', left: '8%',
            background: 'radial-gradient(circle, #818cf8 0%, #4f46e5 60%)',
            boxShadow: '0 0 20px rgba(79,70,229,0.4)',
          }}
        />
      </div>

      <div className="relative z-10 pt-24 pb-16 px-8 max-w-7xl mx-auto">
        {/* Header row */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <StepIndicator step={2} />
            </div>
            <h1 className="text-4xl font-extrabold text-white mb-2">
              Choose your design
            </h1>
            <p className="text-white/40 text-sm max-w-lg">{refinedIdea || idea}</p>
          </div>
          {!loading && plans.length > 0 && (
            <button
              onClick={handleBuild}
              disabled={selected === null || building}
              className="btn-primary px-8 py-3 rounded-xl text-white font-semibold text-sm flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {building ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Building...
                </>
              ) : (
                <>
                  Build Website
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </>
              )}
            </button>
          )}
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="relative w-20 h-20 mb-8">
              <div className="absolute inset-0 rounded-full border-2 border-blue-500/20" />
              <div
                className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-500"
                style={{ animation: 'spin 1.2s linear infinite' }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-blue-600/40 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
            <p className="text-white/60 text-sm mb-2">{loadingStep}</p>
            <p className="text-white/25 text-xs">Powered by Gemini AI</p>
            {/* Skeleton cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full max-w-5xl">
              {[1,2,3].map(i => (
                <div key={i} className="glass-card rounded-2xl p-6 h-72 animate-pulse">
                  <div className="h-2 w-12 bg-white/5 rounded mb-6" />
                  <div className="h-5 w-2/3 bg-white/5 rounded mb-3" />
                  <div className="h-3 w-1/3 bg-white/5 rounded mb-5" />
                  <div className="space-y-2 mb-5">
                    <div className="h-2.5 w-full bg-white/5 rounded" />
                    <div className="h-2.5 w-4/5 bg-white/5 rounded" />
                    <div className="h-2.5 w-3/4 bg-white/5 rounded" />
                  </div>
                  <div className="flex gap-2">
                    {[1,2,3,4].map(j => <div key={j} className="h-6 w-16 bg-white/5 rounded-lg" />)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#f87171" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <p className="text-red-400 text-sm mb-4">{error}</p>
            <button onClick={onBack} className="btn-outline px-6 py-2.5 rounded-xl text-white/60 text-sm">
              Go Back
            </button>
          </div>
        )}

        {/* Plans grid */}
        {!loading && !error && plans.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {plans.map((plan, i) => (
                <PlanCard
                  key={plan.id || i}
                  plan={plan}
                  index={i}
                  selected={selected === i}
                  onClick={() => setSelected(i)}
                />
              ))}
            </div>

            {/* Bottom action row */}
            {selected !== null && (
              <div className="flex items-center justify-center gap-4">
                <div className="glass-card rounded-xl px-5 py-3 flex items-center gap-3 border border-blue-500/20">
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  <span className="text-white/70 text-sm">
                    Selected: <span className="text-blue-300 font-medium">{plans[selected]?.name}</span>
                  </span>
                </div>
                <button
                  onClick={handleBuild}
                  disabled={building}
                  className="btn-primary px-8 py-3 rounded-xl text-white font-semibold text-sm flex items-center gap-2 disabled:opacity-40"
                >
                  {building ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Building your website...
                    </>
                  ) : (
                    <>
                      Build This Website
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
