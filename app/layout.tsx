import type { Metadata } from 'next'
import { Inter, Space_Grotesk, VT323, Space_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import CustomRetroCursor from '@/components/CustomRetroCursor'

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-sans',
  display: 'swap'
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'], 
  variable: '--font-space',
  display: 'swap'
})

// Classic 1980s Terminal & Pixel Display Fonts (SIL Open Font License)
const vt323 = VT323({ 
  weight: '400', 
  subsets: ['latin'], 
  variable: '--font-pixel',
  display: 'swap'
})

const spaceMono = Space_Mono({ 
  weight: ['400', '700'], 
  subsets: ['latin'], 
  variable: '--font-mono',
  display: 'swap'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://github.com/Nitin-kanojiya26/portfolio'),
  title: 'Nitin Kanojiya | Software Engineer Portfolio',
  description: 'Backend Developer & Software Engineer portfolio built with an architectural retro 1-bit workstation aesthetic.',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'Nitin Kanojiya | Software Engineer Portfolio',
    description: 'Backend Developer & Software Engineer portfolio built with an architectural retro 1-bit workstation aesthetic.',
    url: 'https://github.com/Nitin-kanojiya26/portfolio',
    siteName: 'Nitin Kanojiya Portfolio',
    images: [
      {
        url: '/myphoto_transparent.png',
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
    <html lang="en" data-theme="light" className="light" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" sizes="any" />
        <link rel="shortcut icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" sizes="any" />
        <link rel="shortcut icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
              try {
                localStorage.removeItem('retro_theme');
                var saved = localStorage.getItem('retro_theme_v2');
                var theme = (saved === 'dark' || saved === 'light') ? saved : 'light';
                document.documentElement.setAttribute('data-theme', theme);
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                  document.documentElement.classList.remove('light');
                } else {
                  document.documentElement.classList.add('light');
                  document.documentElement.classList.remove('dark');
                }
              } catch(e) {}
            })();`,
          }}
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${vt323.variable} ${spaceMono.variable} antialiased min-h-screen selection:bg-[#00e5ff] selection:text-black`}>
        <ThemeProvider>
          <CustomRetroCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
