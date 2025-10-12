// src/components/ContactPerson.js
'use client';
import Image from 'next/image';
import DonationPopup from './DonationPopup';

export default function ContactPerson() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-orange-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-orange-800 mb-4">Our Contact Person</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get in touch with our dedicated team for your spiritual journey to Kashi
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Main Contact Card */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-orange-200">
            <div className="md:flex">
              {/* Image Section - Larger and Better Design */}
              <div className="md:w-2/5 bg-gradient-to-br from-orange-500 to-amber-600 p-8 flex items-center justify-center">
                <div className="relative">
                  <div className="w-48 h-48 md:w-56 md:h-56 rounded-full border-4 border-white/30 shadow-2xl overflow-hidden mx-auto">
                    <Image 
                      src="/krishnakant.jpeg" 
                      alt="Krishnakant - Darshan & Yatra Person"
                      width={224}
                      height={224}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>
                  {/* Decorative Elements */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-300 rounded-full animate-pulse"></div>
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-orange-300 rounded-full animate-pulse delay-1000"></div>
                </div>
              </div>

              {/* Content Section */}
              <div className="md:w-3/5 p-8">
                <div className="text-center md:text-left">
                  {/* Name and Title */}
                  <div className="mb-6">
                    <h3 className="text-3xl font-bold text-gray-800 mb-2">Krishnakant</h3>
                    <div className="inline-flex items-center bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Darshan & Yatra Expert
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center justify-center md:justify-start space-x-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Call directly</p>
                        <a 
                          href="tel:+919625775962" 
                          className="text-lg font-semibold text-gray-800 hover:text-orange-600 transition duration-300"
                        >
                          +91 96257 75962
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center justify-center md:justify-start space-x-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Email us at</p>
                        <a 
                          href="mailto:krishnakantk90@gmail.com" 
                          className="text-lg font-semibold text-gray-800 hover:text-orange-600 transition duration-300"
                        >
                         krishnakantk90@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                    <p className="text-amber-800 text-sm text-center">
                      <span className="font-semibold">Available 24/7</span> for your Kashi Darshan queries and bookings
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                    <a 
                      href="tel:+919625775962" 
                      className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Call Now
                    </a>
                    <a 
                      href="https://wa.me/919625775962" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-green-500 text-green-600 hover:bg-green-50 font-semibold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893-.001-3.189-1.262-6.189-3.553-8.436"/>
                      </svg>
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Support Section */}
          <div className="mt-8 text-center">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-green-800 mb-3">Support Our Charitable Work</h3>
              <p className="text-green-700 mb-4 text-sm leading-relaxed">
                "If you wish, you may make a donation from your own will for the food distribution (bhandara) at the shelter for the poor and orphans."
              </p>
              <DonationPopup />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}