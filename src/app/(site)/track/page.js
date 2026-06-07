'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { toast } from 'sonner';

export default function TrackPage() {
  const [tracking, setTracking] = useState('');
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!tracking.trim()) return toast.error('کد پیگیری را وارد کنید');
    setLoading(true);
    try {
      const res = await fetch(`/api/track/${tracking}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setBooking(data);
    } catch {
      toast.error('نوبتی با این کد یافت نشد');
      setBooking(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-2">پیگیری نوبت</h1>
      <p className="text-center text-zinc-400 mb-8">کد پیگیری خود را وارد کنید</p>
      <form onSubmit={handleTrack} className="space-y-4">
        <Input
          placeholder="مثال: LX-250101-ABC"
          value={tracking}
          onChange={(e) => setTracking(e.target.value)}
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'در حال جستجو...' : 'بررسی وضعیت'}
        </Button>
      </form>
      {booking && (
        <Card className="mt-8 text-center">
          <h2 className="text-xl font-bold">وضعیت نوبت</h2>
          <div className="mt-4 space-y-2 text-right">
            <p><span className="text-zinc-400">سرویس:</span> {booking.service.name}</p>
            <p><span className="text-zinc-400">تاریخ:</span> {booking.date}</p>
            <p><span className="text-zinc-400">ساعت:</span> {booking.slot}</p>
            <p><span className="text-zinc-400">وضعیت:</span>
              <span className={booking.status === 'CONFIRMED' ? 'text-green-400' : 'text-red-400'}>
                {booking.status === 'CONFIRMED' ? 'تأیید شده' : 'لغو شده'}
              </span>
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}