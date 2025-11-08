import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CLA Credentials Client',
  description: 'Authentication client for CLA Credentials API',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}