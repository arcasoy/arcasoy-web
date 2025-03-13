'use client'

import Link from 'next/link'

export default function Contact() {
  return (
    <div className='min-h-screen bg-purple-50/80 p-8 backdrop-blur-sm'>
      <div className='mx-auto max-w-4xl'>
        <h1 className='mb-8 text-4xl font-bold text-purple-600'>Contact</h1>
        <p className='mb-4'>This is the contact page. Add your contact information and form here.</p>

        <Link
          href='/'
          className='mt-8 inline-block rounded-md bg-purple-600 px-4 py-2 text-white transition-colors hover:bg-purple-700'
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
