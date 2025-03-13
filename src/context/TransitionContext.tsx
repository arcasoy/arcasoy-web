'use client'

import { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react'

type TransitionState = 'idle' | 'transitioning' | 'navigating'

interface TransitionContextType {
  activeShape: string
  transitionProgress: number
  transitionState: TransitionState
  transitionColor: string
  isTransitioning: boolean
  startTransition: (targetRoute: string, shapeName: string, color: string) => void
  setActiveShape: (shape: string) => void
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined)

export const TransitionProvider = ({ children }) => {
  const [activeShape, setActiveShape] = useState('Projects')
  const [transitionState, setTransitionState] = useState<TransitionState>('idle')
  const [transitionProgress, setTransitionProgress] = useState(0)
  const [transitionColor, setTransitionColor] = useState('')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const animationRef = useRef<number | null>(null)

  // Clean up any animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
    }
  }, [])

  // Start a transition to another route
  const startTransition = useCallback((targetRoute: string, shapeName: string, color: string) => {
    setTransitionState('transitioning')
    setIsTransitioning(true)
    setTransitionColor(color)
    setActiveShape(shapeName)

    // Cancel any ongoing animations
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }

    // Start transition animation
    let startTime = null
    const duration = 600 // milliseconds for entire transition - shorter for immediate navigation

    const animateTransition = (timestamp) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)

      setTransitionProgress(progress)

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animateTransition)
      } else {
        // Animation complete, reset to idle state
        setTransitionProgress(0)
        setTransitionState('idle')
        setIsTransitioning(false)
      }
    }

    // Start the animation
    animationRef.current = requestAnimationFrame(animateTransition)
  }, [])

  return (
    <TransitionContext.Provider
      value={{
        activeShape,
        transitionProgress,
        transitionState,
        transitionColor,
        isTransitioning,
        startTransition,
        setActiveShape,
      }}
    >
      {children}
    </TransitionContext.Provider>
  )
}

export const useTransition = () => {
  const context = useContext(TransitionContext)
  if (context === undefined) {
    throw new Error('useTransition must be used within a TransitionProvider')
  }
  return context
}
