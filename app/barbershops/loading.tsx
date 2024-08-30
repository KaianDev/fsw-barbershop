import { Header } from "@/_components/header"
import { Skeleton } from "@/_components/ui/skeleton"
import { BarbershopItemSkeleton } from "@/_components/skeleton/barbershop-item-skeleton"

const BarbershopsLoadingPage = () => {
  return (
    <div>
      <Header />

      <div className="mx-auto w-full max-w-[1440px] space-y-6 px-5 py-5 md:px-8">
        {/* Barbershop Search Form */}
        <div className="flex gap-3 md:hidden">
          <Skeleton className="h-10 w-full lg:h-9" />
          <Skeleton variant="secondary" className="h-10 w-[52px] shrink-0" />
        </div>

        <div className="space-y-3">
          {/* Barbershop Result Title */}
          <div>
            <Skeleton variant="tertiary" className="h-7 w-[300px] md:h-9" />
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <BarbershopItemSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BarbershopsLoadingPage
