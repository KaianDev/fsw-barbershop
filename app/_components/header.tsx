import Image from "next/image"
import { Button } from "./ui/button"
import { MenuIcon } from "lucide-react"

export const Header = () => {
  return (
    <header className="flex h-20 items-center justify-between border-b px-5">
      <div className="relative h-[22px] w-[130px]">
        <Image src="/logo.png" alt="Logo FSW Barber" fill />
      </div>
      <Button variant="outline" className="p-2.5">
        <MenuIcon size={20} />
      </Button>
    </header>
  )
}
