import React from 'react';
import Link from 'next/link';
import { Star, MapPin, Clock } from 'lucide-react';


export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(135deg, #2C2C2C 0%, #1a1a1a 40%, #3a2e24 100%)',
        }}
      />
      {/* Decorative gold orb */}
      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #C9A96E, transparent)' }}
      />
      <div
        className="absolute bottom-1/3 left-1/6 w-64 h-64 rounded-full opacity-8 blur-2xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #C9A96E, transparent)' }}
      />
      {/* Content */}
      <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-10 pt-32 pb-20 w-full">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10 mb-6">
            <MapPin size={13} className="text-primary" />
            <span className="text-xs font-medium text-primary tracking-wide">Dubai Home Service</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6">
            Luxury Spa
            <span className="block gold-text">At Your Door</span>
          </h1>

          <p className="text-lg text-white/60 leading-relaxed mb-8 max-w-lg">
            Professional massage therapists come to you. From deep tissue to buccal facial massage — experience five-star spa treatments in the comfort of your home.
          </p>

          {/* Stats row */}
          <div className="flex items-center gap-6 mb-10">
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5]?.map((i) => (
                <Star key={`star-${i}`} size={14} className="text-primary fill-primary" />
              ))}
              <span className="text-sm text-white/60 ml-1">4.9 (240+ reviews)</span>
            </div>
            <div className="h-4 w-px bg-white/20" />
            <div className="flex items-center gap-1.5 text-sm text-white/60">
              <Clock size={14} className="text-primary" />
              Available 9AM – 10PM
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/booking-screen" className="btn-primary text-base px-8 py-4">
              Book a Session
            </Link>
            <a
              href="https://wa.me/971000000000?text=Hi%20LumeaHomeSpa%2C%20I%27d%20like%20to%20know%20more%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-base px-8 py-4 border-white/30 text-white hover:bg-white hover:text-foreground"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Floating price cards */}
        <div className="absolute right-6 lg:right-10 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-3">
          {[
            { label: 'Swedish Relaxing', price: '149 AED', duration: '60 min' },
            { label: 'Hot Stone Ritual', price: '170 AED', duration: '60 min' },
            { label: 'Buccal Massage', price: '200 AED', duration: '60 min' },
          ]?.map((item) => (
            <div
              key={`hero-card-${item?.label}`}
              className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl px-5 py-4 min-w-[180px]"
            >
              <p className="text-xs text-white/50 mb-0.5">{item?.duration}</p>
              <p className="text-sm font-semibold text-white mb-1">{item?.label}</p>
              <p className="text-lg font-bold text-primary tabular-nums">{item?.price}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
}