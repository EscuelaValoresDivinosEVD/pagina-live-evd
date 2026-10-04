import { siteConfig } from "@/lib/config";
import { mockPodcastEpisodes } from "@/lib/mock-data";
import type { PodcastEpisode } from "@/lib/types";

function stripHtml(html: string) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function tagValue(block: string, tag: string) {
  const cdata = block.match(
    new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`, "i"),
  );
  if (cdata?.[1]) return cdata[1].trim();
  const plain = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return plain?.[1]?.trim() ?? "";
}

function attrValue(block: string, tag: string, attr: string) {
  const match = block.match(
    new RegExp(`<${tag}[^>]*\\s${attr}="([^"]+)"[^>]*/?>`, "i"),
  );
  return match?.[1] ?? null;
}

/** Convierte link de episodio a URL de embed (igual que el plugin WP). */
export function toEpisodeEmbedUrl(link: string | null | undefined) {
  if (!link) return null;
  const match = link.match(/\/episodes\/([^/?#]+)/i);
  if (!match?.[1]) return null;
  return `https://creators.spotify.com/pod/show/shaktianandama/embed/episodes/${match[1]}`;
}

export async function getLatestEpisodes(
  limit = siteConfig.anchorMaxEpisodes,
): Promise<{ episodes: PodcastEpisode[]; source: "anchor-rss" | "mock" }> {
  try {
    const res = await fetch(siteConfig.anchorRssUrl, {
      headers: { "User-Agent": "EVDLiveBot/1.0" },
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      return { episodes: mockPodcastEpisodes.slice(0, limit), source: "mock" };
    }

    const xml = await res.text();
    const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)].slice(
      0,
      limit,
    );

    const episodes: PodcastEpisode[] = items.map((match, index) => {
      const block = match[1] ?? "";
      const title = stripHtml(tagValue(block, "title")) || `Episodio ${index + 1}`;
      const description = stripHtml(tagValue(block, "description")).slice(0, 220);
      const link = tagValue(block, "link");
      const pubDate = tagValue(block, "pubDate");
      const duration =
        tagValue(block, "itunes:duration") ||
        attrValue(block, "itunes:duration", "text") ||
        "";
      const audioUrl = attrValue(block, "enclosure", "url");
      const imageUrl =
        attrValue(block, "itunes:image", "href") || "/podcast-cover.jpg";
      const guid = stripHtml(tagValue(block, "guid")) || link || `ep-${index}`;

      return {
        id: guid,
        title,
        description,
        pubDate: pubDate ? new Date(pubDate).toISOString() : "",
        duration,
        audioUrl,
        link: link || siteConfig.anchorSiteUrl,
        embedUrl: toEpisodeEmbedUrl(link),
        imageUrl,
      };
    });

    if (!episodes.length) {
      return { episodes: mockPodcastEpisodes.slice(0, limit), source: "mock" };
    }

    return { episodes, source: "anchor-rss" };
  } catch {
    return { episodes: mockPodcastEpisodes.slice(0, limit), source: "mock" };
  }
}
