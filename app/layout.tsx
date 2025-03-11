import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/app/components/providers/AuthProvider'
import { ThemeProvider } from '@/app/components/providers/ThemeProvider'
import { Navigation } from '@/app/components/layout/Navigation'
import { Footer } from '@/app/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Soplang Hub',
  description: 'The official package registry for Soplang',
  metadataBase: new URL('https://soplanghub.io'),
  openGraph: {
    title: 'Soplang Hub',
    description: 'The official package registry for Soplang',
    url: 'https://soplanghub.io',
    siteName: 'Soplang Hub',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Soplang Hub',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Soplang Hub',
    description: 'The official package registry for Soplang',
    images: ['/images/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-white dark:bg-gray-900`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <div className="flex min-h-screen flex-col">
              <Navigation />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster position="bottom-right" />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
} 