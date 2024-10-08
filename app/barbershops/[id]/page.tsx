import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"

// Components
import { Button } from "@/_components/ui/button"
import { Separator } from "@/_components/separator"
import { ServiceItem } from "@/_components/service-item"
import { PhoneItem } from "@/app/_components/phone-item"
import { SidebarSheet } from "@/app/_components/sidebar-sheet"
import { Header } from "@/_components/header"
import { BarbershopAside } from "@/_components/barbershop-aside"

// Utilities
import { db } from "@/app/_lib/prisma"
import { getBarbershopReview } from "@/app/_actions/get-barbershop-review"
import { formatRating } from "@/app/_helpers/format-rating"

interface BarbershopPageProps {
  params: {
    id: string
  }
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  const barbershopId = params.id
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: barbershopId,
    },
    include: {
      services: true,
    },
  })

  if (!barbershop) {
    return notFound()
  }

  const review = await getBarbershopReview({ barbershopId: barbershop.id })

  return (
    <div>
      <div className="hidden md:block">
        <Header />
      </div>
      <div className="mx-auto flex max-w-[1440px] gap-10 md:px-8 md:pt-10">
        <div className="md:flex-1">
          <div className="relative h-[250px] w-full overflow-hidden md:h-[487px] md:rounded-lg">
            <Image
              src={barbershop.imageUrl}
              alt={barbershop.name}
              fill
              sizes="50vw"
              className="object-cover"
            />
            <Button
              className="absolute left-5 top-6 md:hidden"
              size="icon"
              variant="secondary"
              asChild
            >
              <Link href="/">
                <ChevronLeftIcon size={20} />
              </Link>
            </Button>
            <SidebarSheet>
              <Button
                className="absolute right-5 top-6 md:hidden"
                size="icon"
                variant="secondary"
              >
                <MenuIcon size={20} />
              </Button>
            </SidebarSheet>
          </div>

          <div className="flex flex-col gap-3 px-5 pt-3 md:flex-row md:justify-between md:px-0 md:pt-5">
            <div className="md:space-y-3">
              <h1 className="text-xl font-bold md:text-3xl">
                {barbershop.name}
              </h1>
              <div className="hidden items-center gap-2 md:flex">
                <MapPinIcon size={16} className="text-primary" />
                <p className="text-sm">{barbershop.address}</p>
              </div>
            </div>

            <div className="hidden flex-col items-center gap-2 rounded-md bg-secondary px-5 py-2.5 md:flex">
              <div className="flex items-center gap-2 text-xl">
                <StarIcon size={20} className="fill-primary text-primary" />
                <span>{formatRating(review.avg)}</span>
              </div>
              <p className="text-xs">{`${review.count} ${review.count === 1 ? "avaliação" : "avaliações"}`}</p>
            </div>

            <div className="space-y-2 md:hidden">
              <div className="flex items-center gap-2">
                <MapPinIcon size={16} className="text-primary" />
                <p className="text-sm">{barbershop.address}</p>
              </div>
              <div className="flex items-center gap-2">
                <StarIcon size={16} className="fill-primary text-primary" />
                <p className="text-sm">
                  {formatRating(review.avg)}{" "}
                  {`(${review.count} ${review.count === 1 ? "avaliação" : "avaliações"})`}
                </p>
              </div>
            </div>
          </div>

          <Separator className="lg:hidden" />

          <div className="space-y-3 px-5 md:px-0 lg:hidden">
            <h2 className="title-separator">Sobre nós</h2>
            <p className="text-justify text-sm">{barbershop.description}</p>
          </div>

          <Separator className="lg:hidden" />

          <div className="space-y-3 px-5 md:px-0 lg:pt-10">
            <h2 className="title-separator">Serviços</h2>
            <div className="grid-cols-2 gap-x-5 gap-y-3 space-y-3 md:grid md:space-y-0 lg:grid-cols-1 xl:grid-cols-2">
              {barbershop.services.map((service) => (
                <ServiceItem
                  key={service.id}
                  service={service}
                  barbershop={barbershop}
                />
              ))}
            </div>
          </div>

          <Separator className="lg:hidden" />

          <div className="space-y-3 px-5 md:px-0 lg:hidden">
            <h2 className="title-separator">Contato</h2>
            {barbershop.phones.map((phone, index) => (
              <PhoneItem key={index} phone={phone} />
            ))}
          </div>
        </div>

        <div className="hidden max-w-sm flex-1 lg:block">
          <BarbershopAside barbershop={barbershop} />
        </div>
      </div>
    </div>
  )
}

export default BarbershopPage
