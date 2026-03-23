import { useState } from 'react'
import LightRays from './ui/LightRays'
import { FullCircleBackground } from './ui/full-circle-background'
import { VercelV0Chat } from './ui/v0-ai-chat'
import { Banner } from './ui/banner'
import { Rocket, ArrowRight } from 'lucide-react'
import Navbar from './Navbar'

export default function HowItWorksPage({ onSubmit, onNavigate, currentPage }) {
  const [showBanner, setShowBanner] = useState(true)

  const handleSubmit = (text) => {
    if (text.trim()) onSubmit(text.trim());
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <Navbar onNavigate={onNavigate} currentPage={currentPage} />

      {/* Banner at top */}
      <div className="relative z-40 pt-20 px-8">
        <div className="max-w-4xl mx-auto">
          <Banner
            show={showBanner}
            onHide={() => setShowBanner(false)}
            variant="default"
            title="AI Dashboard is here!"
            description="Experience the future of analytics"
            showShade={false}
            closable={true}
            size="lg"
            className="bg-gray-900/95 backdrop-blur-sm border-gray-700/50 rounded-xl"
            icon={<Rocket className="h-5 w-5 text-blue-400" />}
            action={
              <button
                onClick={() => setShowBanner(false)}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 px-4 py-2 text-sm font-medium text-white transition-colors"
              >
                Try now
                <ArrowRight className="h-4 w-4" />
              </button>
            }
          />
        </div>
      </div>

      {/* Light Rays Background */}
      <div className="absolute inset-0 z-[5]">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1}
          lightSpread={1.5}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0}
          pulsating={false}
          fadeDistance={1}
          saturation={1}
        />
      </div>

      {/* Full Circle Background */}
      <div className="absolute inset-0 z-1">
        <FullCircleBackground />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col min-h-screen pt-20">
        
        <div className="flex-1 flex items-center justify-center">
          <VercelV0Chat 
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  )
}
