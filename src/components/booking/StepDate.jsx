"use client";

import { useState, useEffect } from "react";
import useBookingStore from "@/store/useBookingStore";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { ChevronRight, ChevronLeft } from "lucide-react";

const PERSIAN_MONTHS = [
  "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
  "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
];

const WEEKDAYS = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

function getMonthDays(month) {
  if (month < 6) return 31;
  if (month < 11) return 30;
  return 29;
}

export default function StepDate() {
  const {
    selectedDate,
    setSelectedDate,
    nextStep,
    prevStep,
  } = useBookingStore();

  const [year] = useState(1403);
  const [month, setMonth] = useState(2);
  const [days, setDays] = useState([]);

  useEffect(() => {
    const count = getMonthDays(month);
    const arr = Array.from({ length: count }, (_, i) => i + 1);
    setDays(arr);
  }, [month]);

  const handleSelect = (day) => {
    setSelectedDate(`${year}/${month + 1}/${day}`);
  };

  const isSelected = (day) =>
    selectedDate === `${year}/${month + 1}/${day}`;

  const prevMonth = () => {
    setMonth((m) => (m === 0 ? 11 : m - 1));
  };

  const nextMonth = () => {
    setMonth((m) => (m === 11 ? 0 : m + 1));
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-bold">انتخاب تاریخ</h2>
        <p className="text-zinc-400 text-sm mt-1">
          روز مناسب برای رزرو را انتخاب کنید
        </p>
      </div>

      {/* CALENDAR CARD */}
      <Card className="rounded-3xl p-5 border border-zinc-800">

        {/* MONTH NAV */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={prevMonth}
            className="p-2 rounded-xl hover:bg-zinc-800 transition"
          >
            <ChevronRight className="w-5 h-5 text-zinc-300" />
          </button>

          <div className="text-lg font-semibold text-white">
            {PERSIAN_MONTHS[month]} {year}
          </div>

          <button
            onClick={nextMonth}
            className="p-2 rounded-xl hover:bg-zinc-800 transition"
          >
            <ChevronLeft className="w-5 h-5 text-zinc-300" />
          </button>
        </div>

        {/* WEEKDAYS */}
        <div className="grid grid-cols-7 text-center mb-3">
          {WEEKDAYS.map((d) => (
            <div key={d} className="text-xs text-zinc-500">
              {d}
            </div>
          ))}
        </div>

        {/* DAYS GRID */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((day) => {
            const active = isSelected(day);

            return (
              <button
                key={day}
                onClick={() => handleSelect(day)}
                className={`
                  relative aspect-square rounded-2xl text-sm font-medium
                  transition-all duration-300 transform-gpu
                  hover:scale-105 hover:-translate-y-1

                  ${
                    active
                      ? "bg-pink-500/20 text-white border border-pink-500 shadow-[0_0_25px_rgba(236,72,153,0.4)]"
                      : "bg-zinc-900 text-zinc-300 border border-zinc-800 hover:border-pink-500/30"
                  }
                `}
              >
                {/* glow effect */}
                {active && (
                  <div className="absolute inset-0 rounded-2xl bg-pink-500/10 blur-md" />
                )}

                <span className="relative z-10">{day}</span>
              </button>
            );
          })}
        </div>
      </Card>

      {/* FOOTER ACTIONS */}
      <div className="sticky bottom-6 flex gap-3">
        <Button variant="ghost" onClick={prevStep}>
          بازگشت
        </Button>

        <Button
          onClick={nextStep}
          disabled={!selectedDate}
          className="flex-1"
        >
          ادامه
        </Button>
      </div>
    </div>
  );
}