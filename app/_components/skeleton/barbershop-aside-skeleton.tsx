import React from "react"
import { Separator } from "@/_components/separator"
import { Skeleton } from "@/_components/ui/skeleton"
import { PhoneItemSkeleton } from "@/_components/skeleton"

interface BarbershopAsideSkeletonProps {
  children: React.ReactNode
}

export const BarbershopAsideSkeleton = ({
  children,
}: BarbershopAsideSkeletonProps) => {
  return (
    <div className="relative h-full w-full p-5">
      <Skeleton variant="quaternary" className="absolute inset-0" />

      {/* Barbershop Map */}
      <div className="relative h-[180px]">
        <Skeleton
          variant="secondary"
          className="absolute inset-0 h-full w-full"
        />
      </div>

      {/* Barbershop About */}
      <div className="mt-5 space-y-3">
        <Skeleton variant="tertiary" className="h-5 w-[150px] md:h-7" />
        <div className="space-y-[2px]">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton variant="tertiary" key={i} className="h-[19px]" />
          ))}
        </div>
      </div>

      <Separator />

      {/* Barbershop Phones */}
      <div className="space-y-3">
        <Skeleton variant="tertiary" className="h-5 w-[150px] md:h-7" />
        <div className="space-y-3">
          {Array.from({ length: 2 }).map((_, i) => (
            <PhoneItemSkeleton key={i} />
          ))}
        </div>
      </div>

      <Separator />

      {children}
    </div>
  )
}
