import LightRays from './ui/LightRays'
import { SplineScene } from './ui/splite'
import { AnimatedTextContent } from './ui/animated-text-content'
import { CpuArchitecture } from './ui/cpu-architecture'
import { Timeline } from './ui/timeline'
import { BentoGridDemo } from './ui/bento-grid-demo'
import { Footer } from './ui/footer'
import { useState, useEffect, useRef } from 'react'
import { Briefcase, Award, GraduationCap, MapPin } from 'lucide-react'
import Navbar from './Navbar'

export default function MainPage({ onNavigate, currentPage }) {
  const [showCpuSection, setShowCpuSection] = useState(false)
  const [showBentoSection, setShowBentoSection] = useState(false)
  const [enableLightRays, setEnableLightRays] = useState(false)
  const cpuSectionRef = useRef(null)
  const bentoSectionRef = useRef(null)

  useEffect(() => {
    // Enable LightRays after initial render to speed up page load
    const timer = setTimeout(() => setEnableLightRays(true), 100)

    const cpuObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowCpuSection(true)
          cpuObserver.disconnect()
        }
      },
      { threshold: 0.01, rootMargin: '200px' }
    )

    const bentoObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowBentoSection(true)
          bentoObserver.disconnect()
        }
      },
      { threshold: 0.01, rootMargin: '200px' }
    )

    if (cpuSectionRef.current) cpuObserver.observe(cpuSectionRef.current)
    if (bentoSectionRef.current) bentoObserver.observe(bentoSectionRef.current)

    return () => {
      clearTimeout(timer)
      cpuObserver.disconnect()
      bentoObserver.disconnect()
    }
  }, [])

  return (
    <div className="relative bg-black min-h-screen">
      <Navbar onNavigate={onNavigate} currentPage={currentPage} />

      {/* Light Rays Background - Delayed for faster initial load */}
      {enableLightRays && (
        <div className="fixed inset-0 z-[50] pointer-events-none">
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={1}
            lightSpread={1.0}
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
      )}

      {/* Main hero section */}
      <div className="relative z-10 min-h-screen pt-20">
        <div className="flex items-center min-h-screen -mt-12">
          <div className="w-full max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left side - Text content */}
              <div>
                {/* Badge */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="px-4 py-1.5 rounded-full glass-card border border-white/10 text-sm text-white/70 font-medium">
                    AI Builder
                  </div>
                  <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault()
                      onNavigate('howItWorks')
                    }}
                    className="flex items-center gap-2 text-sm text-blue-400/80 hover:text-blue-300 transition-colors"
                  >
                    See how it works
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>

                {/* Headline */}
                <h1 className="text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-6">
                  Build websites<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">
                    with your voice
                  </span>
                </h1>

                {/* Subtext */}
                <div className="mb-10 max-w-xs">
                  <p className="text-white/45 text-sm leading-relaxed">
                    Describe your website idea using voice or text, and our AI generates a production-ready website instantly. No coding required.
                  </p>
                </div>

                {/* Stats row */}
                <div className="flex items-center gap-8">
                  <div>
                    <div className="text-2xl font-bold text-white">100%</div>
                    <div className="text-xs text-white/35 mt-0.5">AI generated</div>
                  </div>
                  <div className="w-px h-8 bg-white/10" />
                  <div>
                    <div className="text-2xl font-bold text-white">1</div>
                    <div className="text-xs text-white/35 mt-0.5">sentence needed</div>
                  </div>
                  <div className="w-px h-8 bg-white/10" />
                  <div>
                    <div className="text-2xl font-bold text-white">24/7</div>
                    <div className="text-xs text-white/35 mt-0.5">available</div>
                  </div>
                </div>
              </div>

              {/* Right side - 3D Robot with ultra-fast loading */}
              <div className="flex flex-col items-center lg:items-end h-[700px] relative">
                <div className="w-full h-full relative">
                  <SplineScene 
                    scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                    className="w-full h-full animate-spotlight"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Animation Section */}
      <div className="relative z-10 -mt-10 py-20">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            <span className="text-white">Where ideas effortlessly</span><br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">become websites</span>
          </h1>
        </div>
        <div className="max-w-5xl mx-auto border-4 border-[#6C6C6C] p-2 md:p-6 bg-[#222222] rounded-[30px] shadow-2xl">
          <div className="h-[30rem] md:h-[40rem] w-full overflow-hidden rounded-2xl bg-zinc-900 md:p-4">
            {enableLightRays && <AnimatedTextContent />}
          </div>
        </div>
      </div>

      {/* CPU Architecture Section */}
      <div ref={cpuSectionRef} className="relative z-10 -mt-10 py-32 min-h-[120vh]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Powered by advanced</span><br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">AI architecture</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Our neural network processes your ideas in real-time, transforming natural language into production-ready code
            </p>
          </div>
          
          {showCpuSection ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start min-h-[800px]">
              {/* Left side - Timeline */}
              <div className="flex justify-start overflow-visible">
                <div className="w-full max-w-lg pl-8 pr-4">
                  <Timeline 
                    items={[
                      {
                        id: "1",
                        title: "Project Started",
                        description: "Initial project setup and planning phase",
                        timestamp: new Date("2024-01-15T09:00:00"),
                        status: "default",
                        icon: <Briefcase className="h-3 w-3" />,
                      },
                      {
                        id: "2",
                        title: "Development Phase",
                        description: "Core features implementation in progress",
                        timestamp: new Date("2024-02-01T10:30:00"),
                        status: "default",
                        icon: <Award className="h-3 w-3" />,
                      },
                      {
                        id: "3",
                        title: "Testing & QA",
                        description: "Quality assurance and testing phase",
                        timestamp: new Date("2024-02-15T14:00:00"),
                        status: "default",
                        icon: <GraduationCap className="h-3 w-3" />,
                      },
                      {
                        id: "4",
                        title: "Launch",
                        description: "Production deployment and launch",
                        timestamp: new Date("2024-03-01T16:00:00"),
                        status: "default",
                        icon: <MapPin className="h-3 w-3" />,
                      },
                    ]}
                    variant="spacious"
                    showTimestamps={true}
                    timestampPosition="top"
                    className="text-white text-lg overflow-visible"
                  />
                </div>
              </div>
              
              {/* Right side - CPU Architecture */}
              <div className="flex justify-center items-start -mt-64">
                <div className="w-full max-w-7xl scale-150">
                  <CpuArchitecture 
                    className="text-white/30"
                    text="VOCODE"
                    showCpuConnections={true}
                    animateText={true}
                    animateLines={true}
                    animateMarkers={true}
                    width="100%"
                    height="1000px"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="min-h-[800px] flex items-center justify-center">
              <div className="animate-pulse text-white/20">Loading...</div>
            </div>
          )}
        </div>
      </div>

      {/* Features Showcase Section */}
      <div ref={bentoSectionRef} className="relative z-10 -mt-80 pb-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-6">
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="text-white">Everything you need to</span><br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">build amazing websites</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Powerful features designed to transform your ideas into professional websites with just your voice
            </p>
          </div>
          
          {showBentoSection ? (
            <BentoGridDemo />
          ) : (
            <div className="min-h-[400px] flex items-center justify-center">
              <div className="animate-pulse text-white/20">Loading...</div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
