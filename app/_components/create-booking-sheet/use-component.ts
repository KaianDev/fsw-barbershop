"use client"

import { useMemo, useState, useTransition } from "react"
import { useGetBookings, useCreateBooking } from "@/app/_hooks/bookings"
import { set, isPast, isToday, isSunday, isMonday } from "date-fns"
import { queryClient } from "@/app/_lib/tanstack"
import { BarbershopService, Booking } from "@prisma/client"

interface GetTimeListProps {
  bookingTimeList: string[]
  bookings: Booking[]
  selectedDay: Date
}
const getTimeList = ({
  bookings,
  selectedDay,
  bookingTimeList,
}: GetTimeListProps) => {
  const timeList = bookingTimeList.filter((time) => {
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

interface UseComponentProps {
  service: BarbershopService
  bookingTimeList: string[]
}

export const useComponent = ({
  bookingTimeList,
  service,
}: UseComponentProps) => {
  const [isPending, startTransition] = useTransition()
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

  const handleCreateBookingSubmit = () => {
    startTransition(async () => {
      if (!selectedDay || !selectedTime) {
        return
      }

      const [hours, minutes] = selectedTime.split(":").map((i) => Number(i))

      const bookingDate = set(selectedDay, {
        hours,
        minutes,
      })

      if (isSunday(bookingDate) || isMonday(bookingDate)) {
        return
      }

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
    })
  }

  const timeList = useMemo(() => {
    if (!selectedDay || !bookings) return []
    return getTimeList({ bookings, selectedDay, bookingTimeList })
  }, [bookings, selectedDay, bookingTimeList])

  const handleBookingSheetOpen = (isOpen: boolean) => {
    setIsOpenSheet(isOpen)
    setSelectedDay(undefined)
    setSelectedTime(undefined)
  }

  return {
    selectedDay,
    selectedTime,
    timeList,
    isLoading,
    isOpenAlertDialog,
    isOpenSheet,
    isPending,
    setSelectedDay,
    setSelectedTime,
    setIsOpenAlertDialog,
    handleCreateBookingSubmit,
    handleBookingSheetOpen,
  }
}
