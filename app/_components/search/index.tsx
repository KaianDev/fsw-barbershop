"use client"

import { SearchIcon } from "lucide-react"

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
import { useComponent } from "./use-component"

export const Search = () => {
  const { form, pathname, handleSearch } = useComponent()

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
              {pathname === "/" && <FormMessage />}
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
