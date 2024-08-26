import { Skeleton } from "../ui/skeleton"

export const BarbershopListSkeleton = () => {
  return (
    <div className="space-y-3 pt-6 md:pt-0">
      <Skeleton className="h-5 w-28 md:h-7 md:w-48" />

      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 10 }).map((_, i) => (
          // Barbershop Item
          <div key={i}>
            <Skeleton className="min-w-[167px] shrink-0 overflow-hidden rounded-2xl p-1 md:min-w-[213px]">
              <Skeleton
                variant="secondary"
                className="relative h-[159px] min-w-[165px] rounded-xl"
              >
                <Skeleton className="absolute left-2 top-2 h-[25px] w-[52px] rounded-full" />
              </Skeleton>

              <div className="px-2 pb-2 pt-1">
                <div className="space-y-1">
                  <Skeleton variant="secondary" className="h-6 w-full" />
                  <Skeleton variant="secondary" className="h-8 w-full" />

                  <Skeleton variant="tertiary" className="h-10 w-full" />
                </div>
              </div>
            </Skeleton>
          </div>
        ))}
      </div>
    </div>
  )
}
