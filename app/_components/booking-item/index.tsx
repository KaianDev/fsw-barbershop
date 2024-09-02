import { Prisma } from "@prisma/client"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"

// Components
import { Avatar, AvatarImage } from "@/_components/ui/avatar"
import { Card, CardContent } from "@/_components/ui/card"
import { BookingStatusBadge } from "@/app/_components/booking-status-badge"

interface BookingItemProps {
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

export const BookingItem = ({ booking }: BookingItemProps) => {
  const isConfirmedBooking = isFuture(booking.date)

  return (
    <Card className="min-w-[90%]">
      <CardContent className="flex p-0">
        <div className="flex flex-1 flex-col gap-3 p-3">
          <BookingStatusBadge isConfirmedBooking={isConfirmedBooking} />
          <div className="space-y-2">
            <h3 className="text-start font-bold">{booking.service.name}</h3>
            <div className="flex items-center gap-2">
              <Avatar className="size-6">
                <AvatarImage src={booking.service.barbershop.imageUrl} />
              </Avatar>
              <p className="text-sm">{booking.service.barbershop.name}</p>
            </div>
          </div>
        </div>
        <div className="flex w-[106px] flex-col items-center justify-center border-l">
          <span className="text-xs capitalize">
            {format(booking.date, "MMMM", { locale: ptBR })}
          </span>
          <span className="text-2xl">
            {format(booking.date, "dd", { locale: ptBR })}
          </span>
          <span className="text-xs">
            {format(booking.date, "HH:mm", { locale: ptBR })}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
