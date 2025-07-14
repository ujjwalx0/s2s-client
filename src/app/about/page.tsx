'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function AboutPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <main className="max-w-4xl mx-auto px-4 py-16 text-gray-300">
      {/* Logo and Title */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-4">
          <Image
            src="/logo.png"
            alt="Struggle To Success Logo"
            fill
            className="object-contain rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 p-2"
          />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text">
          About Us
        </h1>
      </div>

      {/* Description */}
      <div className="text-gray-400 text-base sm:text-lg leading-relaxed space-y-6 text-center sm:text-left">
        <p>
          <strong className="text-cyan-400">Struggle to Success</strong> is a platform dedicated to showcasing real and inspiring stories of individuals who have carved a path to success through perseverance, discipline, and dedication. Our mission is to highlight the journeys of officers, professionals, and everyday heroes whose achievements serve as a source of inspiration for society.
        </p>
        <p>
          Driven by a passionate and committed team, Struggle to Success travels, researches, and brings authentic stories from across the country. Through accurate, unbiased, and responsible journalism, we aim to present narratives that reflect the power of hard work and integrity,demonstrating that extraordinary success is achievable for all.
        </p>
      </div>

      {/* Support Us Button */}
      <div className="flex justify-center mt-12">
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold shadow-md hover:scale-105 transition-transform"
        >
          💖 Support Us
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-gray-900 rounded-xl shadow-lg max-w-sm w-full p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text mb-4">
              Support Our Mission
            </h2>
            <p className="text-sm text-gray-400 text-center mb-4">
              If you find value in what we do, consider supporting us. Your contribution helps us bring more inspiring stories.
            </p>

            {/* UPI QR or ID */}
            <div className="bg-gray-800 rounded-lg p-4 flex flex-col items-center">
              {/* If you have a QR image */}
              <Image
                src="/upi-qr.png" // 👉 Replace with your actual QR image
                alt="UPI QR Code"
                width={160}
                height={160}
                className="mb-3 rounded"
              />
              <code className="text-xs sm:text-sm text-center text-gray-300 break-all">
               ujjwals345@ybl
              </code>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
