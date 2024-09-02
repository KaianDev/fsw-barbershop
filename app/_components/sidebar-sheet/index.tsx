"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { CalendarDaysIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react"
import { useSession } from "next-auth/react"

// Components
import { Separator } from "@/_components/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/_components/ui/avatar"
import { Button } from "@/_components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/_components/ui/sheet"
import { DialogLogin } from "@/app/_components/dialog-login"
import { DialogLogout } from "@/app/_components/dialog-logout"

// Utilities
import { QUICK_SEARCH } from "../../_constants/quick-search"

interface SidebarSheetProps extends React.PropsWithChildren {}

export const SidebarSheet = ({ children }: SidebarSheetProps) => {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-start">Menu</SheetTitle>
        </SheetHeader>
        {session?.user ? (
          <div className="mt-6 flex items-center gap-2">
            <Avatar className="border border-primary">
              <AvatarFallback>{session.user?.name?.charAt(0)}</AvatarFallback>
              <AvatarImage src={session.user.image || ""} />
            </Avatar>
            <div className="flex flex-col">
              <strong>{session?.user?.name}</strong>
              <span className="text-sm text-gray-400">
                {session?.user?.email}
              </span>
            </div>
          </div>
        ) : (
          <div className="mt-6 flex items-center justify-between">
            <p>Olá. Faça seu login!</p>
            <DialogLogin>
              <Button size="icon">
                <LogInIcon size={20} />
              </Button>
            </DialogLogin>
          </div>
        )}

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
              variant={pathname.includes("/bookings") ? "default" : "ghost"}
              className="w-full justify-start gap-2"
              asChild
            >
              <Link href="/bookings">
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

        {session?.user && (
          <>
            <Separator />

            <DialogLogout>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <LogOutIcon size={16} />
                Sair
              </Button>
            </DialogLogout>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
