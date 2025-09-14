import './globals.css'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import Navbar from '../components/Navbar'
import LoadingProvider from '../components/LoadingProvider'

export const metadata: Metadata = {
  title: 'Dika Putra Susanto | Portfolio',
  description: 'Backend Developer & Aspiring Full Stack Engineer Portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/img/Personal-Logo-2.png" type="image/x-icon" />
      </head>
      <body className="bg-gray-900 text-white antialiased">
        <LoadingProvider 
          enableRouteChangeLoading={true}
          loadingDuration={3000}
        >
          <Navbar /> 
          {children}
          <Analytics />
        </LoadingProvider>
      </body>
    </html>
  )
}