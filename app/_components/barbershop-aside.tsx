import Image from "next/image"
import { Barbershop } from "@prisma/client"

// Components
import { Card, CardContent } from "./ui/card"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Separator } from "./separator"
import { PhoneItem } from "./phone-item"

interface BarbershopAsideProps {
  barbershop: Barbershop
}

export const BarbershopAside = ({ barbershop }: BarbershopAsideProps) => {
  const openingHoursList = [
    {
      day: "Segunda-feira",
      hours: "Fechado",
    },
    {
      day: "Terça-feira",
      hours: "08:00 - 18:00",
    },
    {
      day: "Quarta-feira",
      hours: "08:00 - 18:00",
    },
    {
      day: "Quinta-feira",
      hours: "08:00 - 18:00",
    },
    {
      day: "Sexta-feira",
      hours: "08:00 - 18:00",
    },
    {
      day: "Sábado",
      hours: "08:00 - 18:00",
    },
    {
      day: "Domingo",
      hours: "Fechado",
    },
  ]

  return (
    <Card>
      <CardContent className="p-5">
        <div className="relative h-[180px] w-full overflow-hidden rounded-md">
          <Image src="/card-map.png" alt="Mapa" fill objectFit="cover" />

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
        <div className="mt-5 space-y-2.5">
          <h2 className="title-separator text-sm">Sobre nós</h2>
          <p className="text-justify text-sm text-gray-400">
            {barbershop.description}
          </p>
        </div>
        <Separator />
        <div className="space-y-2.5">
          {barbershop.phones.map((phone) => (
            <PhoneItem key={phone} phone={phone} />
          ))}
        </div>
        <Separator />
        <div>
          <ul className="space-y-2.5">
            {openingHoursList.map((item) => (
              <li key={item.day} className="flex justify-between text-sm">
                <span className="text-gray-400">{item.day}</span>
                <span className="text-white">{item.hours}</span>
              </li>
            ))}
          </ul>
        </div>

        <Separator />
        <div className="flex items-center justify-between py-5">
          <span>Em parceria com</span>
          <div className="relative h-[22px] w-[130px]">
            <Image src="/logo.png" alt="Logo" fill />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
