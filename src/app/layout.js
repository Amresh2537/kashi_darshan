// src/app/layout.js
import './globals.css'

export const metadata = {
  title: 'KashiDarshan - Spiritual Journey to Kashi | Book Temple Tours & Hotel Stays',
  description: 'Book your spiritual journey to Kashi with KashiDarshan. Premium hotel stays, guided temple visits, Ganga Aarti experiences, and complete Kashi Yatra packages. AC/Non-AC rooms with traditional breakfast.',
  keywords: 'Kashi Darshan, Varanasi tour, Kashi Yatra, temple visit, Ganga Aarti, Kashi Vishwanath, hotel booking Varanasi, spiritual journey, Sankat Mochan, Kaal Bhairav, Sarnath tour',
  authors: [{ name: 'KashiDarshan' }],
  creator: 'KashiDarshan',
  publisher: 'KashiDarshan',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://kashidarshan.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
  openGraph: {
    title: 'KashiDarshan - Spiritual Journey to Kashi',
    description: 'Book your spiritual journey to Kashi with premium accommodation and guided temple visits',
    url: 'https://kashidarshan.com',
    siteName: 'KashiDarshan',
    images: [
      {
        url: '/logo.png', // Add your logo or hero image
        width: 1200,
        height: 630,
        alt: 'KashiDarshan - Spiritual Journey',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KashiDarshan - Spiritual Journey to Kashi',
    description: 'Book your spiritual journey to Kashi with premium accommodation',
    images: ['/logo.png'], // Add your logo or hero image
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
  verification: {
    // Add your Google Search Console verification code here
    // google: 'your-google-verification-code',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        
        {/* Structured Data for Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              "name": "KashiDarshan",
              "description": "Spiritual Journey to Kashi with premium accommodation and guided temple visits",
              "url": "https://kashidarshan.com",
              "telephone": "+91-96257-75972",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Varanasi",
                "addressRegion": "Uttar Pradesh",
                "addressCountry": "IN"
              },
              "openingHours": "Mo-Su 24/7",
              "areaServed": "India",
              "serviceType": [
                "Hotel Booking",
                "Temple Tours",
                "Spiritual Guidance",
                "Travel Arrangements"
              ]
            })
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}