import { NextResponse } from "next/server";
import { getLiveStatus } from "@/lib/youtube";

export async function GET() {
  const status = await getLiveStatus();
  return NextResponse.json(status);
}
