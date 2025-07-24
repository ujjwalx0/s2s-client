'use client';
import Image from 'next/image';
import SupportUs from '@/components/SupportUs';

export default function AboutPage() {
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
          Driven by a passionate and committed team, Struggle to Success travels, researches, and brings authentic stories from across the country. Through accurate, unbiased, and responsible journalism, we aim to present narratives that reflect the power of hard work and integrity, demonstrating that extraordinary success is achievable for all.
        </p>
      </div>

      
    </main>
  );
}
