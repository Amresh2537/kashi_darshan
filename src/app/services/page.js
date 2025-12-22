import Header from '../../components/Header';
import Services from '../../components/Services';
import Footer from '../../components/Footer';

// JSON-LD Structured Data for Services Page
const servicesSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  'name': 'कशीदर्शन Services',
  'description': 'Complete range of spiritual pilgrimage services for Kashi Yatra',
  'itemListElement': [
    {
      '@type': 'Service',
      'position': 1,
      'name': 'Hotel Accommodation',
      'description': 'AC/Non-AC rooms with modern amenities near Kashi Vishwanath Temple',
      'provider': {
        '@type': 'TravelAgency',
        'name': 'कशीदर्शन'
      },
      'areaServed': 'Varanasi, Uttar Pradesh',
      'priceRange': '₹2000 - ₹8000 per night'
    },
    {
      '@type': 'Service',
      'position': 2,
      'name': 'Temple Tour Packages',
      'description': 'Guided tours to Kashi Vishwanath, Sankat Mochan, Durga Temple, and other sacred sites',
      'provider': {
        '@type': 'TravelAgency',
        'name': 'कशीदर्शन'
      },
      'areaServed': 'Varanasi, Uttar Pradesh',
      'priceRange': '₹1500 - ₹5000 per person'
    },
    {
      '@type': 'Service',
      'position': 3,
      'name': 'Ganga Aarti Experience',
      'description': 'VIP seating arrangements for Dashashwamedh Ghat Aarti with boat services',
      'provider': {
        '@type': 'TravelAgency',
        'name': 'कशीदर्शन'
      },
      'areaServed': 'Dashashwamedh Ghat, Varanasi',
      'priceRange': '₹1000 - ₹3000 per person'
    },
    {
      '@type': 'Service',
      'position': 4,
      'name': 'Complete Kashi Yatra Package',
      'description': '5-7 days comprehensive pilgrimage including accommodation, meals, transport, and guided tours',
      'provider': {
        '@type': 'TravelAgency',
        'name': 'कशीदर्शन'
      },
      'areaServed': 'Varanasi, Uttar Pradesh',
      'priceRange': '₹15,000 - ₹50,000 per person'
    },
    {
      '@type': 'Service',
      'position': 5,
      'name': 'VIP Darshan Booking',
      'description': 'Priority darshan and special entry arrangements at major temples',
      'provider': {
        '@type': 'TravelAgency',
        'name': 'कशीदर्शन'
      },
      'areaServed': 'Kashi Vishwanath Temple, Varanasi'
    },
    {
      '@type': 'Service',
      'position': 6,
      'name': 'Spiritual Guidance',
      'description': 'Expert pandits for rituals, puja arrangements, and spiritual counseling',
      'provider': {
        '@type': 'TravelAgency',
        'name': 'कशीदर्शन'
      },
      'areaServed': 'Varanasi, Uttar Pradesh'
    }
  ]
};

// FAQ Schema for Services
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': [
    {
      '@type': 'Question',
      'name': 'What types of accommodation do you offer in Kashi?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'We offer both AC and Non-AC rooms with modern amenities, located within walking distance of Kashi Vishwanath Temple. Options range from budget rooms to premium suites.'
      }
    },
    {
      '@type': 'Question',
      'name': 'How do I book VIP darshan at Kashi Vishwanath Temple?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'We provide VIP darshan booking services through our partnership with temple authorities. Booking requires advance reservation with valid ID proof.'
      }
    },
    {
      '@type': 'Question',
      'name': 'What is included in the Complete Kashi Yatra Package?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Our complete package includes: Accommodation, all meals, temple entry fees, guided tours, Ganga Aarti arrangements, local transportation, and 24/7 support.'
      }
    },
    {
      '@type': 'Question',
      'name': 'Are your tour guides certified?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Yes, all our guides are government-certified with extensive knowledge of Varanasi history, temple architecture, and spiritual significance.'
      }
    },
    {
      '@type': 'Question',
      'name': 'What is the best time to visit Kashi?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'October to March is ideal for comfortable weather. However, Kashi can be visited year-round for spiritual purposes.'
      }
    }
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
      'name': 'Services',
      'item': 'https://www.kashidarshan.org/services'
    }
  ]
};

