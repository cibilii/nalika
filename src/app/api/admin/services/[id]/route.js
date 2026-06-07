import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// PUT: ویرایش سرویس
export async function PUT(request, { params }) {
  try {
    const { id: idString } = await params;
    const id = parseInt(idString);
    if (isNaN(id)) {
      return NextResponse.json({ error: "شناسه نامعتبر" }, { status: 400 });
    }

    const body = await request.json();
    const { name, price, duration, category } = body;

    const updated = await prisma.service.update({
      where: { id },
      data: { name, price, duration, category },
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json(
      { error: "خطا در ویرایش سرویس" },
      { status: 500 }
    );
  }
}

// DELETE: حذف سرویس
export async function DELETE(request, { params }) {
  try {
    const { id: idString } = await params;
    const id = parseInt(idString);
    if (isNaN(id)) {
      return NextResponse.json({ error: "شناسه نامعتبر" }, { status: 400 });
    }

    await prisma.service.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { error: "حذف انجام نشد. ممکن است سرویس در رزرو استفاده شده باشد." },
      { status: 500 }
    );
  }
}