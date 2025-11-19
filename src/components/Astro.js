import WhatsAppButton from './WhatsAppButton';

export default function Astro() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-100">
      {/* Hero Section with Image */}
      <section className="pt-16 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Image */}
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
                  ⭐ 5+ Years Experience
                </div>
              </div>
            </div>

            {/* Right: Text */}
            <div className="text-center md:text-left">
              <div className="inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                🕉️ Vedic Astrologer | वैदिक ज्योतिषी
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">
                गौरव दीक्षित
                <span className="block text-3xl md:text-4xl text-orange-600 mt-2">Gaurav Dixit</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 mb-4 leading-relaxed">
                सटीक कुंडली विश्लेषण • व्यावहारिक उपाय • स्पष्ट मार्गदर्शन
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Accurate Kundali Analysis • Practical Remedies • Clear Guidance
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  📅 परामर्श बुक करें
                </button>
                <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  💬 WhatsApp Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              गौरव दीक्षित के बारे में
            </h2>
            <h3 className="text-2xl text-orange-600 font-semibold mb-6">
              About Gaurav Dixit
            </h3>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-8 md:p-12 rounded-2xl shadow-lg">
            <p className="text-lg text-gray-700 leading-relaxed mb-6 text-center">
              गौरव दीक्षित एक अनुभवी वैदिक ज्योतिषी हैं जो कुंडली विश्लेषण और व्यावहारिक उपायों में विशेषज्ञता रखते हैं। 
              वह पारंपरिक वैदिक सिद्धांतों को आधुनिक जीवनशैली के साथ जोड़कर सरल और प्रभावी मार्गदर्शन प्रदान करते हैं।
            </p>
            <p className="text-lg text-gray-600 leading-relaxed text-center">
              Gaurav Dixit is an experienced Vedic astrologer specializing in Kundali analysis and practical remedies. 
              He combines traditional Vedic principles with modern lifestyle to provide simple and effective guidance.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-10">
              <div className="text-center bg-white p-6 rounded-xl shadow-md">
                <div className="text-4xl mb-3">🎯</div>
                <div className="text-3xl font-bold text-orange-600 mb-2">5000+</div>
                <div className="text-gray-700 font-semibold">Happy Clients</div>
                <div className="text-sm text-gray-500">संतुष्ट ग्राहक</div>
              </div>
              <div className="text-center bg-white p-6 rounded-xl shadow-md">
                <div className="text-4xl mb-3">⭐</div>
                <div className="text-3xl font-bold text-orange-600 mb-2">15+</div>
                <div className="text-gray-700 font-semibold">Years Experience</div>
                <div className="text-sm text-gray-500">वर्षों का अनुभव</div>
              </div>
              <div className="text-center bg-white p-6 rounded-xl shadow-md">
                <div className="text-4xl mb-3">✨</div>
                <div className="text-3xl font-bold text-orange-600 mb-2">98%</div>
                <div className="text-gray-700 font-semibold">Accuracy Rate</div>
                <div className="text-sm text-gray-500">सटीकता दर</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              हमारी सेवाएं
            </h2>
            <h3 className="text-2xl text-orange-600 font-semibold">
              Our Services
            </h3>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-orange-500">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.titleHi}</h3>
                <h4 className="text-lg font-semibold text-orange-600 mb-3">{service.titleEn}</h4>
                <p className="text-gray-600 mb-3 leading-relaxed">{service.descHi}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{service.descEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ग्राहकों की राय
            </h2>
            <h3 className="text-2xl text-orange-600 font-semibold">
              Client Testimonials
            </h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((test, index) => (
              <div key={index} className="bg-gradient-to-br from-orange-50 to-amber-50 p-8 rounded-2xl shadow-md">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-500 text-xl">⭐</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{test.text}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center text-orange-700 font-bold text-lg mr-3">
                    {test.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{test.name}</div>
                    <div className="text-sm text-gray-600">{test.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">अपनी कुंडली का विश्लेषण कराएं</h2>
          <h3 className="text-2xl mb-6">Get Your Kundali Analyzed Today</h3>
          <p className="text-xl mb-8 opacity-90">जीवन की दिशा और समाधान के लिए आज ही संपर्क करें</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-orange-600 hover:bg-gray-100 px-10 py-5 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 transform hover:scale-105">
              📞 Call Now: +91-9625775962
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white px-10 py-5 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 transform hover:scale-105">
              💬 WhatsApp Chat
            </button>
          </div>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <WhatsAppButton />
    </main>
  );
}

const services = [
  {
    icon: "🔮",
    titleHi: "जन्म कुंडली विश्लेषण",
    titleEn: "Birth Chart Analysis",
    descHi: "विस्तृत जन्म कुंडली विश्लेषण — शक्तियाँ, चुनौतियाँ और जीवन पथ के साथ स्पष्ट मार्गदर्शन",
    descEn: "Detailed birth chart analysis with strengths, challenges, and clear life path guidance"
  },
  {
    icon: "🪔",
    titleHi: "ग्रह दोष उपाय",
    titleEn: "Planetary Remedies",
    descHi: "मंगल, शनि, राहु-केतु, पितृ दोष आदि के लिए व्यावहारिक उपाय — मंत्र, होम, दान और जीवनशैली सुझाव",
    descEn: "Practical remedies for Mangal, Shani, Rahu-Ketu, Pitra Dosha - mantras, rituals, and lifestyle tips"
  },
  {
    icon: "💑",
    titleHi: "विवाह एवं कुंडली मिलान",
    titleEn: "Marriage & Compatibility",
    descHi: "कुंडली मिलान, रिश्तों की समझ और वैवाहिक समस्याओं के समाधान",
    descEn: "Kundali matching, relationship insights, and marital problem solutions"
  },
  {
    icon: "💼",
    titleHi: "करियर एवं व्यवसाय मार्गदर्शन",
    titleEn: "Career & Business Guidance",
    descHi: "करियर पथ, नौकरी परिवर्तन का समय, व्यापार के अवसरों का विश्लेषण",
    descEn: "Career path analysis, job change timing, and business opportunity insights"
  },
  {
    icon: "💎",
    titleHi: "रत्न सुझाव",
    titleEn: "Gemstone Recommendations",
    descHi: "व्यक्तिगत रत्न सलाह (रत्न, वजन, धातु) कुंडली विश्लेषण के आधार पर",
    descEn: "Personalized gemstone advice based on your chart - stone, weight, and metal"
  },
  {
    icon: "📅",
    titleHi: "वार्षिक भविष्यवाणी",
    titleEn: "Annual Predictions",
    descHi: "वार्षिक रोडमैप मासिक हाइलाइट्स के साथ — स्वास्थ्य, धन, यात्रा और अवसर",
    descEn: "Yearly roadmap with monthly highlights - health, wealth, travel, and opportunities"
  }
];

const testimonials = [
  {
    name: "राजेश शर्मा",
    location: "Delhi",
    text: "गौरव जी की सलाह से मेरे जीवन में सकारात्मक बदलाव आया। उनका मार्गदर्शन बहुत सटीक और व्यावहारिक है।"
  },
  {
    name: "Priya Verma",
    location: "Mumbai",
    text: "His predictions were spot on! The remedies suggested were simple yet very effective. Highly recommended!"
  },
  {
    name: "संजय कुमार",
    location: "Bangalore",
    text: "15 साल का अनुभव झलकता है। कुंडली मिलान और करियर गाइडेंस में बहुत मदद मिली। धन्यवाद!"
  }
];