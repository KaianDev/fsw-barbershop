"use server"

import { revalidatePath } from "next/cache"
import { auth } from "../_lib/auth"
import { db } from "../_lib/prisma"

interface UpdateBarbershopReviewProps {
  barbershopId: string
  rating: number
}

export const updateBarbershopReview = async ({
  barbershopId,
  rating,
}: UpdateBarbershopReviewProps) => {
  const session = await auth()
  if (!session) {
    throw new Error("Usuário não autenticado")
  }

  await db.barbershopReview.update({
    where: {
      userId_barbershopId: {
        barbershopId,
        userId: session.user.id,
      },
      barbershopId,
      userId: session.user.id,
    },
    data: {
      rating,
    },
  })

  revalidatePath("/booking")
}
