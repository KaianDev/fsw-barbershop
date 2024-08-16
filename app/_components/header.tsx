"use client"

import Image from "next/image"
import Link from "next/link"
import { CalendarDays, MenuIcon, UserCircle2Icon } from "lucide-react"
import { usePathname } from "next/navigation"
import { Suspense } from "react"
import { useSession } from "next-auth/react"

// Components
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { SidebarSheet } from "./sidebar-sheet"
import { Search } from "./search"
import { DialogLogin } from "./dialog-login"
import { DialogLogout } from "./dialog-logout"

export const Header = () => {
  const pathname = usePathname()
  const { data: session } = useSession()

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
          {session?.user ? (
            <DialogLogout>
              <div className="flex cursor-pointer items-center gap-2">
                <Avatar className="size-9">
                  <AvatarFallback>
                    {session.user?.name?.charAt(0)}
                  </AvatarFallback>
                  <AvatarImage src={session.user.image || ""} />
                </Avatar>
                <span className="font-bold md:hidden lg:block">
                  {session.user.name}
                </span>
              </div>
            </DialogLogout>
          ) : (
            <DialogLogin>
              <Button className="gap-2 rounded-lg">
                <UserCircle2Icon size={16} />
                Perfil
              </Button>
            </DialogLogin>
          )}
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
