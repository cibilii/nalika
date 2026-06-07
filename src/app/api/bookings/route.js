import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { generateTrackingNumber } from "@/lib/utils";

export async function POST(request) {
  try {
    const body = await request.json();
    const { serviceId, date, slot, customer, portfolioId } = body;

    if (!serviceId || !date || !slot || !customer) {
      return NextResponse.json({ error: "فیلدهای الزامی تکمیل نشده‌اند" }, { status: 400 });
    }

    const existing = await prisma.booking.findFirst({
      where: { date, slot, status: "CONFIRMED" },
    });
    if (existing) {
      return NextResponse.json({ error: "این زمان قبلاً رزرو شده است" }, { status: 409 });
    }

    const duplicate = await prisma.booking.findFirst({
      where: { date, slot, customer: { phone: customer.phone }, status: "CONFIRMED" },
    });
    if (duplicate) {
      return NextResponse.json({ error: "شما قبلاً برای این ساعت یک نوبت دارید" }, { status: 409 });
    }

    let dbCustomer = await prisma.customer.findUnique({ where: { phone: customer.phone } });
    if (!dbCustomer) {
      dbCustomer = await prisma.customer.create({
        data: { firstName: customer.firstName, lastName: customer.lastName, phone: customer.phone },
      });
    } else {
      dbCustomer = await prisma.customer.update({
        where: { phone: customer.phone },
        data: { firstName: customer.firstName, lastName: customer.lastName },
      });
    }

    const trackingNumber = generateTrackingNumber();
    const booking = await prisma.booking.create({
      data: {
        trackingNumber,
        date,
        slot,
        status: "CONFIRMED",
        customerId: dbCustomer.id,
        serviceId: parseInt(serviceId),
        portfolioId: portfolioId ? parseInt(portfolioId) : null,
      },
    });

    return NextResponse.json({ trackingNumber, booking }, { status: 201 });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json({ error: "خطای سرور رخ داد" }, { status: 500 });
  }
}