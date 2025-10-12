// src/app/layout.js
import './globals.css'

export const metadata = {
  title: 'KashiDarshan - Spiritual Journey to Kashi',
  description: 'Book your spiritual journey to Kashi with premium hotel stays and temple visits',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}