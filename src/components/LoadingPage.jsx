import { useEffect, useState } from 'react'
import { SpiralAnimation } from './ui/spiral-animation'
import LightRays from './ui/LightRays'
import { SplineScene } from './ui/splite'

export default function LoadingPage({ onComplete }) {
  const [textVisible, setTextVisible] = useState(false)

  useEffect(() => {
    // Fade in the loading text after animation loads
    const textTimer = setTimeout(() => {
      setTextVisible(true)
    }, 1000)

    // Complete loading after animation plays
    const completeTimer = setTimeout(() => {
      onComplete()
    }, 4000)

    return () => {
      clearTimeout(textTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-black">
      {/* Hidden robot preloader - loads in background during loading screen */}
      <div style={{ position: 'absolute', width: 1, height: 1, opacity: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: -9999 }}>
        <SplineScene
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="w-full h-full"
        />
      </div>

      {/* Light Rays Background */}
      <div className="absolute inset-0 z-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1}
          lightSpread={0.5}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0}
          className="custom-rays"
          pulsating={false}
          fadeDistance={1}
          saturation={1}
        />
      </div>

      {/* Spiral Animation */}
      <div className="absolute inset-0 z-1">
        <SpiralAnimation />
      </div>

      {/* Loading Text with Pulsing Effect */}
      <div 
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10
          transition-all duration-1500 ease-out
          ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      >
        <div className="text-white text-6xl tracking-[0.3em] uppercase font-extralight animate-pulse">
          Loading
        </div>
      </div>
    </div>
  )
}
