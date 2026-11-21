'use client';
import React, { useState } from 'react';
import StepIndicator from './StepIndicator';
import ServiceSelector from './ServiceSelector';
import DateTimeSelector from './DateTimeSelector';
import ClientDetailsForm from './ClientDetailsForm';
import BookingSummary from './BookingSummary';

export type SelectedService = {
  id: string;
  name: string;
  price: number;
  duration: string;
  category: string;
};

export type SelectedDateTime = {
  date: string; // YYYY-MM-DD
  displayDate: string;
  time: string;
  displayTime: string;
};

export type ClientDetails = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  area: string;
  address: string;
  notes: string;
};

export type BookingState = {
  service: SelectedService | null;
  datetime: SelectedDateTime | null;
  client: ClientDetails | null;
};

const steps = [
  { id: 1, label: 'Service', desc: 'Choose your treatment' },
  { id: 2, label: 'Date & Time', desc: 'Select availability' },
  { id: 3, label: 'Your Details', desc: 'Confirm & book' },
];

export default function BookingFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [booking, setBooking] = useState<BookingState>({
    service: null,
    datetime: null,
    client: null,
  });

  const handleServiceSelect = (service: SelectedService) => {
    setBooking((prev) => ({ ...prev, service }));
    setCurrentStep(2);
  };

  const handleDateTimeSelect = (datetime: SelectedDateTime) => {
    setBooking((prev) => ({ ...prev, datetime }));
    setCurrentStep(3);
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleConfirm = (client: ClientDetails) => {
    setBooking((prev) => ({ ...prev, client }));
    // Backend integration point: POST /api/bookings with booking + client data
    if (!booking.service || !booking.datetime) return;
    const msg = encodeURIComponent(
      `Hi LumeaHomeSpa! 🌿\n\nI'd like to confirm my booking:\n\n` +
        `*Service:* ${booking.service.name}\n` +
        `*Date:* ${booking.datetime.displayDate}\n` +
        `*Time:* ${booking.datetime.displayTime}\n` +
        `*Duration:* ${booking.service.duration}\n` +
        `*Price:* ${booking.service.price} AED\n\n` +
        `*Name:* ${client.firstName} ${client.lastName}\n` +
        `*Phone:* ${client.phone}\n` +
        `*Area:* ${client.area}\n` +
        `*Address:* ${client.address}\n` +
        (client.notes ? `*Notes:* ${client.notes}\n` : '') +
        `\nPlease confirm my appointment. Thank you! 🙏`
    );
    window.open(`https://wa.me/971000000000?text=${msg}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero strip */}
      <div className="bg-accent py-14 px-6">
        <div className="max-w-screen-xl mx-auto text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">
            Home Massage Dubai
          </span>
          <h1 className="text-4xl font-bold text-white mb-2">Book Your Session</h1>
          <p className="text-white/60 text-base">
            Select your treatment and we&apos;ll come to you.
          </p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-12">
        <StepIndicator steps={steps} currentStep={currentStep} />

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <ServiceSelector onSelect={handleServiceSelect} selected={booking.service} />
            )}
            {currentStep === 2 && (
              <DateTimeSelector
                onSelect={handleDateTimeSelect}
                onBack={handleBack}
                selected={booking.datetime}
              />
            )}
            {currentStep === 3 && (
              <ClientDetailsForm onConfirm={handleConfirm} onBack={handleBack} booking={booking} />
            )}
          </div>

          <div className="lg:col-span-1">
            <BookingSummary booking={booking} currentStep={currentStep} />
          </div>
        </div>
      </div>
    </div>
  );
}
