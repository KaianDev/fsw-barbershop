import { validate } from "uuid"

// Components
import { Header } from "../_components/header"
import { BookingDetailsAside } from "../_components/booking-details-aside"

// Utilities
import { getConcludedBookings } from "../_actions/get-concluded-bookings"
import { getConfirmedBookings } from "../_actions/get-confirmed-bookings"
import { BookingGrid } from "../_components/bookings-grid"

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
            <BookingGrid bookings={confirmedBookings} title="Confirmados" />
          )}

          {concludedBookings.length > 0 && (
            <BookingGrid bookings={concludedBookings} title="Finalizados" />
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
