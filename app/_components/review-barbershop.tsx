/* eslint-disable no-unused-vars */
"use client"

import { useState } from "react"
import { Barbershop } from "@prisma/client"
import { StarIcon } from "lucide-react"

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
import { cn } from "../_lib/utils"
import { addBarbershopReview } from "../_actions/add-barbershop-review"
import { toast } from "sonner"

interface ReviewBarbershopProps {
  barbershop: Pick<Barbershop, "name" | "id">
  sheetClose?: (v: boolean) => void
}

export const ReviewBarbershop = ({
  barbershop,
  sheetClose,
}: ReviewBarbershopProps) => {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState<number | null>(null)

  const handleAddReviewBarbershop = async () => {
    try {
      await addBarbershopReview({
        barbershopId: barbershop.id,
        rating,
      })
      sheetClose?.(false)
      toast.success("Avaliação enviada com sucesso!")
      setRating(0)
    } catch (error) {
      console.log("Ocorreu um erro ao tentar avaliar uma barbearia", error)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm" className="w-full">
          Avaliar
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
          {Array.from({ length: 5 }).map((_, index) => {
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
          })}
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
            onClick={handleAddReviewBarbershop}
            disabled={rating === 0}
          >
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
