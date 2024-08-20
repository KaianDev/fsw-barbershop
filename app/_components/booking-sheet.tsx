"use client"

import { Barbershop, BarbershopService } from "@prisma/client"
import { ptBR } from "date-fns/locale"
import { set, isAfter, startOfDay, format } from "date-fns"

// Components
import { Button } from "./ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetTitle,
} from "./ui/sheet"
import { Separator } from "./separator"
import { Calendar } from "./ui/calendar"
import { useState } from "react"
import { cn } from "../_lib/utils"
import { Card, CardContent } from "./ui/card"

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

export const BookingSheet = ({ service, barbershop }: BookingSheetProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )

  const onBookingSubmit = () => {
    if (!selectedDate || !selectedTime) {
      return
    }
    const [hour, minute] = selectedTime.split(":")

    const bookingDate = set(selectedDate, {
      hours: Number(hour),
      minutes: Number(minute),
    })

    console.log(bookingDate)
  }

  return (
    <Sheet>
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
            selected={selectedDate}
            onSelect={(date) => setSelectedDate(date)}
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

        {selectedDate && (
          <>
            <Separator />
            <div className="no-scrollbar flex gap-3 overflow-x-auto px-5">
              {BOOKING_TIME.map((time) => (
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

        {selectedTime && selectedDate && (
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
                      {format(selectedDate, "dd 'de' MMMM", { locale: ptBR })}
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
            disabled={!selectedDate || !selectedTime}
            className="w-full"
          >
            Confirmar
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
