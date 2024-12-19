"use server"

import { revalidatePath } from "next/cache"
import { db } from "../_lib/prisma"

interface CancelBookingProps {
  bookingId: string
}

export const cancelBooking = async ({ bookingId }: CancelBookingProps) => {
  await db.booking.delete({
    where: {
      id: bookingId,
    },
  })

  revalidatePath("/bookings")
  revalidatePath("/bookings/[id]")
}
