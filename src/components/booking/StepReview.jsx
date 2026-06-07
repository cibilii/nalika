"use client";

import { useState } from "react";
import useBookingStore from "@/store/useBookingStore";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Spinner from "@/components/ui/Spinner";
import { toast } from "sonner";

export default function StepReview() {
  const {
    selectedService,
    selectedDate,
    selectedSlot,
    selectedPortfolio,
    customer,
    prevStep,
    setTrackingNumber,
    nextStep,
  } = useBookingStore();

  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: selectedService.id,
          date: selectedDate,
          slot: selectedSlot,
          customer,
          portfolioId: selectedPortfolio?.id || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "خطایی رخ داد");
        return;
      }

      setTrackingNumber(data.trackingNumber);
      nextStep();
    } catch (err) {
      toast.error("ارتباط با سرور برقرار نشد");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-bold">بررسی نهایی رزرو</h2>
        <p className="text-zinc-400 text-sm mt-1">
          لطفاً اطلاعات را بررسی و تایید کنید
        </p>
      </div>

      {/* MAIN CARD */}
      <Card className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950/40 backdrop-blur-xl p-6 space-y-5">

        {/* glow background */}
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-pink-500/10 blur-3xl rounded-full" />
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-rose-500/10 blur-3xl rounded-full" />

        {/* SERVICE */}
        <div className="flex justify-between">
          <span className="text-zinc-400">سرویس</span>
          <span className="text-white font-medium">
            {selectedService?.name}
          </span>
        </div>

        {/* DATE */}
        <div className="flex justify-between">
          <span className="text-zinc-400">تاریخ</span>
          <span className="text-white">{selectedDate}</span>
        </div>

        {/* SLOT */}
        <div className="flex justify-between">
          <span className="text-zinc-400">ساعت</span>
          <span className="text-white">{selectedSlot}</span>
        </div>

        {/* CUSTOMER */}
        <div className="flex justify-between">
          <span className="text-zinc-400">مشتری</span>
          <span className="text-white">
            {customer.firstName} {customer.lastName}
          </span>
        </div>

        {/* PHONE */}
        <div className="flex justify-between">
          <span className="text-zinc-400">شماره</span>
          <span className="text-white">{customer.phone}</span>
        </div>

        {/* PORTFOLIO */}
        {selectedPortfolio && (
          <div className="mt-4 border-t border-zinc-800 pt-4 flex items-center gap-4">
            <img
              src={selectedPortfolio.imageUrl}
              alt={selectedPortfolio.title}
              className="w-16 h-16 rounded-2xl object-cover border border-pink-500/20"
            />

            <div>
              <p className="text-sm text-zinc-400">نمونه انتخاب شده</p>
              <p className="text-white font-medium">
                {selectedPortfolio.title}
              </p>
              <p className="text-xs text-zinc-500">
                {selectedPortfolio.category}
              </p>
            </div>
          </div>
        )}
      </Card>

      {/* PRICE / CTA AREA (fake luxury touch) */}
      <div className="rounded-3xl border border-pink-500/10 bg-pink-500/5 p-4 flex justify-between items-center">
        <span className="text-zinc-400 text-sm">مبلغ نهایی</span>
        <span className="text-pink-400 font-bold text-lg">
          ${selectedService?.price}
        </span>
      </div>

      {/* BUTTONS */}
      <div className="flex gap-3 sticky bottom-6">
        <Button variant="ghost" onClick={prevStep}>
          بازگشت
        </Button>

        <Button
          onClick={handleConfirm}
          disabled={loading}
          className="flex-1"
        >
          {loading ? <Spinner /> : "تایید نهایی رزرو"}
        </Button>
      </div>
    </div>
  );
}