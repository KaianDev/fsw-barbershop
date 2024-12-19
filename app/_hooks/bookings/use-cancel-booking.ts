import { cancelBooking } from "@/app/_actions/cancel-booking"
import { useMutation } from "@tanstack/react-query"

export const useCancelBooking = () =>
  useMutation({
    mutationFn: cancelBooking,
  })
