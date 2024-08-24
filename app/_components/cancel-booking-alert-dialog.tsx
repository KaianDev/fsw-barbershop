/* eslint-disable no-unused-vars */
"use client"

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
import { cancelBooking } from "../_actions/cancel-booking"
import { toast } from "sonner"

interface CancelBookingAlertDialogProps {
  bookingId: string
  sheetClose?: (v: boolean) => void
}

export const CancelBookingAlertDialog = ({
  bookingId,
  sheetClose,
}: CancelBookingAlertDialogProps) => {
  const handleCancelBooking = async () => {
    try {
      await cancelBooking({ bookingId })
      sheetClose?.(false)
      toast.success("Reserva cancelada com sucesso")
    } catch (error) {
      console.error("Ocorreu um erro ao cancelar a reserva", error)
    }
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
