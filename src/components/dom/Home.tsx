import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import MenuCarousel from './MenuCarousel'

// Dynamically import the ThreeJS component to avoid SSR issues
const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), { ssr: false })
const HomeBackground = dynamic(() => import('@/components/canvas/HomeBackground'), { ssr: false })

export const Home = () => {
  const [activeItem, setActiveItem] = useState('Projects')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionProgress, setTransitionProgress] = useState(0)
  const [backgroundColor, setBackgroundColor] = useState('rgba(0, 0, 0, 1)')
  const animationRef = useRef(null)

  // Handle changes between menu items
  const handleItemChange = (item) => {
    setActiveItem(item)
  }

  // Handle initial animation when an item is clicked for navigation
  // This will only show a brief animation before the navigation happens
  const handleNavigate = (isNavigating, item) => {
    if (isNavigating) {
      setIsTransitioning(true)

      // Define color based on selected item
      const colors = {
        Projects: 'rgba(255, 0, 0, 1)', // Red
        'About Me': 'rgba(0, 255, 0, 1)', // Green
        Blog: 'rgba(0, 0, 255, 1)', // Blue
        Contact: 'rgba(255, 0, 255, 1)', // Purple
        Other: 'rgba(255, 255, 0, 1)', // Yellow
      }

      // Start a brief transition animation - it will be cut short by navigation
      // but provides visual feedback that something is happening
      let startTime = null
      const duration = 300 // Short duration, as navigation will happen quickly

      const animateTransition = (timestamp) => {
        if (!startTime) startTime = timestamp
        const elapsed = timestamp - startTime
        const progress = Math.min(elapsed / duration, 1)

        setTransitionProgress(progress)
        setBackgroundColor(colors[item] || 'rgba(0, 0, 0, 1)')

        if (progress < 1 && isTransitioning) {
          animationRef.current = requestAnimationFrame(animateTransition)
        } else {
          // Animation complete or interrupted by navigation
          setTransitionProgress(0)
        }
      }

      // Start the animation
      animationRef.current = requestAnimationFrame(animateTransition)
    }
  }

  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <div className='relative h-screen w-screen overflow-hidden'>
      {/* Menu Carousel */}
      <div className='absolute inset-0 z-10 flex items-center justify-center'>
        <div className='rounded-lg bg-black/20 p-6 backdrop-blur-sm'>
          <h1 className='mb-6 text-center text-3xl font-bold text-white'>Arcasoy</h1>
          <MenuCarousel />
        </div>
      </div>
    </div>
  )
}

export default Home
