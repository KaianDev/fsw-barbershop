import { SessionProvider } from "next-auth/react"
import { auth } from "@/app/_lib/auth"

export const AuthProvider = async ({ children }: React.PropsWithChildren) => {
  const session = await auth()
  return <SessionProvider session={session}>{children}</SessionProvider>
}
