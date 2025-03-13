import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'

export const PageTransition = ({ children, bgColor }) => {
  const searchParams = useSearchParams()
  const [isAnimating, setIsAnimating] = useState(false)
  const [transitionState, setTransitionState] = useState('entering') // 'entering', 'entered'
  const [transitionColor, setTransitionColor] = useState(bgColor)
  const animationRef = useRef(null)

  useEffect(() => {
    // Check if we're coming from a transition
    const from = searchParams?.get('from')
    const color = searchParams?.get('color')

    if (from === 'home' && color) {
      // We're coming from the home page with a transition
      setIsAnimating(true)
      setTransitionColor(decodeURIComponent(color))

      // Start the entrance animation
      let startTime = null
      const duration = 800 // milliseconds

      const animateEntering = (timestamp) => {
        if (!startTime) startTime = timestamp
        const elapsed = timestamp - startTime
        const progress = Math.min(elapsed / duration, 1)

        // First phase - full color cover
        if (progress < 0.3) {
          setTransitionState('entering')
        }
        // Second phase - fade out the color cover
        else if (progress < 1) {
          setTransitionState('entered')
        }
        // Animation complete
        else {
          setIsAnimating(false)
          return
        }

        animationRef.current = requestAnimationFrame(animateEntering)
      }

      // Start the animation
      animationRef.current = requestAnimationFrame(animateEntering)
    }

    // Clean up animation on unmount
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [searchParams, bgColor])

  return (
    <div className='relative'>
      {/* Full page content */}
      <div
        className={`transition-opacity duration-500 ${isAnimating && transitionState === 'entering' ? 'opacity-0' : 'opacity-100'}`}
      >
        {children}
      </div>

      {/* Transition overlay */}
      {isAnimating && (
        <div
          className={`fixed inset-0 z-50 transition-opacity duration-1000 ${
            transitionState === 'entering' ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundColor: transitionColor }}
        />
      )}
    </div>
  )
}

export default PageTransition
