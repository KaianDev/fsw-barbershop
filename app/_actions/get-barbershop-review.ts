"use server"

import { db } from "../_lib/prisma"

interface GetBarbershopReviewProps {
  barbershopId: string
}

export const getBarbershopReview = async ({
  barbershopId,
}: GetBarbershopReviewProps) => {
  const reviews = await db.barbershopReview.aggregate({
    where: {
      barbershopId,
    },
    _avg: {
      rating: true,
    },
    _count: {
      rating: true,
    },
  })

  const review = {
    count: reviews._count?.rating || 0,
    avg: reviews._avg?.rating || 0,
  }

  return review
}
