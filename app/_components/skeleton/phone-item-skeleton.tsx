import { Skeleton } from "../ui/skeleton"

export const PhoneItemSkeleton = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Skeleton className="size-6" />
        <Skeleton className="h-6 w-[130px]" />
      </div>
      <Skeleton variant="secondary" className="h-9 w-[100px]" />
    </div>
  )
}
