import Spline from '@splinetool/react-spline'
import { memo, useState } from 'react'

// Optimized Spline with instant loading
const OptimizedSpline = memo(({ scene, className, onLoad }) => {
  const [isLoaded, setIsLoaded] = useState(false)

  const handleLoad = (spline) => {
    setIsLoaded(true)
    if (onLoad) onLoad(spline)
  }

  return (
    <div className={`${className} relative`}>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-transparent z-10">
          <div className="animate-spin w-12 h-12 border-3 border-blue-500/30 border-t-blue-500 rounded-full"></div>
        </div>
      )}
      <Spline
        scene={scene}
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
    <OptimizedSpline
      scene={scene}
      className={className}
      onLoad={(spline) => {
        console.log('Robot loaded!')
      }}
    />
  )
}
