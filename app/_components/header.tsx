import Image from "next/image"
import { Button } from "./ui/button"
import { CalendarDays, MenuIcon } from "lucide-react"
import { Avatar, AvatarImage } from "./ui/avatar"
import Link from "next/link"

export const Header = () => {
  return (
    <header className="flex h-20 items-center justify-center border-b md:h-[96px]">
      <div className="flex w-full max-w-[1440px] items-center justify-between px-5">
        <Link href={"/"}>
          <div className="relative h-[22px] w-[130px]">
            <Image src="/logo.png" alt="Logo FSW Barber" fill />
          </div>
        </Link>
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
        <Button variant="outline" className="p-2.5 md:hidden">
          <MenuIcon size={20} />
        </Button>
      </div>
    </header>
  )
}
