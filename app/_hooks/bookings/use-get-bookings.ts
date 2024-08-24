import { getBookings } from "@/app/_actions/get-bookings"
import { Booking } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"

interface UseGetBookingsProps {
  serviceId: string
  date?: Date
  enabled: boolean
}

export const useGetBookings = ({
  serviceId,
  date,
  enabled,
}: UseGetBookingsProps) =>
  useQuery<Booking[]>({
    queryKey: ["bookings", { serviceId, date }],
    queryFn: async () => {
      if (!date) return []
      return await getBookings({ serviceId, date })
    },
    enabled,
  })
