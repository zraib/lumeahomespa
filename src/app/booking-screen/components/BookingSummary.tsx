import React from 'react';
import { Calendar, Clock, MapPin, MessageCircle } from 'lucide-react';
import type { BookingState } from './BookingFlow';

export default function BookingSummary({
  booking,
  currentStep,
}: {
  booking: BookingState;
  currentStep: number;
}) {
  return (
    <div className="sticky top-28">
      <div className="bg-white rounded-2xl border border-border overflow-hidden luxury-shadow">
        {/* Header */}
        <div className="px-6 py-5 border-b border-border bg-gradient-to-r from-primary/5 to-transparent">
          <h3 className="text-sm font-bold text-foreground uppercase tracking-widest">
            Booking Summary
          </h3>
        </div>

        <div className="px-6 py-5 space-y-4">
          {/* Service */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
              Treatment
            </p>
            {booking.service ? (
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-bold text-foreground">{booking.service.name}</p>
                  <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
                    <Clock size={11} />
                    {booking.service.duration}
                  </div>
                </div>
                <p className="text-lg font-bold text-primary tabular-nums shrink-0">
                  {booking.service.price} AED
                </p>
              </div>
            ) : (
              <div className="h-10 bg-muted rounded-lg animate-pulse" />
            )}
          </div>

          <div className="h-px bg-border" />

          {/* Date */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
              Date & Time
            </p>
            {booking.datetime ? (
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Calendar size={13} className="text-primary shrink-0" />
                  {booking.datetime.displayDate}
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Clock size={13} className="text-primary shrink-0" />
                  {booking.datetime.displayTime}
                </div>
              </div>
            ) : currentStep >= 2 ? (
              <div className="h-10 bg-muted rounded-lg animate-pulse" />
            ) : (
              <p className="text-sm text-muted-foreground/50 italic">Select in next step</p>
            )}
          </div>

          <div className="h-px bg-border" />

          {/* Location */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
              Location
            </p>
            <div className="flex items-center gap-2 text-sm text-foreground">
              <MapPin size={13} className="text-primary shrink-0" />
              Dubai, UAE — Home Visit
            </div>
          </div>

          {booking.service && (
            <>
              <div className="h-px bg-border" />
              <div className="flex items-center justify-between pt-1">
                <p className="text-sm font-bold text-foreground">Total</p>
                <p className="text-2xl font-bold text-primary tabular-nums">
                  {booking.service.price} AED
                </p>
              </div>
            </>
          )}
        </div>

        {/* WhatsApp note */}
        <div className="px-6 pb-6">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-green-50 border border-green-100">
            <MessageCircle size={16} className="text-green-600 mt-0.5 shrink-0" />
            <p className="text-xs text-green-700 leading-relaxed">
              Your booking will be confirmed via WhatsApp. We&apos;ll respond within 15 minutes.
            </p>
          </div>
        </div>
      </div>

      {/* Help */}
      <div className="mt-4 text-center">
        <p className="text-xs text-muted-foreground">Need help?</p>
        <a
          href="https://wa.me/971000000000"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-primary hover:underline"
        >
          Chat with us on WhatsApp
        </a>
      </div>
    </div>
  );
}
