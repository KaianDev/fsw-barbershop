"use server"

import { db } from "../_lib/prisma"

interface GetBarbershopsProps {
  isRecommends?: boolean
}

export const getBarbershops = async ({ isRecommends }: GetBarbershopsProps) => {
  if (isRecommends) {
    const barbershops = await db.barbershop.findMany({
      where: {
        ratings: {
          some: {
            rating: {
              gte: 2,
            },
          },
        },
      },
    })

    if (barbershops.length > 0) return barbershops
    return await db.barbershop.findMany({})
  }

  return db.barbershop.findMany({})
}
