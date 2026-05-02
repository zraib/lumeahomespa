import React from 'react';
import { Shield, Clock, Star, MapPin, Award } from 'lucide-react';

const trustItems = [
  { icon: Shield, label: 'Certified Therapists', desc: 'Licensed professionals only' },
  { icon: Clock, label: 'Flexible Scheduling', desc: '9AM – 10PM, 7 days' },
  { icon: Star, label: '4.9 Rating', desc: '240+ verified reviews' },
  { icon: MapPin, label: 'All Dubai Areas', desc: 'We come to you' },
  { icon: Award, label: 'Premium Products', desc: 'Luxury oils & tools' },
];

export default function TrustBar() {
  return (
    <section className="bg-white border-y border-border">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-6">
        <div className="flex flex-wrap items-center justify-center lg:justify-between gap-6">
          {trustItems?.map((item) => (
            <div key={`trust-${item?.label}`} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <item.icon size={17} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{item?.label}</p>
                <p className="text-xs text-muted-foreground">{item?.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}