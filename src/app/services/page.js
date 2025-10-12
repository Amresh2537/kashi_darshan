// src/app/services/page.js
import Header from '../../components/Header';
import Services from '../../components/Services';
import Footer from '../../components/Footer';

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Services />
      <Footer />
    </main>
  );
}