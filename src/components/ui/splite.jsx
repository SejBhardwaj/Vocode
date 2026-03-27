import Spline from '@splinetool/react-spline'
import { memo, useState } from 'react'

// Optimized Spline with beautiful placeholder
const OptimizedSpline = memo(({ scene, className, onLoad }) => {
  const [isLoaded, setIsLoaded] = useState(false)

  const handleLoad = (spline) => {
    setIsLoaded(true)
    if (onLoad) onLoad(spline)
  }

  return (
    <div className={`${className} relative`}>
      {/* Beautiful animated placeholder while loading */}
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-transparent z-10">
          {/* Glowing orb animation */}
          <div className="relative w-64 h-64">
            {/* Outer glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl animate-pulse"></div>
            
            {/* Middle ring */}
            <div className="absolute inset-8 rounded-full border-2 border-blue-400/30 animate-spin" style={{ animationDuration: '3s' }}></div>
            
            {/* Inner core */}
            <div className="absolute inset-16 rounded-full bg-gradient-to-br from-blue-500/40 to-purple-500/40 backdrop-blur-sm flex items-center justify-center">
              <div className="text-white/60 text-sm font-medium animate-pulse">Loading 3D Model...</div>
            </div>
            
            {/* Spinning particles */}
            <div className="absolute inset-12 rounded-full border border-blue-300/20 animate-spin" style={{ animationDuration: '2s' }}></div>
          </div>
        </div>
      )}
      
      {/* Actual Spline component */}
      <div className={`transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <Spline
          scene={scene}
          style={{ 
            background: 'transparent',
            pointerEvents: 'auto'
          }}
          onLoad={handleLoad}
        />
      </div>
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
