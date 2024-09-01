"use client"

import { Barbershop, BarbershopService } from "@prisma/client"
import { ptBR } from "date-fns/locale"
import { isAfter, startOfDay } from "date-fns"
import { CheckIcon, LoaderIcon } from "lucide-react"

// Components
import { Button, buttonVariants } from "@/_components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetTitle,
} from "@/_components/ui/sheet"
import { Separator } from "@/_components/separator"
import { Calendar } from "@/_components/ui/calendar"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/_components/ui/alert-dialog"
import { ServiceDetails } from "@/_components/service-details"

// Utilities
import { cn } from "../../_lib/utils"
import { useComponent } from "./use-component"

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

export const CreateBookingSheet = ({
  service,
  barbershop,
}: CreateBookingSheetProps) => {
  const {
    isLoading,
    isOpenAlertDialog,
    isOpenSheet,
    selectedDay,
    selectedTime,
    timeList,
    isPending,
    setSelectedDay,
    setSelectedTime,
    handleCreateBookingSubmit,
    handleBookingSheetOpen,
    setIsOpenAlertDialog,
  } = useComponent({ service, bookingTimeList: BOOKING_TIME })

  return (
    <>
      <Sheet open={isOpenSheet} onOpenChange={handleBookingSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="secondary" size="sm">
            Reservar
          </Button>
        </SheetTrigger>
        <SheetContent
          className="overflow-y-auto px-0"
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
                cell: "w-full h-7",
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
                {!isLoading &&
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

                {!isLoading && timeList.length === 0 && (
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
              onClick={handleCreateBookingSubmit}
              disabled={!selectedDay || !selectedTime || isPending}
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
