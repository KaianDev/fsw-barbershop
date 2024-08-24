"use client"

import { useLayoutEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Prisma } from "@prisma/client"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useDebounce } from "use-debounce"

// Components
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet"
import { BookingItem } from "./booking-item"
import { Separator } from "./separator"
import { BookingStatusBadge } from "./booking-status-badge"
import { ServiceDetails } from "./service-details"
import { PhoneItem } from "./phone-item"
import { BarbershopMap } from "./barbershop-map"
import { Button } from "./ui/button"
import { CancelBookingAlertDialog } from "./cancel-booking-alert-dialog"
import { ReviewBarbershop } from "./review-barbershop"

// Utilities
import { useBarbershopUserReview } from "../_hooks/review/use-get-barbershop-user-review"

interface BookingDetailsSheetProps {
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

export const BookingDetailsSheet = ({ booking }: BookingDetailsSheetProps) => {
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

  return (
    <>
      <Sheet open={isBookingDetailsOpen} onOpenChange={setIsBookingDetailsOpen}>
        <button className="w-full" onClick={handleBookingItemClick}>
          <BookingItem booking={booking} />
        </button>

        <SheetContent className="px-0">
          <SheetHeader>
            <SheetTitle className="px-5 text-start">
              Informações da Reserva
            </SheetTitle>
          </SheetHeader>

          <Separator />

          <div className="flex flex-col gap-6 px-5">
            <BarbershopMap barbershop={booking.service.barbershop} />

            <div className="space-y-3">
              <BookingStatusBadge isConfirmedBooking={isConfirmedBooking} />

              <ServiceDetails
                barbershop={booking.service.barbershop}
                service={booking.service}
                date={booking.date}
                time={format(booking.date, "HH:mm", { locale: ptBR })}
              />
            </div>

            <div className="space-y-3">
              {booking.service.barbershop.phones.map((phone, index) => (
                <PhoneItem key={index} phone={phone} />
              ))}
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <SheetClose asChild>
                <Button size="sm" variant="secondary">
                  Voltar
                </Button>
              </SheetClose>
              {isConfirmedBooking ? (
                <CancelBookingAlertDialog
                  bookingId={booking.id}
                  sheetClose={setIsBookingDetailsOpen}
                />
              ) : (
                <ReviewBarbershop
                  barbershop={booking.service.barbershop}
                  sheetClose={setIsBookingDetailsOpen}
                  ratingAverage={review}
                  isLoading={isLoading}
                />
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
