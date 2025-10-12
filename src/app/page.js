// src/app/page.js
import Header from '../components/Header';
import Hero from '../components/Hero';
import Services from '../components/Services';
import VideoSection from '../components/VideoSection';
import Gallery from '../components/Gallery';
import BookingForm from '../components/BookingForm';
import ContactPerson from '../components/ContactPerson';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <VideoSection />
      <Gallery />
      <ContactPerson />
      <Services />
       <BookingForm />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}