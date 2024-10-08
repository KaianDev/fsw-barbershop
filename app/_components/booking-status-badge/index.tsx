// Components
import { Badge } from "@/_components/ui/badge"

interface BookingStatusBadgeProps {
  isConfirmedBooking: boolean
}

export const BookingStatusBadge = ({
  isConfirmedBooking,
}: BookingStatusBadgeProps) => {
  return (
    <Badge variant={isConfirmedBooking ? "tertiary" : "secondary"}>
      {isConfirmedBooking ? "Confirmado" : "Finalizado"}
    </Badge>
  )
}
