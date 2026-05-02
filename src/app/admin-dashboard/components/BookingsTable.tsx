'use client';
import React, { useState } from 'react';
import { Search, ChevronUp, ChevronDown, MessageCircle, Trash2, ChevronLeft, ChevronRight, Filter } from 'lucide-react';

type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

type Booking = {
  id: string;
  client: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  area: string;
  duration: string;
  price: number;
  status: BookingStatus;
};

const allBookings: Booking[] = [
  { id: 'BK-0047', client: 'Nour Al-Rashid', phone: '+971 55 123 4567', service: 'Buccal Massage', date: '02 May 2026', time: '09:00', area: 'Dubai Marina', duration: '60 min', price: 200, status: 'confirmed' },
  { id: 'BK-0046', client: 'Sarah Mitchell', phone: '+971 50 234 5678', service: 'Serenity Ritual', date: '02 May 2026', time: '11:00', area: 'Downtown Dubai', duration: '120 min', price: 299, status: 'confirmed' },
  { id: 'BK-0045', client: 'Fatima Al-Zaabi', phone: '+971 52 345 6789', service: 'Swedish Relaxing', date: '02 May 2026', time: '13:00', area: 'JBR', duration: '60 min', price: 149, status: 'pending' },
  { id: 'BK-0044', client: 'Emma Thompson', phone: '+971 56 456 7890', service: 'Hot Stone', date: '02 May 2026', time: '15:00', area: 'Palm Jumeirah', duration: '60 min', price: 170, status: 'confirmed' },
  { id: 'BK-0043', client: 'Layla Hassan', phone: '+971 54 567 8901', service: 'Lymphatic Drainage', date: '02 May 2026', time: '17:00', area: 'Business Bay', duration: '60 min', price: 190, status: 'pending' },
  { id: 'BK-0042', client: 'Priya Sharma', phone: '+971 55 678 9012', service: 'Deep Tissue', date: '02 May 2026', time: '19:00', area: 'DIFC', duration: '60 min', price: 190, status: 'pending' },
  { id: 'BK-0041', client: 'Amira Khalil', phone: '+971 50 789 0123', service: 'Face Lifting', date: '02 May 2026', time: '20:00', area: 'Jumeirah', duration: '60 min', price: 149, status: 'pending' },
  { id: 'BK-0040', client: 'Rania Al-Maktoum', phone: '+971 52 890 1234', service: 'Thai Massage', date: '01 May 2026', time: '10:00', area: 'Emirates Hills', duration: '60 min', price: 190, status: 'completed' },
  { id: 'BK-0039', client: 'Hessa Al-Falasi', phone: '+971 56 901 2345', service: 'Aromatherapy', date: '01 May 2026', time: '14:00', area: 'Al Barsha', duration: '60 min', price: 149, status: 'completed' },
  { id: 'BK-0038', client: 'Olivia Bennett', phone: '+971 50 012 3456', service: 'Detox & Renew Ritual', date: '01 May 2026', time: '16:00', area: 'Jumeirah Village Circle', duration: '90 min', price: 270, status: 'completed' },
  { id: 'BK-0037', client: 'Mariam Al-Qasimi', phone: '+971 55 123 0987', service: 'Reflexology', date: '30 Apr 2026', time: '11:00', area: 'Deira', duration: '60 min', price: 200, status: 'completed' },
  { id: 'BK-0036', client: 'Zara Ahmed', phone: '+971 52 234 1098', service: 'Swedish Relaxing', date: '30 Apr 2026', time: '13:00', area: 'Motor City', duration: '60 min', price: 149, status: 'cancelled' },
  { id: 'BK-0035', client: 'Isabella Rossi', phone: '+971 54 345 2109', service: 'Sculpt & Glow Ritual', date: '30 Apr 2026', time: '15:00', area: 'Palm Jumeirah', duration: '120 min', price: 349, status: 'completed' },
  { id: 'BK-0034', client: 'Noura Al-Suwaidi', phone: '+971 56 456 3210', service: 'Buccal Massage', date: '29 Apr 2026', time: '10:00', area: 'Downtown Dubai', duration: '60 min', price: 200, status: 'completed' },
  { id: 'BK-0033', client: 'Chloe Dubois', phone: '+971 50 567 4321', service: 'Lymphatic Drainage', date: '29 Apr 2026', time: '12:00', area: 'Business Bay', duration: '60 min', price: 190, status: 'cancelled' },
];

