import { Header } from "@/app/_components/header"
import { Separator } from "@/app/_components/separator"
import {
  BarbershopAsideSkeleton,
  BarbershopServiceItemSkeleton,
  PhoneItemSkeleton,
} from "@/app/_components/skeleton"
import { Skeleton } from "@/app/_components/ui/skeleton"

const LoadingBarbershopPage = () => {
  return (
    <div>
      <div className="hidden md:block">
        <Header />
      </div>
      {/* Header Mobile */}
      <div className="relative h-[250px] w-full md:hidden">
        <Skeleton
          variant="secondary"
          className="absolute inset-0 h-full w-full"
        />
        <div className="flex justify-between px-5 pt-6">
          <Skeleton className="size-10" />
          <Skeleton className="size-10" />
        </div>
      </div>

      <div className="mx-auto flex max-w-[1440px] overflow-hidden px-5 md:px-8 md:pt-10 lg:gap-10">
        <div className="w-full md:flex-1">
          {/* Barbershop Cover */}
          <div className="relative hidden h-[250px] w-full overflow-hidden md:block md:h-[487px] md:rounded-lg">
            <Skeleton variant="secondary" className="absolute inset-0" />
          </div>
          {/* Barbershop Title */}
          <div className="flex justify-between pt-3 md:pt-5">
            <div className="space-y-3">
              <Skeleton variant="tertiary" className="h-7 w-[300px] md:h-9" />
              <div className="flex flex-col justify-between gap-2 md:flex-row">
                <div className="flex items-center gap-2">
                  <Skeleton className="size-4" />
                  <Skeleton className="h-5 w-[250px]" />
                </div>
                <div className="flex items-center gap-2 md:hidden">
                  <Skeleton className="size-4" />
                  <Skeleton className="h-5 w-[200px]" />
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <Skeleton className="h-full w-[106px]" />
            </div>
          </div>
          <div className="-mx-5 md:mx-0 lg:hidden">
            <Separator />
          </div>
          {/* Barbershop About */}
          <div className="space-y-3 lg:hidden">
            <Skeleton variant="tertiary" className="h-5 w-[150px] md:h-7" />
            <div className="space-y-px">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-[19px]" />
              ))}
            </div>
          </div>
          <div className="-mx-5 md:mx-0 lg:hidden">
            <Separator />
          </div>
          {/* Barbershop Services Card */}
          <div className="space-y-3 lg:pt-10">
            <Skeleton variant="tertiary" className="h-5 w-[150px] md:h-7" />
            <div className="grid-cols-2 gap-x-5 gap-y-3 space-y-3 md:grid md:space-y-0 lg:grid-cols-1 xl:grid-cols-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <BarbershopServiceItemSkeleton key={i} />
              ))}
            </div>
          </div>
          <div className="-mx-5 md:mx-0 lg:hidden">
            <Separator />
          </div>

          {/* Barbershop Phones */}
          <div className="space-y-3 lg:hidden">
            <Skeleton variant="tertiary" className="h-5 w-[150px] md:h-7" />
            <div className="space-y-3">
              {Array.from({ length: 2 }).map((_, i) => (
                <PhoneItemSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>

        {/* BarbershopAside */}
        <div className="hidden h-max max-w-sm flex-1 lg:block">
          <BarbershopAsideSkeleton>
            {/* Barbershop times */}
            <div className="space-y-2.5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <Skeleton variant="tertiary" className="h-5 w-[80px]" />
                  <Skeleton className="h-5 w-[100px]" />
                </div>
              ))}
            </div>

            <Separator />

            <div className="flex items-center justify-between py-5">
              <Skeleton variant="tertiary" className="h-4 w-[100px]" />
              <Skeleton variant="secondary" className="h-6 w-[130px]" />
            </div>
          </BarbershopAsideSkeleton>
        </div>
      </div>
    </div>
  )
}

export default LoadingBarbershopPage
