import { Barbershop, BarbershopService } from "@prisma/client"
import Image from "next/image"

// Components
import { Card, CardContent } from "@/_components/ui/card"
import { CreateBookingSheet } from "@/_components/create-booking-sheet"
import { Button } from "@/_components/ui/button"
import { DialogLogin } from "@/app/_components/dialog-login"

// Utilities
import { auth } from "@/app/_lib/auth"

interface ServiceItemProps {
  service: BarbershopService
  barbershop: Pick<Barbershop, "name">
}

export const ServiceItem = async ({
  service,
  barbershop,
}: ServiceItemProps) => {
  const session = await auth()

  return (
    <Card>
      <CardContent className="flex gap-3 p-3">
        <div className="relative size-[110px] shrink-0 overflow-hidden rounded-md">
          <Image
            src={service.imageUrl}
            alt={service.name}
            fill
            sizes="33vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col justify-between text-sm">
          <div className="space-y-1">
            <h3 className="font-bold">{service.name}</h3>
            <p className="line-clamp-2 text-gray-400">{service.description}</p>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-bold text-primary">
              {Intl.NumberFormat("pt-br", {
                style: "currency",
                currency: "BRL",
              }).format(Number(service.price))}
            </span>
            {session?.user ? (
              <CreateBookingSheet service={service} barbershop={barbershop} />
            ) : (
              <DialogLogin>
                <Button variant="secondary" size="sm">
                  Reservar
                </Button>
              </DialogLogin>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
