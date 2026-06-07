import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function DELETE(request, { params }) {
  try {
    const { id: idString } = await params;
    const id = parseInt(idString);
    if (isNaN(id)) {
      return NextResponse.json({ error: "شناسه نامعتبر" }, { status: 400 });
    }
    await prisma.booking.update({
      where: { id },
      data: { status: 'CANCELLED' },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'خطا در لغو' }, { status: 500 });
  }
}