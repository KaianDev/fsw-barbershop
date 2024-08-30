"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SearchIcon } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

// Components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/_components/ui/form"
import { Input } from "@/_components/ui/input"
import { Button } from "@/_components/ui/button"

const formSchema = z.object({
  title: z.string().trim().min(1, "Digite algo para pesquisar"),
})

export const Search = () => {
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

  return (
    <Form {...form}>
      <form onSubmit={handleSearch} className="flex gap-2">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  {...field}
                  placeholder="Buscar Barbearia"
                  className="rounded-lg bg-card text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          <SearchIcon size={20} />
        </Button>
      </form>
    </Form>
  )
}
