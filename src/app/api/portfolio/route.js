import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const portfolio = await prisma.portfolio.findMany();
    return NextResponse.json(portfolio);
  } catch (error) {
    console.error("GET /api/portfolio error:", error);
    return NextResponse.json(
      { error: "خطا در دریافت گالری" },
      { status: 500 }
    );
  }
}