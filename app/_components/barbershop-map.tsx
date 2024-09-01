import Image from "next/image"
import { Barbershop } from "@prisma/client"

// Components
import { Avatar, AvatarImage } from "@/_components/ui/avatar"

interface BarbershopMapProps {
  barbershop: Barbershop
}

export const BarbershopMap = ({ barbershop }: BarbershopMapProps) => {
  return (
    <div className="relative flex h-[180px] w-full items-end overflow-hidden rounded-md px-5 pb-5">
      <Image src="/card-map.png" alt="Mapa" fill sizes="33vw" />
      <div className="z-50 flex w-full items-center gap-3 rounded-md bg-popover px-5 py-3">
        <Avatar className="size-12">
          <AvatarImage src={barbershop.imageUrl} />
        </Avatar>
        <div className="w-full overflow-hidden">
          <h2 className="truncate font-bold">{barbershop.name}</h2>
          <p className="truncate text-sm">{barbershop.address}</p>
        </div>
      </div>
    </div>
  )
}
