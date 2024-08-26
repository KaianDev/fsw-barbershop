/* eslint-disable no-unused-vars */
"use client"

import { toast } from "sonner"
import { useRouter } from "next/navigation"

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
import { useCancelBooking } from "../_hooks/bookings"
import { queryClient } from "../_lib/tanstack"
import { Prisma } from "@prisma/client"

interface CancelBookingAlertDialogProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    }
  }>
  sheetClose?: (v: boolean) => void
}

export const CancelBookingAlertDialog = ({
  booking,
  sheetClose,
}: CancelBookingAlertDialogProps) => {
  const { mutateAsync: cancelBooking } = useCancelBooking()

  const router = useRouter()
  const handleCancelBooking = async () => {
    await cancelBooking(
      { bookingId: booking.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [
              "bookings",
              { serviceId: booking.service.id, date: booking.date },
            ],
          })
          toast.success("Reserva cancelada com sucesso")
        },
        onError: (error) => {
          toast.error("Erro ao cancelar reserva")
          console.error("Erro ao cancelar reserva", error)
        },
      },
    )
    sheetClose?.(false)
    router.push("/bookings", { scroll: false })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="destructive" className="w-full">
          Cancelar Reserva
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent
        className="max-w-[320px] rounded-lg"
        aria-describedby={"Feedback de reserva criada"}
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            Cancelar reservar
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            Tem certeza que deseja cancelar esse agendamento? Essa ação não pode
            ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
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
            onClick={handleCancelBooking}
            className={cn(
              buttonVariants({ variant: "destructive", size: "sm" }),
            )}
          >
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
