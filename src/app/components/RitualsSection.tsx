import React from 'react';
import Link from 'next/link';
import { Clock, Sparkles, ArrowRight } from 'lucide-react';

const rituals = [
  {
    id: 'ritual-serenity',
    name: 'Serenity Ritual',
    tagline: 'Total body & mind reset',
    duration: '120 min',
    price: 299,
    services: ['Swedish Relaxing (60 min)', 'Aromatherapy Enhancement', 'Collagen Face Mask'],
    description:
      'Begin with a full-body Swedish massage using custom-blended aromatherapy oils, followed by a nourishing collagen face mask for complete head-to-toe restoration.',
    highlight: true,
    badge: 'Best Seller',
    gradient: 'from-amber-900/80 via-stone-900/90 to-zinc-900',
    accentColor: '#C9A96E',
  },
  {
    id: 'ritual-sculpt',
    name: 'Sculpt & Glow Ritual',
    tagline: 'Body contouring & facial lift',
    duration: '120 min',
    price: 349,
    services: ['Maderotherapy (60 min)', 'Buccal Facial Massage (30 min)', 'Collagen Face Mask'],
    description:
      'A transformative body sculpting session with maderotherapy followed by the signature buccal facial massage for defined contours and lifted features.',
    highlight: false,
    badge: 'Premium',
    gradient: 'from-rose-900/80 via-pink-900/90 to-fuchsia-900',
    accentColor: '#E896B8',
  },
  {
    id: 'ritual-detox',
    name: 'Detox & Renew Ritual',
    tagline: 'Deep cleanse & lymphatic reset',
    duration: '90 min',
    price: 270,
    services: ['Lymphatic Drainage (60 min)', 'Reflexology (30 min)'],
    description:
      "A therapeutic detox journey combining full-body lymphatic drainage with targeted reflexology to activate the body's natural healing and cleansing systems.",
    highlight: false,
    badge: 'Wellness',
    gradient: 'from-violet-900/80 via-purple-900/90 to-indigo-900',
    accentColor: '#A78BFA',
  },
];

export default function RitualsSection() {
  return (
    <section id="packages" className="py-24 bg-secondary">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">
            Curated Experiences
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">Signature Rituals</h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Thoughtfully curated multi-treatment packages for a complete luxury spa experience at
            home.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {rituals?.map((ritual) => (
            <div
              key={`ritual-${ritual?.id}`}
              className={`relative rounded-3xl overflow-hidden ${ritual?.highlight ? 'lg:scale-105 lg:-mt-4 lg:mb-4' : ''}`}
            >
              {/* Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${ritual?.gradient}`} />

              {/* Badge */}
              <div className="absolute top-5 right-5">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/15 text-white border border-white/20">
                  {ritual?.badge}
                </span>
              </div>

              <div className="relative z-10 p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles size={16} style={{ color: ritual?.accentColor }} />
                  <span
                    className="text-xs font-medium uppercase tracking-widest"
                    style={{ color: ritual?.accentColor }}
                  >
                    {ritual?.tagline}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">{ritual?.name}</h3>
                <p className="text-sm text-white/60 leading-relaxed mb-6">{ritual?.description}</p>

                {/* Services included */}
                <ul className="space-y-2 mb-8">
                  {ritual?.services?.map((s) => (
                    <li
                      key={`ritual-service-${ritual?.id}-${s}`}
                      className="flex items-center gap-2 text-sm text-white/80"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: ritual?.accentColor }}
                      />
                      {s}
                    </li>
                  ))}
                </ul>

                <div className="flex items-end justify-between pt-5 border-t border-white/15">
                  <div>
                    <div className="flex items-center gap-1.5 text-white/50 text-xs mb-1">
                      <Clock size={12} />
                      {ritual?.duration}
                    </div>
                    <p className="text-3xl font-bold text-white tabular-nums">
                      {ritual?.price} <span className="text-sm font-medium text-white/60">AED</span>
                    </p>
                  </div>
                  <Link
                    href={`/booking-screen?ritual=${ritual?.id}`}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-foreground transition-all duration-200 hover:gap-3"
                    style={{ backgroundColor: ritual?.accentColor }}
                  >
                    Book Ritual <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
