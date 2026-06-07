import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// برای جلوگیری از pre-render در Vercel
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const services = await prisma.service.findMany();
    return NextResponse.json(services);
  } catch (error) {
    console.error("API /api/services error:", error);
    return NextResponse.json(
      { error: "خطا در دریافت سرویس‌ها" },
      { status: 500 }
    );
  }
}