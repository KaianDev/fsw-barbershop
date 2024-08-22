"use client"

import { useEffect, useMemo, useState } from "react"
import { useSession } from "next-auth/react"
import { Barbershop, BarbershopService, Booking } from "@prisma/client"
import { ptBR } from "date-fns/locale"
import { set, isAfter, startOfDay, format } from "date-fns"
import { CheckIcon } from "lucide-react"

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
import { Card, CardContent } from "./ui/card"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "./ui/alert-dialog"

// Utilities
import { cn } from "../_lib/utils"
import { createBooking } from "../_actions/create-booking"
import { getBookings } from "../_actions/get-bookings"

interface BookingSheetProps {
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
  "18:15",
]

interface TimeListProps {
  bookings: Booking[]
}

const getTimeList = ({ bookings }: TimeListProps) => {
  const timeList = BOOKING_TIME.filter((time) => {
    const [hours, minutes] = time.split(":")
    const hasBookingOnCurrentTime = bookings.some(
      (booking) =>
        booking.date.getHours() === Number(hours) &&
        booking.date.getMinutes() === Number(minutes),
    )

    if (hasBookingOnCurrentTime) {
      return false
    }
    return true
  })
  return timeList
}

export const BookingSheet = ({ service, barbershop }: BookingSheetProps) => {
  const { data: session } = useSession()
  const [isOpenSheet, setIsOpenSheet] = useState(false)
  const [isOpenAlertDialog, setIsOpenAlertDialog] = useState(false)

  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )
  const [bookings, setBookings] = useState<Booking[]>([])

  const onBookingSubmit = async () => {
    if (!selectedDay || !selectedTime) {
      return
    }

    if (!session?.user.id) return

    const [hour, minute] = selectedTime.split(":")

    const bookingDate = set(selectedDay, {
      hours: Number(hour),
      minutes: Number(minute),
    })

    try {
      await createBooking({
        date: bookingDate,
        serviceId: service.id,
        userId: session.user.id,
      })
      setIsOpenAlertDialog(true)
      setIsOpenSheet(false)
    } catch (error) {
      console.error("Error creating booking", error)
    }
  }

  useEffect(() => {
    const fetchBookings = async () => {
      if (!selectedDay) return
      const bookings = await getBookings({
        serviceId: service.id,
        date: selectedDay,
      })
      setBookings(bookings)
    }
    fetchBookings()
  }, [selectedDay, service.id])

  const timeList = useMemo(() => {
    if (!selectedDay) return []
    return getTimeList({ bookings })
  }, [bookings, selectedDay])

  const handleBookingSheetOpen = (isOpen: boolean) => {
    setIsOpenSheet(isOpen)
    setSelectedDay(undefined)
    setSelectedTime(undefined)
    setBookings([])
  }

  return (
    <>
      <Sheet open={isOpenSheet} onOpenChange={handleBookingSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="secondary" size="sm">
            Reservar
          </Button>
        </SheetTrigger>
        <SheetContent className="px-0">
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
                {timeList.map((time) => (
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
              </div>
              <Separator />
            </>
          )}

          {selectedTime && selectedDay && (
            <div className="px-5">
              <Card>
                <CardContent className="p-3">
                  <ul className="flex flex-col gap-3">
                    <li className="flex items-center justify-between">
                      <span className="font-bold">{service.name}</span>
                      <span className="text-sm font-bold">
                        {Intl.NumberFormat("pt-br", {
                          style: "currency",
                          currency: "BRL",
                        }).format(Number(service.price))}
                      </span>
                    </li>
                    <li className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Data</span>
                      <span>
                        {format(selectedDay, "dd 'de' MMMM", { locale: ptBR })}
                      </span>
                    </li>
                    <li className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Horário</span>
                      <span>{selectedTime}</span>
                    </li>
                    <li className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Barbearia</span>
                      <span>{barbershop.name}</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
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
