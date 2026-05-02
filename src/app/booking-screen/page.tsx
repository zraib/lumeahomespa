import React from 'react';
import PublicHeader from '@/components/PublicHeader';
import PublicFooter from '@/components/PublicFooter';
import BookingFlow from './components/BookingFlow';

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-background">
      <PublicHeader />
      <div className="pt-20">
        <BookingFlow />
      </div>
      <PublicFooter />
    </main>
  );
}