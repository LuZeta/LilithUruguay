"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import { publicPath } from "@/lib/publicPath"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { CartDrawer } from "@/components/cart-drawer"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navigation = [
    { name: "Tienda", href: "#store" },
    { name: "Preguntas frecuentes", href: "#preguntas-frecuentes" },
    { name: "Nosotras", href: "#nosotros" },
    { name: "Contacto", href: "#contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src={publicPath("/images/logobackground.png")}
                alt="Lilith"
                width={200}
                height={56}
                className="h-10 md:h-12 lg:h-14 w-auto drop-shadow-lg"
                priority
                sizes="(max-width: 768px) 160px, (max-width: 1024px) 192px, 224px"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-foreground hover:text-accent transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <CartDrawer />

            {/* Mobile menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[400px] bg-gradient-to-br from-background via-background to-muted/30"
              >
                <SheetHeader className="sr-only">
                  <SheetTitle>Menú de navegación</SheetTitle>
                  <SheetDescription>
                    Selecciona una sección para explorar en Lilith.
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  <div className="rounded-2xl border border-accent/10 bg-accent/5 px-4 py-3 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                      Explora Lilith
                    </p>
                    <p className="mt-2 text-sm text-foreground/80">
                      Encuentra respuestas, productos y contacto en un solo lugar.
                    </p>
                  </div>
                  <nav className="flex flex-col gap-2 px-1">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="group flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-foreground/90 transition hover:bg-accent/10 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                      >
                        <span className="flex h-2 w-2 items-center justify-center rounded-full bg-accent/50 transition group-hover:bg-accent" />
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
