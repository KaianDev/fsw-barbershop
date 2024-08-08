import { Barbershop } from "@prisma/client"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"

interface BarbershopItemProps {
  barbershop: Barbershop
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
  return (
    <Card className="w-full min-w-[167px] overflow-hidden rounded-2xl">
      <CardContent className="p-0">
        <div className="p-1">
          <div className="relative size-[159px]">
            <Image
              src={barbershop.imageUrl}
              alt={barbershop.name}
              fill
              className="rounded-2xl object-cover"
            />
          </div>
        </div>
        <div className="space-y-3 px-3 pb-3">
          <div className="space-y-1">
            <h3 className="truncate">{barbershop.name}</h3>

            <p className="line-clamp-2 text-xs text-gray-400">
              {barbershop.description}
            </p>
          </div>
          <Button
            className="w-full rounded-lg text-center font-bold"
            variant="secondary"
          >
            Reservar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default BarbershopItem
