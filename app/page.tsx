import Image from "next/image"
import { Button } from "./_components/ui/button"
import { Input } from "./_components/ui/input"
import { MenuIcon, SearchIcon } from "lucide-react"
import { QUICK_SEARCH } from "./_constants/quick-search"
import { Card, CardContent } from "./_components/ui/card"
import { Badge } from "./_components/ui/badge"
import { Avatar, AvatarImage } from "./_components/ui/avatar"
import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/barbershop-item"

const Home = async () => {
  const recommendedBarbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })

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
        <Input placeholder="Buscar" className="rounded-lg bg-card text-sm" />
        <Button>
          <SearchIcon size={20} />
        </Button>
      </div>

      <div className="no-scrollbar flex w-full gap-2.5 overflow-x-auto pl-5 pt-6">
        {QUICK_SEARCH.map((item) => (
          <Button
            key={item.title}
            variant="outline"
            className="flex w-fit shrink-0 items-center gap-2.5 bg-card"
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

      <div className="px-5 pt-6">
        <div className="relative h-[150px] w-full overflow-hidden rounded-lg">
          <Image
            src="/banner.png"
            alt="Agende nos melhores com FSW Barber"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="space-y-3 px-5 pt-6">
        <h2 className="title-separator">Agendamentos</h2>
        <Card>
          <CardContent className="flex p-0">
            <div className="flex flex-1 flex-col gap-3 p-3">
              <Badge variant="tertiary">Confirmado</Badge>
              <div className="space-x-2">
                <h3 className="font-bold">Corte de Cabelo</h3>
                <div className="flex items-center gap-2">
                  <Avatar className="size-6">
                    <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
                  </Avatar>
                  <p className="text-sm">Vintage Barber</p>
                </div>
              </div>
            </div>
            <div className="flex w-[106px] flex-col items-center justify-center border-l">
              <span className="text-xs">Fevereiro</span>
              <span className="text-2xl">06</span>
              <span className="text-xs">09:45</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-3 pl-5 pt-6">
        <h2 className="title-separator">Recomendados</h2>
        <div className="no-scrollbar flex gap-4 overflow-x-auto">
          {recommendedBarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
      <div className="space-y-3 pl-5 pt-6">
        <h2 className="title-separator">Populares</h2>
        <div className="no-scrollbar flex gap-4 overflow-x-auto">
          {popularBarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
