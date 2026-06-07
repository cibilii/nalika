import Link from "next/link";
export default function SiteLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <header className="border-b border-zinc-800 px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            لوکس<span className="text-pink-500">نِیل</span>
          </Link>

          <nav className="flex gap-6 text-sm text-zinc-400">
            <Link href="/track">پیگیری نوبت</Link>
            <Link href="/">خانه</Link>
            <Link href="/book">رزرو نوبت</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>

      <footer className="border-t border-zinc-800 py-6 text-center text-zinc-500 text-sm">
        © {new Date().getFullYear()} لوکس‌نِیل
      </footer>
    </div>
  );
}