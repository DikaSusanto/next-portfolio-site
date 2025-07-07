import './globals.css'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react' // <-- Add this import

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
      <body className="bg-gray-900 text-white antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}