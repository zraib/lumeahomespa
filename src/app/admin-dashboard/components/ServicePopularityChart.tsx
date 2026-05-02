'use client';
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const serviceData = [
  { name: 'Swedish', bookings: 18, color: '#C9A96E' },
  { name: 'Deep Tissue', bookings: 14, color: '#A07840' },
  { name: 'Buccal', bookings: 9, color: '#E2C48A' },
  { name: 'Hot Stone', bookings: 11, color: '#C9A96E' },
  { name: 'Lymphatic', bookings: 7, color: '#A07840' },
  { name: 'Thai', bookings: 8, color: '#E2C48A' },
  { name: 'Face Lift', bookings: 6, color: '#C9A96E' },
  { name: 'Reflexology', bookings: 4, color: '#A07840' },
];

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-white border border-border rounded-xl px-3 py-2.5 shadow-lg">
      <p className="text-xs font-semibold text-foreground">{label}</p>
      <p className="text-sm font-bold text-primary tabular-nums">{payload[0]?.value} bookings</p>
    </div>
  );
}

export default function ServicePopularityChart() {
  return (
    <div className="bg-white rounded-2xl border border-border p-6 h-full">
      <div className="mb-6">
        <h3 className="text-base font-bold text-foreground">Service Popularity</h3>
        <p className="text-xs text-muted-foreground">Bookings by type — last 30 days</p>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={serviceData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }} barSize={16}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={true} vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
            axisLine={false}
            tickLine={false}
            angle={-30}
            textAnchor="end"
            height={40}
          />
          <YAxis
            tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="bookings" radius={[6, 6, 0, 0]}>
            {serviceData.map((entry, index) => (
              <Cell key={`cell-service-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}