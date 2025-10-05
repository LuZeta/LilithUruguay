"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { publicPath } from "@/lib/publicPath"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"

type Talle =
  | "38"
  | "40"
  | "42"
  | "44"
  | "46"
  | "48"
  | "50"
  | "52"
  | "54"
  | "56"

const TALLES: Talle[] = ["38", "40", "42", "44", "46", "48", "50", "52", "54", "56"]

type BuyPayload = {
  productId: "clasica" | "tiro-alto" | "pack-x2"
  color?: "natural" | "negro"
  tiro?: "alto" | "bajo"
  talle: Talle
}

const PRICE_UNIT = 2140
const PRICE_PACK = 4280
const PHONE_NUMBER = "+598 99 256 208"
const PHONE_NUMBER_NBSP = "+598\u00a099\u00a0256\u00a0208"
const MATERIAL_NOTE = "Algodón orgánico, cáñamo y bambú. Hasta 300 lavados."

// TODO: Integrar redirección a Mercado Pago según producto/variante
function handleBuy(payload: BuyPayload) {
  // Placeholder: acá integrar URL de MP por variante
  // Por ahora, mostramos confirmación y pasos de envío
  toast({
    title: "¡Gracias! Redirigiremos a Mercado Pago",
    description: `Finalizado el pago, coordiná el envío personalizado al ${PHONE_NUMBER_NBSP}.`,
  })
  // console.log("handleBuy", payload)
}

