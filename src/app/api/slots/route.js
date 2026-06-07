import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json(
      { error: "تاریخ الزامی است" },
      { status: 400 }
    );
  }

  try {
    const bookings = await prisma.booking.findMany({
      where: {
        date,
        status: "CONFIRMED",
      },
      select: { slot: true },
    });

    const bookedSlots = bookings.map((b) => b.slot);
    return NextResponse.json({ bookedSlots });
  } catch (error) {
    console.error("GET /api/slots error:", error);
    return NextResponse.json(
      { error: "خطا در دریافت زمان‌ها" },
      { status: 500 }
    );
  }
}