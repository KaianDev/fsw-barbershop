"use client"

import { SmartphoneIcon } from "lucide-react"
import { toast } from "sonner"

// Components
import { Button } from "@/_components/ui/button"

interface PhoneItemProps {
  phone: string
}

export const PhoneItem = ({ phone }: PhoneItemProps) => {
  const handleCopyPhoneNumber = (phone: string) => {
    navigator.clipboard.writeText(phone)
    toast("Telefone copiado", {
      duration: 2000,
    })
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <SmartphoneIcon size={24} />
        <span>{phone}</span>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleCopyPhoneNumber(phone)}
      >
        Copiar
      </Button>
    </div>
  )
}
