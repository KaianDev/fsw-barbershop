import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Suspense } from "react"

// Components
import { BookingItem } from "../_components/booking-item"
import { Button } from "../_components/ui/button"
import { Header } from "../_components/header"
import { BarbershopCarousel } from "../_components/barbershop-carousel"
import { Search } from "../_components/search"
import { cn } from "../_lib/utils"
import { auth } from "../_lib/auth"

// Utilities
import { db } from "../_lib/prisma"
import { QUICK_SEARCH } from "../_constants/quick-search"
import { getConfirmedBookings } from "../_actions/get-confirmed-bookings"

const Home = async () => {
  const session = await auth()
  const confirmedBookings = await getConfirmedBookings()

  const hasBooking = confirmedBookings.length > 0 && !!session?.user

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
          <div className="relative mx-auto max-w-[1440px] px-5 md:px-8">
            <div className="gap-16 md:flex md:py-16 xl:gap-32">
              <div
                className={cn(
                  "flex-col gap-4 md:flex md:min-w-[354px]",
                  hasBooking && "justify-between gap-0",
                )}
              >
                <div className="gap-1 py-6 md:py-0">
                  <h2 className="truncate text-[28px]">
                    Olá,{" "}
                    <span className="font-bold">
                      {session?.user
                        ? `${session.user.name}`
                        : "Faça seu login"}
                    </span>
                  </h2>
                  <p className="text-sm">
                    {format(new Date(), "dd 'de' MMMM", { locale: ptBR })}
                  </p>
                </div>

                <Suspense>
                  <Search />
                </Suspense>

                <div className="no-scrollbar flex w-full gap-2.5 overflow-x-auto pt-6 md:pt-0">
                  {QUICK_SEARCH.map((item) => (
                    <Button
                      key={item.title}
                      variant="outline"
                      className="flex w-fit shrink-0 items-center gap-2.5 bg-card"
                      asChild
                    >
                      <Link href={`/barbershops?service=${item.title}`}>
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          width={16}
                          height={16}
                        />
                        <span className="text-sm">{item.title}</span>
                      </Link>
                    </Button>
                  ))}
                </div>

                <div className="pt-6 md:hidden">
                  <div className="relative h-[150px] w-full overflow-hidden rounded-lg">
                    <Image
                      src="/banner.png"
                      alt="Agende nos melhores com FSW Barber"
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                  </div>
                </div>

                {hasBooking && (
                  <div className="space-y-3 pt-6 md:pt-0">
                    <h2 className="title-separator">Agendamentos</h2>
                    <div className="no-scrollbar flex items-center gap-3 overflow-x-auto">
                      {confirmedBookings.map((booking) => (
                        <BookingItem key={booking.id} booking={booking} />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex-1 md:w-[275px] lg:w-[520px] xl:w-[600px]">
                <div className="space-y-3 pt-6 md:pt-0">
                  <h2 className="title-separator">Recomendados</h2>
                  <BarbershopCarousel barbershops={recommendedBarbershops} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-[1440px] px-5 md:px-8">
          <div className="space-y-3 pt-6 md:pt-10">
            <h2 className="title-separator">Populares</h2>
            <BarbershopCarousel barbershops={popularBarbershops} />
          </div>

          <div className="hidden space-y-3 pt-6 md:block md:pt-10">
            <h2 className="title-separator">Mais visitados</h2>
            <BarbershopCarousel barbershops={recommendedBarbershops} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
