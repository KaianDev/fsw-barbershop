"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { CalendarDaysIcon, HomeIcon, LogOutIcon } from "lucide-react"

// Components
import { Separator } from "./separator"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { QUICK_SEARCH } from "../_constants/quick-search"
import Image from "next/image"

interface SidebarSheetProps extends React.PropsWithChildren {}

export const SidebarSheet = ({ children }: SidebarSheetProps) => {
  const pathname = usePathname()

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-start">Menu</SheetTitle>
        </SheetHeader>
        <div className="mt-6 flex items-center gap-2">
          <Avatar className="border border-primary">
            <AvatarImage src={"https://github.com/kaiandev.png"} />
          </Avatar>
          <div className="flex flex-col">
            <strong>Kaian Vasconcelos</strong>
            <span className="text-sm text-gray-400">
              kaianvasconcelos@gmail.com
            </span>
          </div>
        </div>

        <Separator />

        <div className="space-y-1">
          <SheetClose asChild>
            <Button
              variant={pathname === "/" ? "default" : "ghost"}
              className="w-full justify-start gap-2"
              asChild
            >
              <Link href="/">
                <HomeIcon size={16} />
                Início
              </Link>
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button
              variant={pathname.includes("/booking") ? "default" : "ghost"}
              className="w-full justify-start gap-2"
              asChild
            >
              <Link href="/">
                <CalendarDaysIcon size={16} />
                Agendamentos
              </Link>
            </Button>
          </SheetClose>
        </div>

        <Separator />

        <div className="flex flex-col gap-1">
          {QUICK_SEARCH.map((item) => (
            <SheetClose asChild key={item.title}>
              <Button variant="ghost" className="justify-start gap-2" asChild>
                <Link href={`/barbershops?service=${item.title}`}>
                  <Image
                    width={16}
                    height={16}
                    src={item.imageUrl}
                    alt={item.title}
                  />
                  {item.title}
                </Link>
              </Button>
            </SheetClose>
          ))}
        </div>

        <Separator />

        <SheetClose asChild>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <LogOutIcon size={16} />
            Sair
          </Button>
        </SheetClose>
      </SheetContent>
    </Sheet>
  )
}
