"use server"

import { db } from "../_lib/prisma"
import { auth } from "../_lib/auth"
import { revalidatePath } from "next/cache"

interface AddBarbershopReviewProps {
  barbershopId: string
  rating: number
}

export const addBarbershopReview = async ({
  barbershopId,
  rating,
}: AddBarbershopReviewProps) => {
  const session = await auth()
  if (!session) {
    throw new Error("Usuário não autenticado")
  }

  await db.barbershopReview.create({
    data: {
      rating,
      barbershopId,
      userId: session.user.id,
    },
  })

  revalidatePath("/bookings")
}
