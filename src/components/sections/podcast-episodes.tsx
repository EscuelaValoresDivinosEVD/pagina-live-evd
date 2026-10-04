"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";
import type { PodcastEpisode } from "@/lib/types";

type Props = {
  episodes: PodcastEpisode[];
  source: string;
};

function formatDate(value: string) {
  if (!value) return "";
  try {
    return new Intl.DateTimeFormat("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export function PodcastEpisodes({ episodes, source }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const toggle = async (episode: PodcastEpisode) => {
    if (!episode.audioUrl) {
      window.open(episode.link, "_blank", "noopener,noreferrer");
      return;
    }

    if (!audioRef.current) {
      audioRef.current = new Audio(episode.audioUrl);
      audioRef.current.addEventListener("ended", () => setActiveId(null));
    }

    if (activeId === episode.id) {
      audioRef.current.pause();
      setActiveId(null);
      return;
    }

    audioRef.current.pause();
    audioRef.current.src = episode.audioUrl;
    await audioRef.current.play();
    setActiveId(episode.id);
  };

  return (
    <section
      id="podcast"
      className="scroll-mt-24 border-t border-white/10 bg-[#0a1522] py-16 md:py-20"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-xs font-medium tracking-[0.28em] text-[#d4a85a] uppercase">
            Anchor / Spotify
          </p>
          <h2 className="font-heading text-3xl text-[#f7f1e6] md:text-4xl">
            Últimas meditaciones en audio
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#d7cbb8] md:text-base">
            Los 4 episodios más recientes del podcast{" "}
            <em>Meditaciones Guiadas con Mataji Shaktiananda</em>.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {episodes.map((episode) => {
            const isActive = activeId === episode.id;
            return (
              <article
                key={episode.id}
                className="flex gap-4 border border-white/10 bg-[#0d1b2b]/80 p-4 transition hover:border-[#d4a85a]/40"
              >
                <button
                  type="button"
                  onClick={() => void toggle(episode)}
                  className="relative h-24 w-24 shrink-0 overflow-hidden rounded-sm"
                  aria-label={`${isActive ? "Pausar" : "Reproducir"} ${episode.title}`}
                >
                  <Image
                    src={episode.imageUrl || "/podcast-cover.jpg"}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/35 text-white">
                    {isActive ? (
                      <Pause className="h-6 w-6 fill-current" />
                    ) : (
                      <Play className="ml-0.5 h-6 w-6 fill-current" />
                    )}
                  </span>
                </button>
                <div className="min-w-0 flex-1">
                  <h3 className="font-heading text-lg leading-snug text-[#f7f1e6]">
                    {episode.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm text-[#cbbda8]">
                    {episode.description}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs tracking-wide text-[#d4a85a]">
                    {episode.duration && <span>{episode.duration}</span>}
                    {episode.pubDate && (
                      <span>{formatDate(episode.pubDate)}</span>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {source === "mock" && (
          <p className="mt-4 text-xs text-[#9f917c]">
            Mostrando datos locales de respaldo (el RSS no respondió).
          </p>
        )}
      </div>
    </section>
  );
}
