import { Barbershop } from "@prisma/client"

// Components
import { Separator } from "@/_components/separator"
import { PhoneItem } from "@/_components/phone-item"
import { BarbershopMap } from "@/_components/barbershop-map"

interface BarbershopDetailsProps {
  barbershop: Barbershop
}

export const BarbershopDetails = ({ barbershop }: BarbershopDetailsProps) => {
  return (
    <div>
      <BarbershopMap barbershop={barbershop} />
      <div className="mt-5 space-y-2.5">
        <h2 className="title-separator text-sm">Sobre nós</h2>
        <p className="text-justify text-sm text-gray-400">
          {barbershop.description}
        </p>
      </div>
      <Separator />
      <div className="space-y-2.5">
        {barbershop.phones.map((phone, index) => (
          <PhoneItem key={index} phone={phone} />
        ))}
      </div>
      <Separator />
    </div>
  )
}
