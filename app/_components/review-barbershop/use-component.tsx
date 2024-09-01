"use client"

import { useEffect, useState, useTransition } from "react"
import { toast } from "sonner"
import { queryClient } from "../../_lib/tanstack"
import {
  useUpdateBarbershopUserReview,
  useAddBarbershopUserReview,
} from "@/app/_hooks/review"
import { Barbershop } from "@prisma/client"

interface UseComponentProps {
  barbershop: Pick<Barbershop, "name" | "id">
  ratingAverage?: number
  // eslint-disable-next-line no-unused-vars
  sheetClose?: (v: boolean) => void
}

export const useComponent = ({
  ratingAverage,
  barbershop,
  sheetClose,
}: UseComponentProps) => {
  const [rating, setRating] = useState(ratingAverage || 0)
  const [hover, setHover] = useState<number | null>(null)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    setRating(ratingAverage || 0)

    return () => {
      setRating(0)
    }
  }, [ratingAverage])

  const { mutateAsync: addReviewMutate } = useAddBarbershopUserReview()
  const { mutateAsync: updateReviewMutate } = useUpdateBarbershopUserReview()

  const addNewReview = async () => {
    await addReviewMutate(
      {
        barbershopId: barbershop.id,
        rating,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [
              "barbershop-user-review",
              { barbershopId: barbershop.id },
            ],
          })
          toast.success("Avaliação enviada com sucesso!")
        },
        onError: (error) => {
          console.log("Ocorreu um erro ao tentar avaliar uma barbearia", error)
        },
      },
    )
    sheetClose?.(false)
  }

  const updateReview = async () => {
    await updateReviewMutate(
      {
        barbershopId: barbershop.id,
        rating,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [
              "barbershop-user-review",
              { barbershopId: barbershop.id },
            ],
          })
          toast.success("Avaliação atualizada com sucesso!")
        },
        onError: (error) => {
          console.log("Ocorreu um erro ao tentar avaliar uma barbearia", error)
        },
      },
    )
    sheetClose?.(false)
  }

  const handleReviewBarbershop = () => {
    startTransition(async () => {
      if (ratingAverage) {
        await updateReview()
      } else {
        await addNewReview()
      }
    })
  }

  return {
    hover,
    rating,
    isPending,
    setRating,
    setHover,
    handleReviewBarbershop,
  }
}
