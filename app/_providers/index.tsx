import { ScreenSizeProvider } from "../_context/screen-size-context"
import { AuthProvider } from "./auth"
import { TanstackProvider } from "./tanstack"

export const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <AuthProvider>
      <TanstackProvider>
        <ScreenSizeProvider>{children}</ScreenSizeProvider>
      </TanstackProvider>
    </AuthProvider>
  )
}
