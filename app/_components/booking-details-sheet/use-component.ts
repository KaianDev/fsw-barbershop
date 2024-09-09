"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { isFuture } from "date-fns"
import { useBarbershopUserReview } from "@/app/_hooks/review"
import { Prisma } from "@prisma/client"
import { useScreenSize } from "@/app/_context/screen-size-context"

interface UseComponentProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    }
  }>
}

export const useComponent = ({ booking }: UseComponentProps) => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [isBookingDetailsOpen, setIsBookingDetailsOpen] = useState(false)
  const isSmallScreen = useScreenSize()

  const handleBookingItemClick = () => {
    if (isSmallScreen) {
      return setIsBookingDetailsOpen(true)
    }

    const params = new URLSearchParams(searchParams)
    params.set("bookingId", booking.id)
    router.push(`/bookings?${params.toString()}`)
  }

  const isConfirmedBooking = isFuture(booking.date)

  const { data: review, isLoading } = useBarbershopUserReview({
    barbershopId: booking.service.barbershop.id,
    enabled: isBookingDetailsOpen,
  })

  return {
    isConfirmedBooking,
    isBookingDetailsOpen,
    review,
    isLoading,
    handleBookingItemClick,
    setIsBookingDetailsOpen,
  }
}
