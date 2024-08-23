// Components
import { Header } from "../_components/header"
import { BookingItem } from "../_components/booking-item"

// Utilities
import { getConcludedBookings } from "../_actions/get-concluded-bookings"
import { getConfirmedBookings } from "../_actions/get-confirmed-bookings"

const BookingPage = async () => {
  // TODO: Abrir dialog de login quando clicar em ver agendamentos
  const concludedBookings = await getConcludedBookings()
  const confirmedBookings = await getConfirmedBookings()

  return (
    <div>
      <Header />

      <div className="space-y-6 p-5">
        <h1 className="text-xl font-bold">Agendamentos</h1>

        <div className="space-y-3">
          <h2 className="title-separator">Confirmados</h2>
          {confirmedBookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>

        <div className="space-y-3">
          <h2 className="title-separator">Finalizados</h2>
          {concludedBookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BookingPage