export function Store() {
  return (
    <section id="store" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">Tienda</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            ¡Felicitaciones! Estás a punto de decirle adiós a las compresas y protectores descartables. La primera
            tienda de ropa íntima absorbente hecha a tu medida y por preventa. Compra hasta el 20 de cada mes y recibe
            tu pedido a más tardar el 20 del mes siguiente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          <CardClasica />
          <CardTiroAlto />
          <CardPack />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-16">
          {/* Izquierda: Guía de Compra (Q&A) en Card */}
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Guía de Compra</CardTitle>
            </CardHeader>
            <CardContent>
              <FAQ />
            </CardContent>
          </Card>

          {/* Derecha: Guía de talles en Card */}
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Guía de talles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Image
                  src={publicPath("/images/GuiaTalles.png")}
                  alt="Guía de talles Lilith"
                  width={1200}
                  height={800}
                  className="w-full h-auto rounded-md"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <p className="mt-4 text-sm text-muted-foreground text-center">
                Si te encuentras entre dos tallas, elige la más grande.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

function CardClasica() {
  const [color, setColor] = useState<"natural" | "negro" | "">("")
  const [talle, setTalle] = useState<Talle | "">("")

  const image = useMemo(() => {
    if (color === "natural") return publicPath("/images/tienda/TIROBAJOBLANCA.png")
    if (color === "negro") return publicPath("/images/tienda/TIROBAJONEGRA.png")
    return publicPath("/images/tienda/TIROBAJOBLANCA.png")
  }, [color])

  const canBuy = Boolean(color && talle)

  return (
    <Card className="group hover:shadow-lg transition-shadow border-accent/20">
      <CardHeader className="p-0">
        <div className="aspect-square relative overflow-hidden rounded-t-lg bg-muted/20">
          <Image src={image} alt="Lilith Clásica" fill className="object-cover" />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle className="text-xl mb-2 text-foreground">Lilith Clásica</CardTitle>
        <div className="mb-4">
          <span className="text-2xl font-bold text-primary">${PRICE_UNIT.toLocaleString("es-UY")}</span>
          <p className="text-sm text-muted-foreground">{MATERIAL_NOTE}</p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Color</label>
            <Select value={color} onValueChange={(v) => setColor(v as "natural" | "negro")}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar color" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="natural">Natural</SelectItem>
                <SelectItem value="negro">Negro</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Talle</label>
            <Select value={talle} onValueChange={(v) => setTalle(v as Talle)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar talle" />
              </SelectTrigger>
              <SelectContent>
                {TALLES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="mt-2 text-xs text-muted-foreground">
              Moldería propia, real e inclusiva. Puedes elegir tu mejor talle con nuestra guía.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button
          className="w-full"
          disabled={!canBuy}
          onClick={() => handleBuy({ productId: "clasica", color: color as "natural" | "negro", talle: talle as Talle })}
        >
          Comprar
        </Button>
      </CardFooter>
    </Card>
  )
}

function CardTiroAlto() {
  const [color, setColor] = useState<"natural" | "negro" | "">("")
  const [talle, setTalle] = useState<Talle | "">("")

  const image = useMemo(() => {
    if (color === "natural") return publicPath("/images/tienda/TIROALTOBLANCA.png")
    if (color === "negro") return publicPath("/images/tienda/TIROALTONEGRA.png")
    return publicPath("/images/tienda/TIROALTOBLANCA.png")
  }, [color])

  const canBuy = Boolean(color && talle)

  return (
    <Card className="group hover:shadow-lg transition-shadow border-accent/20">
      <CardHeader className="p-0">
        <div className="aspect-square relative overflow-hidden rounded-t-lg bg-muted/20">
          <Image src={image} alt="Lilith Tiro Alto" fill className="object-cover" />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle className="text-xl mb-2 text-foreground">Lilith Tiro Alto</CardTitle>
        <div className="mb-4">
          <span className="text-2xl font-bold text-primary">${PRICE_UNIT.toLocaleString("es-UY")}</span>
          <p className="text-sm text-muted-foreground">{MATERIAL_NOTE}</p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Color</label>
            <Select value={color} onValueChange={(v) => setColor(v as "natural" | "negro")}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar color" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="natural">Natural</SelectItem>
                <SelectItem value="negro">Negro</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Talle</label>
            <Select value={talle} onValueChange={(v) => setTalle(v as Talle)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar talle" />
              </SelectTrigger>
              <SelectContent>
                {TALLES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="mt-2 text-xs text-muted-foreground">
              Moldería propia, real e inclusiva. Puedes elegir tu mejor talle con nuestra guía.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button
          className="w-full"
          disabled={!canBuy}
          onClick={() => handleBuy({ productId: "tiro-alto", color: color as "natural" | "negro", talle: talle as Talle })}
        >
          Comprar
        </Button>
      </CardFooter>
    </Card>
  )
}

function CardPack() {
  const [tiro, setTiro] = useState<"alto" | "bajo" | "">("")
  const [color, setColor] = useState<"natural" | "negro" | "">("")
  const [talle, setTalle] = useState<Talle | "">("")

  const image = useMemo(() => {
    if (tiro === "bajo") return publicPath("/images/tienda/PACKTIROBAJO.png")
    // default alto
    return publicPath("/images/tienda/PACKTIROALTO.png")
  }, [tiro])

  const canBuy = Boolean(tiro && color && talle)

  return (
    <Card className="group hover:shadow-lg transition-shadow border-accent/20">
      <CardHeader className="p-0">
        <div className="aspect-square relative overflow-hidden rounded-t-lg bg-muted/20">
          <Image src={image} alt="Pack x2 Lilith" fill className="object-cover" />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle className="text-xl mb-2 text-foreground">Pack x2 Lilith</CardTitle>
        <div className="mb-4">
          <span className="text-2xl font-bold text-primary">${PRICE_PACK.toLocaleString("es-UY")}</span>
          <p className="text-sm text-muted-foreground">{MATERIAL_NOTE}</p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Tiro</label>
            <Select value={tiro} onValueChange={(v) => setTiro(v as "alto" | "bajo")}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar tiro" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="alto">Alto</SelectItem>
                <SelectItem value="bajo">Bajo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Color</label>
            <Select value={color} onValueChange={(v) => setColor(v as "natural" | "negro")}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar color" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="natural">Natural</SelectItem>
                <SelectItem value="negro">Negro</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Talle</label>
            <Select value={talle} onValueChange={(v) => setTalle(v as Talle)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar talle" />
              </SelectTrigger>
              <SelectContent>
                {TALLES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="mt-2 text-xs text-muted-foreground">
              Moldería propia, real e inclusiva. Puedes elegir tu mejor talle con nuestra guía.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button
          className="w-full"
          disabled={!canBuy}
          onClick={() =>
            handleBuy({ productId: "pack-x2", tiro: tiro as "alto" | "bajo", color: color as "natural" | "negro", talle: talle as Talle })
          }
        >
          Comprar
        </Button>
      </CardFooter>
    </Card>
  )
}

function FAQ() {
  return (
    <div className="space-y-6">
        <div>
          <p className="font-medium text-foreground">¿Cómo comprar?</p>
          <p className="text-muted-foreground">
            Elegí modelo, color y talle. Al hacer clic en Comprar se abre Mercado Pago. Finalizado el pago, coordiná el
            envío personalizado al {" "}
            <span className="whitespace-nowrap">{PHONE_NUMBER}</span>.
          </p>
        </div>
        <div>
          <p className="font-medium text-foreground">¿Hacen envíos a todo el país?</p>
          <p className="text-muted-foreground">Sí, por Correo Uruguayo.</p>
        </div>
        <div>
          <p className="font-medium text-foreground">¿Cómo elijo mi talle?</p>
          <p className="text-muted-foreground">
            Usá la tabla de talles. Si tus medidas están entre dos talles, elegí el siguiente talle.
          </p>
        </div>
        <div>
          <p className="font-medium text-foreground">¿Cuánto tarda mi pedido?</p>
          <p className="text-muted-foreground">
            Confección artesanal y nacional. Pedidos hasta el 20 de cada mes y la entrega es hasta el 20 del mes
            siguiente.
          </p>
        </div>
      </div>
  )
}
