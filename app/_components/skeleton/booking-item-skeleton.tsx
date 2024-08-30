import { Skeleton } from "../ui/skeleton"

export const BookingItemSkeleton = () => {
  return (
    <div className="relative h-[114px]">
      <Skeleton variant="quaternary" className="absolute inset-0" />
      <div className="flex p-3">
        <div className="flex-1 space-y-3">
          <Skeleton
            variant="secondary"
            className="h-[22px] w-[77px] rounded-full"
          />
          <div className="space-y-2">
            <Skeleton variant="tertiary" className="h-6 w-[250px]" />
            <div className="flex items-center gap-2">
              <Skeleton variant="tertiary" className="size-6 rounded-full" />
              <Skeleton variant="tertiary" className="h-5 w-[200px]" />
            </div>
          </div>
        </div>

        <div className="-my-3 flex w-[106px] shrink-0 flex-col items-center justify-center gap-1 border-l">
          <Skeleton variant="tertiary" className="h-4 w-[50px]" />
          <Skeleton variant="tertiary" className="size-8" />
          <Skeleton variant="tertiary" className="h-4 w-[50px]" />
        </div>
      </div>
    </div>
  )
}
