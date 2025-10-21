// src/app/manifest.js
export default function manifest() {
  return {
    name: 'KashiDarshan - Spiritual Journey to Kashi',
    short_name: 'KashiDarshan',
    description: 'Book your spiritual journey to Kashi with premium accommodation and guided temple visits',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#D2691E',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}