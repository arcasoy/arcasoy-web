import '@/global.css'
import { TransitionProvider } from '@/context/TransitionContext'
import PersistentCanvas from '@/components/canvas/PersistentCanvas'
import TransitionOverlay from '@/components/dom/TransitionOverlay'

export const metadata = {
  title: 'Arcasoy - Portfolio',
  description: 'Personal portfolio and website of Arcasoy.',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en' className='antialiased' suppressHydrationWarning>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body suppressHydrationWarning>
        <TransitionProvider>
          {/* Persistent Canvas stays mounted across all routes */}
          <PersistentCanvas />

          {/* Global Transition Overlay */}
          <TransitionOverlay />

          {/* Page Content */}
          <main className='relative z-10'>{children}</main>
        </TransitionProvider>
      </body>
    </html>
  )
}
