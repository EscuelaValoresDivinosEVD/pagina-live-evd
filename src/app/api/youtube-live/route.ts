import { NextResponse } from "next/server";
import { getLiveStatus } from "@/lib/youtube";

export const dynamic = "force-dynamic";

export async function GET() {
  // Siempre el valor cacheado en memoria del servidor.
  // No cachear en CDN: hace falta que llegue al proceso Node para
  // disparar el refresco en background cuando el TTL (5 min) vence.
  const status = await getLiveStatus();

  return NextResponse.json(status, {
    headers: {
      "Cache-Control": "private, no-store",
    },
  });
}
