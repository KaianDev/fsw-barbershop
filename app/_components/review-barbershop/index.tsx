/* eslint-disable no-unused-vars */
"use client"

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
} from "@/_components/ui/alert-dialog"
import { Button, buttonVariants } from "@/_components/ui/button"

// Utilities
import { cn } from "../../_lib/utils"
import { useComponent } from "./use-component"

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
  const {
    hover,
    rating,
    isPending,
    setHover,
    setRating,
    handleReviewBarbershop,
  } = useComponent({
    barbershop,
    ratingAverage,
    sheetClose,
  })

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm" className="w-full" disabled={isPending}>
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
