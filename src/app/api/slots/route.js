import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");

    if (!date) {
      return NextResponse.json(
        { error: "تاریخ ارسال نشده" },
        { status: 400 }
      );
    }

    const bookings = await prisma.booking.findMany({
      where: {
        date,
        status: "CONFIRMED",
      },
      select: {
        slot: true,
      },
    });

    const bookedSlots = bookings.map((b) => b.slot);

    return NextResponse.json({
      date,
      bookedSlots,
    });
  } catch (error) {
    console.error("❌ SLOT API ERROR:", error);

    return NextResponse.json(
      { error: "خطا در دریافت زمان‌ها" },
      { status: 500 }
    );
  }
}