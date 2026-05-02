import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 'review-001',
    name: 'Nour Al-Rashid',
    location: 'Dubai Marina',
    rating: 5,
    service: 'Buccal Massage',
    text: 'Absolutely incredible experience. The therapist was professional, punctual, and the buccal massage gave me results I never expected from a home service. My jaw looks sculpted!',
    date: '3 days ago',
  },
  {
    id: 'review-002',
    name: 'Sarah Mitchell',
    location: 'Downtown Dubai',
    rating: 5,
    service: 'Serenity Ritual',
    text: 'Booked the Serenity Ritual for my birthday and it was the best decision. The aromatherapy was divine and the collagen mask left my skin glowing. Will book again next month.',
    date: '1 week ago',
  },
  {
    id: 'review-003',
    name: 'Fatima Al-Zaabi',
    location: 'JBR',
    rating: 5,
    service: 'Deep Tissue',
    text: 'I\'ve tried many spa services in Dubai but LumeaHomeSpa is on another level. The deep tissue massage addressed years of back pain. The convenience of home service is unbeatable.',
    date: '2 weeks ago',
  },
  {
    id: 'review-004',
    name: 'Emma Thompson',
    location: 'Palm Jumeirah',
    rating: 5,
    service: 'Hot Stone',
    text: 'The hot stone massage was pure heaven. The therapist arrived on time, set up beautifully, and the entire experience felt like a luxury hotel spa. Highly recommend!',
    date: '3 weeks ago',
  },
  {
    id: 'review-005',
    name: 'Layla Hassan',
    location: 'Business Bay',
    rating: 5,
    service: 'Lymphatic Drainage',
    text: 'After my surgery, my doctor recommended lymphatic drainage. LumeaHomeSpa sent a certified therapist who was incredibly knowledgeable. Visible results after just 3 sessions.',
    date: '1 month ago',
  },
  {
    id: 'review-006',
    name: 'Priya Sharma',
    location: 'DIFC',
    rating: 5,
    service: 'Thai Massage',
    text: 'Best Thai massage I\'ve had outside of Thailand! The stretching and pressure techniques were perfect. Booking was so easy via WhatsApp and confirmation was instant.',
    date: '1 month ago',
  },
];

export default function TestimonialsSection() {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">Client Stories</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What Our Clients Say
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            {[1,2,3,4,5]?.map((i) => (
              <Star key={`rating-star-${i}`} size={20} className="text-primary fill-primary" />
            ))}
            <span className="text-sm font-semibold text-foreground ml-2">4.9</span>
            <span className="text-sm text-muted-foreground">from 240+ reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials?.map((review) => (
            <div
              key={review?.id}
              className="bg-white rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center text-sm font-bold text-primary">
                    {review?.name?.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{review?.name}</p>
                    <p className="text-xs text-muted-foreground">{review?.location}</p>
                  </div>
                </div>
                <Quote size={20} className="text-primary/30" />
              </div>

              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: review?.rating })?.map((_, i) => (
                  <Star key={`review-star-${review?.id}-${i}`} size={13} className="text-primary fill-primary" />
                ))}
              </div>

              <span className="inline-block text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary mb-3">
                {review?.service}
              </span>

              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{review?.text}</p>

              <p className="text-xs text-muted-foreground/60">{review?.date}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}