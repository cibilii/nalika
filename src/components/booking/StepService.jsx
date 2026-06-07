"use client";

import { useEffect, useState } from "react";
import useBookingStore from "@/store/useBookingStore";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { toast } from "sonner";
import RelatedPortfolio from "./RelatedPortfolio";

export default function StepService() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { selectedService, setSelectedService, nextStep } =
    useBookingStore();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/services");
        if (!res.ok) throw new Error();

        const data = await res.json();
        setServices(data);
      } catch (err) {
        setError("خطا در دریافت سرویس‌ها");
        toast.error("خطا در دریافت سرویس‌ها");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const canProceed = !!selectedService;

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">انتخاب سرویس</h2>
          <p className="text-zinc-400 mt-1">در حال بارگذاری...</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-40 rounded-3xl bg-zinc-900 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  // ================= ERROR =================
  if (error || services.length === 0) {
    return (
      <div className="text-center py-12 space-y-4">
        <p className="text-zinc-400 text-lg">سرویسی یافت نشد</p>
        <p className="text-zinc-500 text-sm">
          لطفاً اتصال دیتابیس را بررسی کنید
        </p>

        <Button
          variant="secondary"
          onClick={() => window.location.reload()}
        >
          تلاش دوباره
        </Button>
      </div>
    );
  }

  // ================= UI =================
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">انتخاب سرویس</h2>
        <p className="text-zinc-400 mt-1">
          یک سرویس لوکس برای ادامه رزرو انتخاب کنید
        </p>
      </div>

      {/* Related Portfolio (only when selected) */}
      {selectedService && (
        <div className="animate-fadeIn">
          <RelatedPortfolio />
        </div>
      )}

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {services.map((service) => {
          const isActive = selectedService?.id === service.id;

          return (
            <Card
              key={service.id}
              onClick={() => setSelectedService(service)}
              className={`
                relative cursor-pointer rounded-3xl p-5 transition-all duration-300
                transform-gpu hover:-translate-y-1 hover:scale-[1.02]

                ${
                  isActive
                    ? "border-pink-500 bg-pink-500/10 shadow-[0_0_30px_rgba(236,72,153,0.35)]"
                    : "border-zinc-800 bg-zinc-900 hover:border-pink-500/30"
                }
              `}
            >
              {/* Glow effect */}
              <div className="absolute -bottom-10 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-pink-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition" />

              {/* Content */}
              <h3 className="font-semibold text-lg text-white">
                {service.name}
              </h3>

              <p className="text-zinc-400 text-sm mt-1">
                مدت: {service.duration} دقیقه
              </p>

              <p className="text-pink-400 font-bold mt-3 text-lg">
                ${service.price}
              </p>

              {/* Selected badge */}
              {isActive && (
                <div className="absolute top-3 right-3 text-xs px-3 py-1 rounded-full bg-pink-500/10 text-pink-300 border border-pink-500/20">
                  انتخاب شده ✨
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="sticky bottom-6 pt-4">
        <Button
          onClick={nextStep}
          disabled={!canProceed}
          className="w-full"
        >
          ادامه
        </Button>
      </div>
    </div>
  );
}