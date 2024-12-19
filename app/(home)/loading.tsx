import { Header } from "../_components/header"
import { BarbershopListSkeleton } from "../_components/skeleton/barbershop-list-skeleton"
import { Skeleton } from "../_components/ui/skeleton"

const Loading = () => {
  return (
    <div>
      <Header />

      <div className="mx-auto max-w-[1440px] overflow-hidden px-5 md:px-8">
        <div className="flex flex-col pt-6 md:flex-row md:gap-16 md:py-16 xl:gap-32">
          <div className="flex w-full flex-col gap-6 md:min-w-[354px] md:gap-4">
            {/* Welcome */}
            <div className="space-y-0.5">
              <Skeleton className="h-[42px] w-full" />
              <Skeleton className="h-[20px] w-28" />
            </div>

            {/* Search */}
            <div className="flex gap-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-[52px]" />
            </div>

            {/* Quick Search */}
            <div className="flex gap-2 overflow-hidden">
              {Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-28 shrink-0" />
              ))}
            </div>

            {/* Barbershops */}
          </div>
          <div className="hidden flex-1 md:block md:w-[275px] lg:w-[520px] xl:w-[600px]">
            <BarbershopListSkeleton />
          </div>
        </div>

        {/* Banner */}
        <div>
          <div className="pt-6 md:hidden">
            <Skeleton
              variant="secondary"
              className="h-[150px] w-full rounded-lg"
            />
          </div>
        </div>

        {/* Barbershops */}
        <div className="">
          <div className="md:pt-10">
            <BarbershopListSkeleton />
          </div>

          <div className="md:pt-10">
            <BarbershopListSkeleton />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loading
