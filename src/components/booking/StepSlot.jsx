"use client";

import { useEffect, useState } from "react";
import useBookingStore from "@/store/useBookingStore";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { toast } from "sonner";

const SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];

export default function StepSlot() {
  const {
    selectedDate,
    selectedSlot,
    setSelectedSlot,
    nextStep,
    prevStep,
  } = useBookingStore();

  const [bookedSlots, setBookedSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  // گرفتن slotهای رزرو شده از API
  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const res = await fetch(`/api/slots?date=${selectedDate}`);
        const data = await res.json();

        setBookedSlots(data.bookedSlots || []);
      } catch (err) {
        toast.error("خطا در دریافت زمان‌ها");
      } finally {
        setLoading(false);
      }
    };

    if (selectedDate) fetchSlots();
  }, [selectedDate]);

  const isBooked = (slot) => bookedSlots.includes(slot);
  const isSelected = (slot) => selectedSlot === slot;

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-6 w-40 bg-zinc-800 animate-pulse rounded" />
        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="h-16 bg-zinc-900 animate-pulse rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-bold">انتخاب ساعت</h2>
        <p className="text-zinc-400 text-sm mt-1">
          زمان مناسب برای رزرو را انتخاب کنید
        </p>
      </div>

      {/* SLOTS */}
      <div className="grid grid-cols-3 gap-3">
        {SLOTS.map((slot) => {
          const booked = isBooked(slot);
          const selected = isSelected(slot);

          return (
            <button
              key={slot}
              disabled={booked}
              onClick={() => setSelectedSlot(slot)}
              className={`
                relative rounded-2xl py-4 text-sm font-medium transition-all duration-300 transform-gpu

                ${
                  booked
                    ? "bg-zinc-800 text-zinc-600 cursor-not-allowed line-through"
                    : selected
                    ? "bg-pink-500/20 text-white border border-pink-500 shadow-[0_0_25px_rgba(236,72,153,0.4)] scale-105"
                    : "bg-zinc-900 text-zinc-300 border border-zinc-800 hover:border-pink-500/30 hover:scale-105"
                }
              `}
            >
              {/* glow */}
              {selected && (
                <div className="absolute inset-0 rounded-2xl bg-pink-500/10 blur-md" />
              )}

              <span className="relative z-10">{slot}</span>
            </button>
          );
        })}
      </div>

      {/* FOOTER */}
      <div className="flex gap-3 sticky bottom-6">
        <Button variant="ghost" onClick={prevStep}>
          بازگشت
        </Button>

        <Button
          onClick={nextStep}
          disabled={!selectedSlot}
          className="flex-1"
        >
          ادامه
        </Button>
      </div>
    </div>
  );
}