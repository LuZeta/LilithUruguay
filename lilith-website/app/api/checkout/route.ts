import { NextResponse } from "next/server"

type BodyItem = {
  title: string
  unit_price: number
  quantity: number
  currency_id?: string
}

export async function POST(req: Request) {
  try {
    const accessToken = process.env.MP_ACCESS_TOKEN
    if (!accessToken) {
      return NextResponse.json(
        { error: "Falta configurar MP_ACCESS_TOKEN en el entorno" },
        { status: 500 },
      )
    }

    const { items, payer } = (await req.json()) as {
      items: BodyItem[]
      payer?: { email?: string }
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Items inválidos" }, { status: 400 })
    }

    // Derive origin for back URLs
    const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

    const preferenceBody = {
      items: items.map((i) => ({
        title: i.title,
        unit_price: Number(i.unit_price),
        quantity: Number(i.quantity),
        currency_id: i.currency_id || "UYU",
      })),
      payer: payer?.email ? { email: payer.email } : undefined,
      back_urls: {
        success: `${origin}/?status=success`,
        failure: `${origin}/?status=failure`,
        pending: `${origin}/?status=pending`,
      },
      auto_return: "approved" as const,
      metadata: { source: "lilith-website" },
    }

    const resp = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(preferenceBody),
    })

    if (!resp.ok) {
      const err = await safeJson(resp)
      return NextResponse.json({ error: "Mercado Pago error", details: err }, { status: 502 })
    }

    const data = await resp.json()
    // init_point (prod) or sandbox_init_point (sandbox)
    const redirectUrl = data.init_point || data.sandbox_init_point
    return NextResponse.json({ url: redirectUrl })
  } catch (e) {
    return NextResponse.json({ error: "Server error", details: `${e}` }, { status: 500 })
  }
}

async function safeJson(resp: Response) {
  try {
    return await resp.json()
  } catch {
    return await resp.text()
  }
}
