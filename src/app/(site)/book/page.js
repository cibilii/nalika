"use client";

import useBookingStore from "@/store/useBookingStore";
import StepService from "@/components/booking/StepService";
import StepDate from "@/components/booking/StepDate";
import StepSlot from "@/components/booking/StepSlot";
import StepCustomer from "@/components/booking/StepCustomer";
import StepReview from "@/components/booking/StepReview";
import StepSuccess from "@/components/booking/StepSuccess";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function BookPage() {
  const { step, prevStep, selectedPortfolio } = useBookingStore();

  const steps = [
    <StepService key="service" />,
    <StepDate key="date" />,
    <StepSlot key="slot" />,
    <StepCustomer key="customer" />,
    <StepReview key="review" />,
    <StepSuccess key="success" />,
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-8 py-6 space-y-6">

      {/* 🎨 Sticky Selected Portfolio */}
      {selectedPortfolio && (
        <div className="sticky top-4 z-50 rounded-3xl border border-pink-500/20 bg-zinc-950/70 p-3 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex items-center gap-4 transition-all duration-500 hover:scale-[1.01]">

          <img
            src={selectedPortfolio.imageUrl}
            alt={selectedPortfolio.title}
            className="h-16 w-16 rounded-2xl object-cover border border-pink-500/20"
          />

          <div className="flex-1">
            <h3 className="text-sm font-bold text-white">
              {selectedPortfolio.title}
            </h3>
            <p className="text-xs text-zinc-400">
              {selectedPortfolio.category}
            </p>
          </div>

          <div className="text-xs text-pink-300 bg-pink-500/10 px-3 py-1 rounded-full">
            انتخاب شده ✨
          </div>
        </div>
      )}

      {/* 📊 Progress */}
      {step < 5 && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={prevStep}
              className="text-zinc-400 hover:text-white transition-colors disabled:opacity-50"
              disabled={step === 0}
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <span className="text-sm text-zinc-500">
              مرحله {step + 1} از ۵
            </span>
          </div>

          <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600"
              initial={{ width: 0 }}
              animate={{ width: `${((step + 1) / 5) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>
      )}

      {/* 🧭 Step Content */}
      <AnimatePresence mode="wait">
      <motion.div
  key={step}
  className="will-change-transform"
  initial={{ opacity: 0, y: 30, scale: 0.98, filter: "blur(6px)" }}
  animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
  exit={{ opacity: 0, y: -30, scale: 1.02, filter: "blur(6px)" }}
  transition={{
    duration: 0.45,
    ease: [0.4, 0, 0.2, 1],
  }}
>
          {steps[step]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}