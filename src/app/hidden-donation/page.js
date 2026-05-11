import Header from '../../components/Header';
import Footer from '../../components/Footer';
import DonationForm from '../../components/DonationForm';

export const metadata = {
  title: 'Hidden Donation - KashiDarshan',
  description: 'Submit hidden donation details for Shri Kashi Vishwanath Temple Trust.',
};

export default function HiddenDonationPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <DonationForm donationType="hidden" />
      <Footer />
    </main>
  );
}
