// src/components/DonationPopup.js
'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function DonationPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [customAmount, setCustomAmount] = useState('');

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  // Prevent closing when clicking inside popup content
  const handlePopupClick = (e) => {
    e.stopPropagation();
  };

  const handleQuickDonation = (amount) => {
    alert(`Thank you for your generous donation of ₹${amount}! 🙏\n\nPlease scan the UPI code to complete your payment.`);
  };

  const handleCustomDonation = () => {
    if (!customAmount || customAmount < 10) {
      alert('Please enter a valid amount (minimum ₹10)');
      return;
    }
    alert(`Thank you for your generous donation of ₹${customAmount}! 🙏\n\nPlease scan the UPI code to complete your payment.`);
    setCustomAmount('');
  };

  return (
    <>
      {/* Donation Button */}
      <button
        onClick={openPopup}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
        Donate Now
      </button>

      {/* Popup Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closePopup}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-auto transform transition-all duration-300 scale-95 hover:scale-100 max-h-[90vh] overflow-y-auto"
            onClick={handlePopupClick}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-t-2xl text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">Support Our Cause</h2>
              <p className="text-green-100 opacity-90">Make a Difference Through Your Donation</p>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Message */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <p className="text-amber-800 text-center text-sm leading-relaxed">
                  <span className="font-semibold">"If you wish, you may make a donation from your own will for the food distribution (bhandara) at the shelter for the poor and orphans."</span>
                </p>
              </div>

              {/* UPI Scanner Image */}
              <div className="mb-6 text-center">
                <div className="bg-gray-100 rounded-lg p-4 mb-4 border-2 border-dashed border-green-300">
                  <div className="relative h-64 w-full mx-auto">
                    <Image
                      src="/upi-scanner.jpeg"
                      alt="UPI Scanner Code - Scan to Donate"
                      fill
                      className="object-contain rounded-lg"
                      onError={(e) => {
                        console.error('Image failed to load:', e);
                        // Fallback if image doesn't exist
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    {/* Fallback if image doesn't load */}
                    <div className="hidden w-full h-full bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex flex-col items-center justify-center">
                      <svg className="w-16 h-16 text-green-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <p className="text-green-600 font-semibold">UPI Scanner Code</p>
                      <p className="text-green-500 text-sm mt-1">Image not found</p>
                      <p className="text-green-400 text-xs mt-2">Please add upi-scanner.jpeg to public folder</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  Scan this QR code with any UPI app to make your donation
                </p>
                <p className="text-xs text-gray-500">
                  (PhonePe, Google Pay, Paytm, BHIM, etc.)
                </p>
              </div>

              {/* Donation Options */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 text-center">Quick Donation</h3>
                <div className="grid grid-cols-3 gap-3">
                  {[100, 500, 1000, 2100, 5100, 11000].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => handleQuickDonation(amount)}
                      className="bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg py-3 px-2 text-green-700 font-semibold transition duration-200 hover:scale-105 text-sm"
                    >
                      ₹{amount}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Amount */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 text-center">Custom Amount</h3>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    placeholder="Enter amount in ₹"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-center text-lg font-semibold"
                    min="10"
                  />
                  <button 
                    onClick={handleCustomDonation}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-200 min-w-20"
                  >
                    Donate
                  </button>
                </div>
              </div>

              {/* UPI ID Display */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-600 mb-2 text-center">Or send directly to UPI ID:</p>
                <div className="flex items-center justify-between bg-white p-3 rounded border-2 border-green-200">
                  <code className="text-green-600 font-mono font-bold text-lg">kashidarshan@upi</code>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText('kashidarshan@upi');
                      alert('UPI ID copied to clipboard! 📋');
                    }}
                    className="text-green-600 hover:text-green-700 p-2 rounded-lg hover:bg-green-50 transition duration-200"
                    title="Copy UPI ID"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Impact Message */}
              <div className="text-center bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-green-800 font-semibold">Your Impact</p>
                </div>
                <p className="text-xs text-green-700">
                  Every donation helps serve <span className="font-bold">50+ meals</span> to underprivileged families
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-4 bg-gray-50 rounded-b-2xl">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                <button
                  onClick={closePopup}
                  className="text-gray-600 hover:text-gray-800 font-medium px-4 py-2 transition duration-200 hover:bg-gray-200 rounded-lg flex-1 text-center w-full sm:w-auto"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    alert('Thank you for your generosity! 🙏\nMay your donation bring blessings to many lives.');
                    closePopup();
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition duration-200 transform hover:scale-105 flex-1 text-center w-full sm:w-auto"
                >
                  I've Donated 🙏
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}