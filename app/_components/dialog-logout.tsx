"use client"

import { signOut } from "next-auth/react"

// Components
import { Button } from "@/_components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/_components/ui/dialog"

interface DialogLogoutProps extends React.PropsWithChildren {}

export const DialogLogout = ({ children }: DialogLogoutProps) => {
  const handleLogout = async () => {
    await signOut()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[90%] rounded-lg p-5 md:max-w-[318px]">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-center">Sair</DialogTitle>
          <DialogDescription className="text-center">
            Deseja sair da plataforma?
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-2.5">
          <DialogClose asChild>
            <Button variant="secondary" size="sm" className="gap-2">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            className="gap-2"
            size="sm"
            onClick={handleLogout}
          >
            Sair
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
