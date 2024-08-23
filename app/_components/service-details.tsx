import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

// Components
import { Card, CardContent } from "./ui/card"
import { Barbershop, BarbershopService } from "@prisma/client"

interface ServiceDetailsProps {
  service: BarbershopService
  barbershop: Pick<Barbershop, "name">
  date: Date
  time: string
}

export const ServiceDetails = ({
  service,
  barbershop,
  date,
  time,
}: ServiceDetailsProps) => {
  return (
    <Card>
      <CardContent className="p-3">
        <ul className="flex flex-col gap-3">
          <li className="flex items-center justify-between">
            <span className="font-bold">{service.name}</span>
            <span className="text-sm font-bold">
              {Intl.NumberFormat("pt-br", {
                style: "currency",
                currency: "BRL",
              }).format(Number(service.price))}
            </span>
          </li>
          <li className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Data</span>
            <span>{format(date, "dd 'de' MMMM", { locale: ptBR })}</span>
          </li>
          <li className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Horário</span>
            <span>{time}</span>
          </li>
          <li className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Barbearia</span>
            <span>{barbershop.name}</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  )
}
