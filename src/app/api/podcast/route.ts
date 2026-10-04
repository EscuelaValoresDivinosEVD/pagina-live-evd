import { NextResponse } from "next/server";
import { getLatestEpisodes } from "@/lib/podcast";

export async function GET() {
  const data = await getLatestEpisodes(4);
  return NextResponse.json(data);
}
