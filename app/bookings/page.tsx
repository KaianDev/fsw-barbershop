// Components
import { Header } from "../_components/header"
import { BookingItem } from "../_components/booking-item"

// Utilities
import { getConcludedBookings } from "../_actions/get-concluded-bookings"
import { getConfirmedBookings } from "../_actions/get-confirmed-bookings"
import { BookingDetailsAside } from "../_components/booking-details-aside"

const BookingPage = async () => {
  // TODO: Abrir dialog de login quando clicar em ver agendamentos
  const concludedBookings = await getConcludedBookings()
  const confirmedBookings = await getConfirmedBookings()

  console.log(concludedBookings.length, confirmedBookings.length)

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
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          )}

          {concludedBookings.length > 0 && (
            <div className="space-y-3">
              <h2 className="title-separator md:text-gray-500">Finalizados</h2>
              {concludedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          )}
        </div>

        {(confirmedBookings.length > 0 || concludedBookings.length > 0) && (
          <div className="mt-10 hidden flex-1 md:block">
            <BookingDetailsAside booking={confirmedBookings[0]} />
          </div>
        )}
      </div>
    </div>
  )
}

export default BookingPage
