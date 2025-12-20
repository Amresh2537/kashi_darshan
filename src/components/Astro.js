'use client';

import WhatsAppButton from './WhatsAppButton';

export default function Astro() {
  // WhatsApp function
  const handleWhatsApp = () => {
    const phoneNumber = "919625775962";
    const message =
      "Hello, I'm interested in astrology consultation with Pandit Gaurav Dixit.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, '_blank');
  };

  // Call function
  const handleCall = () => {
    window.location.href = "tel:+919625775962";
  };

  // Consultation booking function
  const handleConsultation = () => {
    const phoneNumber = "919625775962";
    const message =
      "I would like to book an astrology consultation with Pandit Gaurav Dixit.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-100">
      {/* Hero Section */}
      <section className="pt-16 pb-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <div className="relative bg-white p-2 rounded-full shadow-2xl">
                <img
                  src="/astro.jpeg"
                  alt="Pandit Gaurav Dixit"
                  className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-4 border-orange-200"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-orange-600 text-white px-6 py-3 rounded-full shadow-lg font-semibold">
                ⭐ 15+ Years Experience
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="text-center md:text-left">
            <div className="inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              🕉️ Vedic Astrologer | वैदिक ज्योतिषी
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              गौरव दीक्षित
              <span className="block text-3xl md:text-4xl text-orange-600 mt-2">
                Gaurav Dixit
              </span>
            </h1>

            <p className="text-xl text-gray-700 mb-2">
              सटीक कुंडली विश्लेषण • व्यावहारिक उपाय • स्पष्ट मार्गदर्शन
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Accurate Kundali Analysis • Practical Remedies • Clear Guidance
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button
                onClick={handleConsultation}
                className="bg-gradient-to-r from-orange-600 to-amber-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition"
              >
                📅 परामर्श बुक करें
              </button>

              <button
                onClick={handleWhatsApp}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg transition"
              >
                💬 WhatsApp Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl shadow-lg"
            >
              <div className="text-4xl mb-2">{service.icon}</div>
              <h3 className="font-bold text-lg">{service.titleHi}</h3>
              <p className="text-orange-600">{service.titleEn}</p>
              <p className="text-sm text-gray-600 mt-2">{service.descHi}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-amber-600 text-white text-center">
        <h2 className="text-4xl font-bold mb-4">
          Get Your Kundali Analyzed Today
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleCall}
            className="bg-white text-orange-600 px-10 py-4 rounded-xl font-bold"
          >
            📞 Call Now
          </button>

          <button
            onClick={handleWhatsApp}
            className="bg-green-500 px-10 py-4 rounded-xl font-bold"
          >
            💬 WhatsApp Chat
          </button>
        </div>
      </section>

      <WhatsAppButton />
    </main>
  );
}

const services = [
  {
    icon: "🔮",
    titleHi: "जन्म कुंडली विश्लेषण",
    titleEn: "Birth Chart Analysis",
    descHi: "विस्तृत जन्म कुंडली विश्लेषण",
  },
  {
    icon: "🪔",
    titleHi: "ग्रह दोष उपाय",
    titleEn: "Planetary Remedies",
    descHi: "ग्रह दोषों के प्रभावी उपाय",
  },
  {
    icon: "💑",
    titleHi: "विवाह मिलान",
    titleEn: "Marriage Matching",
    descHi: "कुंडली मिलान और समाधान",
  },
];
