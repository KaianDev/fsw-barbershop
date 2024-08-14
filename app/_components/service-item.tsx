import { BarbershopService } from "@prisma/client"
import Image from "next/image"

// Components
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"

interface ServiceItemProps {
  service: BarbershopService
}

export const ServiceItem = ({ service }: ServiceItemProps) => {
  return (
    <Card>
      <CardContent className="flex gap-3 p-3">
        <div className="relative size-[110px] shrink-0 overflow-hidden rounded-md">
          <Image
            src={service.imageUrl}
            alt={service.name}
            fill
            objectFit="cover"
          />
        </div>
        <div className="flex flex-1 flex-col justify-between text-sm">
          <div className="space-y-1">
            <h3 className="font-bold">{service.name}</h3>
            <p className="text-gray-400">{service.description}</p>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-bold text-primary">
              {Intl.NumberFormat("pt-br", {
                style: "currency",
                currency: "BRL",
              }).format(Number(service.price))}
            </span>
            <Button variant="secondary" size="sm">
              Reservar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
