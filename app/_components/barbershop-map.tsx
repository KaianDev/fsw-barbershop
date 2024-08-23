import Image from "next/image"
import { Barbershop } from "@prisma/client"

// Components
import { Avatar, AvatarImage } from "./ui/avatar"

interface BarbershopMapProps {
  barbershop: Barbershop
}

export const BarbershopMap = ({ barbershop }: BarbershopMapProps) => {
  return (
    <div className="relative h-[180px] w-full overflow-hidden rounded-md">
      <Image
        src="/card-map.png"
        alt="Mapa"
        fill
        sizes="33vw"
        className="object-cover"
      />
      <div className="absolute inset-x-5 bottom-5 flex items-center gap-3 rounded-md bg-popover px-5 py-3">
        <Avatar className="size-12">
          <AvatarImage src={barbershop.imageUrl} />
        </Avatar>
        <div className="">
          <h2 className="font-bold">{barbershop.name}</h2>
          <p className="truncate text-sm">{barbershop.address}</p>
        </div>
      </div>
    </div>
  )
}
