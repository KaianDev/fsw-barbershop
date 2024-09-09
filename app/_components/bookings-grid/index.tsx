import { Prisma } from "@prisma/client"
import { Suspense } from "react"
import { BookingDetailsSheet } from "@/_components/booking-details-sheet"

interface BookingGridProps {
  title: string
  bookings: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    }
  }>[]
}

export const BookingGrid = ({ bookings, title }: BookingGridProps) => {
  return (
    <div className="space-y-3">
      <h2 className="title-separator md:text-gray-500">{title}</h2>
      {bookings.map((booking) => (
        <Suspense key={booking.id}>
          <BookingDetailsSheet booking={booking} />
        </Suspense>
      ))}
    </div>
  )
}
