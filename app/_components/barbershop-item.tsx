import { Barbershop } from "@prisma/client"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import Link from "next/link"

interface BarbershopItemProps {
  barbershop: Barbershop
}

export const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
  return (
    <Card className="w-[167px] shrink-0 overflow-hidden rounded-2xl md:w-[213px]">
      <CardContent className="p-0">
        <div className="p-1">
          <div className="relative size-[159px] md:w-full">
            <Image
              src={barbershop.imageUrl}
              alt={barbershop.name}
              fill
              className="rounded-2xl object-cover"
            />
          </div>
        </div>
        <div className="space-y-3 px-3 pb-3 md:pt-3">
          <div className="space-y-1">
            <h3 className="truncate">{barbershop.name}</h3>

            <p className="line-clamp-2 text-xs text-gray-400">
              {barbershop.description}
            </p>
          </div>
          <Button
            className="w-full rounded-lg text-center font-bold"
            variant="secondary"
            asChild
          >
            <Link href={`/barbershops/${barbershop.id}`}>Reservar</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
