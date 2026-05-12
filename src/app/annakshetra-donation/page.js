import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Annakshetra Donation - KashiDarshan',
  description: 'Submit annakshetra donation details to support temple food distribution.',
};

export default function AnnakshetraDonationPage() {
  redirect('/donation');
}
