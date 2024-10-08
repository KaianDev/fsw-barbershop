import type { Metadata } from "next"
import { Nunito_Sans as FontSans } from "next/font/google"
import "./globals.css"

// Components
import { Footer } from "@/_components/footer"
import { Toaster } from "@/_components/ui/sonner"

// Utilities
import { Providers } from "@/app/_providers"

const fontSans = FontSans({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FSW Barber",
  description: "Agende nos melhores com FSW Barber",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-Br" className="dark">
      <body className={fontSans.className}>
        <Providers>
          <div className="flex h-full flex-col">
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </Providers>
        <Toaster />
      </body>
    </html>
  )
}
