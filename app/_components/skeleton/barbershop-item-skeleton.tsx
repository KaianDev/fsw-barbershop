import { Skeleton } from "@/_components/ui/skeleton"

export const BarbershopItemSkeleton = () => {
  return (
    <div>
      <Skeleton
        variant="quaternary"
        className="min-w-[167px] shrink-0 overflow-hidden rounded-2xl p-1 md:min-w-[213px]"
      >
        <Skeleton
          variant="secondary"
          className="relative h-[159px] min-w-[165px] rounded-xl"
        >
          <Skeleton className="absolute left-2 top-2 h-[25px] w-[52px] rounded-full" />
        </Skeleton>

        <div className="px-2 pb-2 pt-1">
          <div className="space-y-1">
            <Skeleton variant="tertiary" className="h-6 w-full" />
            <Skeleton variant="tertiary" className="h-8 w-full" />

            <Skeleton variant="secondary" className="h-10 w-full" />
          </div>
        </div>
      </Skeleton>
    </div>
  )
}
