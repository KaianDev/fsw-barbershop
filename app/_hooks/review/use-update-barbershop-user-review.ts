import { useMutation } from "@tanstack/react-query"
import { updateBarbershopReview } from "@/app/_actions/update-barbershop-review"

export const useUpdateBarbershopUserReview = () =>
  useMutation({
    mutationFn: updateBarbershopReview,
  })
