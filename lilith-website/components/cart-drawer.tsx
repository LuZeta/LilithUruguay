"use client"

import Image from "next/image"
import { useEffect, useState, type ChangeEvent } from "react"
import { MessageCircle, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react"

import { useCart } from "@/components/cart-context"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"

const BANK_ACCOUNT_INFO = (process.env.NEXT_PUBLIC_BANK_ACCOUNT_INFO || "BROU · Caja de Ahorro $ · 000497984-00003").trim()
const CHECKOUT_FORM_ENDPOINT = "https://formsubmit.co/ajax/bienvenida.lilith@gmail.com"
const WHATSAPP_RAW = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+598 99 256 208").trim()
const WHATSAPP_NUMBER = WHATSAPP_RAW.replace(/\D/g, "") || "59899256208"
const WHATSAPP_MESSAGE = encodeURIComponent("Hola, necesito asistencia para finalizar mi compra en la Web Lilith...")
const WHATSAPP_ASSISTANCE_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`

type CheckoutFormState = {
  firstName: string
  lastName: string
  email: string
  phone: string
  locality: string
  agency: string
}

type CheckoutPaymentMethod = "mercado_pago" | "transferencia"

const INITIAL_CHECKOUT_FORM: CheckoutFormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  locality: "",
  agency: "",
}

function formatLabel(label: string) {
  if (!label) return ""
  return label[0].toUpperCase() + label.slice(1)
}

export function CartDrawer() {
  const { items, count, subtotal, updateQuantity, removeItem, keyFor, clear } = useCart()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showCheckoutForm, setShowCheckoutForm] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<CheckoutPaymentMethod>("mercado_pago")
  const [checkoutForm, setCheckoutForm] = useState<CheckoutFormState>({ ...INITIAL_CHECKOUT_FORM })
  const [assistanceRequested, setAssistanceRequested] = useState(false)

  const requiredFormFields: Array<[keyof CheckoutFormState, string]> = [
    ["firstName", "Nombre"],
    ["lastName", "Apellido"],
    ["email", "Correo electrónico"],
    ["phone", "Teléfono"],
    ["locality", "Localidad"],
    ["agency", "Agencia o dirección"],
  ]

  const handleInc = (k: string, q: number) => updateQuantity(k, q + 1)
  const handleDec = (k: string, q: number) => updateQuantity(k, q - 1)

  useEffect(() => {
    if (!items.length) {
      setShowCheckoutForm(false)
      setPaymentMethod("mercado_pago")
      setCheckoutForm({ ...INITIAL_CHECKOUT_FORM })
      setAssistanceRequested(false)
    }
  }, [items.length])

  const handleInputChange =
    (field: keyof CheckoutFormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value
      setCheckoutForm((prev) => ({ ...prev, [field]: value }))
    }

  const handleToggleCheckoutForm = () => {
    if (!items.length) {
      toast({ title: "Tu carrito está vacío" })
      return
    }
    setShowCheckoutForm((prev) => !prev)
  }

  const handleClearCart = () => {
    clear()
    setCheckoutForm({ ...INITIAL_CHECKOUT_FORM })
    setShowCheckoutForm(false)
    setPaymentMethod("mercado_pago")
    setAssistanceRequested(false)
  }

  const sendCheckoutEmail = async (selectedMethod: CheckoutPaymentMethod) => {
    const fallback = (value: string) => {
      const trimmed = value.trim()
      return trimmed || "No especificado"
    }

    const itemLines = items.map((item) => {
      const detailParts = [`Talle ${item.selectedSize}`, formatLabel(item.selectedColor)]
      if (item.selectedRise) {
        detailParts.push(`Tiro ${formatLabel(item.selectedRise)}`)
      }
      const variantLabel = detailParts.filter(Boolean).join(" · ")
      const priceLabel = `$${(item.price * item.quantity).toLocaleString("es-UY")}`
      return `${item.quantity}x ${item.name}${variantLabel ? ` (${variantLabel})` : ""} - ${priceLabel}`
    })

    const payload: Record<string, string> = {
      metodo_de_pago: selectedMethod === "mercado_pago" ? "Mercado Pago" : "Transferencia bancaria",
      nombre: fallback(checkoutForm.firstName),
      apellido: fallback(checkoutForm.lastName),
      correo: fallback(checkoutForm.email),
      telefono: fallback(checkoutForm.phone),
      localidad: fallback(checkoutForm.locality),
      retiro: fallback(checkoutForm.agency),
      asistencia: assistanceRequested ? "Sí (WhatsApp)" : "No",
      subtotal: `$${subtotal.toLocaleString("es-UY")}`,
    }

    if (itemLines.length) {
      payload.detalle_carrito = itemLines.join("\n")
    }

    const response = await fetch(CHECKOUT_FORM_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error("No se pudo enviar los datos del formulario de compra.")
    }
  }

  const isCheckoutFormComplete = () => {
    const missingField = requiredFormFields.find(([field]) => !checkoutForm[field].trim())
    if (missingField) return false
    if (!checkoutForm.email.includes("@")) return false
    return true
  }

  const validateCheckoutForm = () => {
    const missingField = requiredFormFields.find(([field]) => !checkoutForm[field].trim())
    if (missingField) {
      toast({
        title: "Completá el formulario",
        description: `Necesitamos "${missingField[1]}" para continuar.`,
      })
      return false
    }

    if (!checkoutForm.email.includes("@")) {
      toast({
        title: "Email inválido",
        description: "Ingresá un correo electrónico válido para continuar.",
      })
      return false
    }

    return true
  }

  const handleMercadoPagoCheckout = async () => {
    if (!items.length) {
      toast({ title: "Tu carrito está vacío" })
      return
    }

    if (!validateCheckoutForm()) return

    setLoading(true)
    const sanitizedEmail = checkoutForm.email.trim()
    try {
      try {
        await sendCheckoutEmail("mercado_pago")
      } catch (error) {
        console.error("[Checkout] Error enviando formulario por email", error)
        toast({
          title: "No pudimos registrar tus datos",
          description: "Podés continuar con el pago, pero escribinos si necesitás confirmar tu pedido.",
        })
      }

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items,
          email: sanitizedEmail || undefined,
          customer: {
            firstName: checkoutForm.firstName.trim(),
            lastName: checkoutForm.lastName.trim(),
            phone: checkoutForm.phone.trim(),
            locality: checkoutForm.locality.trim(),
            agency: checkoutForm.agency.trim(),
            assistance: assistanceRequested,
          },
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.error || "No pudimos iniciar el pago con Mercado Pago")
      }

      if (!data?.init_point) {
        throw new Error("Mercado Pago no devolvió la URL de pago")
      }

      window.location.href = data.init_point as string
    } catch (error: any) {
      toast({
        title: "No pudimos iniciar el pago",
        description: error?.message || "Intentalo nuevamente o coordiná tu compra por WhatsApp.",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCopyBankInfo = async () => {
    if (!validateCheckoutForm()) return

    setLoading(true)
    try {
      try {
        await sendCheckoutEmail("transferencia")
      } catch (error) {
        console.error("[Checkout] Error enviando formulario para transferencia", error)
        toast({
          title: "No pudimos registrar tus datos",
          description: "Podés continuar con la transferencia; si tenés dudas escribinos por correo.",
        })
      }

      try {
        await navigator.clipboard.writeText(BANK_ACCOUNT_INFO)
        toast({
          title: "Datos copiados",
          description: "Pegalos en tu banco o compartilos para completar la transferencia.",
        })
      } catch {
        toast({
          title: "Datos de la cuenta",
          description: BANK_ACCOUNT_INFO,
        })
      }
    } finally {
      setLoading(false)
    }
  }

  const itemsLabel =
    count === 0 ? "Agregá productos para continuar." : `Tenés ${count} producto${count === 1 ? "" : "s"} listo${count === 1 ? "" : "s"} para el pedido.`

  const isFormComplete = isCheckoutFormComplete()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {count > 0 && (
            <span className="absolute -top-2 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-xs text-primary-foreground">
              {count}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full border-l-0 bg-gradient-to-b from-background to-muted/40 p-0 shadow-2xl sm:mr-6 sm:mt-6 sm:mb-6 sm:max-w-[440px] sm:rounded-3xl"
      >
        <div className="flex h-full flex-col">
          <SheetHeader className="border-b border-border/60 bg-background/95 px-6 pb-4 pt-6">
            <SheetTitle className="text-lg font-semibold">Tu carrito</SheetTitle>
            <p className="text-sm text-muted-foreground">{itemsLabel}</p>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-6 py-5">
            <div className="space-y-4">
              {items.length === 0 && (
                <div className="rounded-2xl border border-dashed border-border/60 bg-background/70 px-4 py-8 text-center">
                  <p className="text-sm text-muted-foreground">
                    No tenés productos en tu carrito todavía. Explorá la tienda y sumá tus favoritos.
                  </p>
                </div>
              )}

              {items.map((item) => {
                const k = keyFor(item)
                const detailParts = [`Talle ${item.selectedSize}`, formatLabel(item.selectedColor)]
                if (item.selectedRise) {
                  detailParts.push(`Tiro ${formatLabel(item.selectedRise)}`)
                }
                const variantLabel = detailParts.join(" · ")

                return (
                  <div
                    key={k}
                    className="rounded-2xl border border-border/70 bg-background/80 p-3 shadow-[0_8px_32px_rgba(15,23,42,0.08)]"
                  >
                    <div className="flex gap-3">
                      <div className="relative h-20 w-20 overflow-hidden rounded-xl bg-muted/40">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex flex-1 flex-col justify-between gap-2">
                        <div>
                          <div className="text-sm font-medium text-foreground">{item.name}</div>
                          <div className="text-xs text-muted-foreground">{variantLabel}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleDec(k, item.quantity)}>
                            <Minus className="h-3.5 w-3.5" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleInc(k, item.quantity)}>
                            <Plus className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <div className="text-sm font-semibold">
                          ${(item.price * item.quantity).toLocaleString("es-UY")}
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeItem(k)}>
                          <Trash2 className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}

              <div className="rounded-3xl border border-border/70 bg-background/95 px-5 py-6 shadow-[0_10px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:px-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-base font-semibold">${subtotal.toLocaleString("es-UY")}</span>
                </div>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <Button
                    variant="secondary"
                    className="flex-1"
                    onClick={handleClearCart}
                    disabled={items.length === 0 || loading}
                  >
                    Vaciar
                  </Button>
                  <Button className="flex-1" onClick={handleToggleCheckoutForm} disabled={items.length === 0}>
                    {showCheckoutForm ? "Ocultar formulario" : "Finalizar compra"}
                  </Button>
                </div>

                {showCheckoutForm && (
                  <div className="mt-6 space-y-6 rounded-3xl border border-border/60 bg-card px-5 py-6 shadow-[0_18px_45px_rgba(15,23,42,0.18)] sm:px-6">
                    <div className="space-y-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/75">
                        Formulario de compra
                      </p>
                      <Alert className="border-primary/30 bg-primary/10">
                        <AlertTitle>Importante</AlertTitle>
                        <AlertDescription>
                          <p>
                            Las compras realizadas antes del día 20 de cada mes se enviarán hasta el día 20 del mes siguiente.
                          </p>
                          <p>
                            En compras mayores a $3.500 el envío es gratuito. Para otros montos, el envío se abona al recibir el pedido.
                          </p>
                        </AlertDescription>
                      </Alert>
                    </div>

                    <div className="space-y-5">
                      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                        <div className="space-y-2">
                          <Label htmlFor="checkout-first-name">Nombre</Label>
                          <Input
                            id="checkout-first-name"
                            placeholder="Nombre"
                            value={checkoutForm.firstName}
                            onChange={handleInputChange("firstName")}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="checkout-last-name">Apellido</Label>
                          <Input
                            id="checkout-last-name"
                            placeholder="Apellido"
                            value={checkoutForm.lastName}
                            onChange={handleInputChange("lastName")}
                          />
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                        <div className="space-y-2">
                          <Label htmlFor="checkout-email">Correo electrónico</Label>
                          <Input
                            id="checkout-email"
                            type="email"
                            placeholder="tu@email.com"
                            value={checkoutForm.email}
                            onChange={handleInputChange("email")}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="checkout-phone">Teléfono</Label>
                          <Input
                            id="checkout-phone"
                            type="tel"
                            placeholder="+598 ..."
                            value={checkoutForm.phone}
                            onChange={handleInputChange("phone")}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="checkout-locality">Localidad (departamento y ciudad)</Label>
                        <Input
                          id="checkout-locality"
                          placeholder="Ej: Montevideo, Centro"
                          value={checkoutForm.locality}
                          onChange={handleInputChange("locality")}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="checkout-agency">
                          Agencia donde retirarás el pedido o dirección de la agencia seleccionada
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Todos los pedidos se realizan por Correo Uruguayo. Indicá la sucursal o la dirección exacta donde querés retirarlo.
                        </p>
                        <Textarea
                          id="checkout-agency"
                          placeholder="Ej: Correo Uruguayo - Sucursal Centro, Colonia 1234"
                          value={checkoutForm.agency}
                          onChange={handleInputChange("agency")}
                          rows={3}
                        />
                      </div>

                      <div className="space-y-3">
                        <Label>Método de pago</Label>
                        <RadioGroup
                          value={paymentMethod}
                          onValueChange={(value) => setPaymentMethod(value as CheckoutPaymentMethod)}
                          className="grid w-full gap-3"
                        >
                          <div className="flex w-full items-start gap-3 rounded-2xl border border-border/60 bg-background/90 px-4 py-3">
                            <RadioGroupItem id="payment-mercadopago" value="mercado_pago" className="mt-1" />
                            <div className="space-y-1">
                              <Label htmlFor="payment-mercadopago" className="font-medium leading-none">
                                Pagar con Mercado Pago
                              </Label>
                              <p className="text-xs text-muted-foreground">
                                Te derivamos a Mercado Pago para completar el pago de forma segura en línea.
                              </p>
                            </div>
                          </div>

                          <div className="flex w-full items-start gap-3 rounded-2xl border border-border/60 bg-background/90 px-4 py-3">
                            <RadioGroupItem id="payment-transfer" value="transferencia" className="mt-1" />
                            <div className="space-y-1">
                              <Label htmlFor="payment-transfer" className="font-medium leading-none">
                                Pagar por transferencia bancaria
                              </Label>
                              <p className="text-xs text-muted-foreground">
                                Si preferís transferencia, copiá los datos de la cuenta y enviá el comprobante.
                              </p>
                              {paymentMethod === "transferencia" && (
                                <div className="mt-3 rounded-xl border border-dashed border-primary/40 bg-primary/5 px-3 py-3">
                                  {isFormComplete ? (
                                    <Button
                                      type="button"
                                      variant="secondary"
                                      size="sm"
                                      className="w-full justify-center rounded-lg text-xs font-semibold"
                                      disabled={loading}
                                      onClick={(event) => {
                                        event.preventDefault()
                                        event.stopPropagation()
                                        handleCopyBankInfo()
                                      }}
                                    >
                                      Copiar datos de la cuenta
                                    </Button>
                                  ) : (
                                    <p className="text-center text-xs font-medium text-primary/70">
                                      Completá el formulario para habilitar los datos de la cuenta.
                                    </p>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Button
                          className="flex-1"
                          onClick={handleMercadoPagoCheckout}
                          disabled={paymentMethod !== "mercado_pago" || loading}
                        >
                          {loading ? "Conectando..." : "Pagar con Mercado Pago"}
                        </Button>
                        <Button
                          type="button"
                          variant="secondary"
                          className="flex-1"
                          onClick={handleCopyBankInfo}
                          disabled={paymentMethod !== "transferencia" || loading || !isFormComplete}
                        >
                          Copiar datos de la cuenta
                        </Button>
                      </div>

                      <p className="text-center text-xs text-muted-foreground">
                        ¿Necesitás asistencia?
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        className="flex w-full items-center justify-center gap-2 rounded-2xl border-primary/40 bg-primary/5 py-4 text-sm font-medium transition hover:bg-primary/10"
                        onClick={() => {
                          setAssistanceRequested(true)
                          window.open(WHATSAPP_ASSISTANCE_URL, "_blank", "noopener,noreferrer")
                        }}
                      >
                        <MessageCircle className="h-4 w-4" />
                        Enviar mensaje por WhatsApp
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
