import Link from "next/link";
import Card from "@/components/ui/Card";
import { prisma } from "@/lib/prisma";
import { CalendarCheck, Scissors, Image, Users } from "lucide-react";

export default async function Dashboard() {
  const bookingsCount = await prisma.booking.count();
  const servicesCount = await prisma.service.count();
  const confirmedCount = await prisma.booking.count({
    where: { status: "CONFIRMED" },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">داشبورد</h1>
        <p className="text-zinc-400 mt-1">خلاصه وضعیت سالن</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-pink-500/10 text-pink-500">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-zinc-400 text-sm">کل رزروها</h3>
              <p className="text-3xl font-bold">{bookingsCount}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500">
              <Scissors className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-zinc-400 text-sm">خدمات فعال</h3>
              <p className="text-3xl font-bold">{servicesCount}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-zinc-400 text-sm">نوبت‌های تأیید شده</h3>
              <p className="text-3xl font-bold">{confirmedCount}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href="/admin/reservations">
          <Card className="hover:border-pink-500/30 transition-colors cursor-pointer">
            <CalendarCheck className="w-8 h-8 text-pink-500 mb-4" />
            <h3 className="font-semibold text-lg">مدیریت رزروها</h3>
            <p className="text-sm text-zinc-400 mt-1">
              مشاهده و لغو نوبت‌ها
            </p>
          </Card>
        </Link>
        <Link href="/admin/services">
          <Card className="hover:border-pink-500/30 transition-colors cursor-pointer">
            <Scissors className="w-8 h-8 text-pink-500 mb-4" />
            <h3 className="font-semibold text-lg">مدیریت خدمات</h3>
            <p className="text-sm text-zinc-400 mt-1">
              افزودن و ویرایش سرویس‌ها
            </p>
          </Card>
        </Link>
        <Link href="/admin/portfolio">
          <Card className="hover:border-pink-500/30 transition-colors cursor-pointer">
            <Image className="w-8 h-8 text-pink-500 mb-4" />
            <h3 className="font-semibold text-lg">گالری نمونه کارها</h3>
            <p className="text-sm text-zinc-400 mt-1">مدیریت تصاویر گالری</p>
          </Card>
        </Link>
      </div>
    </div>
  );
}