// Components
import { BarbershopItem } from "../_components/barbershop-item"
import { Header } from "../_components/header"
import { Search } from "../_components/search"

// Utilities
import { db } from "../_lib/prisma"

interface BarbershopsPageProps {
  searchParams: {
    title?: string
  }
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams.title,
        mode: "insensitive",
      },
    },
  })

  return (
    <div className="space-y-6">
      <Header />
      <div className="px-5">
        <Search />
      </div>

      <div className="space-y-3 px-5">
        <h1 className="title-separator">
          Resultados para {`"${searchParams.title}"`}
        </h1>
        <div className="grid grid-cols-2 gap-4">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BarbershopsPage
