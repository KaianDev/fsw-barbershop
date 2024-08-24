"use client"

import { useMemo, useState } from "react"
import { Barbershop, BarbershopService, Booking } from "@prisma/client"
import { ptBR } from "date-fns/locale"
import { set, isAfter, startOfDay, isPast, isToday } from "date-fns"
import { CheckIcon, LoaderIcon } from "lucide-react"

// Components
import { Button, buttonVariants } from "./ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetTitle,
} from "./ui/sheet"
import { Separator } from "./separator"
import { Calendar } from "./ui/calendar"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "./ui/alert-dialog"
import { ServiceDetails } from "./service-details"

// Utilities
import { cn } from "../_lib/utils"
import { useGetBookings } from "../_hooks/bookings/use-get-bookings"
import { useCreateBooking } from "../_hooks/bookings/use-create-booking"
import { queryClient } from "../_lib/tanstack"

interface CreateBookingSheetProps {
  service: BarbershopService
  barbershop: Pick<Barbershop, "name">
}

const BOOKING_TIME = [
  "09:00",
  "09:45",
  "10:15",
  "11:00",
  "11:45",
  "14:00",
  "14:45",
  "15:15",
  "16:00",
  "16:45",
  "17:30",
]

interface TimeListProps {
  bookings: Booking[]
  selectedDay: Date
}

const getTimeList = ({ bookings, selectedDay }: TimeListProps) => {
  const timeList = BOOKING_TIME.filter((time) => {
    const [hours, minutes] = time.split(":").map((i) => Number(i))

    const isPastTimeOnCurrentDay =
      isPast(set(new Date(), { hours, minutes })) && isToday(selectedDay)

    if (isPastTimeOnCurrentDay) {
      return false
    }

    const hasBookingOnCurrentTime = bookings.some(
      (booking) =>
        booking.date.getHours() === hours &&
        booking.date.getMinutes() === minutes,
    )

    if (hasBookingOnCurrentTime) {
      return false
    }
    return true
  })
  return timeList
}

export const CreateBookingSheet = ({
  service,
  barbershop,
}: CreateBookingSheetProps) => {
  const [isOpenSheet, setIsOpenSheet] = useState(false)
  const [isOpenAlertDialog, setIsOpenAlertDialog] = useState(false)

  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )

  const { data: bookings, isLoading } = useGetBookings({
    enabled: !!selectedDay,
    serviceId: service.id,
    date: selectedDay,
  })

  const { mutateAsync: createBooking } = useCreateBooking()

  const onBookingSubmit = async () => {
    if (!selectedDay || !selectedTime) {
      return
    }

    const [hour, minute] = selectedTime.split(":")

    const bookingDate = set(selectedDay, {
      hours: Number(hour),
      minutes: Number(minute),
    })

    await createBooking(
      {
        date: bookingDate,
        serviceId: service.id,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [
              "bookings",
              { serviceId: service.id, date: selectedDay },
            ],
          })
          setIsOpenSheet(false)
          setIsOpenAlertDialog(true)
        },
        onError: (error: any) => {
          console.error("Error creating booking", error)
        },
      },
    )
  }

  const timeList = useMemo(() => {
    if (!selectedDay) return []
    return getTimeList({ bookings, selectedDay })
  }, [bookings, selectedDay])

  const handleBookingSheetOpen = (isOpen: boolean) => {
    setIsOpenSheet(isOpen)
    setSelectedDay(undefined)
    setSelectedTime(undefined)
  }

  return (
    <>
      <Sheet open={isOpenSheet} onOpenChange={handleBookingSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="secondary" size="sm">
            Reservar
          </Button>
        </SheetTrigger>
        <SheetContent
          className="px-0"
          aria-describedby={"Menu lateral de fazer reserva"}
        >
          <SheetHeader className="px-5 text-start">
            <SheetTitle>Fazer Reserva</SheetTitle>
          </SheetHeader>
          <Separator />
          <div className="w-full">
            <Calendar
              mode="single"
              locale={ptBR}
              className="capitalize"
              selected={selectedDay}
              onSelect={(date) => setSelectedDay(date)}
              fromMonth={new Date()}
              disabled={(date) =>
                isAfter(startOfDay(new Date()), startOfDay(date))
              }
              classNames={{
                root: "w-full !py-0",
                cell: "w-full h-9",
                day: "w-full h-full rounded-full",
                caption: "flex items-center px-2 justify-between",
                caption_label: "font-bold",
                caption_start: "w-full",
                caption_end: "w-full",
                head_cell: "w-full font-normal",
                nav_button_next: "order-1 bg-zinc-800",
                nav_button_previous: "order-1 bg-zinc-800 disabled:bg-zinc-950",

                nav: "space-x-3",
                day_selected: "bg-primary text-primary-foreground",
              }}
            />
          </div>

          {selectedDay && (
            <>
              <Separator />
              <div className="no-scrollbar flex gap-3 overflow-x-auto px-5">
                {isLoading &&
                  timeList.length > 0 &&
                  timeList.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      size="sm"
                      className={cn(
                        selectedTime === time && "border border-primary",
                        "rounded-full",
                      )}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </Button>
                  ))}

                {timeList.length === 0 && (
                  <p className="flex h-9 w-full items-center justify-center text-center text-sm">
                    Nenhum horário disponível para esse dia
                  </p>
                )}
                {isLoading && (
                  <div className="flex h-9 w-full items-center justify-center">
                    <LoaderIcon size={20} className="animate-spin" />
                  </div>
                )}
              </div>
              <Separator />
            </>
          )}

          {selectedTime && selectedDay && (
            <div className="px-5">
              <ServiceDetails
                barbershop={barbershop}
                service={service}
                date={selectedDay}
                time={selectedTime}
              />
            </div>
          )}

          <div className="mt-6 px-5">
            <Button
              onClick={onBookingSubmit}
              disabled={!selectedDay || !selectedTime}
              className="w-full"
            >
              Confirmar
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <AlertDialog onOpenChange={setIsOpenAlertDialog} open={isOpenAlertDialog}>
        <AlertDialogContent
          className="max-w-[246px]"
          aria-describedby={"Feedback de reserva criada"}
        >
          <div className="mx-auto flex size-[72px] items-center justify-center rounded-full bg-primary">
            <CheckIcon strokeWidth={5} size={30} className="text-black" />
          </div>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              Reserva Efetuada!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Sua reserva foi agendada com sucesso.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogCancel
            className={cn(buttonVariants({ variant: "secondary" }))}
          >
            Confirmar
          </AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
