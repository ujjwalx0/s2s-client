'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function SupportUs() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Support Us Button */}
      <div className="flex justify-center mt-6">
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

            <div className="bg-gray-800 rounded-lg p-4 flex flex-col items-center">
              <Image
                src="/upi-qr.png"
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
    </>
  );
}
