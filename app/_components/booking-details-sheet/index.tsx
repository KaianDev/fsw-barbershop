"use client"

import { Prisma } from "@prisma/client"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

// Components
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/_components/ui/sheet"
import { BookingItem } from "@/_components/booking-item"
import { Separator } from "@/_components/separator"
import { BookingStatusBadge } from "@/_components/booking-status-badge"
import { ServiceDetails } from "@/_components/service-details"
import { PhoneItem } from "@/_components/phone-item"
import { BarbershopMap } from "@/_components/barbershop-map"
import { Button } from "@/_components/ui/button"
import { CancelBookingAlertDialog } from "@/_components/cancel-booking-alert-dialog"
import { ReviewBarbershop } from "@/_components/review-barbershop"

// Utilities
import { useComponent } from "./use-component"

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
  const {
    isBookingDetailsOpen,
    isConfirmedBooking,
    isLoading,
    review,
    handleBookingItemClick,
    setIsBookingDetailsOpen,
  } = useComponent({ booking })

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
                  booking={booking}
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
