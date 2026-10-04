import { siteConfig } from "@/lib/config";
import type { LiveStatus } from "@/lib/types";

function offlineStatus(
  source: LiveStatus["source"],
  message: string,
): LiveStatus {
  return {
    isLive: false,
    videoId: null,
    title: null,
    thumbnailUrl: "/channel-avatar.jpg",
    checkedAt: new Date().toISOString(),
    source,
    message,
  };
}

async function checkViaYoutubeApi(channelId: string): Promise<LiveStatus | null> {
  const key = siteConfig.youtubeApiKey;
  if (!key) return null;

  const url = new URL("https://www.googleapis.com/youtube/v3/search");
  url.searchParams.set("part", "snippet");
  url.searchParams.set("channelId", channelId);
  url.searchParams.set("eventType", "live");
  url.searchParams.set("type", "video");
  url.searchParams.set("maxResults", "1");
  url.searchParams.set("key", key);

  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) return null;

  const data = (await res.json()) as {
    items?: Array<{
      id?: { videoId?: string };
      snippet?: {
        title?: string;
        thumbnails?: { high?: { url?: string }; medium?: { url?: string } };
      };
    }>;
  };

  const item = data.items?.[0];
  if (!item?.id?.videoId) {
    return offlineStatus(
      "youtube-api",
      "El canal no está en vivo en este momento.",
    );
  }

  return {
    isLive: true,
    videoId: item.id.videoId,
    title: item.snippet?.title ?? "Transmisión en vivo",
    thumbnailUrl:
      item.snippet?.thumbnails?.high?.url ??
      item.snippet?.thumbnails?.medium?.url ??
      `https://i.ytimg.com/vi/${item.id.videoId}/hqdefault.jpg`,
    checkedAt: new Date().toISOString(),
    source: "youtube-api",
    message: "El canal está en vivo ahora.",
  };
}

async function checkViaPublicLive(channelId: string): Promise<LiveStatus> {
  const res = await fetch(
    `https://www.youtube.com/channel/${channelId}/live`,
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; EVDLiveBot/1.0; +https://live.evdsky.com)",
        "Accept-Language": "es-ES,es;q=0.9",
      },
      next: { revalidate: 60 },
      redirect: "follow",
    },
  );

  const html = await res.text();
  const finalUrl = res.url;

  const watchMatch = finalUrl.match(/[?&]v=([\w-]{11})/);
  const videoIdFromUrl = watchMatch?.[1] ?? null;

  const isLiveNow =
    /"isLiveNow"\s*:\s*true/.test(html) ||
    /"isLive"\s*:\s*true/.test(html) ||
    /"liveBroadcastContent"\s*:\s*"live"/.test(html);

  const videoIdMatch =
    html.match(/"videoId"\s*:\s*"([\w-]{11})"/)?.[1] ?? videoIdFromUrl;

  const titleMatch =
    html.match(/"title"\s*:\s*"([^"]+)"/)?.[1] ??
    html.match(/<title>([^<]+)<\/title>/)?.[1]?.replace(" - YouTube", "");

  if (isLiveNow && videoIdMatch) {
    return {
      isLive: true,
      videoId: videoIdMatch,
      title: titleMatch ? decodeHtml(titleMatch) : "Transmisión en vivo",
      thumbnailUrl: `https://i.ytimg.com/vi/${videoIdMatch}/hqdefault.jpg`,
      checkedAt: new Date().toISOString(),
      source: "public-live",
      message: "El canal está en vivo ahora.",
    };
  }

  return offlineStatus(
    "public-live",
    "No hay transmisión en vivo en este momento.",
  );
}

function decodeHtml(value: string) {
  return value
    .replace(/\\u0026/g, "&")
    .replace(/&amp;/g, "&")
    .replace(/\\"/g, '"');
}

export async function getLiveStatus(): Promise<LiveStatus> {
  const channelId = siteConfig.youtubeChannelId;

  try {
    const apiResult = await checkViaYoutubeApi(channelId);
    if (apiResult) return apiResult;
    return await checkViaPublicLive(channelId);
  } catch {
    return offlineStatus(
      "mock",
      "No se pudo comprobar el estado del live. Intenta de nuevo en unos minutos.",
    );
  }
}
