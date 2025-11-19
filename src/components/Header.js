// src/components/Header.js
'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mr-3">
              <Image 
                src="/logo.png" 
                alt="KashiDarshan Logo" 
                width={48} 
                height={48}
                className="rounded-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-orange-800">KashiDarshan</h1>
              <p className="text-sm text-gray-600">Spiritual Journey to Kashi</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="/" className="text-orange-800 font-medium hover:text-orange-600 transition">Home</a>
            <a href="/services" className="text-gray-700 font-medium hover:text-orange-600 transition">Services</a>
            <a href="/booking" className="text-gray-700 font-medium hover:text-orange-600 transition">Booking</a>
            <a href="/astro" className="text-gray-700 font-medium hover:text-orange-600 transition">Astrology</a>
            <a href="/gallery" className="text-gray-700 font-medium hover:text-orange-600 transition">Gallery</a>
            <a href="/contact" className="text-gray-700 font-medium hover:text-orange-600 transition">Contact</a>
          </nav>

          {/* Mobile menu button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <a href="/" className="text-orange-800 font-medium">Home</a>
              <a href="/services" className="text-gray-700 font-medium">Services</a>
              <a href="/booking" className="text-gray-700 font-medium">Booking</a>
              <a href="/astro" className="text-gray-700 font-medium">Astrology</a>
              <a href="/gallery" className="text-gray-700 font-medium">Gallery</a>
              <a href="/contact" className="text-gray-700 font-medium">Contact</a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}