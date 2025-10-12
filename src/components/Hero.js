// src/components/Hero.js
'use client';
import { useState, useRef, useEffect } from 'react';

export default function Hero() {
  const videoRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    
    const handleVideoLoad = () => {
      setIsVideoLoaded(true);
      setVideoError(false);
    };

    const handleVideoError = () => {
      console.error('Video failed to load');
      setVideoError(true);
      setIsVideoLoaded(true); // Stop loading state even if error
    };

    if (video) {
      video.addEventListener('loadeddata', handleVideoLoad);
      video.addEventListener('error', handleVideoError);
      
      // Force video load
      video.load();
    }

    return () => {
      if (video) {
        video.removeEventListener('loadeddata', handleVideoLoad);
        video.removeEventListener('error', handleVideoError);
      }
    };
  }, []);

  // Fallback to background image if video fails
  const backgroundStyle = videoError 
    ? { backgroundImage: "url('/ghat1.jpeg')" }
    : {};

  return (
    <section 
      className="relative h-screen flex items-center justify-center overflow-hidden bg-cover bg-center"
      style={backgroundStyle}
    >
      {/* Background Video - Only show if no error */}
      {!videoError && (
        <div className="absolute inset-0 w-full h-full">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          >
            <source src="/kashi-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      
      {/* Loading Overlay */}
      {!isVideoLoaded && !videoError && (
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900 to-amber-900 flex items-center justify-center z-20">
          <div className="text-center text-white">
            <div className="w-16 h-16 border-4 border-orange-300 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg animate-pulse">Loading Divine Experience...</p>
          </div>
        </div>
      )}

      {/* Error Overlay - Show if video fails to load */}
      {videoError && (
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900 to-amber-900 flex items-center justify-center z-20">
          <div className="text-center text-white bg-black/30 p-8 rounded-lg backdrop-blur-sm">
            <svg className="w-16 h-16 mx-auto mb-4 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h3 className="text-xl font-bold mb-2">Video Not Available</h3>
            <p className="text-amber-100">Showing beautiful Kashi imagery instead</p>
          </div>
        </div>
      )}
      
      {/* Dark Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10"></div>

      {/* Content */}
      <div className="relative z-15 text-center text-white px-4 max-w-6xl mx-auto">
        <div className={`transform transition-all duration-1000 ${
          isVideoLoaded || videoError ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            Welcome to{' '}
            <span className="text-amber-300 bg-gradient-to-r from-amber-300 to-yellow-200 bg-clip-text text-transparent">
              KashiDarshan
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl lg:text-3xl mb-8 text-amber-100 max-w-4xl mx-auto leading-relaxed">
            Experience the divine spiritual journey to Kashi with premium accommodation and guided temple visits
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/20 transition duration-300">
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-amber-200">Premium Stays</h3>
              <p className="text-amber-100 text-sm">Comfortable AC & Non-AC rooms with traditional breakfast</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/20 transition duration-300">
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-amber-200">Guided Tours</h3>
              <p className="text-amber-100 text-sm">Expert guided temple visits with VIP darshan</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/20 transition duration-300">
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-amber-200">Sacred Locations</h3>
              <p className="text-amber-100 text-sm">Visit all major temples and ghats of Kashi</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="/booking" 
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center gap-2 group"
            >
              <span>Book Your Journey</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a 
              href="#gallery" 
              className="border-2 border-white hover:bg-white hover:text-orange-900 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 backdrop-blur-sm flex items-center gap-2 group"
            >
              <span>Explore Gallery</span>
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-amber-300 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-amber-300 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}