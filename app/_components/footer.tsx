import { Card, CardContent } from "./ui/card"

export const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="pt-12 md:pt-24">
      <Card className="rounded-none border-none">
        <CardContent className="p-0 px-5 py-6">
          <p className="text-xs text-gray-400 md:text-end">
            &copy; {currentYear} Copyright{" "}
            <span className="font-bold">FSW Barber</span>
          </p>
        </CardContent>
      </Card>
    </footer>
  )
}
