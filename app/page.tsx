'use client'

import dynamic from 'next/dynamic'

// Dynamically import our Home component
const Home = dynamic(() => import('@/components/dom/Home'), { ssr: false })

export default function Page() {
  return <Home />
}
