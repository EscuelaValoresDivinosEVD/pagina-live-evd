"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { MoreHorizontal, Play } from "lucide-react";
import type { PodcastEpisode } from "@/lib/types";
import { siteConfig } from "@/lib/config";

type Props = {
  episodes: PodcastEpisode[];
  source: string;
};

const IFRAME_NAME = "evd_anchor_podcast_iframe";

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

function showEmbedUrl() {
  return `${siteConfig.anchorSiteUrl.replace(/\/$/, "")}/embed`;
}

/**
 * Player Anchor compacto (estilo plugin WP «Anchor Episodes Index»):
 * barra del show recortada + lista densa de 4 episodios.
 */
export function PodcastEpisodes({ episodes, source }: Props) {
  const list = useMemo(
    () => (episodes ?? []).slice(0, siteConfig.anchorMaxEpisodes),
    [episodes],
  );
  const [activeId, setActiveId] = useState<string | null>(null);
  const [iframeSrc, setIframeSrc] = useState(showEmbedUrl);

  const playEpisode = (episode: PodcastEpisode) => {
    const next = episode.embedUrl || showEmbedUrl();
    setActiveId(episode.id);
    setIframeSrc(next);
  };

  return (
    <div id="podcast" className="scroll-mt-24 w-full">
      <div className="overflow-hidden rounded-[12px] bg-[#efeff0] text-[#292f36] shadow-[0_10px_28px_rgba(0,0,0,0.22)]">
        {/* Solo la barra del player (sin el vacío blanco del embed) */}
        <div className="relative h-[98px] overflow-hidden bg-white">
          <iframe
            key={iframeSrc}
            name={IFRAME_NAME}
            src={iframeSrc}
            title="Podcast Anchor · Meditaciones Guiadas"
            className="absolute top-0 left-0 block w-full border-0"
            style={{ minHeight: 602, height: 602 }}
            scrolling="no"
            loading="lazy"
            allow="autoplay; encrypted-media; clipboard-write"
          />
        </div>

        <ul className="space-y-2.5 px-2.5 py-2.5 md:space-y-[10px] md:px-[11px] md:py-[11px]">
          {list.map((episode) => {
            const active = episode.id === activeId;
            return (
              <li key={episode.id}>
                <button
                  type="button"
                  onClick={() => playEpisode(episode)}
                  className={`relative flex w-full items-start rounded-[4px] bg-white px-3 py-3 text-left transition hover:bg-[#fafafa] md:px-[14px] md:py-[12px] ${
                    active ? "ring-1 ring-[#5000b9]/25" : ""
                  }`}
                >
                  <span className="relative mr-2.5 h-[47px] w-[47px] shrink-0 overflow-hidden rounded-[4px] bg-[#dde3ea] md:mr-[14px]">
                    <Image
                      src={episode.imageUrl || "/podcast-cover.jpg"}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="47px"
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/15">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#292f36] shadow-sm">
                        <Play className="ml-0.5 h-3 w-3 fill-current" />
                      </span>
                    </span>
                  </span>

                  <span className="min-w-0 flex-1 pr-[92px]">
                    <span className="mb-0.5 block text-[14px] font-bold leading-[17px] text-[#292f36] md:text-[15px]">
                      {episode.title}
                    </span>
                    {episode.description && (
                      <span className="flex items-start gap-1 text-[12px] leading-[14px] text-[rgba(41,47,54,0.7)] md:text-[13px]">
                        <span className="line-clamp-2 min-w-0 flex-1">
                          {episode.description}
                        </span>
                        <MoreHorizontal
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#c9cbcd]"
                          aria-hidden
                        />
                      </span>
                    )}
                  </span>

                  <span className="absolute top-3 right-3 text-right text-[11px] leading-[13px] text-[#c9cbcd] md:top-[12px] md:right-[14px] md:text-[12px]">
                    {episode.pubDate && (
                      <span className="block whitespace-nowrap">
                        {formatDate(episode.pubDate)}
                      </span>
                    )}
                    {episode.duration && (
                      <span className="mt-1.5 block whitespace-nowrap">
                        {episode.duration}
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
