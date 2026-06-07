const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // حذف داده‌های قبلی
  await prisma.booking.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.service.deleteMany();

  // ایجاد سرویس‌های پیش‌فرض
  const services = await Promise.all([
    prisma.service.create({
      data: {
        name: "مانیکور کلاسیک",
        price: 45,
        duration: 45,
        category: "manicure",
      },
    }),
    prisma.service.create({
      data: {
        name: "اکستنشن ژل",
        price: 75,
        duration: 75,
        category: "gel",
      },
    }),
    prisma.service.create({
      data: {
        name: "دیـزاین هنری ناخن",
        price: 35,
        duration: 30,
        category: "art",
      },
    }),
    prisma.service.create({
      data: {
        name: "پدیکور لوکس",
        price: 55,
        duration: 50,
        category: "pedicure",
      },
    }),
    prisma.service.create({
      data: {
        name: "ترمیم ناخن",
        price: 25,
        duration: 20,
        category: "repair",
      },
    }),
    prisma.service.create({
      data: {
        name: "پکیج ویژه عروس",
        price: 120,
        duration: 90,
        category: "bridal",
      },
    }),
  ]);

  console.log("✅ سرویس‌های اولیه با موفقیت ایجاد شدند:", services.length);
}

main()
  .catch((e) => {
    console.error("❌ خطا:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });