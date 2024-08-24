import { useMutation } from "@tanstack/react-query"
import { addBarbershopReview } from "@/app/_actions/add-barbershop-review"

export const useAddBarbershopUserReview = () =>
  useMutation({
    mutationFn: addBarbershopReview,
  })
