import { createBooking } from "@/app/_actions/create-booking"
import { useMutation } from "@tanstack/react-query"

export const useCreateBooking = () =>
  useMutation({
    mutationFn: createBooking,
  })
