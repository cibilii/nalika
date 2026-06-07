import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { trackingNumber } = await params;
    const booking = await prisma.booking.findUnique({
      where: { trackingNumber },
      include: { service: true, customer: true },
    });
    if (!booking) {
      return NextResponse.json({ error: "نوبتی با این کد یافت نشد" }, { status: 404 });
    }
    return NextResponse.json(booking);
  } catch (error) {
    console.error("❌ Track error:", error);
    return NextResponse.json({ error: "خطا در سرور" }, { status: 500 });
  }
}