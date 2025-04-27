'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Search from './Search';

export default function Header() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/cardsPage/1' },
  ];

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900/90 py-2 backdrop-blur-md shadow-md' : 'bg-gray-900/80 py-4 backdrop-blur-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 group-hover:rotate-12 transition">
              <Image src="/logo.png" alt="Logo" fill className="object-contain rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 p-1.5" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Struggle To Success</span>
              <span className="text-[10px] sm:text-xs text-gray-300">Every Struggle Has a Story ✨</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map(({ name, href }) => (
              <Link key={name} href={href} className={`px-3 py-2 rounded-md text-sm font-medium transition ${pathname === href || (href.includes('/cardsPage') && pathname.includes('/cardsPage')) ? 'bg-gray-800 text-cyan-400' : 'text-gray-300 hover:text-white hover:bg-gray-800/50'}`}>
                {name}
              </Link>
            ))}
            <div className="w-48 ml-4">
              <Search />
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="md:hidden text-2xl text-gray-300">
            {isMobileOpen ? '✖️' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-gray-900/95 backdrop-blur-md py-8 flex flex-col items-center space-y-6 text-lg font-medium">
            {navItems.map(({ name, href }) => (
              <Link key={name} href={href} onClick={() => setIsMobileOpen(false)} className={`px-4 py-2 rounded-lg transition ${pathname === href || (href.includes('/cardsPage') && pathname.includes('/cardsPage')) ? 'bg-gray-800 text-cyan-400' : 'text-gray-300 hover:text-white hover:bg-gray-800/50'}`}>
                {name}
              </Link>
            ))}
            <div className="w-64 mt-4">
              <Search />
            </div>
          </div>
        )}
      </header>

      {/* To add gap below header */}
      <div className="h-20 md:h-24"></div>
    </>
  );
}
