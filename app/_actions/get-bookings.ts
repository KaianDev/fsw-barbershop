"use server"

import { endOfDay, startOfDay } from "date-fns"
import { db } from "../_lib/prisma"

interface GetBookingsData {
  serviceId: string
  date: Date
}

export const getBookings = ({ serviceId, date }: GetBookingsData) => {
  return db.booking.findMany({
    where: {
      serviceId,
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      },
    },
  })
}
