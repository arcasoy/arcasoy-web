'use client'

import { useEffect, useState } from 'react'
import { useTransition } from '@/context/TransitionContext'

export const TransitionOverlay = () => {
  const { isTransitioning, transitionState, transitionColor } = useTransition()
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    if (isTransitioning) {
      // During transition, fade in the color overlay
      setOpacity(1)
    } else {
      // When not transitioning, ensure the overlay is hidden
      setOpacity(0)
    }
  }, [isTransitioning])

  if (!isTransitioning && opacity === 0) return null

  return (
    <div
      className='pointer-events-none fixed inset-0 z-50 transition-opacity duration-300'
      style={{
        backgroundColor: transitionColor,
        opacity: opacity,
      }}
    />
  )
}

export default TransitionOverlay
