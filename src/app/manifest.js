export default function manifest() {
  return {
    name: 'कशीदर्शन | Complete Kashi Yatra Booking Platform',
    short_name: 'कशीदर्शन',
    description: 'Book complete Kashi Yatra packages with hotel stays, temple tours, Ganga Aarti, and spiritual guidance for your 2025 pilgrimage',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#f97316', // Orange-500
    orientation: 'portrait-primary',
    scope: '/',
    lang: 'en-IN',
    dir: 'ltr',
    categories: ['travel', 'lifestyle', 'religion'],
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        src: '/safari-pinned-tab.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'maskable',
        color: '#f97316',
      },
    ],
    shortcuts: [
      {
        name: 'Book Kashi Yatra',
        short_name: 'Book Now',
        description: 'Book your complete Kashi pilgrimage package',
        url: '/#booking',
        icons: [{ src: '/icon-96x96.png', sizes: '96x96' }],
      },
      {
        name: 'View Packages',
        short_name: 'Packages',
        description: 'Explore our Kashi Yatra packages',
        url: '/#packages',
        icons: [{ src: '/icon-96x96.png', sizes: '96x96' }],
      },
      {
        name: 'Contact Us',
        short_name: 'Contact',
        description: 'Get in touch for spiritual guidance',
        url: '/contact',
        icons: [{ src: '/icon-96x96.png', sizes: '96x96' }],
      },
    ],
    screenshots: [
      {
        src: '/screenshots/home-desktop.jpg',
        sizes: '1280x720',
        type: 'image/jpeg',
        form_factor: 'wide',
        label: 'कशीदर्शन Homepage Desktop',
      },
      {
        src: '/screenshots/home-mobile.jpg',
        sizes: '375x812',
        type: 'image/jpeg',
        form_factor: 'narrow',
        label: 'कशीदर्शन Homepage Mobile',
      },
    ],
    related_applications: [
      {
        platform: 'play',
        url: 'https://play.google.com/store/apps/details?id=org.kashidarshan.app',
        id: 'org.kashidarshan.app',
      },
      {
        platform: 'itunes',
        url: 'https://apps.apple.com/in/app/kashidarshan/id123456789',
      },
    ],
    prefer_related_applications: false,
  };
}