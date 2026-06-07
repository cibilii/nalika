'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { toast } from 'sonner';
import { Search, XCircle } from 'lucide-react';

export default function ReservationsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (filterStatus !== 'ALL') params.append('status', filterStatus);
      const res = await fetch(`/api/admin/bookings?${params.toString()}`);
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'خطا در دریافت');
      }
      const data = await res.json();
      setBookings(data);
    } catch (error) {
      console.error(error);
      toast.error('خطا در دریافت رزروها');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [search, filterStatus]);

  const cancelBooking = async (id) => {
    if (!confirm('آیا از لغو این نوبت اطمینان دارید؟')) return;
    try {
      const res = await fetch(`/api/admin/bookings/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      toast.success('نوبت با موفقیت لغو شد');
      fetchBookings();
    } catch {
      toast.error('خطا در لغو نوبت');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-3xl font-bold">مدیریت رزروها</h1>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="جستجو (نام، تلفن، کد)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-zinc-800 border border-zinc-700 rounded-2xl py-2 pr-10 pl-4 text-sm"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-2 text-sm"
          >
            <option value="ALL">همه</option>
            <option value="CONFIRMED">تأیید شده</option>
            <option value="CANCELLED">لغو شده</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-zinc-900 rounded-3xl p-5 animate-pulse h-28" />
          ))}
        </div>
      ) : bookings.length === 0 ? (
        <Card className="text-center py-12 text-zinc-400">رزروی یافت نشد</Card>
      ) : (
        <div className="space-y-3">
          {bookings.map((booking) => (
            <Card key={booking.id} className="flex flex-wrap justify-between items-center gap-3">
              <div className="space-y-1">
                <div className="font-semibold">
                  {booking.customer.firstName} {booking.customer.lastName}
                </div>
                <div className="text-sm text-zinc-400">
                  {booking.service.name} • {booking.date} • {booking.slot}
                </div>
                <div className="text-xs text-zinc-500">کد: {booking.trackingNumber}</div>
                {/* نمایش نمونه کار انتخاب شده */}
                {booking.portfolio && (
                  <div className="flex items-center gap-2 mt-1">
                    <img
                      src={booking.portfolio.imageUrl}
                      alt={booking.portfolio.title}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-xs text-pink-400">
                      نمونه: {booking.portfolio.title}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    booking.status === 'CONFIRMED'
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'bg-red-500/10 text-red-400'
                  }`}
                >
                  {booking.status === 'CONFIRMED' ? 'تأیید شده' : 'لغو شده'}
                </span>
                {booking.status === 'CONFIRMED' && (
                  <Button
                    variant="ghost"
                    onClick={() => cancelBooking(booking.id)}
                    className="text-rose-400 hover:text-rose-300"
                  >
                    <XCircle className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}