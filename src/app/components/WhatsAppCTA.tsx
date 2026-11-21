import React from 'react';
import Link from 'next/link';
import { MessageCircle, ArrowRight } from 'lucide-react';

export default function WhatsAppCTA() {
  return (
    <section className="py-20 bg-accent relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'radial-gradient(circle at 30% 50%, #C9A96E 0%, transparent 60%), radial-gradient(circle at 70% 50%, #C9A96E 0%, transparent 60%)',
        }}
      />
      <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-10 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-4 block">
          Ready to Relax?
        </span>
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Book Your Session Today</h2>
        <p className="text-lg text-white/60 mb-10 max-w-lg mx-auto">
          Choose your treatment, select a time, and confirm via WhatsApp. We'll be at your door
          ready to transform your space into a luxury spa.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/booking-screen" className="btn-primary text-base px-8 py-4">
            Book Online <ArrowRight size={16} />
          </Link>
          <a
            href="https://wa.me/971000000000?text=Hi%20LumeaHomeSpa%2C%20I%27d%20like%20to%20book%20a%20session."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full border border-white/30 text-white text-base font-semibold hover:bg-white/10 transition-colors"
          >
            <MessageCircle size={18} />
            WhatsApp Us
          </a>
        </div>
      </div>

      {/* Sticky WhatsApp button */}
      <a
        href="https://wa.me/971000000000?text=Hi%20LumeaHomeSpa%2C%20I%27d%20like%20to%20book%20a%20session."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 active:scale-95"
        style={{
          background: 'linear-gradient(135deg, #25D366, #128C7E)',
          boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)',
          animation: 'pulseGold 2s ease-in-out infinite',
        }}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={26} className="text-white" />
      </a>
    </section>
  );
}
