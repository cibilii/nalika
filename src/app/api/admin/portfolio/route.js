import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const items = await prisma.portfolio.findMany({ orderBy: { id: "desc" } });
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: "خطا در دریافت" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, imageUrl, category, description, serviceId } = body;
    if (!title || !imageUrl || !category) {
      return NextResponse.json({ error: "عنوان، تصویر و دسته الزامی است" }, { status: 400 });
    }
    const newItem = await prisma.portfolio.create({
      data: {
        title,
        imageUrl,
        category,
        description: description || null,
        serviceId: serviceId ? parseInt(serviceId) : null,
      },
    });
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "خطا در ذخیره" }, { status: 500 });
  }
}