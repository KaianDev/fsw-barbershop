import Image from "next/image"
import { SearchIcon } from "lucide-react"

// Utilities
import { db } from "./_lib/prisma"
import { QUICK_SEARCH } from "./_constants/quick-search"

// Components
import { BarbershopItem } from "./_components/barbershop-item"
import { BookingItem } from "./_components/booking-item"
import { Button } from "./_components/ui/button"
import { Header } from "./_components/header"
import { Input } from "./_components/ui/input"

const Home = async () => {
  const recommendedBarbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })

  return (
    <div>
      <Header />

      <main>
        <div className="relative bg-cover bg-top md:bg-[url('/hero.png')]">
          <div className="absolute inset-0 z-0 grayscale md:bg-black/90" />
          <div className="relative mx-auto max-w-[1440px] px-5">
            <div className="gap-16 md:flex md:py-16 lg:gap-32">
              <div className="flex-col justify-between md:flex md:min-w-[354px]">
                <div className="gap-1 py-6 md:py-0">
                  <h2 className="text-[28px]">Olá, Kaian!</h2>
                  <p className="text-sm">Sexta, 2 de Fevereiro</p>
                </div>

                <div className="flex gap-2">
                  <Input
                    placeholder="Buscar"
                    className="rounded-lg bg-card text-sm"
                  />
                  <Button>
                    <SearchIcon size={20} />
                  </Button>
                </div>

                <div className="no-scrollbar flex w-full gap-2.5 overflow-x-auto pt-6 md:hidden">
                  {QUICK_SEARCH.map((item) => (
                    <Button
                      key={item.title}
                      variant="outline"
                      className="flex w-fit shrink-0 items-center gap-2.5 bg-card"
                    >
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        width={16}
                        height={16}
                      />
                      <span className="text-sm">{item.title}</span>
                    </Button>
                  ))}
                </div>

                <div className="pt-6 md:hidden">
                  <div className="relative h-[150px] w-full overflow-hidden rounded-lg">
                    <Image
                      src="/banner.png"
                      alt="Agende nos melhores com FSW Barber"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <BookingItem />
              </div>

              <div className="md:flex-1 md:overflow-hidden">
                <div className="space-y-3 pt-6 md:pt-0">
                  <h2 className="title-separator">Recomendados</h2>
                  <div className="no-scrollbar flex gap-4 overflow-x-auto">
                    {recommendedBarbershops.map((barbershop) => (
                      <BarbershopItem
                        key={barbershop.id}
                        barbershop={barbershop}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-[1440px] px-5">
          <div className="space-y-3 pt-6 md:pt-10">
            <h2 className="title-separator">Populares</h2>
            <div className="no-scrollbar flex gap-4 overflow-x-auto">
              {popularBarbershops.map((barbershop) => (
                <BarbershopItem key={barbershop.id} barbershop={barbershop} />
              ))}
            </div>
          </div>
          <div className="space-y-3 pt-6 md:pt-10">
            <h2 className="title-separator">Mais Visitados</h2>
            <div className="no-scrollbar flex gap-4 overflow-x-auto">
              {popularBarbershops.map((barbershop) => (
                <BarbershopItem key={barbershop.id} barbershop={barbershop} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
