"use client";

import { useState } from "react";
import useBookingStore from "@/store/useBookingStore";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { toast } from "sonner";

export default function StepCustomer() {
  const { customer, setCustomer, nextStep, prevStep } = useBookingStore();

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!customer.firstName.trim()) {
      newErrors.firstName = "نام الزامی است";
    }

    if (!customer.lastName.trim()) {
      newErrors.lastName = "نام خانوادگی الزامی است";
    }

    if (!customer.phone.trim()) {
      newErrors.phone = "شماره موبایل الزامی است";
    } else if (!/^09\d{9}$/.test(customer.phone)) {
      newErrors.phone = "شماره موبایل معتبر نیست";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    if (!validate()) {
      toast.error("لطفاً اطلاعات را کامل کنید");
      return;
    }
    nextStep();
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-bold">اطلاعات مشتری</h2>
        <p className="text-zinc-400 text-sm mt-1">
          لطفاً اطلاعات خود را وارد کنید
        </p>
      </div>

      {/* FORM CARD */}
      <Card className="space-y-4 p-6 bg-zinc-950/40 backdrop-blur-xl border border-zinc-800 rounded-3xl">

        {/* FIRST NAME */}
        <div>
          <input
            name="firstName"
            value={customer.firstName}
            onChange={handleChange}
            placeholder="نام"
            className={`w-full bg-zinc-900/60 border rounded-2xl px-4 py-3 text-white outline-none transition-all
              ${
                errors.firstName
                  ? "border-red-500"
                  : "border-zinc-800 focus:border-pink-500"
              }`}
          />
          {errors.firstName && (
            <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>
          )}
        </div>

        {/* LAST NAME */}
        <div>
          <input
            name="lastName"
            value={customer.lastName}
            onChange={handleChange}
            placeholder="نام خانوادگی"
            className={`w-full bg-zinc-900/60 border rounded-2xl px-4 py-3 text-white outline-none transition-all
              ${
                errors.lastName
                  ? "border-red-500"
                  : "border-zinc-800 focus:border-pink-500"
              }`}
          />
          {errors.lastName && (
            <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>
          )}
        </div>

        {/* PHONE */}
        <div>
          <input
            name="phone"
            value={customer.phone}
            onChange={handleChange}
            placeholder="شماره موبایل (09...)"
            className={`w-full bg-zinc-900/60 border rounded-2xl px-4 py-3 text-white outline-none transition-all
              ${
                errors.phone
                  ? "border-red-500"
                  : "border-zinc-800 focus:border-pink-500"
              }`}
          />
          {errors.phone && (
            <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
          )}
        </div>

      </Card>

      {/* FOOTER */}
      <div className="flex gap-3 sticky bottom-6">
        <Button variant="ghost" onClick={prevStep}>
          بازگشت
        </Button>

        <Button onClick={handleNext} className="flex-1">
          ادامه
        </Button>
      </div>
    </div>
  );
}