// src/components/BookingForm.js
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BookingForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    roomType: '',
    templePackage: '',
    guests: '1',
    specialRequests: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      const response = await fetch('/api/send-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        // Redirect to thank you page
        router.push('/thank-you');
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-orange-800 mb-4">Book Your Spiritual Journey</h2>
            <p className="text-lg text-gray-600">Fill in the details to book your Kashi Darshan experience</p>
          </div>

          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
              <p>❌ There was an error submitting your request. Please try again or contact us directly.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Number of Guests *</label>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {[1,2,3,4,5,6].map(num => (
                    <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Check-in Date *</label>
                <input
                  type="date"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Check-out Date *</label>
                <input
                  type="date"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Room Type *</label>
                <select
                  name="roomType"
                  value={formData.roomType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Select Room Type</option>
                  <option value="ac">AC Room - 2399/-per day</option>
                  <option value="non-ac">Non-AC Room - 1699/- per day</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Temple Package</label>
                <select
                  name="templePackage"
                  value={formData.templePackage}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Select Temple Package</option>
                  
                  {/* Complete Packages */}
                  <optgroup label="🎯 Complete Experience Packages">
                    <option value="complete-all">Complete Kashi Darshan (All Major Temples + Ghats)</option>
                    <option value="premium-darshan">Premium Spiritual Journey (VIP Darshan + Guide)</option>
                    <option value="basic-darshan">Basic Temple Tour (10 Major Temples)</option>
                  </optgroup>

                  {/* Major Temple Packages */}
                  <optgroup label="🛕 Major Temple Packages">
                    <option value="vishwanath-special">Kashi Vishwanath Special Darshan</option>
                    <option value="all-mandirs">All Major Temples Package</option>
                    <option value="shakti-peeth">Shakti Peeth Temples (Durga, Annapurna, Vishalakshi)</option>
                    <option value="hanuman-bhakti">Hanuman Bhakti (Sankat Mochan + Others)</option>
                  </optgroup>

                  {/* Individual Major Temples */}
                  <optgroup label="🌟 Individual Major Temples">
                    <option value="kashi-vishwanath">Kashi Vishwanath Temple</option>
                    <option value="sankat-mochan">Sankat Mochan Hanuman Temple</option>
                    <option value="kaal-bhairav">Kaal Bhairav Temple</option>
                    <option value="durga-mata">Durga Mata Temple (Monkey Temple)</option>
                    <option value="annapurna-mandir">Annapurna Mandir</option>
                    <option value="vishalakshi-mata">Shri Vishalakshi Mata Mandir</option>
                    <option value="tulsi-manas">Tulsi Manas Temple</option>
                    <option value="bharat-mata">Bharat Mata Mandir</option>
                  </optgroup>

                  {/* Ghat Experiences */}
                  <optgroup label="🌅 Ghat Experiences">
                    <option value="ghat-aarti">Evening Ganga Aarti Experience</option>
                    <option value="morning-ghats">Morning Ghats Tour (Boat Ride)</option>
                    <option value="all-ghats">All Major Ghats Tour</option>
                    <option value="dashashwamedh">Dashashwamedh Ghat Special</option>
                    <option value="assi-ghat">Assi Ghat Cultural Experience</option>
                    <option value="manikarnika">Manikarnika Ghat Visit</option>
                    <option value="namo-ghat">Namo Ghat with Aarti</option>
                    <option value="panchganga-ghat">Panchganga Ghat Visit</option>
                  </optgroup>

                  {/* Special Poojas & Rituals */}
                  <optgroup label="🕉️ Special Poojas & Rituals">
                    <option value="gangaa-aarti">Special Ganga Aarti Participation</option>
                    <option value="rudrabhishek">Rudrabhishek Pooja</option>
                    <option value="mahamrityunjaya">Mahamrityunjaya Jaap</option>
                    <option value="sunderkand-paath">Sunderkand Paath</option>
                    <option value="havan">Havan Ceremony</option>
                    <option value="pitru-tarpan">Pitru Tarpan (Ancestral Ritual)</option>
                    <option value="ganga-snan">Ganga Snan with Pooja</option>
                  </optgroup>

                  {/* Buddhist Circuit */}
                  <optgroup label="☸️ Buddhist Circuit">
                    <option value="sarnath-tour">Sarnath Complete Tour</option>
                    <option value="buddhist-circuit">Buddhist Circuit (Sarnath + Temples)</option>
                  </optgroup>

                  {/* Custom Combinations */}
                  <optgroup label="🔧 Custom Combinations">
                    <option value="custom-temples">Custom Temple Selection</option>
                    <option value="custom-ghats">Custom Ghats Experience</option>
                    <option value="mixed-package">Mixed Temple + Ghat Package</option>
                  </optgroup>

                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Special Requests</label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Any special requirements or requests..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full font-bold py-4 px-8 rounded-lg text-lg transition duration-300 transform hover:scale-105 ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-orange-600 hover:bg-orange-700'
              } text-white flex items-center justify-center gap-2`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                'Submit Booking Request'
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}