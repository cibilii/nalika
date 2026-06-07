"use client";

import useBookingStore from "@/store/useBookingStore";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function StepSuccess() {
  const { trackingNumber, resetBooking } = useBookingStore();
const router = useRouter();

  return (
    <motion.div
      className="text-center py-12 space-y-6"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-pink-500/10 text-pink-500 mb-4">
        <CheckCircle className="w-10 h-10" />
      </div>

      <h2 className="text-3xl font-bold">نوبت شما با موفقیت ثبت شد!</h2>
      <p className="text-zinc-400">کد پیگیری شما:</p>

      <div className="text-4xl font-mono font-bold text-pink-400 tracking-widest bg-zinc-900 py-4 px-8 rounded-2xl inline-block">
        {trackingNumber}
      </div>

      <p className="text-zinc-500 text-sm max-w-md mx-auto">
        این کد را نزد خود نگه دارید. یادآوری نوبت به موبایل شما پیامک خواهد شد.
      </p>

      <div className="flex justify-center gap-3 pt-8">
        <Link href="/">
          <Button variant="ghost">بازگشت به خانه</Button>
        </Link>
        <Button
          onClick={() => {
            resetBooking();
router.push('/book');
          }}
        >
          رزرو جدید
        </Button>
      </div>
    </motion.div>
  );
}