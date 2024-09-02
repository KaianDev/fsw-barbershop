import Image from "next/image"
import Link from "next/link"
import { StarIcon } from "lucide-react"
import type { Barbershop } from "@prisma/client"

// Components
import { Badge } from "@/_components/ui/badge"
import { Button } from "@/_components/ui/button"
import { Card, CardContent } from "@/_components/ui/card"

// Utilities
import { getBarbershopReview } from "../_actions/get-barbershop-review"
import { formatRating } from "../_helpers/format-rating"
interface BarbershopItemProps {
  barbershop: Barbershop
}

export const BarbershopItem = async ({ barbershop }: BarbershopItemProps) => {
  const review = await getBarbershopReview({ barbershopId: barbershop.id })

  return (
    <Card className="min-w-[167px] shrink-0 overflow-hidden rounded-2xl md:min-w-[213px]">
      <CardContent className="p-0">
        <div className="p-1">
          <div className="relative h-[159px] w-full">
            <Image
              src={barbershop.imageUrl}
              alt={barbershop.name}
              sizes="33vw"
              fill
              className="rounded-xl object-cover"
            />
            <Badge className="text absolute left-2 top-2 h-[25px] w-fit items-center gap-1 bg-tertiary/60 text-xs">
              <StarIcon size={12} className="fill-primary stroke-primary" />
              <span>{formatRating(review.avg)}</span>
            </Badge>
          </div>
        </div>
        <div className="space-y-3 px-3 pb-3 md:pt-3">
          <div className="space-y-1">
            <h3 className="truncate">{barbershop.name}</h3>

            <p className="line-clamp-2 text-xs text-gray-400">
              {barbershop.description}
            </p>
          </div>
          <Button
            className="w-full rounded-lg text-center font-bold"
            variant="secondary"
            asChild
          >
            <Link href={`/barbershops/${barbershop.id}`} prefetch>
              Reservar
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
