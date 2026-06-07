import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const services = await prisma.service.findMany();
    return NextResponse.json(services);
  } catch (error) {
    return NextResponse.json(
      { error: "خطا در دریافت سرویس‌ها" },
      { status: 500 }
    );
  }
}
export async function PUT(request, { params }) {
  try {
    const { id: idString } = await params;
    const id = parseInt(idString);
    const body = await request.json();
    const { name, price, duration, category } = body;
    const service = await prisma.service.update({
      where: { id },
      data: { name, price, duration, category },
    });
    return NextResponse.json(service);
  } catch (error) {
    console.error("خطا در ویرایش سرویس:", error);
    return NextResponse.json({ error: "خطا در ویرایش" }, { status: 500 });
  }
}