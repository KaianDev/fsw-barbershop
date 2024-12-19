import Image from "next/image"
import { Barbershop } from "@prisma/client"

// Components
import { Card, CardContent } from "@/_components/ui/card"
import { Separator } from "@/_components/separator"
import { BarbershopDetails } from "@/_components/barbershop-details"

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
        <BarbershopDetails barbershop={barbershop} />
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
            <Image src="/logo.png" alt="Logo" fill sizes="33vw" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
