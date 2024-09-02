"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  title: z.string().trim().min(1, "Digite algo para pesquisar"),
})

export const useComponent = () => {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: searchParams.get("title") || "",
    },
  })

  const handleSearch = form.handleSubmit(({ title }) => {
    router.push(`/barbershops?title=${title}`)
  })

  return {
    form,
    pathname,
    handleSearch,
  }
}
