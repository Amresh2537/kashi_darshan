// src/components/ContactPerson.js
'use client';
import Image from 'next/image';

export default function ContactPerson() {
  return (
    <section className="py-12 bg-orange-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-orange-800 mb-4">Our Contact Persons</h2>
          <p className="text-gray-600">Get in touch with our dedicated team for your Kashi Darshan</p>
        </div>
        
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <Image 
                  src="/Krishnakant.jpeg" 
                  alt="Krishnakant - Darshan & Yatra Person"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-800">Krishnakant</h3>
              <p className="text-orange-600 font-medium">Darshan & Yatra Person</p>
              <a 
                href="tel:+919625775972" 
                className="text-gray-700 hover:text-orange-600 transition duration-300 block mt-1"
              >
                +91 96257 75972
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}