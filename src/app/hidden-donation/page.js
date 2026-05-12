import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Hidden Donation - KashiDarshan',
  description: 'Submit hidden donation details for Shri Kashi Vishwanath Temple Trust.',
};

export default function HiddenDonationPage() {
  redirect('/donation');
}
