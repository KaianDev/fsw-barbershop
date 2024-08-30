import { Header } from "@/_components/header"
import { Skeleton } from "@/_components/ui/skeleton"
import { BarbershopAsideSkeleton } from "@/_components/skeleton/barbershop-aside-skeleton"
import { BookingItemSkeleton } from "@/_components/skeleton/booking-item-skeleton"

const BookingsLoadingPage = () => {
  return (
    <div>
      <Header />
      <div className="mx-auto max-w-[1200px] px-5 py-5 md:px-8">
        <Skeleton variant="tertiary" className="h-7 w-[300px] md:h-9" />
      </div>
      <div className="mx-auto flex max-w-[1200px] gap-10 px-5 md:px-8">
        {/* Barbershop Booking Title */}
        <div className="flex-1 space-y-6">
          <div className="space-y-3">
            <Skeleton variant="tertiary" className="h-7 w-[250px] md:h-9" />
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <BookingItemSkeleton key={i} />
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <Skeleton variant="tertiary" className="h-7 w-[250px] md:h-9" />
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <BookingItemSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 hidden md:block md:h-max md:flex-1">
          <BarbershopAsideSkeleton>
            <div className="space-y-3">
              <Skeleton
                variant="tertiary"
                className="h-[22px] w-[77px] rounded-full"
              />
              <div className="relative h-[144px]">
                <Skeleton variant="tertiary" className="absolute inset-0" />
              </div>
            </div>
            <div className="mt-12">
              <Skeleton variant="secondary" className="h-8" />
            </div>
          </BarbershopAsideSkeleton>
        </div>
      </div>
    </div>
  )
}

export default BookingsLoadingPage
