'use client';
import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const weeklyData = [
  { day: 'Mon 27', revenue: 1240, bookings: 6 },
  { day: 'Tue 28', revenue: 980, bookings: 5 },
  { day: 'Wed 29', revenue: 1580, bookings: 8 },
  { day: 'Thu 30', revenue: 2100, bookings: 10 },
  { day: 'Fri 01', revenue: 1890, bookings: 9 },
  { day: 'Sat 02', revenue: 640, bookings: 3 },
  { day: 'Sun 03', revenue: 0, bookings: 0 },
];

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string }>; label?: string }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-white border border-border rounded-xl px-4 py-3 shadow-lg">
      <p className="text-xs font-semibold text-muted-foreground mb-2">{label}</p>
      <p className="text-sm font-bold text-foreground tabular-nums">
        {payload[0]?.value?.toLocaleString()} AED
      </p>
      <p className="text-xs text-muted-foreground">{payload[1]?.value} bookings</p>
    </div>
  );
}

export default function RevenueChart() {
  return (
    <div className="bg-white rounded-2xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-bold text-foreground">Weekly Revenue</h3>
          <p className="text-xs text-muted-foreground">Apr 27 – May 3, 2026</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-foreground tabular-nums">8,430 AED</p>
          <p className="text-xs text-emerald-600 font-medium">+12% vs last week</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={weeklyData} margin={{ top: 5, right: 5, bottom: 0, left: -10 }}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="var(--primary)"
            strokeWidth={2.5}
            fill="url(#revenueGradient)"
            dot={{ r: 3, fill: 'var(--primary)', strokeWidth: 0 }}
            activeDot={{ r: 5, fill: 'var(--primary)' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}