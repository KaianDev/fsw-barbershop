import { validate } from "uuid"
import { Suspense } from "react"

// Components
import { Header } from "../_components/header"
import { BookingDetailsAside } from "../_components/booking-details-aside"
import { BookingDetailsSheet } from "../_components/booking-details-sheet"

// Utilities
import { getConcludedBookings } from "../_actions/get-concluded-bookings"
import { getConfirmedBookings } from "../_actions/get-confirmed-bookings"

interface BookingPagesProps {
  searchParams: {
    bookingId?: string
  }
}

const BookingsPage = async ({ searchParams }: BookingPagesProps) => {
  const concludedBookings = await getConcludedBookings()
  const confirmedBookings = await getConfirmedBookings()

  const getCurrentBooking = () => {
    if (!searchParams.bookingId || !validate(searchParams.bookingId)) {
      if (confirmedBookings.length > 0) {
        return confirmedBookings[0]
      }
      if (concludedBookings.length > 0) {
        return concludedBookings[0]
      }
    }

    const confirmedBooking = confirmedBookings.find(
      (booking) => booking.id === searchParams.bookingId,
    )

    if (confirmedBooking) {
      return confirmedBooking
    }

    const concludedBooking = concludedBookings.find(
      (booking) => booking.id === searchParams.bookingId,
    )

    if (concludedBooking) {
      return concludedBooking
    }
  }

  const currentBooking = getCurrentBooking()

  return (
    <div>
      <Header />
      <h1 className="mx-auto max-w-[1200px] p-5 text-xl font-bold md:px-8 md:text-2xl">
        Agendamentos
      </h1>

      <div className="mx-auto flex max-w-[1200px] gap-10 px-5 md:px-8">
        <div className="flex-1 space-y-6">
          {confirmedBookings.length > 0 && (
            <div className="space-y-3">
              <h2 className="title-separator md:text-gray-500">Confirmados</h2>
              {confirmedBookings.map((booking) => (
                <Suspense key={booking.id}>
                  <BookingDetailsSheet booking={booking} />
                </Suspense>
              ))}
            </div>
          )}

          {concludedBookings.length > 0 && (
            <div className="space-y-3">
              <h2 className="title-separator md:text-gray-500">Finalizados</h2>
              {concludedBookings.map((booking) => (
                <Suspense key={booking.id}>
                  <BookingDetailsSheet booking={booking} />
                </Suspense>
              ))}
            </div>
          )}

          {confirmedBookings.length === 0 && concludedBookings.length === 0 && (
            <div className="flex h-96 items-center justify-center">
              <p className="text-gray-500">Nenhum agendamento encontrado</p>
            </div>
          )}
        </div>

        {currentBooking && (
          <div className="mt-10 hidden flex-1 md:block">
            <BookingDetailsAside booking={currentBooking} />
          </div>
        )}
      </div>
    </div>
  )
}

export default BookingsPage
