import { memo, useState, useEffect } from 'react'

// Ultra-lightweight Spline loader with progressive enhancement
const OptimizedSpline = memo(({ scene, className, onLoad }) => {
  const [SplineComponent, setSplineComponent] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Dynamically import Spline only when needed
    let mounted = true
    
    import('@splinetool/react-spline').then(module => {
      if (mounted) {
        setSplineComponent(() => module.default)
      }
    })

    return () => { mounted = false }
  }, [])

  const handleLoad = (spline) => {
    setIsLoaded(true)
    if (onLoad) onLoad(spline)
  }

  if (!SplineComponent) {
    return (
      <div className={`${className} flex items-center justify-center bg-transparent`}>
        <div className="animate-spin w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full"></div>
      </div>
    )
  }

  return (
    <div className={`${className} relative`}>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-transparent z-10">
          <div className="animate-spin w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full"></div>
        </div>
      )}
      <SplineComponent
        scene={scene}
        className={className}
        style={{ 
          background: 'transparent',
          pointerEvents: 'auto',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out'
        }}
        onLoad={handleLoad}
      />
    </div>
  )
})

OptimizedSpline.displayName = 'OptimizedSpline'

export function SplineScene({ scene, className }) {
  return (
    <OptimizedSpline
      scene={scene}
      className={className}
      onLoad={() => {
        console.log('Spline loaded!')
      }}
    />
  )
}
