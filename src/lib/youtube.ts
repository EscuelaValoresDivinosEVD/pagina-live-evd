import { siteConfig } from "@/lib/config";
import type { LiveStatus } from "@/lib/types";
import {
  EVD_YOUTUBE_CHANNEL_ID,
  extractPublicLiveCandidate,
  isValidVideoId,
} from "@/lib/youtube-live-parse";

/** Intervalo máximo entre consultas reales a YouTube. */
export const LIVE_STATUS_TTL_MS = 5 * 60 * 1000;

type CacheEntry = {
  status: LiveStatus;
  fetchedAt: number;
};

let cache: CacheEntry | null = null;
let refreshInFlight: Promise<LiveStatus> | null = null;

function getChannelId() {
  return (
    process.env.YOUTUBE_CHANNEL_ID?.trim() ||
    siteConfig.youtubeChannelId ||
    EVD_YOUTUBE_CHANNEL_ID
  );
}

function getApiKey() {
  // Lectura en runtime (Workers secrets no están disponibles al evaluar el módulo).
  return process.env.YOUTUBE_API_KEY?.trim() || siteConfig.youtubeApiKey || "";
}

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

type VerifiedVideo = {
  videoId: string;
  title: string;
  thumbnailUrl: string;
  channelId: string;
  isLive: boolean;
};

/**
 * Hard gate: videos.list (1 unidad) confirma channelId + liveBroadcastContent.
 * Nunca devolver un video de otro canal ni un VOD como “en vivo”.
 */
