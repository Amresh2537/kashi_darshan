// src/components/VideoSection.js
export default function VideoSection() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-orange-900 via-amber-900 to-yellow-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">
            Experience Divine Kashi
          </h2>
          <p className="text-amber-100 text-xl max-w-3xl mx-auto leading-relaxed">
            Witness the mesmerizing Dev Dipawali celebration and feel the spiritual energy of the eternal city
          </p>
        </div>
        
        {/* Video Container */}
        <div className="w-full">
          <div className="relative w-full h-[600px] lg:h-[700px] rounded-none lg:rounded-2xl overflow-hidden shadow-2xl mx-auto">
            <video 
              className="w-full h-full object-cover"
              autoPlay 
              muted 
              loop
              controls
              playsInline
              poster="/Arti.jpeg" // Using Arti as poster image
            >
              <source src="/Dev Dipawali.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Video Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            
            {/* Play Button Overlay (shown when not playing) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-6">
                <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse mr-3"></div>
            <span className="text-amber-200 font-medium">Now Playing: Dev Dipawali Celebration</span>
          </div>
        </div>
      </div>
    </section>
  );
}