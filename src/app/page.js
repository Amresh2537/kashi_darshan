import Header from '../components/Header';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Gallery from '../components/Gallery';
import ContactPerson from '../components/ContactPerson';
import BookingForm from '../components/BookingForm';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import dynamic from 'next/dynamic';

// Client Component (NO ssr:false in Server Component)
const Astro = dynamic(() => import('@/components/Astro'), {
  loading: () => <p>Loading...</p>,
});

// JSON-LD Structured Data for SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  'name': 'कशीदर्शन - KashiDarshan',
  'description': 'Complete spiritual pilgrimage services for Kashi Yatra including temple tours, hotel stays, and guided experiences',
  'url': 'https://www.kashidarshan.org',
  'logo': 'https://www.kashidarshan.org/logo.png',
  'contactPoint': {
    '@type': 'ContactPoint',
    'telephone': '+91-9717400435',
    'contactType': 'customer service',
    'areaServed': 'IN',
    'availableLanguage': ['Hindi', 'English']
  },
  'address': {
    '@type': 'PostalAddress',
    'addressLocality': 'Varanasi',
    'addressRegion': 'Uttar Pradesh',
    'addressCountry': 'IN'
  },
  'sameAs': [
    'https://facebook.com/kashidarshan',
    'https://instagram.com/kashidarshan',
    'https://twitter.com/kashidarshan'
  ]
};

// Breadcrumb Schema
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  'itemListElement': [
    {
      '@type': 'ListItem',
      'position': 1,
      'name': 'Home',
      'item': 'https://www.kashidarshan.org'
    },
    {
      '@type': 'ListItem',
      'position': 2,
      'name': 'Kashi Yatra Packages',
      'item': 'https://www.kashidarshan.org/#packages'
    },
    {
      '@type': 'ListItem',
      'position': 3,
      'name': 'Book Now',
      'item': 'https://www.kashidarshan.org/#booking'
    }
  ]
};

// Local Business Schema
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'TouristAttraction',
  'name': 'Kashi Vishwanath Temple Tour',
  'description': 'Guided temple tour with VIP darshan and spiritual explanations',
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': 'Lahori Tola, Varanasi',
    'addressLocality': 'Varanasi',
    'addressRegion': 'Uttar Pradesh',
    'postalCode': '221001',
    'addressCountry': 'IN'
  },
  'geo': {
    '@type': 'GeoCoordinates',
    'latitude': '25.3176',
    'longitude': '83.0058'
  },
  'openingHoursSpecification': {
    '@type': 'OpeningHoursSpecification',
    'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    'opens': '03:00',
    'closes': '23:00'
  }
};

export const metadata = {
  title: 'कशीदर्शन | Book Complete Kashi Yatra Package 2026 | Temple Tours & Hotel Stay',
  description: 'Complete Kashi Yatra package with AC/Non-AC hotel stays, guided temple tours, Ganga Aarti, VIP darshan booking, and spiritual experiences in Varanasi. Book now for 2026 pilgrimage.',
  keywords: [
    'Kashi Yatra package',
    'Varanasi hotel booking',
    'Kashi Vishwanath temple tour',
    'Ganga Aarti booking',
    'spiritual pilgrimage Varanasi',
    'काशी यात्रा पैकेज',
    'वाराणसी होटल बुकिंग',
    'गंगा आरती दर्शन',
    'वीआईपी दर्शन बुकिंग',
    '2026 pilgrimage packages'
  ].join(', '),
  
  // Open Graph for Social Media
  openGraph: {
    title: 'कशीदर्शन | Complete Kashi Yatra Package 2026',
    description: 'Experience divine Kashi with guided temple tours, comfortable stays, and spiritual ceremonies. Book your 2026 pilgrimage now.',
    url: 'https://www.kashidarshan.org',
    siteName: 'कशीदर्शन - KashiDarshan',
    images: [
      {
        url: 'https://www.kashidarshan.org/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Kashi Vishwanath Temple with KashiDarshan logo'
      }
    ],
    locale: 'en_IN',
    type: 'website',
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'कशीदर्शन | Complete Kashi Yatra Package',
    description: 'Book your 2026 Kashi pilgrimage with temple tours, hotel stays, and spiritual experiences',
    images: ['https://www.kashidarshan.org/twitter-image.jpg'],
    creator: '@kashidarshan',
    site: '@kashidarshan',
  },
  
  // Additional Meta Tags
  authors: [{ name: 'कशीदर्शन Team' }],
  publisher: 'कशीदर्शन',
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
  
  // Verification
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
    other: {
      'facebook-domain-verification': ['your-facebook-verification-code']
    }
  },
  
  // Canonical URL
  alternates: {
    canonical: 'https://www.kashidarshan.org',
    languages: {
      'en-IN': 'https://www.kashidarshan.org/en',
      'hi-IN': 'https://www.kashidarshan.org/hi',
    },
  },
  
  // Apple Touch Icons
  appleWebApp: {
    capable: true,
    title: 'कशीदर्शन',
    statusBarStyle: 'black-translucent',
  },
  
  // Theme Color
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f97316' }, // orange-500
    { media: '(prefers-color-scheme: dark)', color: '#ea580c' },  // orange-600
  ],
  
  // Viewport
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function Home() {
  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      
      {/* Main Content */}
      <main className="min-h-screen">
        <Header />
        <Hero />
        <Services />
        <Gallery />
        <ContactPerson />
        <BookingForm />
        <Astro />
        <Footer />
        <WhatsAppButton />
      </main>
    </>
  );
}