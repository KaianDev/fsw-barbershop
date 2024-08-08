import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"

export const BookingItem = () => {
  return (
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
  )
}
