'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ArrowLeft, MessageCircle, Loader2, CheckCircle } from 'lucide-react';
import type { BookingState, ClientDetails } from './BookingFlow';

const DUBAI_AREAS = [
  'Downtown Dubai',
  'Dubai Marina',
  'JBR',
  'Palm Jumeirah',
  'Business Bay',
  'DIFC',
  'Jumeirah',
  'Jumeirah Beach Residence',
  'Al Barsha',
  'Deira',
  'Bur Dubai',
  'Al Quoz',
  'Motor City',
  'Arabian Ranches',
  'Emirates Hills',
  'Mirdif',
  'Silicon Oasis',
  'Sports City',
  'Jumeirah Village Circle',
  'Other',
];

export default function ClientDetailsForm({
  onConfirm,
  onBack,
  booking,
}: {
  onConfirm: (client: ClientDetails) => void;
  onBack: () => void;
  booking: BookingState;
}) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientDetails>();

  const onSubmit = (data: ClientDetails) => {
    setLoading(true);
    // Backend integration point: POST /api/bookings { ...booking, client: data }
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => {
        onConfirm(data);
      }, 800);
    }, 1200);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <CheckCircle size={32} className="text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">Opening WhatsApp...</h3>
        <p className="text-muted-foreground text-sm">
          Your booking details are pre-filled. Just send the message to confirm!
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-1">Your Details</h2>
        <p className="text-muted-foreground text-sm">
          We'll use this to confirm your appointment via WhatsApp.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Name row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register('firstName', { required: 'First name is required' })}
              type="text"
              placeholder="Nour"
              className={`w-full px-4 py-3 rounded-xl border bg-white text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 ${
                errors.firstName ? 'border-red-400' : 'border-border focus:border-primary'
              }`}
            />
            {errors.firstName && (
              <p className="text-xs text-red-500 mt-1">{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register('lastName', { required: 'Last name is required' })}
              type="text"
              placeholder="Al-Rashid"
              className={`w-full px-4 py-3 rounded-xl border bg-white text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 ${
                errors.lastName ? 'border-red-400' : 'border-border focus:border-primary'
              }`}
            />
            {errors.lastName && (
              <p className="text-xs text-red-500 mt-1">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">
            WhatsApp Number <span className="text-red-500">*</span>
          </label>
          <p className="text-xs text-muted-foreground mb-2">
            We'll send confirmation to this number
          </p>
          <input
            {...register('phone', {
              required: 'Phone number is required',
              pattern: { value: /^[\d\s\+\-\(\)]{9,15}$/, message: 'Enter a valid phone number' },
            })}
            type="tel"
            placeholder="+971 50 000 0000"
            className={`w-full px-4 py-3 rounded-xl border bg-white text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 ${
              errors.phone ? 'border-red-400' : 'border-border focus:border-primary'
            }`}
          />
          {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">
            Email Address
          </label>
          <p className="text-xs text-muted-foreground mb-2">
            Optional — for booking confirmation email
          </p>
          <input
            {...register('email', {
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Enter a valid email address',
              },
            })}
            type="email"
            placeholder="nour@example.com"
            className={`w-full px-4 py-3 rounded-xl border bg-white text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 ${
              errors.email ? 'border-red-400' : 'border-border focus:border-primary'
            }`}
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
        </div>

        {/* Area */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">
            Dubai Area <span className="text-red-500">*</span>
          </label>
          <select
            {...register('area', { required: 'Please select your area' })}
            className={`w-full px-4 py-3 rounded-xl border bg-white text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 ${
              errors.area ? 'border-red-400' : 'border-border focus:border-primary'
            }`}
          >
            <option value="">Select your area</option>
            {DUBAI_AREAS.map((area) => (
              <option key={`area-${area}`} value={area}>
                {area}
              </option>
            ))}
          </select>
          {errors.area && <p className="text-xs text-red-500 mt-1">{errors.area.message}</p>}
        </div>

        {/* Full address */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">
            Full Address <span className="text-red-500">*</span>
          </label>
          <p className="text-xs text-muted-foreground mb-2">
            Building name, apartment/villa number, street
          </p>
          <textarea
            {...register('address', {
              required: 'Address is required',
              minLength: { value: 10, message: 'Please provide a complete address' },
            })}
            rows={3}
            placeholder="Marina Gate Tower 1, Apt 2204, Dubai Marina"
            className={`w-full px-4 py-3 rounded-xl border bg-white text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none ${
              errors.address ? 'border-red-400' : 'border-border focus:border-primary'
            }`}
          />
          {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address.message}</p>}
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">
            Special Requests or Notes
          </label>
          <p className="text-xs text-muted-foreground mb-2">
            Allergies, preferences, health conditions
          </p>
          <textarea
            {...register('notes')}
            rows={2}
            placeholder="E.g. I prefer lighter pressure, I have a peanut allergy..."
            className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none"
          />
        </div>

        {/* Required fields note */}
        <p className="text-xs text-muted-foreground">
          <span className="text-red-500">*</span> Required fields
        </p>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={onBack}
            className="btn-outline flex items-center gap-2 px-6 py-3"
          >
            <ArrowLeft size={15} /> Back
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex-1 justify-center py-3.5 text-base"
            style={{ minWidth: '200px' }}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Preparing booking...
              </>
            ) : (
              <>
                <MessageCircle size={18} />
                Confirm via WhatsApp
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
