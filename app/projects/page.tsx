'use client'

import Link from 'next/link'

export default function Projects() {
  return (
    <div className='min-h-screen bg-red-50/80 p-8 backdrop-blur-sm'>
      <div className='mx-auto max-w-4xl'>
        <h1 className='mb-8 text-4xl font-bold text-red-600'>Projects</h1>
        <p className='mb-4'>This is the projects page. Add your projects content here.</p>

        <Link
          href='/'
          className='mt-8 inline-block rounded-md bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700'
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
