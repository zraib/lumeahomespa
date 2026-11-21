import React from 'react';
import { Clock, MapPin, MessageCircle } from 'lucide-react';

const todayBookings = [
  {
    id: 'sched-001',
    time: '09:00',
    client: 'Nour Al-Rashid',
    service: 'Buccal Massage',
    area: 'Dubai Marina',
    duration: 60,
    status: 'confirmed',
  },
  {
    id: 'sched-002',
    time: '11:00',
    client: 'Sarah Mitchell',
    service: 'Serenity Ritual',
    area: 'Downtown Dubai',
    duration: 120,
    status: 'confirmed',
  },
  {
    id: 'sched-003',
    time: '13:00',
    client: 'Fatima Al-Zaabi',
    service: 'Swedish Relaxing',
    area: 'JBR',
    duration: 60,
    status: 'pending',
  },
  {
    id: 'sched-004',
    time: '15:00',
    client: 'Emma Thompson',
    service: 'Hot Stone',
    area: 'Palm Jumeirah',
    duration: 60,
    status: 'confirmed',
  },
  {
    id: 'sched-005',
    time: '17:00',
    client: 'Layla Hassan',
    service: 'Lymphatic Drainage',
    area: 'Business Bay',
    duration: 60,
    status: 'pending',
  },
  {
    id: 'sched-006',
    time: '19:00',
    client: 'Priya Sharma',
    service: 'Deep Tissue',
    area: 'DIFC',
    duration: 60,
    status: 'pending',
  },
  {
    id: 'sched-007',
    time: '20:00',
    client: 'Amira Khalil',
    service: 'Face Lifting',
    area: 'Jumeirah',
    duration: 60,
    status: 'pending',
  },
];

const statusConfig: Record<string, { label: string; className: string }> = {
  confirmed: { label: 'Confirmed', className: 'badge-confirmed' },
  pending: { label: 'Pending', className: 'badge-pending' },
  completed: { label: 'Completed', className: 'badge-completed' },
  cancelled: { label: 'Cancelled', className: 'badge-cancelled' },
};

export default function TodaySchedule() {
  return (
    <div className="bg-white rounded-2xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-bold text-foreground">Today&apos;s Schedule</h3>
          <p className="text-xs text-muted-foreground">Saturday, 02 May 2026 — 7 appointments</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="badge-confirmed">3 confirmed</span>
          <span className="badge-pending">4 pending</span>
        </div>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[52px] top-2 bottom-2 w-px bg-border" />

        <div className="space-y-3">
          {todayBookings.map((booking) => {
            const sc = statusConfig[booking.status] ?? statusConfig.pending;
            return (
              <div key={booking.id} className="flex items-start gap-4 group">
                {/* Time */}
                <div className="w-12 shrink-0 text-right">
                  <span className="text-xs font-bold text-muted-foreground tabular-nums">
                    {booking.time}
                  </span>
                </div>

                {/* Dot */}
                <div
                  className={`w-3 h-3 rounded-full mt-1 shrink-0 border-2 ${
                    booking.status === 'confirmed'
                      ? 'bg-emerald-500 border-emerald-200'
                      : 'bg-amber-400 border-amber-200'
                  }`}
                />

                {/* Card */}
                <div
                  className={`flex-1 rounded-xl p-3.5 border transition-all duration-150 group-hover:shadow-sm ${
                    booking.status === 'confirmed'
                      ? 'bg-emerald-50/50 border-emerald-100'
                      : 'bg-amber-50/50 border-amber-100'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-bold text-foreground truncate">
                          {booking.client}
                        </p>
                        <span className={sc.className}>{sc.label}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1.5">{booking.service}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock size={11} />
                          {booking.duration} min
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={11} />
                          {booking.area}
                        </span>
                      </div>
                    </div>
                    <a
                      href={`https://wa.me/971000000000?text=Hi%20${encodeURIComponent(booking.client)}%2C%20your%20${encodeURIComponent(booking.service)}%20appointment%20is%20confirmed%20for%20today%20at%20${booking.time}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-green-100 hover:bg-green-200 flex items-center justify-center transition-colors shrink-0"
                      aria-label={`WhatsApp ${booking.client}`}
                    >
                      <MessageCircle size={15} className="text-green-700" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
