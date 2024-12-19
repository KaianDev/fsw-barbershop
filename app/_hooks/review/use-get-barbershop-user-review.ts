import { useQuery } from "@tanstack/react-query"
import { getBarbershopUserReview } from "@/app/_actions/get-barbershop-user-review"

interface UseBarbershopUserReviewProps {
  barbershopId: string
  enabled?: boolean
}

export const useBarbershopUserReview = ({
  barbershopId,
  enabled,
}: UseBarbershopUserReviewProps) => {
  return useQuery({
    queryKey: ["barbershop-user-review", { barbershopId }],
    queryFn: async () => getBarbershopUserReview({ barbershopId }),
    enabled,
  })
}