export const metadata = {
  title: 'कशीदर्शन Services | Complete Kashi Yatra Packages 2025 | Temple Tours & Hotel Booking',
  description: 'Discover complete Kashi Yatra services: AC/Non-AC hotel booking, guided temple tours, Ganga Aarti arrangements, VIP darshan, and spiritual guidance packages for 2025 pilgrimage.',
  keywords: [
    'Kashi Yatra services',
    'Varanasi hotel booking services',
    'Kashi Vishwanath temple tour packages',
    'Ganga Aarti booking services',
    'VIP darshan booking Kashi',
    'काशी यात्रा सेवाएं',
    'वाराणसी होटल बुकिंग सेवा',
    'गंगा आरती व्यवस्था',
    'वीआईपी दर्शन सेवा',
    '2025 pilgrimage services'
  ].join(', '),
  
  // Open Graph
  openGraph: {
    title: 'Complete Kashi Yatra Services | कशीदर्शन 2025',
    description: 'Explore our comprehensive range of Kashi pilgrimage services including accommodation, temple tours, and spiritual experiences',
    url: 'https://www.kashidarshan.org/services',
    siteName: 'कशीदर्शन',
    images: [
      {
        url: 'https://www.kashidarshan.org/services-og.jpg',
        width: 1200,
        height: 630,
        alt: 'KashiDarshan Services - Temple Tours & Hotel Packages'
      }
    ],
    locale: 'en_IN',
    type: 'website',
  },
  
  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'कशीदर्शन Services | Kashi Yatra Packages 2025',
    description: 'Complete range of Kashi pilgrimage services for your spiritual journey',
    images: ['https://www.kashidarshan.org/services-twitter.jpg'],
  },
  
  // Additional Meta
  authors: [{ name: 'कशीदर्शन Team' }],
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
  
  // Canonical
  alternates: {
    canonical: 'https://www.kashidarshan.org/services',
    languages: {
      'en-IN': 'https://www.kashidarshan.org/en/services',
      'hi-IN': 'https://www.kashidarshan.org/hi/services',
    },
  },
  
  // Structured Data
  other: {
    'application/ld+json': JSON.stringify(servicesSchema)
  }
};

export default function ServicesPage() {
  return (
    <>
      {/* Structured Data Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      {/* Hidden FAQ Section for SEO (visible to Google, hidden from users) */}
      <div className="hidden" aria-hidden="true">
        <h2>Frequently Asked Questions about Kashi Yatra Services</h2>
        <div itemScope itemType="https://schema.org/FAQPage">
          <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
            <h3 itemProp="name">What types of accommodation do you offer in Kashi?</h3>
            <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
              <p itemProp="text">We offer both AC and Non-AC rooms with modern amenities, located within walking distance of Kashi Vishwanath Temple. Options range from budget rooms to premium suites.</p>
            </div>
          </div>
          
          <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
            <h3 itemProp="name">How do I book VIP darshan at Kashi Vishwanath Temple?</h3>
            <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
              <p itemProp="text">We provide VIP darshan booking services through our partnership with temple authorities. Booking requires advance reservation with valid ID proof.</p>
            </div>
          </div>
          
          <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
            <h3 itemProp="name">What is included in the Complete Kashi Yatra Package?</h3>
            <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
              <p itemProp="text">Our complete package includes: Accommodation, all meals, temple entry fees, guided tours, Ganga Aarti arrangements, local transportation, and 24/7 support.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="min-h-screen">
        <Header />
        <Services />
        <Footer />
      </main>
    </>
  );
}