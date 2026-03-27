import Spline from '@splinetool/react-spline'
import { Suspense, memo, useRef, useEffect, useState } from 'react'

// Memoized and optimized Spline component
const OptimizedSpline = memo(({ scene, className, onLoad }) => {
  const splineRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)

  const handleLoad = (spline) => {
    setIsLoaded(true)
    if (onLoad) onLoad(spline)
  }

  return (
    <div className={`${className} relative`}>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-transparent z-10">
          <div className="animate-spin w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full"></div>
        </div>
      )}
      <Spline
        ref={splineRef}
        scene={scene}
        className={className}
        style={{ 
          background: 'transparent',
          pointerEvents: 'auto',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out'
        }}
        onLoad={handleLoad}
      />
    </div>
  )
})

OptimizedSpline.displayName = 'OptimizedSpline'

export function SplineScene({ scene, className }) {
  return (
    <Suspense fallback={
      <div className={`${className} flex items-center justify-center bg-transparent`}>
        <div className="animate-spin w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full"></div>
      </div>
    }>
      <OptimizedSpline
        scene={scene}
        className={className}
        onLoad={() => {
          console.log('Spline loaded!')
        }}
      />
    </Suspense>
  )
}
