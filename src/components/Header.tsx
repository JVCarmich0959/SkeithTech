
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);

  const navLinks = [
    { href: '#services', label: 'Solutions' },
    { href: '#process', label: 'Approach' },
    { href: '#contact', label: 'Contact' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200">
      <nav 
        className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6"
        role="navigation"
        aria-label="Main navigation"
      >
<Link 
      href="/" 
      className="flex items-center gap-3 group"
      aria-label="Home"
    >
      <div className="w-10 h-10 rounded-lg overflow-hidden relative">
        {!logoFailed ? (
          <Image
            src="/SkeithLogo.svg"
            alt="Skeith Studio Logo"
            className="object-contain"
            fill
            sizes="40px"
            priority
            onError={() => setLogoFailed(true)}
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center bg-blue-100 text-blue-600 font-medium text-lg">
            SS
          </span>
        )}
      </div>
      <h1 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
        Skeith Studio
      </h1>
    </Link>


        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-8 font-medium text-gray-700">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`py-2 border-b-2 border-transparent transition-colors duration-300
                  hover:text-blue-600 hover:border-blue-600
                  focus:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:rounded
                  ${pathname === link.href ? 'text-blue-600 border-blue-600' : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <ul className="flex flex-col py-2 px-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block py-3 px-2 transition-colors duration-300
                    hover:text-blue-600 hover:bg-blue-50
                    focus:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                    ${pathname === link.href ? 'text-blue-600 bg-blue-50' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
