import { siteConfig } from "@/lib/config";
import { mockMeditationPosts } from "@/lib/mock-data";
import type { MeditationPost } from "@/lib/types";

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

function looksLikeCloudflare(html: string) {
  return (
    html.includes("Just a moment...") ||
    html.includes("cf-chl") ||
    html.includes("challenge-platform")
  );
}

async function fromWpJson(): Promise<MeditationPost[] | null> {
  const res = await fetch(siteConfig.meditationsWpJsonUrl, {
    headers: { "User-Agent": "EVDLiveBot/1.0", Accept: "application/json" },
    next: { revalidate: 300 },
  });
  if (!res.ok) return null;
  const text = await res.text();
  if (looksLikeCloudflare(text)) return null;

  const data = JSON.parse(text) as Array<{
    id: number;
    date: string;
    link: string;
    title?: { rendered?: string };
    excerpt?: { rendered?: string };
    jetpack_featured_media_url?: string;
    _embedded?: {
      "wp:featuredmedia"?: Array<{ source_url?: string }>;
    };
  }>;

  if (!Array.isArray(data) || !data.length) return null;

  return data.slice(0, 4).map((post) => ({
    id: String(post.id),
    title: stripHtml(post.title?.rendered ?? "Meditación"),
    excerpt: stripHtml(post.excerpt?.rendered ?? "").slice(0, 220),
    date: post.date.slice(0, 10),
    url: post.link,
    imageUrl:
      post.jetpack_featured_media_url ||
      post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
      "/podcast-cover.jpg",
  }));
}

async function fromRss(): Promise<MeditationPost[] | null> {
  const res = await fetch(siteConfig.meditationsFeedUrl, {
    headers: { "User-Agent": "EVDLiveBot/1.0" },
    next: { revalidate: 300 },
  });
  if (!res.ok) return null;
  const xml = await res.text();
  if (looksLikeCloudflare(xml) || !xml.includes("<item>")) return null;

  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)].slice(0, 4);
  return items.map((match, index) => {
    const block = match[1] ?? "";
    const title =
      stripHtml(
        block.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/)?.[1] ||
          block.match(/<title>([\s\S]*?)<\/title>/)?.[1] ||
          "",
      ) || `Meditación ${index + 1}`;
    const link =
      block.match(/<link>([\s\S]*?)<\/link>/)?.[1]?.trim() ||
      siteConfig.meditationsArchiveUrl;
    const dateRaw =
      block.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1]?.trim() || "";
    const excerpt = stripHtml(
      block.match(
        /<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/,
      )?.[1] ||
        block.match(/<description>([\s\S]*?)<\/description>/)?.[1] ||
        "",
    ).slice(0, 220);

    return {
      id: `rss-${index}-${title}`,
      title,
      excerpt,
      date: dateRaw ? new Date(dateRaw).toISOString().slice(0, 10) : "",
      url: link,
      imageUrl: "/podcast-cover.jpg",
    };
  });
}

export async function getLatestMeditations(): Promise<{
  posts: MeditationPost[];
  source: "wp-json" | "rss" | "mock";
}> {
  try {
    const fromJson = await fromWpJson();
    if (fromJson?.length) return { posts: fromJson, source: "wp-json" };

    const fromFeed = await fromRss();
    if (fromFeed?.length) return { posts: fromFeed, source: "rss" };
  } catch {
    // fallback below
  }

  return { posts: mockMeditationPosts, source: "mock" };
}
