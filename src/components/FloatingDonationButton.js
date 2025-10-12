// src/components/FloatingDonationButton.js
'use client';
import DonationPopup from './DonationPopup';

export default function FloatingDonationButton() {
  return (
    <div className="fixed bottom-6 left-6 z-50">
      <div className="relative group">
        <button className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>
        </button>
        <div className="absolute bottom-16 left-0 bg-green-600 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          Support Our Cause
          <div className="absolute -bottom-1 left-3 w-2 h-2 bg-green-600 transform rotate-45"></div>
        </div>
      </div>
    </div>
  );
}