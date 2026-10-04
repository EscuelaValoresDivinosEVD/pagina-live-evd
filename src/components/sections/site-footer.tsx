import Image from "next/image";
import { siteConfig } from "@/lib/config";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#050b12]/80 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-5 px-4 text-center text-sm text-[#b9aa94] sm:px-6 md:flex-row md:items-center md:justify-between md:text-left">
        <div className="flex flex-col items-center gap-3 md:flex-row md:items-center">
          <Image
            src="/LIVE-EVD-300x300.png"
            alt="EVD LIVE"
            width={72}
            height={72}
            className="h-16 w-16 object-contain"
          />
          <div>
            <p className="text-lg tracking-[0.12em] text-[#e0d9cc]">
              Escuela Valores Divinos
            </p>
            <p className="mt-1">Transmisiones en vivo · Meditación · Shiva Kriya Yoga</p>
          </div>
        </div>
        <div className="flex flex-col gap-1 md:items-end">
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="hover:text-[#69e5e7]"
          >
            {siteConfig.contactEmail}
          </a>
          <a
            href={siteConfig.schoolUrl}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#69e5e7]"
          >
            escuelavaloresdivinos.org
          </a>
        </div>
      </div>
    </footer>
  );
}
