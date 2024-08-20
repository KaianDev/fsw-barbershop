"use server"

import { db } from "../_lib/prisma"

interface CreateBookingData {
  date: Date
  serviceId: string
  userId: string
}

export const createBooking = async ({
  date,
  serviceId,
  userId,
}: CreateBookingData) => {
  await db.booking.create({
    data: {
      date,
      serviceId,
      userId,
    },
  })
}
