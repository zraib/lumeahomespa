import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function PublicFooter() {
  return (
    <footer className="bg-accent text-white">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <AppLogo src="/assets/images/logo-lh-1777721812389.png" size={40} />
              <span className="font-bold text-xl tracking-tight">
                Lumea<span className="text-primary">HomeSpa</span>
              </span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              Premium home massage services delivered to your door in Dubai. Professional
              therapists, luxury experience, your comfort first.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary transition-colors flex items-center justify-center"
                aria-label="Instagram"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary transition-colors flex items-center justify-center"
                aria-label="Facebook"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-widest text-primary mb-4">
              Services
            </h4>
            <ul className="space-y-2 text-sm text-white/60">
              {[
                'Swedish Relaxing',
                'Deep Tissue',
                'Hot Stone',
                'Thai Massage',
                'Buccal Massage',
                'Face Lifting',
                'Aromatherapy',
                'Reflexology',
              ]?.map((s) => (
                <li key={`footer-service-${s}`}>
                  <Link href="/booking-screen" className="hover:text-primary transition-colors">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-widest text-primary mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex items-start gap-2">
                <MapPin size={15} className="text-primary mt-0.5 shrink-0" />
                Dubai, United Arab Emirates
              </li>
              <li className="flex items-center gap-2">
                <Phone size={15} className="text-primary shrink-0" />
                <a
                  href="https://wa.me/971000000000"
                  className="hover:text-primary transition-colors"
                >
                  +971 00 000 0000
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={15} className="text-primary shrink-0" />
                <a
                  href="mailto:hello@lumeahomespa.com"
                  className="hover:text-primary transition-colors"
                >
                  hello@lumeahomespa.com
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Hours</p>
              <p className="text-sm text-white/60">Daily 9:00 AM – 10:00 PM</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">© 2026 LumeaHomeSpa. All rights reserved.</p>
          <Link
            href="/admin-dashboard"
            className="text-xs text-white/20 hover:text-white/40 transition-colors"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
