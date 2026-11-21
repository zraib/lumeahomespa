import React from 'react';
import { CalendarCheck, TrendingUp, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';

const kpis = [
  {
    id: 'kpi-today',
    label: "Today\'s Bookings",
    value: '7',
    sub: '3 confirmed · 4 pending',
    icon: CalendarCheck,
    trend: '+2 vs yesterday',
    trendUp: true,
    color: 'bg-blue-50 border-blue-100',
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-100',
  },
  {
    id: 'kpi-revenue',
    label: 'Weekly Revenue',
    value: '8,430',
    sub: 'AED this week',
    icon: TrendingUp,
    trend: '+12% vs last week',
    trendUp: true,
    color: 'bg-emerald-50 border-emerald-100',
    iconColor: 'text-emerald-600',
    iconBg: 'bg-emerald-100',
    isCurrency: true,
  },
  {
    id: 'kpi-pending',
    label: 'Pending Confirmations',
    value: '4',
    sub: 'Awaiting WhatsApp reply',
    icon: AlertCircle,
    trend: 'Action required',
    trendUp: false,
    color: 'bg-amber-50 border-amber-200',
    iconColor: 'text-amber-600',
    iconBg: 'bg-amber-100',
    alert: true,
  },
  {
    id: 'kpi-completed',
    label: 'Completed This Week',
    value: '31',
    sub: 'Sessions delivered',
    icon: CheckCircle2,
    trend: '+5 vs last week',
    trendUp: true,
    color: 'bg-violet-50 border-violet-100',
    iconColor: 'text-violet-600',
    iconBg: 'bg-violet-100',
  },
  {
    id: 'kpi-cancel',
    label: 'Cancellation Rate',
    value: '4.2%',
    sub: '2 of 47 bookings',
    icon: XCircle,
    trend: '-1.1% vs last week',
    trendUp: true,
    color: 'bg-rose-50 border-rose-100',
    iconColor: 'text-rose-500',
    iconBg: 'bg-rose-100',
  },
];

export default function KPIGrid() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-foreground">Overview</h2>
        <span className="text-xs text-muted-foreground">Last updated: 2 min ago</span>
      </div>
      {/* 5 cards: hero spans 2 cols + 4 regular — grid-cols-4 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {/* Hero card — weekly revenue spans 2 cols */}
        {kpis?.map((kpi, idx) => (
          <div
            key={kpi?.id}
            className={`rounded-2xl border p-5 ${kpi?.color} ${idx === 1 ? 'lg:col-span-2' : ''} ${kpi?.alert ? 'ring-2 ring-amber-300/50' : ''}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl ${kpi?.iconBg} flex items-center justify-center`}>
                <kpi.icon size={18} className={kpi?.iconColor} />
              </div>
              {kpi?.alert && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-800">
                  ⚠ Action
                </span>
              )}
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
              {kpi?.label}
            </p>
            <p className="text-3xl font-bold text-foreground tabular-nums mb-0.5">
              {kpi?.isCurrency ? (
                <span>
                  {kpi?.value}{' '}
                  <span className="text-sm font-medium text-muted-foreground">AED</span>
                </span>
              ) : (
                kpi?.value
              )}
            </p>
            <p className="text-xs text-muted-foreground mb-2">{kpi?.sub}</p>
            <p
              className={`text-xs font-medium ${kpi?.trendUp ? 'text-emerald-600' : 'text-amber-600'}`}
            >
              {kpi?.trend}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
