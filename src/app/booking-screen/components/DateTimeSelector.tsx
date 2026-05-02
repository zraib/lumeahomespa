'use client';
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, ArrowLeft, Clock } from 'lucide-react';
import type { SelectedDateTime } from './BookingFlow';

const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '12:00', '13:00',
  '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
];

// Mock unavailable slots
const UNAVAILABLE: Record<string, string[]> = {
  '2026-05-03': ['09:00', '10:00', '14:00'],
  '2026-05-05': ['11:00', '12:00', '15:00', '16:00'],
  '2026-05-07': ['09:00', '10:00', '11:00', '12:00', '13:00'],
  '2026-05-08': ['18:00', '19:00', '20:00'],
  '2026-05-10': ['14:00', '15:00'],
};

function formatDisplayDate(dateStr: string): string {
  const parts = dateStr.split('-');
  const year = parseInt(parts[0]);
  const month = parseInt(parts[1]) - 1;
  const day = parseInt(parts[2]);
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const d = new Date(year, month, day);
  return `${days[d.getDay()]}, ${day} ${months[month]} ${year}`;
}

function formatDisplayTime(time: string): string {
  const [h, m] = time.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hour = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${hour}:${m.toString().padStart(2, '0')} ${suffix}`;
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];

export default function DateTimeSelector({
  onSelect,
  onBack,
  selected,
}: {
  onSelect: (dt: SelectedDateTime) => void;
  onBack: () => void;
  selected: SelectedDateTime | null;
}) {
  const today = new Date(2026, 4, 2); // May 2 2026
  const [viewYear, setViewYear] = useState(2026);
  const [viewMonth, setViewMonth] = useState(4); // May = 4
  const [selectedDate, setSelectedDate] = useState<string | null>(selected?.date ?? null);
  const [selectedTime, setSelectedTime] = useState<string | null>(selected?.time ?? null);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
    else setViewMonth(viewMonth - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
    else setViewMonth(viewMonth + 1);
  };

  const isDatePast = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return d < t;
  };

  const getDateStr = (day: number) =>
    `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  const unavailableSlots = selectedDate ? (UNAVAILABLE[selectedDate] ?? []) : [];

  const canContinue = selectedDate && selectedTime;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-1">Select Date & Time</h2>
        <p className="text-muted-foreground text-sm">Choose your preferred appointment slot.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar */}
        <div className="bg-white rounded-2xl border border-border p-5">
          <div className="flex items-center justify-between mb-5">
            <button
              onClick={prevMonth}
              className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-sm font-bold text-foreground">
              {MONTH_NAMES[viewMonth]} {viewYear}
            </span>
            <button
              onClick={nextMonth}
              className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
              aria-label="Next month"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-2">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
              <div key={`cal-hdr-${d}`} className="text-center text-xs font-semibold text-muted-foreground py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 gap-0.5">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`cal-empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dateStr = getDateStr(day);
              const isPast = isDatePast(day);
              const isSelected = selectedDate === dateStr;
              const isToday = dateStr === '2026-05-02';
              const hasUnavailable = Object.keys(UNAVAILABLE).includes(dateStr);

              return (
                <button
                  key={`cal-day-${dateStr}`}
                  disabled={isPast}
                  onClick={() => { setSelectedDate(dateStr); setSelectedTime(null); }}
                  className={`aspect-square rounded-lg text-sm font-medium transition-all duration-150 flex items-center justify-center relative ${
                    isPast
                      ? 'text-muted-foreground/30 cursor-not-allowed'
                      : isSelected
                      ? 'bg-primary text-white font-bold'
                      : isToday
                      ? 'border-2 border-primary text-primary font-bold hover:bg-primary/10' :'text-foreground hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  {day}
                  {hasUnavailable && !isPast && !isSelected && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary/50" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-primary/50" /> Partial availability</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-primary" /> Selected</span>
          </div>
        </div>

        {/* Time slots */}
        <div className="bg-white rounded-2xl border border-border p-5">
          <h3 className="text-sm font-bold text-foreground mb-1">
            {selectedDate ? formatDisplayDate(selectedDate) : 'Select a date first'}
          </h3>
          <p className="text-xs text-muted-foreground mb-4">Available time slots</p>

          {!selectedDate ? (
            <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
              <Clock size={32} className="mb-3 opacity-30" />
              <p className="text-sm">Pick a date to see available slots</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {TIME_SLOTS.map((slot) => {
                const isUnavailable = unavailableSlots.includes(slot);
                const isSelected = selectedTime === slot;
                return (
                  <button
                    key={`slot-${selectedDate}-${slot}`}
                    disabled={isUnavailable}
                    onClick={() => setSelectedTime(slot)}
                    className={`py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                      isUnavailable
                        ? 'bg-muted text-muted-foreground/40 cursor-not-allowed line-through'
                        : isSelected
                        ? 'bg-primary text-white font-bold' :'bg-muted text-foreground hover:bg-primary/15 hover:text-primary'
                    }`}
                  >
                    {formatDisplayTime(slot)}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 mt-6">
        <button
          onClick={onBack}
          className="btn-outline flex items-center gap-2 px-6 py-3"
        >
          <ArrowLeft size={15} /> Back
        </button>
        <button
          disabled={!canContinue}
          onClick={() => {
            if (!selectedDate || !selectedTime) return;
            onSelect({
              date: selectedDate,
              displayDate: formatDisplayDate(selectedDate),
              time: selectedTime,
              displayTime: formatDisplayTime(selectedTime),
            });
          }}
          className={`btn-primary flex-1 justify-center py-3 ${!canContinue ? 'opacity-40 cursor-not-allowed' : ''}`}
        >
          Continue to Details <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}