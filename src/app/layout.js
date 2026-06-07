import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "لوکس نِیل | رزرو آنلاین ناخن",
  description: "سالن زیبایی ناخن لوکس با امکان رزرو آنلاین و طراحی حرفه‌ای",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" className={inter.className}>
      <body className="antialiased">
        <Toaster position="top-center" richColors theme="dark" />
        {children}
      </body>
    </html>
  );
}