/** Canal oficial EVD — nunca embeber un video de otro channelId. */
export const EVD_YOUTUBE_CHANNEL_ID = "UCs6BtP_OoMkh18UjszWIuqg";

const VIDEO_ID_RE = /^[\w-]{11}$/;

export type PublicLiveCandidate = {
  videoId: string;
  title: string | null;
  /** channelId leído del HTML/player, si aparece */
  channelIdFromPage: string | null;
  /** Evidencia de live en el HTML del propio video (no de related) */
  pageSignalsLive: boolean;
  extraction: "redirect-url" | "player-response" | "canonical-watch";
};

function decodeHtml(value: string) {
  return value
    .replace(/\\u0026/g, "&")
    .replace(/&amp;/g, "&")
    .replace(/\\"/g, '"')
    .replace(/\\u003c/gi, "<")
    .replace(/\\u003e/gi, ">");
}

export function isValidVideoId(id: string | null | undefined): id is string {
  return typeof id === "string" && VIDEO_ID_RE.test(id);
}

export function extractVideoIdFromUrl(url: string): string | null {
  try {
    const u = new URL(url);
    const v = u.searchParams.get("v");
    if (isValidVideoId(v)) return v;
  } catch {
    // ignore
  }
  const m = url.match(/[?&]v=([\w-]{11})/);
  return isValidVideoId(m?.[1]) ? m![1] : null;
}

/**
 * Extrae un objeto JSON asignado a una variable global en el HTML de YouTube
 * (ytInitialPlayerResponse / ytInitialData) con balanceo de llaves.
 */
export function extractJsonAssignment(
  html: string,
  variableName: string,
): unknown | null {
  const marker = `${variableName}`;
  const idx = html.indexOf(marker);
  if (idx === -1) return null;

  const eq = html.indexOf("=", idx + marker.length);
  if (eq === -1 || eq - idx > 80) return null;

  const start = html.indexOf("{", eq);
  if (start === -1 || start - eq > 40) return null;

  let depth = 0;
  let inString = false;
  let escape = false;

  for (let i = start; i < html.length && i < start + 2_000_000; i++) {
    const c = html[i];
    if (inString) {
      if (escape) {
        escape = false;
      } else if (c === "\\") {
        escape = true;
      } else if (c === '"') {
        inString = false;
      }
      continue;
    }
    if (c === '"') {
      inString = true;
      continue;
    }
    if (c === "{") depth++;
    else if (c === "}") {
      depth--;
      if (depth === 0) {
        const raw = html.slice(start, i + 1);
        try {
          return JSON.parse(raw) as unknown;
        } catch {
          return null;
        }
      }
    }
  }
  return null;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object"
    ? (value as Record<string, unknown>)
    : null;
}

/**
 * Candidato de live desde el HTML de /channel/{id}/live.
 * Nunca usa el primer "videoId" suelto de la página (basura / related / jazz 24-7).
 */
export function extractPublicLiveCandidate(
  html: string,
  finalUrl: string,
  expectedChannelId: string,
): PublicLiveCandidate | null {
  const fromRedirect = extractVideoIdFromUrl(finalUrl);
  if (fromRedirect && /\/watch/i.test(finalUrl)) {
    const player = asRecord(extractJsonAssignment(html, "ytInitialPlayerResponse"));
    const details = asRecord(player?.videoDetails);
    const micro = asRecord(
      asRecord(player?.microformat)?.playerMicroformatRenderer,
    );
    const channelFromPlayer =
      (typeof details?.channelId === "string" && details.channelId) ||
      (typeof micro?.externalChannelId === "string" &&
        micro.externalChannelId) ||
      null;

    if (channelFromPlayer && channelFromPlayer !== expectedChannelId) {
      return null;
    }

    const liveDetails = asRecord(micro?.liveBroadcastDetails);
    const pageSignalsLive =
      details?.isLive === true ||
      details?.isLiveContent === true ||
      liveDetails?.isLiveNow === true ||
      /"liveBroadcastContent"\s*:\s*"live"/.test(
        JSON.stringify(details ?? {}),
      );

    const title =
      (typeof details?.title === "string" && details.title) ||
      html.match(/<title>([^<]+)<\/title>/)?.[1]?.replace(" - YouTube", "") ||
      null;

    return {
      videoId: fromRedirect,
      title: title ? decodeHtml(title) : null,
      channelIdFromPage: channelFromPlayer,
      pageSignalsLive,
      extraction: "redirect-url",
    };
  }

  const player = asRecord(extractJsonAssignment(html, "ytInitialPlayerResponse"));
  const details = asRecord(player?.videoDetails);
  const micro = asRecord(
    asRecord(player?.microformat)?.playerMicroformatRenderer,
  );
  const videoId =
    (typeof details?.videoId === "string" && details.videoId) || null;
  const channelFromPlayer =
    (typeof details?.channelId === "string" && details.channelId) ||
    (typeof micro?.externalChannelId === "string" &&
      micro.externalChannelId) ||
    null;

  if (isValidVideoId(videoId)) {
    if (channelFromPlayer && channelFromPlayer !== expectedChannelId) {
      return null;
    }
    const liveDetails = asRecord(micro?.liveBroadcastDetails);
    const pageSignalsLive =
      details?.isLive === true ||
      details?.isLiveContent === true ||
      liveDetails?.isLiveNow === true;

    return {
      videoId,
      title:
        typeof details?.title === "string" ? decodeHtml(details.title) : null,
      channelIdFromPage: channelFromPlayer,
      pageSignalsLive,
      extraction: "player-response",
    };
  }

  const canonical =
    html.match(
      /rel=["']canonical["']\s+href=["'](https:\/\/www\.youtube\.com\/watch\?[^"']+)["']/i,
    )?.[1] ??
    html.match(
      /href=["'](https:\/\/www\.youtube\.com\/watch\?v=[\w-]{11}[^"']*)["']/i,
    )?.[1];
  const fromCanonical = canonical ? extractVideoIdFromUrl(canonical) : null;
  if (fromCanonical) {
    return {
      videoId: fromCanonical,
      title: null,
      channelIdFromPage: null,
      pageSignalsLive: false,
      extraction: "canonical-watch",
    };
  }

  return null;
}

/**
 * URL de embed al live edge del canal (no al inicio de un VOD).
 * Usar solo cuando el servidor ya confirmó que hay live del canal.
 */
export function buildChannelLiveEmbedUrl(
  channelId: string,
  opts?: { autoplay?: boolean },
): string {
  const url = new URL("https://www.youtube.com/embed/live_stream");
  url.searchParams.set("channel", channelId);
  url.searchParams.set("autoplay", opts?.autoplay === false ? "0" : "1");
  url.searchParams.set("rel", "0");
  url.searchParams.set("modestbranding", "1");
  return url.toString();
}

/**
 * Embed por videoId (fallback). Sin `start` para no forzar el inicio del VOD.
 */
export function buildVideoLiveEmbedUrl(
  videoId: string,
  opts?: { autoplay?: boolean },
): string {
  const url = new URL(`https://www.youtube.com/embed/${videoId}`);
  url.searchParams.set("autoplay", opts?.autoplay === false ? "0" : "1");
  url.searchParams.set("rel", "0");
  url.searchParams.set("modestbranding", "1");
  // Para broadcasts en vivo, YouTube une al live edge si no hay `start`.
  return url.toString();
}
