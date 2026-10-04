export type LiveStatus = {
  isLive: boolean;
  videoId: string | null;
  title: string | null;
  thumbnailUrl: string | null;
  checkedAt: string;
  source: "youtube-api" | "public-live" | "mock";
  message: string;
};

export type PodcastEpisode = {
  id: string;
  title: string;
  description: string;
  pubDate: string;
  duration: string;
  audioUrl: string | null;
  link: string;
  imageUrl: string | null;
};

export type MeditationPost = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  url: string;
  imageUrl: string | null;
};
