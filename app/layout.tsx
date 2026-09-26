import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import CustomCursor from '@/components/CustomCursor'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' })

export const metadata: Metadata = {
  title: 'Developer Portfolio',
  description: 'Production-ready developer portfolio with Antigravity aesthetic.',
  openGraph: {
    title: 'Developer Portfolio',
    description: 'Production-ready developer portfolio with Antigravity aesthetic.',
    url: 'https://myportfolio.com',
    siteName: 'Developer Portfolio',
    images: [
      {
        url: 'https://myportfolio.com/og.png', // TODO: Add real OG image
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-background text-white antialiased`}>
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
