"use server"

import { revalidatePath } from "next/cache"
import { db } from "../_lib/prisma"
import { auth } from "../_lib/auth"

interface CreateBookingData {
  date: Date
  serviceId: string
}

export const createBooking = async ({ date, serviceId }: CreateBookingData) => {
  const session = await auth()

  if (!session?.user) {
    throw new Error("Usuário não autenticado")
  }

  await db.booking.create({
    data: {
      date,
      serviceId,
      userId: session.user.id,
    },
  })

  revalidatePath("/barbershops/[id]")
}
