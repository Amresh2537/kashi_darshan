'use client'

import { useState } from 'react'

export default function WhatsAppButton() {
  const [isExpanded, setIsExpanded] = useState(false)

  const phoneNumber = "+919625775962" // Replace with actual number
  const prefillMessage = encodeURIComponent(
    "नमस्ते Gaurav Ji, मेरा नाम [नाम] है. DOB: dd-mm-yyyy, Time: hh:mm, Place: [शहर]. कृपया बताएं consultation charges और next slot."
  )

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${prefillMessage}`

  const handleWhatsAppClick = () => {
    window.open(whatsappUrl, '_blank')
    setIsExpanded(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded Card */}
      {isExpanded && (
        <div className="bg-white rounded-lg shadow-2xl p-4 mb-4 w-80 border border-green-200">
          <div className="text-center mb-4">
            <h3 className="font-semibold text-gray-800 text-lg">
              तेजी से पूछें — WhatsApp पर
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              एक छोटा सवाल मुफ्त — या पूरा परामर्श बुक करें
            </p>
          </div>
          
          <button
            onClick={handleWhatsAppClick}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition duration-300"
            aria-label="Open WhatsApp chat with Gaurav Dixit"
          >
            <WhatsAppIcon />
            WhatsApp से बात करें
          </button>
          
          <p className="text-xs text-gray-500 text-center mt-3 md:hidden">
            Tap to start chat
          </p>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110"
        aria-label="Quick chat on WhatsApp"
      >
        <WhatsAppIcon />
      </button>
    </div>
  )
}

function WhatsAppIcon() {
  return (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893-.001-3.189-1.248-6.189-3.515-8.453"/>
    </svg>
  )
}