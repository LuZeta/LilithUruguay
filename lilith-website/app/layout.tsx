import type React from "react"
import type { Metadata } from "next"
import { Marcellus, Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { CartProvider } from "@/components/cart-context"
import { Toaster } from "@/components/ui/toaster"

const marcellus = Marcellus({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-marcellus",
  weight: "400",
})

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "Lilith - Bombachas Saludables y Reutilizables",
  description:
    "Bombachas absorbentes creadas para acompañar las necesidades más íntimas de las mujeres con respeto y amor.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans ${poppins.variable} ${marcellus.variable} antialiased scroll-smooth`}>
        <CartProvider>
          <Suspense fallback={null}>{children}</Suspense>
          <Toaster />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
