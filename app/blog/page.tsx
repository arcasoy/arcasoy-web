'use client'

import Link from 'next/link'

export default function Blog() {
  return (
    <div className='min-h-screen bg-blue-50/80 p-8 backdrop-blur-sm'>
      <div className='mx-auto max-w-4xl'>
        <h1 className='mb-8 text-4xl font-bold text-blue-600'>Blog</h1>
        <p className='mb-4'>This is the blog page. Add your blog posts and content here.</p>

        <Link
          href='/'
          className='mt-8 inline-block rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700'
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
