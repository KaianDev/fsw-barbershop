"use client"

import Image from "next/image"
import { signIn } from "next-auth/react"

// Components
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"

interface DialogLoginProps extends React.PropsWithChildren {}

export const DialogLogin = ({ children }: DialogLoginProps) => {
  const handleLogin = async () => {
    await signIn("google")
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[90%] rounded-lg p-5 md:max-w-[318px]">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-center">
            Faça login na plataforma
          </DialogTitle>
          <DialogDescription className="text-center">
            Conecte-se usando sua conta do Google.
          </DialogDescription>
        </DialogHeader>
        <Button
          variant="outline"
          className="gap-2"
          size="sm"
          onClick={handleLogin}
        >
          <Image
            src={"/google-icon.svg"}
            alt="Ícone Google"
            height={16}
            width={16}
          />
          Google
        </Button>
      </DialogContent>
    </Dialog>
  )
}