async function verifyVideoForChannel(
  videoId: string,
  expectedChannelId: string,
): Promise<VerifiedVideo | null> {
  if (!isValidVideoId(videoId)) return null;

  const key = getApiKey();
  if (!key) {
    // Sin API: solo aceptar si el scrape ya ató el channelId al expected.
    return null;
  }

  const url = new URL("https://www.googleapis.com/youtube/v3/videos");
  url.searchParams.set("part", "snippet,liveStreamingDetails");
  url.searchParams.set("id", videoId);
  url.searchParams.set("key", key);

  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) return null;

  const data = (await res.json()) as {
    items?: Array<{
      id?: string;
      snippet?: {
        channelId?: string;
        title?: string;
        liveBroadcastContent?: string;
        thumbnails?: { high?: { url?: string }; medium?: { url?: string } };
      };
      liveStreamingDetails?: {
        actualStartTime?: string;
        actualEndTime?: string;
        concurrentViewers?: string;
      };
    }>;
  };

  const item = data.items?.[0];
  if (!item?.snippet?.channelId) return null;

  if (item.snippet.channelId !== expectedChannelId) {
    return null;
  }

  const broadcast = item.snippet.liveBroadcastContent;
  const details = item.liveStreamingDetails;
  const isLive =
    broadcast === "live" ||
    (!!details?.actualStartTime && !details?.actualEndTime);

  return {
    videoId: item.id && isValidVideoId(item.id) ? item.id : videoId,
    title: item.snippet.title ?? "Transmisión en vivo",
    thumbnailUrl:
      item.snippet.thumbnails?.high?.url ??
      item.snippet.thumbnails?.medium?.url ??
      `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    channelId: item.snippet.channelId,
    isLive,
  };
}

/**
 * Fallback barato (sin search.list): scrape de /live + validación estricta.
 * search.list cuesta 100 unidades/día y hoy está agotando la cuota (429).
 */
async function checkViaPublicLive(channelId: string): Promise<LiveStatus> {
  const res = await fetch(
    `https://www.youtube.com/channel/${channelId}/live`,
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; EVDLiveBot/1.0; +https://live.evdsky.com)",
        "Accept-Language": "es-ES,es;q=0.9",
      },
      cache: "no-store",
      redirect: "follow",
    },
  );

  const html = await res.text();
  const candidate = extractPublicLiveCandidate(html, res.url, channelId);

  if (!candidate) {
    return offlineStatus(
      "public-live",
      "No hay transmisión en vivo en este momento.",
    );
  }

  // Si el HTML ya trae channelId ajeno, rechazar sin gastar cuota.
  if (
    candidate.channelIdFromPage &&
    candidate.channelIdFromPage !== channelId
  ) {
    return offlineStatus(
      "public-live",
      "No hay transmisión en vivo en este momento.",
    );
  }

  const verified = await verifyVideoForChannel(candidate.videoId, channelId);
  if (verified) {
    if (!verified.isLive) {
      return offlineStatus(
        "youtube-api",
        "No hay transmisión en vivo en este momento.",
      );
    }
    return {
      isLive: true,
      videoId: verified.videoId,
      title: verified.title,
      thumbnailUrl: verified.thumbnailUrl,
      checkedAt: new Date().toISOString(),
      source: "youtube-api",
      message: "El canal está en vivo ahora.",
    };
  }

  // Sin API key / verify falló: solo aceptar si el player del canal señala live
  // y el channelId de página coincide (o el redirect fue a /watch del canal).
  if (
    getApiKey() === "" &&
    candidate.pageSignalsLive &&
    (!candidate.channelIdFromPage ||
      candidate.channelIdFromPage === channelId)
  ) {
    return {
      isLive: true,
      videoId: candidate.videoId,
      title: candidate.title ?? "Transmisión en vivo",
      thumbnailUrl: `https://i.ytimg.com/vi/${candidate.videoId}/hqdefault.jpg`,
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

/**
 * search.list es caro (100 u). Solo como último recurso si scrape no dio candidato
 * y aún hay cuota. El resultado SE VERIFICA con videos.list + channelId.
 */
async function checkViaYoutubeSearch(
  channelId: string,
): Promise<LiveStatus | null> {
  const key = getApiKey();
  if (!key) return null;

  const url = new URL("https://www.googleapis.com/youtube/v3/search");
  url.searchParams.set("part", "snippet");
  url.searchParams.set("channelId", channelId);
  url.searchParams.set("eventType", "live");
  url.searchParams.set("type", "video");
  url.searchParams.set("maxResults", "1");
  url.searchParams.set("key", key);

  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) return null;

  const data = (await res.json()) as {
    items?: Array<{
      id?: { videoId?: string };
      snippet?: {
        channelId?: string;
        title?: string;
      };
    }>;
  };

  const item = data.items?.[0];
  const videoId = item?.id?.videoId;
  if (!isValidVideoId(videoId)) {
    return offlineStatus(
      "youtube-api",
      "El canal no está en vivo en este momento.",
    );
  }

  // Defensa en profundidad: search a veces es inconsistente; videos.list manda.
  if (item?.snippet?.channelId && item.snippet.channelId !== channelId) {
    return offlineStatus(
      "youtube-api",
      "El canal no está en vivo en este momento.",
    );
  }

  const verified = await verifyVideoForChannel(videoId, channelId);
  if (!verified?.isLive) {
    return offlineStatus(
      "youtube-api",
      "El canal no está en vivo en este momento.",
    );
  }

  return {
    isLive: true,
    videoId: verified.videoId,
    title: verified.title,
    thumbnailUrl: verified.thumbnailUrl,
    checkedAt: new Date().toISOString(),
    source: "youtube-api",
    message: "El canal está en vivo ahora.",
  };
}

async function fetchLiveStatusFromUpstream(): Promise<LiveStatus> {
  const channelId = getChannelId();

  // Guardrail absoluto: nunca operar sobre otro canal.
  if (channelId !== EVD_YOUTUBE_CHANNEL_ID) {
    return offlineStatus(
      "mock",
      "Canal de YouTube no autorizado para este sitio.",
    );
  }

  try {
    // 1) Scrape estricto + videos.list (barato, evita search.list).
    const publicResult = await checkViaPublicLive(channelId);
    if (publicResult.isLive) return publicResult;

    // 2) search.list solo si scrape no vio candidato live (y hay cuota).
    const searchResult = await checkViaYoutubeSearch(channelId);
    if (searchResult) return searchResult;

    return publicResult;
  } catch {
    return offlineStatus(
      "mock",
      "No se pudo comprobar el estado del live. Intenta de nuevo en unos minutos.",
    );
  }
}

function isFresh(entry: CacheEntry, now = Date.now()) {
  return now - entry.fetchedAt < LIVE_STATUS_TTL_MS;
}

async function refreshLiveStatus(): Promise<LiveStatus> {
  if (refreshInFlight) return refreshInFlight;

  refreshInFlight = (async () => {
    const status = await fetchLiveStatusFromUpstream();
    // Nunca cachear un “live” sin videoId válido del canal.
    if (
      status.isLive &&
      (!status.videoId || !isValidVideoId(status.videoId))
    ) {
      const safe = offlineStatus(
        status.source,
        "No hay transmisión en vivo en este momento.",
      );
      cache = { status: safe, fetchedAt: Date.now() };
      return safe;
    }
    cache = { status, fetchedAt: Date.now() };
    return status;
  })().finally(() => {
    refreshInFlight = null;
  });

  return refreshInFlight;
}

/**
 * Siempre responde con el valor cacheado.
 * - Fresco (< 5 min): sin tocar YouTube.
 * - Vencido: valor anterior + refresh en background.
 * - Arranque en frío: espera la primera consulta.
 */
export async function getLiveStatus(): Promise<LiveStatus> {
  if (cache) {
    if (!isFresh(cache)) {
      void refreshLiveStatus();
    }
    return cache.status;
  }

  return refreshLiveStatus();
}

/** Solo para tests / diagnóstico. */
export function getLiveStatusCacheMeta() {
  return cache
    ? {
        fetchedAt: cache.fetchedAt,
        ageMs: Date.now() - cache.fetchedAt,
        isFresh: isFresh(cache),
        status: cache.status,
      }
    : null;
}

/** Tests: permite limpiar el caché en memoria. */
export function __resetLiveStatusCacheForTests() {
  cache = null;
  refreshInFlight = null;
}
