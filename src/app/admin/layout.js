import Link from "next/link";
import "@/app/globals.css";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white" dir="rtl">
      <nav className="border-b border-zinc-800 px-4 md:px-8 py-4 flex justify-between items-center">
        <Link
          href="/admin/dashboard"
          className="font-bold text-xl tracking-tight"
        >
          لوکس<span className="text-pink-500">ادمین</span>
        </Link>
        <div className="flex gap-4 text-sm">
          <Link
            href="/admin/dashboard"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            داشبورد
          </Link>
          <Link
            href="/admin/reservations"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            رزروها
          </Link>
          <Link
            href="/admin/services"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            خدمات
          </Link>
          <Link href="/" className="text-zinc-500 hover:text-white text-sm">
            مشاهده سایت
          </Link>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto p-4 md:p-8">{children}</main>
    </div>
  );
}