import { Prisma } from "@prisma/client"
import { format, isFuture } from "date-fns"

// Components
import { Card, CardContent } from "./ui/card"
import { BarbershopDetails } from "./barbershop-details"
import { ServiceDetails } from "./service-details"
import { Badge } from "./ui/badge"
import { CancelBookingAlertDialog } from "./cancel-booking-alert-dialog"
import { ReviewBarbershop } from "./review-barbershop"

// Utilities
import { getBarbershopUserReview } from "../_actions/get-barbershop-user-review"

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

export const BookingDetailsAside = async ({
  booking,
}: BookingDetailsAsideProps) => {
  const time = format(booking.date, "HH:mm")
  const isConfirmedBooking = isFuture(booking.date)

  const rating = await getBarbershopUserReview({
    barbershopId: booking.service.barbershop.id,
  })

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

        <div className="mt-12">
          {isConfirmedBooking ? (
            <CancelBookingAlertDialog bookingId={booking.id} />
          ) : (
            <ReviewBarbershop
              barbershop={booking.service.barbershop}
              ratingAverage={rating}
            />
          )}
        </div>
      </CardContent>
    </Card>
  )
}
