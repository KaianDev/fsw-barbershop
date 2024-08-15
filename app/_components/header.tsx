"use client"

import Image from "next/image"
import Link from "next/link"
import { CalendarDays, MenuIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import { Suspense } from "react"

// Components
import { Button } from "./ui/button"
import { Avatar, AvatarImage } from "./ui/avatar"
import { SidebarSheet } from "./sidebar-sheet"
import { Search } from "./search"

export const Header = () => {
  const pathname = usePathname()

  return (
    <header className="flex h-20 items-center justify-center border-b md:h-[96px]">
      <div className="flex w-full max-w-[1440px] items-center justify-between gap-8 px-5 md:px-8 lg:gap-11">
        <Link href={"/"}>
          <div className="relative h-[22px] w-[130px]">
            <Image src="/logo.png" alt="Logo FSW Barber" fill />
          </div>
        </Link>
        {pathname !== "/" && (
          <div className="hidden flex-1 md:block">
            <Suspense>
              <Search />
            </Suspense>
          </div>
        )}
        <div className="hidden items-center gap-6 md:flex">
          <Link href={"#"} className="flex gap-2">
            <CalendarDays size={20} />
            <span className="text-sm font-bold">Agendamentos</span>
          </Link>
          <div className="flex items-center gap-2">
            <Avatar className="size-9">
              <AvatarImage src={"https://github.com/kaiandev.png"} />
            </Avatar>
            <span className="font-bold">Kaian Vasconcelos</span>
          </div>
        </div>

        <SidebarSheet>
          <Button variant="outline" size="icon" className="md:hidden">
            <MenuIcon size={20} />
          </Button>
        </SidebarSheet>
      </div>
    </header>
  )
}
