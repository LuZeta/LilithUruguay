"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react"
import { useCart } from "@/components/cart-context"
import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"

const WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+598 99 256 208").trim()

function formatWhatsappNumber(raw: string) {
  return raw.replace(/[^0-9]/g, "")
}

export function CartDrawer() {
  const { items, count, subtotal, updateQuantity, removeItem, keyFor, clear } = useCart()
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const whatsappNumber = useMemo(() => formatWhatsappNumber(WHATSAPP_NUMBER), [])

  const handleInc = (k: string, q: number) => updateQuantity(k, q + 1)
  const handleDec = (k: string, q: number) => updateQuantity(k, q - 1)

  const handleCheckout = () => {
    if (!items.length) {
      toast({ title: "Tu carrito está vacío" })
      return
    }

    setLoading(true)
    try {
      const summary = items
        .map(
          (it) =>
            `• ${it.quantity}× ${it.name} (${it.selectedSize} · ${it.selectedColor}) - $${(
              it.price * it.quantity
            ).toLocaleString("es-UY")}`
        )
        .join("\n")

      const totalLine = `Total estimado: $${subtotal.toLocaleString("es-UY")}`
      const emailLine = email ? `\nEmail: ${email}` : ""
      const message = `Hola Lilith! Quiero finalizar mi compra:\n\n${summary}\n${totalLine}${emailLine}`

      if (!whatsappNumber) {
        throw new Error("No se configuró un número de contacto")
      }

      const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
      window.open(url, "_blank", "noopener")
      toast({
        title: "¡Listo!",
        description: "Abrimos WhatsApp para coordinar tu compra.",
      })
      clear()
      setOpen(false)
    } catch (error: any) {
      toast({
        title: "No pudimos iniciar el contacto",
        description: error?.message || String(error),
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {count > 0 && (
            <span className="absolute -top-2 -right-2 h-4 min-w-4 px-1 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
              {count}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[360px] sm:w-[420px]">
        <SheetHeader>
          <SheetTitle>Tu Carrito</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {items.length === 0 && (
            <p className="text-sm text-muted-foreground">Tu carrito está vacío.</p>
          )}

          {items.map((item) => {
            const k = keyFor(item)
            return (
              <div key={k} className="flex gap-3 items-center">
                <div className="relative h-16 w-16 rounded-md overflow-hidden bg-muted/30">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground">{item.name}</div>
                  <div className="text-xs text-muted-foreground">
                    Talle {item.selectedSize} · {item.selectedColor}
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => handleDec(k, item.quantity)}>
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-sm w-6 text-center">{item.quantity}</span>
                    <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => handleInc(k, item.quantity)}>
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">${(item.price * item.quantity).toLocaleString()}</div>
                  <Button variant="ghost" size="icon" onClick={() => removeItem(k)}>
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-6 border-t pt-4 space-y-3">
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Email (opcional):</label>
            <Input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-semibold">${subtotal.toLocaleString()}</span>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" className="flex-1" onClick={clear} disabled={items.length === 0}>
              Vaciar
            </Button>
            <Button className="flex-1" disabled={items.length === 0 || loading} onClick={handleCheckout}>
              {loading ? "Redirigiendo..." : "Finalizar Compra"}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
