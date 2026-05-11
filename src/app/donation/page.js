import Header from '../../components/Header';
import Footer from '../../components/Footer';
import DonationForm from '../../components/DonationForm';

export const metadata = {
  title: 'Donation - KashiDarshan',
  description: 'Submit your donation details for bhandara and charitable causes through KashiDarshan.',
};

export default function DonationPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <DonationForm />
      <Footer />
    </main>
  );
}
