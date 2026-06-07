import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const items = await prisma.portfolio.findMany({ orderBy: { id: 'desc' } });
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: 'خطا' }, { status: 500 });
  }
}