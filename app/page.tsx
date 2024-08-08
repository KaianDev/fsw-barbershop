import Image from "next/image"
import { Button } from "./_components/ui/button"
import { Input } from "./_components/ui/input"
import { MenuIcon, SearchIcon } from "lucide-react"
import { QUICK_SEARCH } from "./_constants/quick-search"

const Home = () => {
  return (
    <div>
      <header className="flex h-20 items-center justify-between border-b px-5">
        <div className="relative h-[22px] w-[130px]">
          <Image src="/logo.png" alt="Logo FSW Barber" fill />
        </div>
        <Button variant="outline" className="p-2.5">
          <MenuIcon size={20} />
        </Button>
      </header>

      <div className="gap-1 px-5 py-6">
        <h2 className="text-[28px]">Olá, Miguel!</h2>
        <p className="text-sm">Sexta, 2 de Fevereiro</p>
      </div>

      <div className="flex gap-2 px-5">
        <Input placeholder="Buscar" className="bg-secondary text-sm" />
        <Button>
          <SearchIcon size={20} />
        </Button>
      </div>

      <div className="no-scrollbar flex w-full justify-between gap-2.5 overflow-x-auto pl-5 pt-6">
        {QUICK_SEARCH.map((item) => (
          <Button
            key={item.title}
            variant="secondary"
            className="flex w-fit shrink-0 items-center gap-2.5"
          >
            <Image
              src={item.imageUrl}
              alt={item.title}
              width={16}
              height={16}
            />
            <span className="text-sm">{item.title}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}

export default Home
