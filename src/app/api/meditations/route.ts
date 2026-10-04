import { NextResponse } from "next/server";
import { getLatestMeditations } from "@/lib/meditations";

export async function GET() {
  const data = await getLatestMeditations();
  return NextResponse.json(data);
}
