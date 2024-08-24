"use client"

import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "../_lib/tanstack"

export const TanstackProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
