"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LiveStatus } from "@/lib/types";

type Props = {
  initialStatus: LiveStatus;
};

export function LivePlayer({ initialStatus }: Props) {
  const [status, setStatus] = useState(initialStatus);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    try {
      const res = await fetch("/api/youtube-live", { cache: "no-store" });
      const data = (await res.json()) as LiveStatus;
      setStatus(data);
      if (data.isLive && data.videoId) {
        setPlaying(true);
      } else {
        setPlaying(false);
        setError(data.message || "No hay transmisión en vivo en este momento.");
      }
    } catch {
      setError("No se pudo cargar el live. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="en-vivo" className="relative scroll-mt-24">
      <div className="relative aspect-video overflow-hidden rounded-sm bg-black shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
        {playing && status.videoId ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${status.videoId}?autoplay=1&rel=0`}
            title={status.title ?? "Transmisión en vivo"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={handlePlay}
            className="group relative block h-full w-full"
            aria-label="Reproducir transmisión en vivo"
          >
            <Image
              src={status.thumbnailUrl || "/channel-avatar.jpg"}
              alt="Vista previa del canal en vivo"
              fill
              priority
              className="object-cover transition duration-700 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 960px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#061018]/90 via-[#061018]/35 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-black/45 text-white backdrop-blur-sm transition group-hover:scale-105 group-hover:border-[#d4a85a] md:h-20 md:w-20">
                <Play className="ml-1 h-7 w-7 fill-current md:h-8 md:w-8" />
              </span>
              <span className="text-sm tracking-[0.3em] text-white/90 uppercase">
                {loading ? "Comprobando…" : "Play"}
              </span>
            </div>
          </button>
        )}
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span
            className={`inline-flex items-center gap-2 rounded-sm px-2.5 py-1 text-xs tracking-[0.18em] uppercase ${
              status.isLive
                ? "bg-red-600/90 text-white"
                : "bg-white/10 text-[#e8dcc8]"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                status.isLive ? "animate-pulse bg-white" : "bg-[#d4a85a]"
              }`}
            />
            {status.isLive ? "En vivo" : "Fuera de aire"}
          </span>
          <p className="text-sm text-[#d7cbb8]">
            {status.isLive
              ? status.title || "Transmisión en curso"
              : "Pulsa Play para conectar con el live de YouTube"}
          </p>
        </div>
        {!playing && (
          <Button
            type="button"
            variant="outline"
            onClick={handlePlay}
            disabled={loading}
            className="border-[#d4a85a]/50 bg-transparent text-[#f7f1e6] hover:bg-[#d4a85a] hover:text-[#0b1624]"
          >
            {loading ? "Cargando…" : "Verificar live"}
          </Button>
        )}
      </div>

      {error && (
        <p
          role="status"
          className="mt-3 rounded-sm border border-[#d4a85a]/30 bg-[#1a140c] px-4 py-3 text-sm text-[#f0e2c8]"
        >
          {error}
        </p>
      )}
    </section>
  );
}