const statusConfig: Record<BookingStatus, { label: string; className: string }> = {
  pending: { label: 'Pending', className: 'badge-pending' },
  confirmed: { label: 'Confirmed', className: 'badge-confirmed' },
  completed: { label: 'Completed', className: 'badge-completed' },
  cancelled: { label: 'Cancelled', className: 'badge-cancelled' },
};

const STATUS_OPTIONS: BookingStatus[] = ['pending', 'confirmed', 'completed', 'cancelled'];

type SortKey = keyof Booking;
type SortDir = 'asc' | 'desc';

const PAGE_SIZE_OPTIONS = [5, 10, 15];

export default function BookingsTable() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'all'>('all');
  const [sortKey, setSortKey] = useState<SortKey>('id');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [statusDropdownId, setStatusDropdownId] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Booking[]>(allBookings);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Filter
  const filtered = bookings.filter((b) => {
    const matchSearch =
      b.client.toLowerCase().includes(search.toLowerCase()) ||
      b.service.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase()) ||
      b.area.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchSearch && matchStatus;
  });

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    const av = a[sortKey];
    const bv = b[sortKey];
    if (typeof av === 'number' && typeof bv === 'number') {
      return sortDir === 'asc' ? av - bv : bv - av;
    }
    return sortDir === 'asc'
      ? String(av).localeCompare(String(bv))
      : String(bv).localeCompare(String(av));
  });

  const totalPages = Math.ceil(sorted.length / pageSize);
  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
    setPage(1);
  };

  const handleStatusChange = (id: string, newStatus: BookingStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
    setStatusDropdownId(null);
  };

  const handleDelete = (id: string) => {
    setDeletingId(id);
    setTimeout(() => {
      setBookings((prev) => prev.filter((b) => b.id !== id));
      setDeletingId(null);
    }, 400);
  };

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col)
      return <ChevronUp size={12} className="text-muted-foreground/30" />;
    return sortDir === 'asc' ? (
      <ChevronUp size={12} className="text-primary" />
    ) : (
      <ChevronDown size={12} className="text-primary" />
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-foreground">All Bookings</h3>
          <p className="text-xs text-muted-foreground">{filtered.length} total records</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {/* Search */}
          <div className="relative flex-1 sm:flex-none">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search bookings..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="pl-8 pr-4 py-2 text-sm border border-border rounded-xl bg-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary w-full sm:w-52 transition-colors"
            />
          </div>
          {/* Status filter */}
          <div className="flex items-center gap-1.5">
            <Filter size={13} className="text-muted-foreground" />
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value as BookingStatus | 'all'); setPage(1); }}
              className="text-sm border border-border rounded-xl bg-muted px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors"
            >
              <option value="all">All Status</option>
              {STATUS_OPTIONS.map((s) => (
                <option key={`filter-${s}`} value={s}>
                  {statusConfig[s].label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              {(
                [
                  { key: 'id', label: 'Booking ID' },
                  { key: 'client', label: 'Client' },
                  { key: 'service', label: 'Service' },
                  { key: 'date', label: 'Date' },
                  { key: 'time', label: 'Time' },
                  { key: 'area', label: 'Area' },
                  { key: 'duration', label: 'Duration' },
                  { key: 'price', label: 'Price (AED)' },
                  { key: 'status', label: 'Status' },
                ] as { key: SortKey; label: string }[]
              ).map((col) => (
                <th
                  key={`th-${col.key}`}
                  onClick={() => handleSort(col.key)}
                  className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground cursor-pointer hover:text-foreground select-none whitespace-nowrap"
                >
                  <span className="flex items-center gap-1">
                    {col.label}
                    <SortIcon col={col.key} />
                  </span>
                </th>
              ))}
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={10} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                      <Search size={20} className="text-muted-foreground/40" />
                    </div>
                    <p className="text-sm font-semibold text-foreground">No bookings found</p>
                    <p className="text-xs text-muted-foreground">Try adjusting your search or filter.</p>
                  </div>
                </td>
              </tr>
            ) : (
              paginated.map((booking) => {
                const sc = statusConfig[booking.status];
                const isDeleting = deletingId === booking.id;
                return (
                  <tr
                    key={booking.id}
                    className={`border-b border-border/60 hover:bg-muted/30 transition-all duration-300 ${
                      isDeleting ? 'opacity-0 max-h-0' : 'opacity-100'
                    }`}
                  >
                    <td className="px-4 py-3.5">
                      <span className="text-xs font-mono font-bold text-muted-foreground">{booking.id}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div>
                        <p className="font-semibold text-foreground whitespace-nowrap">{booking.client}</p>
                        <p className="text-xs text-muted-foreground">{booking.phone}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="whitespace-nowrap font-medium text-foreground">{booking.service}</span>
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap text-muted-foreground">{booking.date}</td>
                    <td className="px-4 py-3.5 whitespace-nowrap font-semibold text-foreground tabular-nums">{booking.time}</td>
                    <td className="px-4 py-3.5 whitespace-nowrap text-muted-foreground">{booking.area}</td>
                    <td className="px-4 py-3.5 whitespace-nowrap text-muted-foreground">{booking.duration}</td>
                    <td className="px-4 py-3.5">
                      <span className="font-bold text-foreground tabular-nums">{booking.price}</span>
                    </td>
                    <td className="px-4 py-3.5 relative">
                      <button
                        onClick={() =>
                          setStatusDropdownId(
                            statusDropdownId === booking.id ? null : booking.id
                          )
                        }
                        className={`${sc.className} cursor-pointer hover:opacity-80 transition-opacity`}
                      >
                        {sc.label}
                      </button>
                      {statusDropdownId === booking.id && (
                        <div className="absolute left-0 top-full mt-1 z-20 bg-white border border-border rounded-xl shadow-lg overflow-hidden min-w-[140px] animate-fade-in">
                          {STATUS_OPTIONS.map((s) => (
                            <button
                              key={`status-opt-${booking.id}-${s}`}
                              onClick={() => handleStatusChange(booking.id, s)}
                              className={`w-full text-left px-3 py-2 text-xs font-medium hover:bg-muted transition-colors flex items-center gap-2 ${
                                booking.status === s ? 'bg-muted/60' : ''
                              }`}
                            >
                              <span className={statusConfig[s].className}>{statusConfig[s].label}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <a
                          href={`https://wa.me/${booking.phone.replace(/\s+/g, '')}?text=Hi%20${encodeURIComponent(booking.client)}%2C%20this%20is%20LumeaHomeSpa%20regarding%20your%20${encodeURIComponent(booking.service)}%20on%20${encodeURIComponent(booking.date)}.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-7 h-7 rounded-lg bg-green-50 hover:bg-green-100 flex items-center justify-center transition-colors group relative"
                          aria-label={`WhatsApp ${booking.client}`}
                        >
                          <MessageCircle size={13} className="text-green-600" />
                          <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-foreground text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                            WhatsApp
                          </span>
                        </a>
                        <button
                          onClick={() => handleDelete(booking.id)}
                          className="w-7 h-7 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors group relative"
                          aria-label={`Delete booking ${booking.id}`}
                        >
                          <Trash2 size={13} className="text-red-500" />
                          <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-foreground text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                            Delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span>
            Showing {Math.min((page - 1) * pageSize + 1, sorted.length)}–
            {Math.min(page * pageSize, sorted.length)} of {sorted.length}
          </span>
          <select
            value={pageSize}
            onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
            className="text-xs border border-border rounded-lg px-2 py-1 bg-muted focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            {PAGE_SIZE_OPTIONS.map((s) => (
              <option key={`page-size-${s}`} value={s}>
                {s} / page
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-8 h-8 rounded-lg flex items-center justify-center border border-border hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft size={14} />
          </button>

          {Array.from({ length: totalPages }).map((_, i) => {
            const pg = i + 1;
            const isActive = pg === page;
            if (totalPages > 7 && pg > 2 && pg < totalPages - 1 && Math.abs(pg - page) > 1) {
              if (pg === 3 || pg === totalPages - 2) return <span key={`page-ellipsis-${pg}`} className="text-xs text-muted-foreground px-1">…</span>;
              return null;
            }
            return (
              <button
                key={`page-btn-${pg}`}
                onClick={() => setPage(pg)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary text-white' :'border border-border hover:bg-muted text-foreground'
                }`}
              >
                {pg}
              </button>
            );
          })}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages || totalPages === 0}
            className="w-8 h-8 rounded-lg flex items-center justify-center border border-border hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Next page"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}