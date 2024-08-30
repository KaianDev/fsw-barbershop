import { Suspense } from "react"

// Components
import { BarbershopItem } from "../_components/barbershop-item"
import { Header } from "../_components/header"
import { Search } from "../_components/search"

// Utilities
import { db } from "../_lib/prisma"

interface BarbershopsPageProps {
  searchParams: {
    title?: string
    service?: string
  }
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
  const barbershops = await db.barbershop.findMany({
    where: {
      OR: [
        searchParams.title
          ? {
              name: {
                contains: searchParams.title,
                mode: "insensitive",
              },
            }
          : {},
        searchParams.service
          ? {
              services: {
                some: {
                  name: {
                    contains: searchParams?.service,
                    mode: "insensitive",
                  },
                },
              },
            }
          : {},
      ],
    },
  })

  return (
    <div className="space-y-6">
      <Header />
      <div className="px-5 md:hidden">
        <Suspense>
          <Search />
        </Suspense>
      </div>

      <div className="mx-auto max-w-[1440px] space-y-3 px-5 md:px-8">
        <h1 className="title-separator">
          Resultados para {`"${searchParams?.title || searchParams?.service}"`}
        </h1>
        {barbershops.length > 0 && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {barbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        )}
        {barbershops.length === 0 && (
          <div className="flex h-96 items-center justify-center">
            <p className="text-gray-500">Nenhum barbearia/serviço encontrado</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default BarbershopsPage
