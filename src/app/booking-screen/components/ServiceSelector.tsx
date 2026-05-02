'use client';
import React, { useState } from 'react';
import { Clock, ArrowRight, Check } from 'lucide-react';
import type { SelectedService } from './BookingFlow';

const allServices = [
  { id: 'swedish-relaxing', name: 'Swedish Relaxing', price: 149, duration: '60 min', category: 'Body Massage', popular: true },
  { id: 'balinese', name: 'Balinese Massage', price: 149, duration: '60 min', category: 'Body Massage', popular: false },
  { id: 'aromatherapy', name: 'Aromatherapy', price: 149, duration: '60 min', category: 'Body Massage', popular: false },
  { id: 'deep-tissue', name: 'Deep Tissue', price: 190, duration: '60 min', category: 'Body Massage', popular: false },
  { id: 'maderotherapy', name: 'Maderotherapy', price: 190, duration: '60 min', category: 'Body Contouring', popular: false },
  { id: 'lymphatic', name: 'Lymphatic Drainage', price: 190, duration: '60 min', category: 'Therapeutic', popular: false },
  { id: 'thai-massage', name: 'Thai Massage', price: 190, duration: '60 min', category: 'Body Massage', popular: false },
  { id: 'hot-stone', name: 'Hot Stone', price: 170, duration: '60 min', category: 'Signature', popular: true },
  { id: 'face-lifting', name: 'Face Lifting', price: 149, duration: '60 min', category: 'Facial', popular: false },
  { id: 'buccal-massage', name: 'Buccal Massage', price: 200, duration: '60 min', category: 'Facial', popular: false },
  { id: 'reflexology-30', name: 'Reflexology', price: 100, duration: '30 min', category: 'Therapeutic', popular: false },
  { id: 'reflexology-60', name: 'Reflexology', price: 200, duration: '60 min', category: 'Therapeutic', popular: false },
  { id: 'face-mask-collagen', name: 'Face Mask Collagen', price: 30, duration: 'Add-on', category: 'Add-on', popular: false },
  // Rituals
  { id: 'ritual-serenity', name: 'Serenity Ritual', price: 299, duration: '120 min', category: 'Ritual Package', popular: true },
  { id: 'ritual-sculpt', name: 'Sculpt & Glow Ritual', price: 349, duration: '120 min', category: 'Ritual Package', popular: false },
  { id: 'ritual-detox', name: 'Detox & Renew Ritual', price: 270, duration: '90 min', category: 'Ritual Package', popular: false },
];

const categories = ['All', 'Body Massage', 'Therapeutic', 'Signature', 'Body Contouring', 'Facial', 'Ritual Package', 'Add-on'];

export default function ServiceSelector({
  onSelect,
  selected,
}: {
  onSelect: (s: SelectedService) => void;
  selected: SelectedService | null;
}) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filtered =
    activeCategory === 'All'
      ? allServices
      : allServices.filter((s) => s.category === activeCategory);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-1">Choose Your Treatment</h2>
        <p className="text-muted-foreground text-sm">Select the service you'd like to book.</p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={`cat-${cat}`}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-150 ${
              activeCategory === cat
                ? 'bg-primary text-white' :'bg-muted text-muted-foreground hover:bg-secondary'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Service grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filtered.map((service) => {
          const isSelected = selected?.id === service.id;
          const isHovered = hoveredId === service.id;
          return (
            <button
              key={`sel-service-${service.id}`}
              onClick={() =>
                onSelect({
                  id: service.id,
                  name: service.name,
                  price: service.price,
                  duration: service.duration,
                  category: service.category,
                })
              }
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`text-left p-5 rounded-2xl border transition-all duration-200 relative ${
                isSelected
                  ? 'border-primary bg-primary/5 shadow-md'
                  : 'border-border bg-white hover:border-primary/50 hover:shadow-sm'
              }`}
            >
              {service.popular && (
                <span className="absolute top-3 right-3 text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/15 text-primary">
                  Popular
                </span>
              )}
              {isSelected && (
                <span className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Check size={13} className="text-white" />
                </span>
              )}
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground block mb-1">
                {service.category}
              </span>
              <p className="text-base font-bold text-foreground mb-2">{service.name}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                  <Clock size={12} />
                  {service.duration}
                </div>
                <p className="text-lg font-bold text-primary tabular-nums">{service.price} AED</p>
              </div>
            </button>
          );
        })}
      </div>

      {selected && (
        <div className="mt-6">
          <button
            onClick={() => onSelect(selected)}
            className="btn-primary w-full justify-center text-base py-4"
          >
            Continue with {selected.name} <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}