import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

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
    console.error("خطا در حذف سرویس:", error);
    return NextResponse.json({ error: "خطا در حذف" }, { status: 500 });
  }
}