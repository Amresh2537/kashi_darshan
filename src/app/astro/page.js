// src/app/booking/page.js
import Header from '../../components/Header';
import Astro from '@/components/Astro';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Book Your Kashi Yatra - KashiDarshan | Easy Online Booking',
  description: 'Book your spiritual journey to Kashi online. Choose from temple packages, hotel stays, and guided tours. Secure booking with instant confirmation.',
}

export default function BookingPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Astro />
      <Footer />
    </main>
  );
}