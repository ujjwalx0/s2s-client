'use client';
import Link from 'next/link';
import Image from 'next/image';
import SupportUs from '@/components/SupportUs';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/cardsPage/1' },
  { name: 'Privacy', href: '/privacy-policy' },
  { name: 'Terms', href: '/terms-of-service' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 pt-10 pb-6 mt-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-12">
        {/* Logo and Branding */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 group-hover:rotate-[15deg] transition-transform duration-300">
            <Image
              src="/logo.png"
              alt="Logo"
              fill
              className="object-contain rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 p-1.5"
            />
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <span className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Struggle To Success
            </span>
            <span className="text-xs sm:text-sm font-medium text-gray-300 mt-2 text-center sm:text-left">
              Every Struggle Has a Story ✨
            </span>
          </div>
        </Link>

        {/* Footer Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm sm:text-base">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="hover:text-white transition text-center sm:text-left"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Support Us Button (centered below links) */}
      <div className="mt-10">
        <SupportUs />
      </div>

      {/* Bottom Text */}
      <div className="mt-8 text-center text-xs sm:text-sm text-gray-500">
        © {new Date().getFullYear()} Struggle To Success. All rights reserved.
      </div>
    </footer>
  );
}
