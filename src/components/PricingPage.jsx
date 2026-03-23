import LightRays from './ui/LightRays'
import FUIPricingSectionWithBadge from './ui/pricing-section'
import Navbar from './Navbar'

export default function PricingPage({ onNavigate, currentPage }) {
  return (
    <div className="relative bg-black min-h-screen">
      <Navbar onNavigate={onNavigate} currentPage={currentPage} />

      {/* Dotted Background Pattern - Made more visible */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 10px 10px'
        }}
      />

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

      {/* Main content */}
      <div className="relative z-20 pt-20 px-4 md:px-8 overflow-hidden">
        <FUIPricingSectionWithBadge />
      </div>
    </div>
  )
}
