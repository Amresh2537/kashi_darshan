// src/app/booking/page.js
import Header from '../../components/Header';
import BookingForm from '../../components/BookingForm';
import Footer from '../../components/Footer';

export default function BookingPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <BookingForm />
      <Footer />
    </main>
  );
}