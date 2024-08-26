/* eslint-disable no-unused-vars */
"use client"

import { useEffect, useState } from "react"
import { Barbershop } from "@prisma/client"
import { LoaderIcon, StarIcon } from "lucide-react"

// Components
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog"
import { Button, buttonVariants } from "./ui/button"

// Utilities
import { toast } from "sonner"
import { cn } from "../_lib/utils"
import { queryClient } from "../_lib/tanstack"
import { useAddBarbershopUserReview } from "../_hooks/review/use-add-barbershop-user-review"
import { useUpdateBarbershopUserReview } from "../_hooks/review/use-upate-barbershop-user-review"

interface ReviewBarbershopProps {
  barbershop: Pick<Barbershop, "name" | "id">
  ratingAverage?: number
  isLoading?: boolean
  sheetClose?: (v: boolean) => void
}

export const ReviewBarbershop = ({
  barbershop,
  ratingAverage,
  isLoading,
  sheetClose,
}: ReviewBarbershopProps) => {
  const [rating, setRating] = useState(ratingAverage || 0)
  const [hover, setHover] = useState<number | null>(null)

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

  const handleReviewBarbershop = async () => {
    if (ratingAverage) {
      return updateReview()
    }
    addNewReview()
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm" className="w-full">
          {ratingAverage ? "Reavaliar" : "Avaliar"}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent
        className="max-w-[320px] rounded-lg"
        aria-describedby={"Feedback de reserva criada"}
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            Avalie sua experiência
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            Toque nas estrelas para avaliar sua experiência na {barbershop.name}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex items-center justify-center">
          {!isLoading ? (
            Array.from({ length: 5 }).map((_, index) => {
              const currentRating = index + 1

              return (
                <label
                  htmlFor={index.toString()}
                  key={index}
                  onMouseEnter={() => setHover(currentRating)}
                  onMouseLeave={() => setHover(null)}
                >
                  <input
                    id={index.toString()}
                    type="radio"
                    name="rating"
                    value={currentRating}
                    onChange={() => setRating(currentRating)}
                    className="hidden"
                  />
                  <StarIcon
                    size={24}
                    className={cn(
                      "cursor-pointer text-secondary transition-colors",
                      currentRating <= (hover || rating)
                        ? "fill-primary stroke-primary"
                        : "stroke-secondary",
                    )}
                  />
                </label>
              )
            })
          ) : (
            <div className="flex items-center justify-center">
              <LoaderIcon className="animate-spin" />
            </div>
          )}
        </div>

        <AlertDialogFooter className="grid w-full grid-cols-2 gap-3">
          <AlertDialogCancel
            className={cn(
              buttonVariants({ variant: "secondary", size: "sm" }),
              "mt-0",
            )}
          >
            Voltar
          </AlertDialogCancel>
          <AlertDialogAction
            className={cn(buttonVariants({ size: "sm" }))}
            onClick={handleReviewBarbershop}
            disabled={rating === 0}
          >
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
