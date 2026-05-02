'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import { Menu, X, Phone } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/#services' },
  { label: 'Packages', href: '/#packages' },
  { label: 'About', href: '/#about' },
  { label: 'Book Now', href: '/booking-screen', highlight: true },
];

export default function PublicHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <AppLogo
            src="/assets/images/logo-lh-1777721812389.png"
            size={44}
          />
          <span className="font-bold text-xl tracking-tight text-foreground">
            Lumea<span className="text-primary">HomeSpa</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks?.map((link) =>
            link?.highlight ? (
              <Link key={`nav-${link?.label}`} href={link?.href} className="btn-primary ml-4 text-sm">
                Book Now
              </Link>
            ) : (
              <Link
                key={`nav-${link?.label}`}
                href={link?.href}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-secondary"
              >
                {link?.label}
              </Link>
            )
          )}
        </nav>

        {/* WhatsApp + Mobile toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <a
            href="https://wa.me/971000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium text-primary"
          >
            <Phone size={16} />
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-border animate-fade-in">
          <nav className="flex flex-col px-6 py-4 gap-1">
            {navLinks?.map((link) => (
              <Link
                key={`mobile-nav-${link?.label}`}
                href={link?.href}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                  link?.highlight
                    ? 'bg-primary text-white text-center mt-2' :'text-foreground hover:bg-secondary'
                }`}
              >
                {link?.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}