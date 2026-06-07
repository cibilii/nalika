import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    const { id: idString } = await params;
    const id = parseInt(idString);
    if (isNaN(id)) return NextResponse.json({ error: "شناسه نامعتبر" }, { status: 400 });
    await prisma.portfolio.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "خطا در حذف" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id: idString } = await params;
    const id = parseInt(idString);
    if (isNaN(id)) return NextResponse.json({ error: "شناسه نامعتبر" }, { status: 400 });
    const body = await request.json();
    const { title, imageUrl, category, description, serviceId } = body;
    const updated = await prisma.portfolio.update({
      where: { id },
      data: {
        title,
        imageUrl,
        category,
        description: description || null,
        serviceId: serviceId ? parseInt(serviceId) : null,
      },
    });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "خطا در ویرایش" }, { status: 500 });
  }
}