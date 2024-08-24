import { AuthProvider } from "./auth"
import { TanstackProvider } from "./tanstack"

export const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <AuthProvider>
      <TanstackProvider>{children}</TanstackProvider>
    </AuthProvider>
  )
}
