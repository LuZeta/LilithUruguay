import { NextResponse } from "next/server"
import { MercadoPagoConfig, Preference } from "mercadopago"
import { getProductById } from "@/lib/products"

const MERCADO_PAGO_ACCESS_TOKEN =
  process.env.MP_ACCESS_TOKEN || process.env.MERCADO_PAGO_ACCESS_TOKEN
const MERCADO_PAGO_NOTIFICATION_URL = process.env.MERCADO_PAGO_NOTIFICATION_URL
const MERCADO_PAGO_NOTIFICATION_EMAIL =
  process.env.MERCADO_PAGO_NOTIFICATION_EMAIL || "bienvenida.lilith@gmail.com"

type CheckoutItemPayload = {
  id: number
  quantity: number
  selectedSize?: string
  selectedColor?: string
  selectedRise?: string
}

type CheckoutRequest = {
  items: CheckoutItemPayload[]
  email?: string
}

type PreferenceItem = {
  id: string
  title: string
  quantity: number
  unit_price: number
  description?: string
  currency_id: "UYU"
}

export async function POST(req: Request) {
  if (!MERCADO_PAGO_ACCESS_TOKEN) {
    return NextResponse.json(
      { error: "MP_ACCESS_TOKEN no está configurado" },
      { status: 500 }
    )
  }

  let payload: CheckoutRequest
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: "Formato de solicitud inválido" }, { status: 400 })
  }

  if (!payload?.items || !Array.isArray(payload.items) || payload.items.length === 0) {
    return NextResponse.json({ error: "No se recibieron ítems para procesar" }, { status: 400 })
  }

  const items = payload.items
    .map((item): PreferenceItem | null => {
      const product = getProductById(item.id)
      if (!product) return null

      const quantity = Number(item.quantity) || 0
      if (quantity <= 0) return null

      const details: string[] = []
      if (item.selectedSize) details.push(`Talle ${item.selectedSize}`)
      if (item.selectedColor) details.push(item.selectedColor)
      if (item.selectedRise) details.push(`Tiro ${item.selectedRise}`)

      return {
        id: String(product.id),
        title: product.name,
        quantity,
        unit_price: product.price,
        description: details.join(" · ") || undefined,
        currency_id: "UYU",
      }
    })
    .filter((item): item is PreferenceItem => Boolean(item))

  if (!items.length) {
    return NextResponse.json({ error: "No se pudieron validar los ítems enviados" }, { status: 400 })
  }

  const requestUrl = new URL(req.url)
  const baseUrlCandidate =
    process.env.MERCADO_PAGO_RETURN_BASE_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    req.headers.get("origin") ||
    `${requestUrl.protocol}//${requestUrl.host}`

  const baseUrl = toAbsoluteUrl(baseUrlCandidate)
  if (!baseUrl) {
    return NextResponse.json(
      {
        error:
          "No se pudo determinar una URL base para las redirecciones. Configura MERCADO_PAGO_RETURN_BASE_URL o NEXT_PUBLIC_SITE_URL con un URL absoluto (https://...).",
      },
      { status: 500 }
    )
  }

  const successUrl =
    toAbsoluteUrl(process.env.MERCADO_PAGO_SUCCESS_URL) || baseUrl
  const failureUrl =
    toAbsoluteUrl(process.env.MERCADO_PAGO_FAILURE_URL) || baseUrl
  const pendingUrl =
    toAbsoluteUrl(process.env.MERCADO_PAGO_PENDING_URL) || baseUrl

  if (!successUrl || !failureUrl || !pendingUrl) {
    return NextResponse.json(
      {
        error:
          "Las back_urls deben ser URLs absolutas. Revisa MERCADO_PAGO_SUCCESS_URL / FAILURE_URL / PENDING_URL o la URL base configurada.",
      },
      { status: 500 }
    )
  }

  const preferencePayload = {
    items,
    payer: payload.email ? { email: payload.email.trim() } : undefined,
    back_urls: {
      success: successUrl,
      failure: failureUrl,
      pending: pendingUrl,
    },
    metadata: {
      contact_email: MERCADO_PAGO_NOTIFICATION_EMAIL,
      cart_email: payload.email || null,
    },
    notification_url: MERCADO_PAGO_NOTIFICATION_URL,
  }

  if (successUrl.startsWith("https://")) {
    preferencePayload.auto_return = "approved"
  }

  try {
    const preferenceClient = new Preference(
      new MercadoPagoConfig({ accessToken: MERCADO_PAGO_ACCESS_TOKEN })
    )

    const preferenceResponse = await preferenceClient.create({
      body: preferencePayload,
    })

    const redirectUrl = preferenceResponse.init_point || preferenceResponse.sandbox_init_point
    if (!redirectUrl) {
      return NextResponse.json({ error: "No se recibió la URL de pago" }, { status: 500 })
    }

    return NextResponse.json({
      init_point: redirectUrl,
      preference_id: preferenceResponse.id,
    })
  } catch (error: any) {
    const sdkError = error?.cause ?? error
    const causeMessage =
      typeof sdkError?.message === "string"
        ? sdkError.message
        : typeof sdkError?.description === "string"
          ? sdkError.description
          : undefined

    console.error("[MercadoPago] Excepción creando preferencia", sdkError)

    return NextResponse.json(
      {
        error: causeMessage || sdkError?.message || "No se pudo crear la preferencia en Mercado Pago",
        cause: Array.isArray(sdkError?.cause)
          ? sdkError.cause.map((entry: any) => entry?.description || entry?.code || "").filter(Boolean).join(" | ")
          : sdkError?.error || null,
      },
      { status: 500 }
    )
  }
}

function toAbsoluteUrl(value: string | null | undefined) {
  if (!value) return null
  const trimmed = value.trim()
  if (!trimmed) return null
  try {
    return new URL(trimmed).toString()
  } catch {
    return null
  }
}
