import { Prisma } from "@prisma/client"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

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
  return (
    <Card className="min-w-[90%]">
      <CardContent className="flex p-0">
        <div className="flex flex-1 flex-col gap-3 p-3">
          <Badge variant="tertiary">Confirmado</Badge>
          <div className="space-y-2">
            <h3 className="font-bold">{booking.service.name}</h3>
            <div className="flex items-center gap-2">
              <Avatar className="size-6">
                <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
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
