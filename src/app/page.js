// src/app/page.js
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

export const metadata = {
  title: 'KashiDarshan - Book Spiritual Kashi Yatra | Temple Tours & Hotel Stays',
  description:
    'Experience divine Kashi with KashiDarshan. Book AC/Non-AC rooms, guided temple tours, Ganga Aarti, and complete Kashi Yatra packages.',
  keywords:
    'Kashi Yatra, Varanasi hotel, temple darshan, Ganga Aarti, spiritual tour, Kashi Vishwanath booking',
};

export default function Home() {
  return (
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
  );
}
