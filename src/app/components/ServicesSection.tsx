import React from 'react';
import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';

const massageServices = [
  {
    id: 'swedish-relaxing',
    name: 'Swedish Relaxing',
    category: 'Body Massage',
    duration: '60 min',
    price: 149,
    description:
      'A gentle, flowing massage that eases tension and promotes deep relaxation using long, smooth strokes and light pressure.',
    benefits: ['Stress relief', 'Improved circulation', 'Muscle relaxation'],
    tag: 'Most Popular',
    color: 'from-amber-50 to-orange-50',
  },
  {
    id: 'balinese',
    name: 'Balinese Massage',
    category: 'Body Massage',
    duration: '60 min',
    price: 149,
    description:
      'A full-body treatment combining gentle stretches, acupressure, and aromatherapy to restore energy flow and balance.',
    benefits: ['Energy balance', 'Deep relaxation', 'Skin nourishment'],
    tag: null,
    color: 'from-emerald-50 to-teal-50',
  },
  {
    id: 'deep-tissue',
    name: 'Deep Tissue',
    category: 'Body Massage',
    duration: '60 min',
    price: 190,
    description:
      'Targets deep muscle layers to release chronic tension, knots, and pain using firm, focused pressure techniques.',
    benefits: ['Chronic pain relief', 'Muscle recovery', 'Posture improvement'],
    tag: null,
    color: 'from-slate-50 to-blue-50',
  },
  {
    id: 'maderotherapy',
    name: 'Maderotherapy',
    category: 'Body Contouring',
    duration: '60 min',
    price: 190,
    description:
      'Wood therapy massage that sculpts and tones the body, breaks down cellulite, and stimulates lymphatic drainage.',
    benefits: ['Cellulite reduction', 'Body sculpting', 'Lymphatic drainage'],
    tag: 'Body Sculpting',
    color: 'from-rose-50 to-pink-50',
  },
  {
    id: 'lymphatic',
    name: 'Lymphatic Drainage',
    category: 'Therapeutic',
    duration: '60 min',
    price: 190,
    description:
      'Gentle rhythmic strokes that activate the lymphatic system, reduce swelling, detoxify the body, and boost immunity.',
    benefits: ['Detoxification', 'Reduces swelling', 'Immune support'],
    tag: 'Detox',
    color: 'from-violet-50 to-purple-50',
  },
  {
    id: 'thai-massage',
    name: 'Thai Massage',
    category: 'Body Massage',
    duration: '60 min',
    price: 190,
    description:
      'Ancient technique combining yoga-like stretching, acupressure, and energy work to restore flexibility and vitality.',
    benefits: ['Flexibility', 'Energy flow', 'Stress release'],
    tag: null,
    color: 'from-yellow-50 to-amber-50',
  },
  {
    id: 'hot-stone',
    name: 'Hot Stone',
    category: 'Signature',
    duration: '60 min',
    price: 170,
    description:
      'Smooth volcanic basalt stones heated to perfection are placed on key energy points and used for deep, soothing massage.',
    benefits: ['Deep muscle warmth', 'Energy alignment', 'Ultimate relaxation'],
    tag: 'Signature',
    color: 'from-stone-50 to-zinc-50',
  },
  {
    id: 'aromatherapy',
    name: 'Aromatherapy',
    category: 'Body Massage',
    duration: '60 min',
    price: 149,
    description:
      'A sensory journey combining therapeutic essential oils with gentle massage to calm the mind and restore the body.',
    benefits: ['Mood elevation', 'Anxiety relief', 'Skin hydration'],
    tag: null,
    color: 'from-lime-50 to-green-50',
  },
];

