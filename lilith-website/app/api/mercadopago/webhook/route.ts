export const runtime = "nodejs"
export const dynamic = "force-dynamic"

import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({ ok: true })
}

export async function POST(req: Request) {
  try {
    const payload = await req.json().catch(() => ({}))
    // TODO: validar firma si se configura, y procesar evento
    // console.log("MP webhook event:", payload)
    return NextResponse.json({ received: true })
  } catch {
    return new NextResponse("bad request", { status: 400 })
  }
}
