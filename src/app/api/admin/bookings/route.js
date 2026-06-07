import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status');

    const where = {};
    if (status && status !== 'ALL') where.status = status;
    if (search) {
      where.OR = [
        { trackingNumber: { contains: search } },
        { customer: { firstName: { contains: search } } },
        { customer: { lastName: { contains: search } } },
        { customer: { phone: { contains: search } } },
      ];
    }

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        customer: true,
        service: true,
         portfolio: true,  // اگر رابطه اضافه شد، فعال کنید
      },
      orderBy: { date: 'desc' },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error('❌ GET /api/admin/bookings error:', error);
    return NextResponse.json({ error: 'خطا در دریافت رزروها' }, { status: 500 });
  }
}