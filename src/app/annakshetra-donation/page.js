import Header from '../../components/Header';
import Footer from '../../components/Footer';
import DonationForm from '../../components/DonationForm';

export const metadata = {
  title: 'Annakshetra Donation - KashiDarshan',
  description: 'Submit annakshetra donation details to support temple food distribution.',
};

export default function AnnakshetraDonationPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <DonationForm donationType="annakshetra" />
      <Footer />
    </main>
  );
}
