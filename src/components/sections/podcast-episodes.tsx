"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import type { PodcastEpisode } from "@/lib/types";
import { siteConfig } from "@/lib/config";

type Props = {
  episodes: PodcastEpisode[];
  source: string;
};

function formatDate(value: string) {
  if (!value) return "";
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export function PodcastEpisodes({ episodes, source }: Props) {
  const list = useMemo(
    () => (episodes ?? []).slice(0, siteConfig.anchorMaxEpisodes),
    [episodes],
  );
  const defaultEmbed =
    list[0]?.embedUrl || `${siteConfig.anchorSiteUrl}/embed`;
  const [activeId, setActiveId] = useState(list[0]?.id ?? null);
  const [iframeSrc, setIframeSrc] = useState(defaultEmbed);

  const playEpisode = (episode: PodcastEpisode) => {
    const next =
      episode.embedUrl ||
      episode.link ||
      `${siteConfig.anchorSiteUrl}/embed`;
    setActiveId(episode.id);
    setIframeSrc(next);
  };

  return (
    <div id="podcast" className="scroll-mt-24 w-full">
      <div className="overflow-hidden rounded-[14px] bg-white text-[#282f36] shadow-[0_10px_30px_rgba(0,0,0,0.28)]">
        <div className="border-b border-black/5 bg-[#f7f8fa]">
          <iframe
            key={iframeSrc}
            src={iframeSrc}
            title="Podcast Anchor · Meditaciones Guiadas"
            className="h-[175px] w-full"
            loading="lazy"
            allow="autoplay; encrypted-media; clipboard-write"
          />
        </div>

        <ul className="max-h-[420px] divide-y divide-black/5 overflow-y-auto">
          {list.map((episode) => {
            const active = episode.id === activeId;
            return (
              <li key={episode.id}>
                <button
                  type="button"
                  onClick={() => playEpisode(episode)}
                  className={`flex w-full items-start gap-3 px-3 py-3 text-left transition hover:bg-[#f3f5f8] sm:gap-4 sm:px-4 ${
                    active ? "bg-[#eef6ff]" : "bg-white"
                  }`}
                >
                  <span className="relative mt-0.5 h-12 w-12 shrink-0 overflow-hidden rounded-md bg-[#dde3ea] sm:h-14 sm:w-14">
                    <Image
                      src={episode.imageUrl || "/podcast-cover.jpg"}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#282f36] shadow">
                        <Play className="ml-0.5 h-3.5 w-3.5 fill-current" />
                      </span>
                    </span>
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold leading-snug text-[#1c2228] sm:text-[15px]">
                      {episode.title}
                    </span>
                    {episode.description && (
                      <span className="mt-1 line-clamp-2 block text-xs leading-relaxed text-[#5b6570] sm:text-[13px]">
                        {episode.description}
                      </span>
                    )}
                  </span>

                  <span className="shrink-0 pt-0.5 text-right text-[11px] leading-4 text-[#6b7280]">
                    {episode.duration && (
                      <span className="block font-medium text-[#374151]">
                        {episode.duration}
                      </span>
                    )}
                    {episode.pubDate && (
                      <span className="mt-1 block max-w-[88px]">
                        {formatDate(episode.pubDate)}
                      </span>
                    )}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {source === "mock" && (
        <p className="mt-3 text-xs text-[#9f917c]">
          Mostrando episodios de respaldo (RSS de Anchor no respondió).
        </p>
      )}
    </div>
  );
}
