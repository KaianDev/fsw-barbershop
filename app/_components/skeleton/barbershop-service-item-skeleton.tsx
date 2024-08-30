import { Skeleton } from "../ui/skeleton"

export const BarbershopServiceItemSkeleton = () => {
  return (
    <div className="relative h-[134px] p-3">
      <Skeleton variant="quaternary" className="absolute inset-0" />
      <div className="flex gap-3">
        <Skeleton variant="secondary" className="size-[110px] shrink-0" />

        <div className="flex w-full flex-col justify-between">
          <div className="space-y-1">
            <Skeleton variant="tertiary" className="h-5 w-full max-w-[150px]" />
            <Skeleton variant="tertiary" className="h-5 w-full max-w-[250px]" />
          </div>
          <div className="flex items-center justify-between">
            <Skeleton variant="tertiary" className="h-9 w-[60px]" />
            <Skeleton variant="secondary" className="h-9 w-[100px]" />
          </div>
        </div>
      </div>
    </div>
  )
}
