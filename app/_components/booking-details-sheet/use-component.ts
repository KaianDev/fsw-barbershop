"use client"

import { useLayoutEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { isFuture } from "date-fns"
import { useDebounce } from "use-debounce"
import { useBarbershopUserReview } from "@/app/_hooks/review"
import { Prisma } from "@prisma/client"

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
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  useState(false)

  const [debouncedValue] = useDebounce(isSmallScreen, 200)

  useLayoutEffect(() => {
    const mediaQueryList = window.matchMedia("(max-width: 768px)")
    const handleChange = (e: MediaQueryListEvent) => {
      setIsSmallScreen(e.matches)
    }

    setIsSmallScreen(mediaQueryList.matches)

    mediaQueryList.addEventListener("change", handleChange)

    return () => {
      mediaQueryList.removeEventListener("change", handleChange)
    }
  }, [isSmallScreen])

  const handleBookingItemClick = () => {
    if (debouncedValue) {
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
