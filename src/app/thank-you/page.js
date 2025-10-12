// src/app/thank-you/page.js
import Link from 'next/link';

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Thank You!</h1>
        
        <div className="text-amber-600 text-6xl mb-6">🛕</div>
        
        <p className="text-gray-600 mb-6 text-lg">
          Your booking request has been submitted successfully. We have received your details and will contact you within 24 hours to confirm your booking.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-amber-800 mb-2">What's Next?</h3>
          <ul className="text-sm text-amber-700 text-left space-y-1">
            <li>✅ We'll call you to confirm details</li>
            <li>✅ Discuss payment options</li>
            <li>✅ Provide booking confirmation</li>
            <li>✅ Share travel guidelines</li>
          </ul>
        </div>

        <div className="space-y-4">
          <Link 
            href="/"
            className="block w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
          >
            Back to Home
          </Link>
          
          <Link 
            href="/booking"
            className="block w-full border border-orange-600 text-orange-600 hover:bg-orange-50 font-bold py-3 px-6 rounded-lg transition duration-300"
          >
            Book Another Journey
          </Link>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            For immediate assistance, contact us at:
          </p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="tel:+919625775972" className="text-orange-600 hover:text-orange-700 text-sm">
              📞 +91 96257 75972
            </a>
            <a href="https://wa.me/916392838207" className="text-green-600 hover:text-green-700 text-sm">
              💬 WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}