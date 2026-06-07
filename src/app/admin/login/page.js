"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "lux123") {
      document.cookie = `admin_token=${password}; path=/; max-age=86400`;
      router.push("/admin/dashboard");
    } else {
      setError("رمز عبور اشتباه است");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-zinc-950 px-4"
      dir="rtl"
    >
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">
            لوکس<span className="text-pink-500">ادمین</span>
          </h1>
          <p className="text-zinc-400 text-sm mt-2">ورود به پنل مدیریت</p>
        </div>

        <Card>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="رمز عبور"
              type="password"
              placeholder="رمز عبور را وارد کنید"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />
            {error && <p className="text-rose-400 text-sm">{error}</p>}
            <Button type="submit" className="w-full">
              ورود
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}