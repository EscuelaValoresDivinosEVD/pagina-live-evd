import { siteConfig } from "@/lib/config";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#050b12] py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 text-sm text-[#b9aa94] sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-heading text-lg tracking-[0.12em] text-[#f7f1e6]">
            Escuela Valores Divinos
          </p>
          <p className="mt-1">Transmisiones en vivo · Meditación · Shiva Kriya Yoga</p>
        </div>
        <div className="flex flex-col gap-1 md:items-end">
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="hover:text-[#d4a85a]"
          >
            {siteConfig.contactEmail}
          </a>
          <a
            href={siteConfig.schoolUrl}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#d4a85a]"
          >
            escuelavaloresdivinos.org
          </a>
        </div>
      </div>
    </footer>
  );
}
