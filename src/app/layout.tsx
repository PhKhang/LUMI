import type { Metadata } from "next"
import { Nunito } from "next/font/google"
import { Provider } from "@/components/ui/provider"
import "./globals.css"

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "latin-ext"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "LUMI",
  description: "Learn, Upgrade, Master your IELTS skills with LUMI",
  icons: {
    icon: "/favicon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} antialiased`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
