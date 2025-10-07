import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { CartProvider } from "@/components/cart-context"
import { Toaster } from "@/components/ui/toaster"

const marcellus = localFont({
  src: [{ path: "../public/fonts/Marcellus-Regular.woff2", weight: "400", style: "normal" }],
  display: "swap",
  variable: "--font-marcellus",
})

const poppins = localFont({
  src: [
    { path: "../public/fonts/Poppins-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Poppins-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/Poppins-SemiBold.woff2", weight: "600", style: "normal" },
  ],
  display: "swap",
  variable: "--font-poppins",
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
