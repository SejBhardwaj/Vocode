import Spline from '@splinetool/react-spline'
import { Suspense, lazy, memo } from 'react'

// Memoized and optimized Spline component
const OptimizedSpline = memo(({ scene, className, onLoad }) => (
  <Spline
    scene={scene}
    className={className}
    renderOnDemand={false} // Force immediate render
    style={{ 
      background: 'transparent',
      pointerEvents: 'auto'
    }}
    onLoad={onLoad}
    // Performance boost settings
    loading="eager"
  />
))

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
          console.log('Spline loaded fast!')
        }}
      />
    </Suspense>
  )
}
