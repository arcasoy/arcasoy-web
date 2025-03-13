'use client'

import Link from 'next/link'

export default function Other() {
  return (
    <div className='min-h-screen bg-yellow-50/80 p-8 backdrop-blur-sm'>
      <div className='mx-auto max-w-4xl'>
        <h1 className='mb-8 text-4xl font-bold text-yellow-600'>Other</h1>
        <p className='mb-4'>This is the other content page. Add miscellaneous content here.</p>

        <Link
          href='/'
          className='mt-8 inline-block rounded-md bg-yellow-600 px-4 py-2 text-white transition-colors hover:bg-yellow-700'
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
