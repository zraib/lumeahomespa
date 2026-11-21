import React from 'react';
import PublicHeader from '@/components/PublicHeader';
import PublicFooter from '@/components/PublicFooter';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import RitualsSection from './components/RitualsSection';
import TestimonialsSection from './components/TestimonialsSection';
import WhatsAppCTA from './components/WhatsAppCTA';
import TrustBar from './components/TrustBar';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <PublicHeader />
      <HeroSection />
      <TrustBar />
      <ServicesSection />
      <RitualsSection />
      <TestimonialsSection />
      <WhatsAppCTA />
      <PublicFooter />
    </main>
  );
}
