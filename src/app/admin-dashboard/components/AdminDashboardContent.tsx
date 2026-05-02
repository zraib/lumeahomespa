import React from 'react';
import KPIGrid from './KPIGrid';
import TodaySchedule from './TodaySchedule';
import BookingsTable from './BookingsTable';
import RevenueChart from './RevenueChart';
import ServicePopularityChart from './ServicePopularityChart';

export default function AdminDashboardContent() {
  return (
    <div className="space-y-8 max-w-screen-2xl mx-auto">
      {/* KPIs */}
      <KPIGrid />

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <RevenueChart />
        </div>
        <div className="xl:col-span-1">
          <ServicePopularityChart />
        </div>
      </div>

      {/* Today schedule */}
      <TodaySchedule />

      {/* Bookings table */}
      <BookingsTable />
    </div>
  );
}