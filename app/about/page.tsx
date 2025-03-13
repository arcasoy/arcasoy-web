'use client'

import Link from 'next/link'

export default function About() {
  return (
    <div className='min-h-screen bg-green-50/80 p-8 backdrop-blur-sm'>
      <div className='mx-auto max-w-4xl'>
        <h1 className='mb-8 text-4xl font-bold text-green-600'>About Me</h1>
        <p className='mb-4'>This is the about page. Add your bio and information here.</p>

        <Link
          href='/'
          className='mt-8 inline-block rounded-md bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700'
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