const facialServices = [
  {
    id: 'face-lifting',
    name: 'Face Lifting Massage',
    category: 'Facial',
    duration: '60 min',
    price: 149,
    description:
      'Non-invasive facial sculpting technique that tones facial muscles, reduces fine lines, and lifts sagging skin naturally.',
    benefits: ['Natural lift', 'Wrinkle reduction', 'Improved tone'],
    tag: 'Non-Invasive',
    color: 'from-pink-50 to-rose-50',
  },
  {
    id: 'buccal-massage',
    name: 'Buccal Massage',
    category: 'Facial',
    duration: '60 min',
    price: 200,
    description:
      'An advanced intraoral facial technique that works the muscles from inside the mouth for dramatic sculpting and de-puffing results.',
    benefits: ['Jaw sculpting', 'Lymphatic drainage', 'Defined cheekbones'],
    tag: 'Premium',
    color: 'from-fuchsia-50 to-pink-50',
  },
  {
    id: 'face-mask-collagen',
    name: 'Face Mask Collagen',
    category: 'Add-on',
    duration: 'Add-on',
    price: 30,
    description:
      'A nourishing collagen sheet mask treatment that plumps, hydrates, and brightens the skin for an immediate glow.',
    benefits: ['Hydration boost', 'Collagen stimulation', 'Instant glow'],
    tag: 'Add-on',
    color: 'from-cyan-50 to-sky-50',
  },
  {
    id: 'reflexology',
    name: 'Reflexology',
    category: 'Therapeutic',
    duration: '30 or 60 min',
    price: 100,
    description:
      'Precise pressure applied to reflex points on the feet and hands to stimulate healing in corresponding organs and systems.',
    benefits: ['Organ stimulation', 'Stress reduction', 'Energy balance'],
    tag: null,
    color: 'from-orange-50 to-amber-50',
  },
];

function ServiceCard({ service }: { service: (typeof massageServices)[0] }) {
  return (
    <div
      className={`service-card bg-gradient-to-br ${service.color} border border-border relative overflow-hidden`}
    >
      {service.tag && (
        <span className="absolute top-4 right-4 text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/15 text-primary">
          {service.tag}
        </span>
      )}
      <div className="mb-3">
        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          {service.category}
        </span>
      </div>
      <h3 className="text-lg font-bold text-foreground mb-2">{service.name}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{service.description}</p>
      <div className="flex flex-wrap gap-1.5 mb-5">
        {service.benefits.map((b) => (
          <span
            key={`benefit-${service.id}-${b}`}
            className="text-xs px-2 py-0.5 rounded-full bg-white/70 text-foreground border border-border"
          >
            {b}
          </span>
        ))}
      </div>
      <div className="flex items-end justify-between mt-auto pt-3 border-t border-border/50">
        <div>
          <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-1">
            <Clock size={12} />
            {service.duration}
          </div>
          <p className="text-2xl font-bold text-foreground tabular-nums">
            {service.id === 'reflexology' ? (
              <span>
                100 <span className="text-sm font-medium text-muted-foreground">AED / 30min</span>
              </span>
            ) : (
              <span>
                {service.price}{' '}
                <span className="text-sm font-medium text-muted-foreground">AED</span>
              </span>
            )}
          </p>
        </div>
        <Link
          href={`/booking-screen?service=${service.id}`}
          className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-3 transition-all duration-200"
        >
          Book <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">
            Our Services
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Massage & Wellness Menu
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Every treatment is performed by certified therapists using premium products, delivered
            to your home in Dubai.
          </p>
        </div>

        {/* Body Massages */}
        <div className="mb-16">
          <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
            <span className="w-8 h-px bg-primary" />
            Body Massages
            <span className="w-8 h-px bg-primary" />
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {massageServices.map((service) => (
              <ServiceCard key={`service-${service.id}`} service={service} />
            ))}
          </div>
        </div>

        {/* Facial & Add-ons */}
        <div>
          <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
            <span className="w-8 h-px bg-primary" />
            Face & Body Treatments
            <span className="w-8 h-px bg-primary" />
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {facialServices.map((service) => (
              <ServiceCard key={`facial-${service.id}`} service={service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
