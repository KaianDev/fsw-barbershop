"use server"

import { auth } from "../_lib/auth"
import { db } from "../_lib/prisma"

interface GetBarbershopUserReviewProps {
  barbershopId: string
}

export const getBarbershopUserReview = async ({
  barbershopId,
}: GetBarbershopUserReviewProps) => {
  const session = await auth()
  if (!session) {
    throw new Error("Usuário não autenticado")
  }

  const review = await db.barbershopReview.findUnique({
    where: {
      barbershopId,
      userId: session.user.id,
    },
    select: {
      rating: true,
    },
  })

  return review?.rating || 0
}
