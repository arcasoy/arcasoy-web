import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useTransition } from '@/context/TransitionContext'

const menuItems = [
  { label: 'Projects', path: '/projects' },
  { label: 'About Me', path: '/about' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
  { label: 'Other', path: '/other' },
]

export const MenuCarousel = () => {
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)
  const { activeShape, setActiveShape, startTransition } = useTransition()

  // Check if device is mobile on mount and window resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Listen for window resize
    window.addEventListener('resize', checkIfMobile)

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [])

  const handleItemClick = (item) => {
    // If the item is already active, navigate to it
    if (item.label === activeShape) {
      // Get the color for this item
      const color = getColorForItem(item.label)

      // Start the transition animation and pass the target route
      startTransition(item.path, item.label, color)

      // Navigate immediately - no delay
      router.push(item.path)
    } else {
      // Otherwise, just update the active shape
      setActiveShape(item.label)
    }
  }

  // Helper to get the color associated with a menu item
  const getColorForItem = (itemLabel) => {
    const colors = {
      Projects: '#ff0000',
      'About Me': '#00ff00',
      Blog: '#0000ff',
      Contact: '#ff00ff',
      Other: '#ffff00',
    }
    return colors[itemLabel] || '#ffffff'
  }

  return (
    <div className={`${isMobile ? 'flex-row' : 'flex-col'} flex items-center justify-center`}>
      <div className='mb-2 text-sm text-gray-500'>Click to navigate</div>

      <div className={`${isMobile ? 'flex-row' : 'flex-col'} flex items-center justify-center gap-6`}>
        {menuItems.map((item) => (
          <div
            key={item.label}
            className={`relative cursor-pointer transition-all duration-300 ease-in-out ${
              activeShape === item.label ? 'scale-110 font-bold text-white' : 'text-gray-400 hover:text-gray-200'
            }`}
            onClick={() => handleItemClick(item)}
          >
            {item.label}
            {activeShape === item.label && (
              <div className='absolute bottom-0 left-0 h-0.5 w-full translate-y-1 bg-white'></div>
            )}
          </div>
        ))}
      </div>

      {/* Visual cue for desktop */}
      {!isMobile && (
        <div className='mt-4 text-center'>
          <svg
            className='mx-auto size-6 animate-bounce text-white'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
          </svg>
        </div>
      )}

      {/* Visual cue for mobile */}
      {isMobile && (
        <div className='ml-4 text-center'>
          <svg
            className='mx-auto size-6 animate-pulse text-white'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
          </svg>
        </div>
      )}
    </div>
  )
}

export default MenuCarousel
