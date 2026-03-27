import { useEffect, useState } from 'react'
import { SpiralAnimation } from './ui/spiral-animation'

export default function LoadingPage({ onComplete }) {
  const [textVisible, setTextVisible] = useState(false)

  useEffect(() => {
    // Fade in the loading text immediately
    const textTimer = setTimeout(() => {
      setTextVisible(true)
    }, 300)

    // Complete loading much faster - just 1.5 seconds
    const completeTimer = setTimeout(() => {
      onComplete()
    }, 1500)

    return () => {
      clearTimeout(textTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-black">
      {/* Spiral Animation */}
      <div className="absolute inset-0 z-1">
        <SpiralAnimation />
      </div>

      {/* Loading Text with Pulsing Effect */}
      <div 
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10
          transition-all duration-700 ease-out
          ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      >
        <div className="text-white text-6xl tracking-[0.3em] uppercase font-extralight animate-pulse">
          Loading
        </div>
      </div>
    </div>
  )
}
