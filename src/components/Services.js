// src/components/Services.js
export default function Services() {
  const hotels = [
    {
      type: "AC Room",
      price: "2399/-",
      duration: "1 day",
      description: "Includes per person breakfast in Kashi - Kashi's special kachori and jalebi",
      features: ["AC Room", "Breakfast Included", "Hot Water", "WiFi"]
    },
    {
      type: "NON AC Room",
      price: "1699/-",
      duration: "1 day",
      description: "Includes per person breakfast in Kashi - Kashi's special kachori and jalebi",
      features: ["Non-AC Room", "Breakfast Included", "Hot Water", "WiFi"]
    }
  ];

  const temples = [
    {
      name: "Kal Bhairav Mandir",
      description: "A temple dedicated to the fierce form of Lord Shiva, also known as Batuk Bhairav Mandir.",
      price: "4599/- per person for VIP Darshan",
      totalAmount: "7500 (Railway Station pickup to Hotel and temple visit)"
    },
    {
      name: "Sankat Mochan Hanuman Temple",
      description: "A highly visited temple built by freedom fighter Pandit Madan Mohan Malviya.",
      price: "VIP Darshan Available",
      totalAmount: "6500 (Complete package)"
    },
    {
      name: "Kashi Vishwanath Mandir",
      description: "The most popular Hindu temple dedicated to Lord Shiva.",
      price: "VIP Darshan Available",
      totalAmount: "Included in packages"
    }
  ];

  return (
    <section id="services" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-orange-800 mb-4">Our Services</h2>
          <p className="text-lg text-gray-600">Complete spiritual journey packages for Kashi Darshan</p>
        </div>

        {/* Hotel Services */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-orange-700 mb-8 text-center">Hotel Services</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {hotels.map((hotel, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden border border-orange-200">
                <div className="gold-gradient py-4 px-6">
                  <h4 className="text-2xl font-bold text-orange-900">{hotel.type}</h4>
                  <div className="flex items-baseline mt-2">
                    <span className="text-3xl font-bold text-orange-900">{hotel.price}</span>
                    <span className="text-orange-800 ml-2">per day</span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 mb-4">{hotel.description}</p>
                  <div className="mb-4">
                    <h5 className="font-semibold text-orange-700 mb-2">Features:</h5>
                    <ul className="grid grid-cols-2 gap-2">
                      {hotel.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-lg transition duration-300">
                    Book This Package
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Temple Services */}
        <div>
          <h3 className="text-3xl font-bold text-orange-700 mb-8 text-center">Temple Visit Packages</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {temples.map((temple, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md border border-orange-100 overflow-hidden">
                <div className="orange-gradient py-4 px-6">
                  <h4 className="text-xl font-bold text-white">{temple.name}</h4>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 text-sm mb-4">{temple.description}</p>
                  <div className="space-y-2">
                    <div>
                      <span className="font-semibold text-orange-700">Package:</span>
                      <p className="text-gray-800">{temple.price}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-orange-700">Total Amount:</span>
                      <p className="text-gray-800">{temple.totalAmount}</p>
                    </div>
                  </div>
                  <button className="w-full mt-4 bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 rounded transition duration-300">
                    Select Package
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}