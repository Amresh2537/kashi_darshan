// src/components/Footer.js
import DonationPopup from './DonationPopup';

export default function Footer() {
  return (
    <footer id="contact" className="bg-orange-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-amber-300 mb-4">KashiDarshan</h3>
            <p className="text-amber-100 mb-4">
              Your trusted partner for spiritual journeys to Kashi. Experience divine blessings with our premium services.
            </p>
            <div className="space-y-2 text-sm">
              <p><strong>WhatsApp:</strong> +91 63928 38207</p>
              <p><strong>Contact Person:</strong> Krishnakant - +91 96257 75962</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-amber-100 hover:text-amber-300 transition">Home</a></li>
              <li><a href="/services" className="text-amber-100 hover:text-amber-300 transition">Services</a></li>
              <li><a href="/booking" className="text-amber-100 hover:text-amber-300 transition">Booking</a></li>
              <li><a href="#gallery" className="text-amber-100 hover:text-amber-300 transition">Gallery</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-amber-100">
              <li>Email: krishnakantk90@gmail.com</li>
              <li>Phone: +91 9625776962</li>
              <li>Varanasi, Uttar Pradesh</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Support Our Cause</h4>
            <div className="bg-amber-800/30 rounded-lg p-4 mb-4">
              <p className="text-amber-100 text-sm mb-3 leading-relaxed">
                "If you wish, you may make a donation from your own will for the food distribution (bhandara) at the shelter for the poor and orphans."
              </p>
              <DonationPopup />
            </div>
          </div>
        </div>
        
        <div className="border-t border-orange-700 mt-8 pt-8 text-center">
          <p className="text-amber-200">
            &copy; 2024 KashiDarshan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}