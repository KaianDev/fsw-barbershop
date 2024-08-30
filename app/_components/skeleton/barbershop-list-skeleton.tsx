import { Skeleton } from "@/_components/ui/skeleton"
import { BarbershopItemSkeleton } from "./barbershop-item-skeleton"

export const BarbershopListSkeleton = () => {
  return (
    <div className="space-y-3 pt-6 md:pt-0">
      <Skeleton className="h-5 w-28 md:h-7 md:w-48" />

      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 10 }).map((_, i) => (
          <BarbershopItemSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
