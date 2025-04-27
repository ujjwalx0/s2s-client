'use client';

import { FaCopy, FaFacebook, FaInstagram, FaWhatsapp, FaXTwitter } from 'react-icons/fa6';
import { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const ShareAndCopyLinks = ({ postUrl }: { postUrl: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(postUrl)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch((error) => {
        console.error('Failed to copy:', error);
      });
  };

  return (
    <div className="relative w-full">
      {/* Social Icons */}
      <div className="flex items-center space-x-4 mt-4">
        <button
          onClick={handleCopyLink}
          className="flex items-center justify-center"
          title="Copy Link"
        >
          <FaCopy size={24} className="text-gray-700 hover:text-gray-900 transition" />
        </button>

        <a href={`https://www.facebook.com/sharer/sharer.php?u=${postUrl}`} target="_blank" rel="noopener noreferrer" title="Share on Facebook">
          <FaFacebook size={24} className="text-blue-600 hover:text-blue-800 transition" />
        </a>
        <a href={`https://www.instagram.com/?url=${postUrl}`} target="_blank" rel="noopener noreferrer" title="Share on Instagram">
          <FaInstagram size={24} className="text-pink-600 hover:text-pink-800 transition" />
        </a>
        <a href={`https://wa.me/?text=${postUrl}`} target="_blank" rel="noopener noreferrer" title="Share on WhatsApp">
          <FaWhatsapp size={24} className="text-green-500 hover:text-green-700 transition" />
        </a>
        <a href={`https://x.com/intent/tweet?url=${postUrl}`} target="_blank" rel="noopener noreferrer" title="Share on X">
          <FaXTwitter size={24} className="text-black hover:text-gray-800 transition" />
        </a>
      </div>

      {/* Sexy Custom Toast */}
      {isCopied && (
        <div className="absolute top-[-60px] left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-400 to-blue-500 text-white text-sm px-5 py-2 rounded-xl shadow-xl flex items-center gap-2 animate-fadeInOut z-50">
          <FaCheckCircle className="text-white text-lg" />
          <span>Link copied successfully!</span>
        </div>
      )}
    </div>
  );
};

export default ShareAndCopyLinks;
