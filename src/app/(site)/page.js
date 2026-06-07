import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Link from "next/link";
import PortfolioGallery from "@/components/PortfolioGallery";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      
      {/* فقط بخش Hero با ویدیو پس‌زمینه */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-6 pt-24 pb-16 overflow-hidden">
        
        {/* ویدیو پس‌زمینه (فقط همین بخش) */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/videos/back.mp4" type="video/mp4" />
          مرورگر شما از ویدیو پشتیبانی نمی‌کند.
        </video>

        {/* لایه تیره برای خوانایی متن */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/50" />

        {/* محتوای هدر */}
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="text-pink-500 font-semibold tracking-widest uppercase text-xs mb-4 block animate-fade-up">
            سالن زیبایی لوکس
          </span>
          <h1 className="text-4xl md:text-7xl font-bold leading-tight mb-6 animate-fade-up animation-delay-200">
            ناخن‌های <span className="text-pink-500">رویایی</span> شما در
            انتظارند
          </h1>
          <p className="text-zinc-200 text-lg md:text-xl max-w-xl mx-auto mb-10 animate-fade-up animation-delay-400">
            تجربه‌ای لوکس از زیبایی با بهترین خدمات ناخن. همین حالا نوبت خود را
            رزرو کنید.
          </p>
          <Link href="/book">
            <Button variant="primary" className="text-lg px-10 py-4 animate-fade-up animation-delay-600">
              رزرو نوبت
            </Button>
          </Link>
        </div>
      </section>

      {/* بخش خدمات (بدون ویدیو، پس‌زمینه تیره معمولی) */}
      <section className="px-4 md:px-8 py-16 max-w-6xl mx-auto bg-zinc-950">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center animate-fade-up">
          خدمات <span className="text-pink-500">ویژه</span> ما
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <Card
              key={service.id}
              className="hover:border-pink-500/30 transition-colors group animate-fade-up"
              style={{ animationDelay: `${idx * 100 + 200}ms` }}
            >
              <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
              <p className="text-zinc-400 text-sm mb-4">{service.desc}</p>
              <div className="flex justify-between items-center">
                <span className="text-pink-400 font-bold">${service.price}</span>
                <span className="text-zinc-500 text-sm">
                  {service.duration} دقیقه
                </span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* بخش گالری نمونه‌کارها */}
      <section className="px-4 md:px-8 py-16 max-w-6xl mx-auto bg-zinc-950">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center animate-fade-up">
          نمونه <span className="text-pink-500">کارهای</span> ما
        </h2>
        <PortfolioGallery />
      </section>

      {/* بخش CTA */}
      <section className="py-20 px-4 text-center bg-gradient-to-b from-zinc-900 to-zinc-950">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-up">
          آماده تحول زیبایی خود هستید؟
        </h2>
        <p className="text-zinc-300 mb-8 animate-fade-up animation-delay-200">
          همین حالا نوبت بگیرید و اجازه دهید هنرمندان ما جادو کنند.
        </p>
        <Link href="/book">
          <Button variant="primary" className="text-lg px-10 py-4 animate-fade-up animation-delay-400">
            دریافت نوبت
          </Button>
        </Link>
      </section>
    </div>
  );
}

const services = [
  {
    id: 1,
    name: "مانیکور کلاسیک",
    desc: "فرم‌دهی ناخن، مراقبت از کوتیکول و لاک دلخواه.",
    price: 450000,
    duration: 45,
  },
  {
    id: 2,
    name: "اکستنشن ژل",
    desc: "ناخن‌های ژلی با دوام بالا و پایانی بی‌نقص.",
    price: 750000,
    duration: 75,
  },
  {
    id: 3,
    name: "دیـزاین هنری ناخن",
    desc: "طرح‌های دست‌ساز و اختصاصی متناسب با سلیقه شما.",
    price: 350000,
    duration: 30,
  },
];