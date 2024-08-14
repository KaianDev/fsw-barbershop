import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"

// Components
import { Button } from "@/app/_components/ui/button"

// Utilities
import { db } from "@/app/_lib/prisma"
import { Separator } from "@/app/_components/separator"

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

  return (
    <div className="">
      <div className="relative h-[250px] w-full">
        <Image
          src={barbershop.imageUrl}
          alt={barbershop.name}
          fill
          objectFit="cover"
        />
        <Button
          className="absolute left-5 top-6"
          size="icon"
          variant="secondary"
          asChild
        >
          <Link href="/">
            <ChevronLeftIcon size={20} />
          </Link>
        </Button>
        <Button
          className="absolute right-5 top-6"
          size="icon"
          variant="secondary"
        >
          <MenuIcon size={20} />
        </Button>
      </div>

      <div className="space-y-3 px-5 pt-3">
        <h1 className="text-xl font-bold">{barbershop.name}</h1>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <MapPinIcon size={16} className="text-primary" />
            <p className="text-sm">{barbershop.address}</p>
          </div>
          <div className="flex items-center gap-2">
            <StarIcon size={16} className="fill-primary text-primary" />
            <p className="text-sm">5,0 (889 avaliações)</p>
          </div>
        </div>
      </div>
      <Separator />
      <div className="space-y-3 px-5">
        <h2 className="title-separator">Sobre nós</h2>
        <p className="text-justify text-sm">{barbershop.description}</p>
      </div>
      <Separator />
      <div className="space-y-3 px-5">
        <h2 className="title-separator">Serviços</h2>
      </div>
    </div>
  )
}

export default BarbershopPage
