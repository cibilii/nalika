import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, price, duration, category } = body;

    const newService = await prisma.service.create({
      data: { name, price, duration, category },
    });
    return NextResponse.json(newService, { status: 201 });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      { error: "خطا در افزودن سرویس" },
      { status: 500 }
    );
  }
}