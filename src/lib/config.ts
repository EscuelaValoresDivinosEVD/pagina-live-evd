export const siteConfig = {
  name: "EVD LIVE",
  title: "Live Home - Escuela Valores Divinos - LIVE",
  description:
    "Transmisiones en vivo desde la Escuela Valores Divinos. Meditaciones junto a Mataji Shaktiananda.",
  youtubeChannelId:
    process.env.YOUTUBE_CHANNEL_ID ?? "UCs6BtP_OoMkh18UjszWIuqg",
  youtubeApiKey: process.env.YOUTUBE_API_KEY ?? "",
  /** Misma config que el plugin WP «Anchor Episodes Index» */
  anchorSiteUrl:
    process.env.ANCHOR_SITE_URL ?? "https://anchor.fm/shaktianandama",
  anchorRssUrl:
    process.env.ANCHOR_RSS_URL ??
    "https://anchor.fm/s/5ae7e064/podcast/rss",
  anchorMaxEpisodes: 4,
  meditationsFeedUrl:
    process.env.MEDITATIONS_FEED_URL ?? "https://shaktianandama.com/feed/",
  meditationsWpJsonUrl:
    process.env.MEDITATIONS_WP_JSON_URL ??
    "https://shaktianandama.com/wp-json/wp/v2/posts?per_page=4&_embed=1",
  meditationsArchiveUrl: "https://shaktianandama.com/meditaciones/",
  spotifyShowUrl:
    "https://open.spotify.com/show/5zDFfqLFzHcOtTLucM77yR",
  contactEmail: "info@evdsky.com",
  schoolUrl: "https://escuelavaloresdivinos.org/",
  liveSourceUrl: "https://live.evdsky.com/",
} as const;
