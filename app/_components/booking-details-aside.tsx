import { Prisma } from "@prisma/client"
import { format, isFuture } from "date-fns"

// Components
import { Card, CardContent } from "./ui/card"
import { BarbershopDetails } from "./barbershop-details"
import { ServiceDetails } from "./service-details"
import { Badge } from "./ui/badge"
import { CancelBookingAlertDialog } from "./cancel-booking-alert-dialog"

interface BookingDetailsAsideProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    }
  }>
}

export const BookingDetailsAside = ({ booking }: BookingDetailsAsideProps) => {
  const time = format(booking.date, "HH:mm")
  const isConfirmedBooking = isFuture(booking.date)

  return (
    <Card>
      <CardContent className="p-5">
        <BarbershopDetails barbershop={booking.service.barbershop} />
        <Badge
          variant={isConfirmedBooking ? "tertiary" : "secondary"}
          className="mb-2.5"
        >
          {isConfirmedBooking ? "Confirmado" : "Finalizado"}
        </Badge>
        <ServiceDetails
          barbershop={booking.service.barbershop}
          service={booking.service}
          date={booking.date}
          time={time}
        />

        {isConfirmedBooking && (
          <CancelBookingAlertDialog bookingId={booking.id} />
        )}
      </CardContent>
    </Card>
  )
}
