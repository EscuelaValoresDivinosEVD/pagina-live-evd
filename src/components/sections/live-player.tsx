"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { LiveStatus } from "@/lib/types";

type Props = {
  initialStatus: LiveStatus;
};

export function LivePlayer({ initialStatus }: Props) {
  const [status, setStatus] = useState(initialStatus);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showOffline, setShowOffline] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const refresh = async () => {
      try {
        const res = await fetch("/api/youtube-live", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as LiveStatus;
        if (!cancelled) setStatus(data);
      } catch {
        // keep previous status
      }
    };
    const id = window.setInterval(refresh, 90_000);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  const handlePlay = async () => {
    setLoading(true);
    setError(null);
    setShowOffline(false);
    try {
      const res = await fetch("/api/youtube-live", { cache: "no-store" });
      const data = (await res.json()) as LiveStatus;
      setStatus(data);
      if (data.isLive && data.videoId) {
        setPlaying(true);
      } else {
        setPlaying(false);
        setShowOffline(true);
        setError(data.message || "No hay transmisión en vivo en este momento.");
      }
    } catch {
      setError("No se pudo cargar el live. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="en-vivo" className="relative scroll-mt-24 px-4 sm:px-6">
      <div className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-xl bg-black shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
        <div className="relative aspect-video w-full">
          {playing && status.videoId ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube.com/embed/${status.videoId}?autoplay=1&rel=0&modestbranding=1`}
              title={status.title ?? "Transmisión en vivo"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : showOffline ? (
            <button
              type="button"
              onClick={handlePlay}
              className="absolute inset-0 block h-full w-full cursor-pointer"
              aria-label="Reintentar transmisión en vivo"
            >
              <Image
                src="/No-transmitimos.jpg"
                alt="No estamos en vivo"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 896px"
                priority
              />
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePlay}
              className="group absolute inset-0 block h-full w-full cursor-pointer"
              aria-label="Reproducir transmisión en vivo"
            >
              <Image
                src="/live-portada-player-v1.jpg"
                alt="Portada EVD LIVE"
                fill
                priority
                className="object-cover transition duration-700 group-hover:scale-[1.01]"
                sizes="(max-width: 768px) 100vw, 896px"
              />

              {status.isLive && (
                <div className="pointer-events-none absolute top-4 right-4 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 backdrop-blur-sm md:top-5 md:right-5">
                  <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-500 shadow-[0_0_10px_#ff0000]" />
                  <span className="text-[11px] font-bold tracking-[0.12em] text-white uppercase">
                    En vivo
                  </span>
                </div>
              )}

              {loading && (
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/25 text-xs tracking-[0.2em] text-white uppercase">
                  …
                </span>
              )}
            </button>
          )}
        </div>
      </div>

      {error && (
        <p
          role="status"
          className="mx-auto mt-4 max-w-4xl rounded-xl border border-[#69e5e7]/25 bg-[#0a1423]/80 px-4 py-3 text-center text-sm text-[#e0d3ba]"
        >
          {error}
        </p>
      )}
    </section>
  );
}
