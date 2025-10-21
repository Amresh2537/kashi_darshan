// src/app/services/page.js
import Header from '../../components/Header';
import Services from '../../components/Services';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Our Services - KashiDarshan | Temple Tours & Hotel Packages',
  description: 'Explore KashiDarshan services: AC/Non-AC rooms, temple packages, Ganga Aarti, guided tours, and complete Kashi Yatra experiences.',
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Services />
      <Footer />
    </main>
  );
}