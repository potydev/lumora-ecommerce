import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
})

export const metadata: Metadata = {
  title: 'Lumora - Solid Facial Cleanser | Clean Skin, Zero Plastic',
  description: 'Pembersih wajah padat premium yang ramah lingkungan. Clean skin, zero plastic - untuk kulit sehat dan bumi yang lebih baik.',
  keywords: 'solid facial cleanser, pembersih wajah padat, eco-friendly skincare, zero waste beauty, natural skincare',
  authors: [{ name: 'Lumora' }],
  creator: 'Lumora',
  publisher: 'Lumora',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'Lumora - Solid Facial Cleanser | Clean Skin, Zero Plastic',
    description: 'Pembersih wajah padat premium yang ramah lingkungan. Clean skin, zero plastic - untuk kulit sehat dan bumi yang lebih baik.',
    url: '/',
    siteName: 'Lumora',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Lumora - Solid Facial Cleanser',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lumora - Solid Facial Cleanser | Clean Skin, Zero Plastic',
    description: 'Pembersih wajah padat premium yang ramah lingkungan. Clean skin, zero plastic - untuk kulit sehat dan bumi yang lebih baik.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 pt-16 lg:pt-20">
            {children}
          </main>
          <Footer />
        </div>
        <Toaster position="top-right" />
      </body>
    </html>
  )
}

