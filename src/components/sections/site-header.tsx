import Link from "next/link";

const links = [
  { href: "#en-vivo", label: "En vivo" },
  { href: "#meditaciones", label: "Meditaciones" },
  { href: "#podcast", label: "Podcast" },
  { href: "#suscribete", label: "Suscríbete" },
];

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="font-heading text-2xl tracking-[0.08em] text-[#f7f1e6] md:text-3xl">
            EVD
          </span>
          <span className="text-xs font-semibold tracking-[0.35em] text-[#d4a85a] uppercase">
            Live
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-[#e8dcc8] md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-[#d4a85a]"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="#suscribete"
          className="rounded-sm border border-[#d4a85a]/60 px-3 py-1.5 text-xs tracking-[0.18em] text-[#f7f1e6] uppercase transition hover:bg-[#d4a85a] hover:text-[#0b1624] md:text-[11px]"
        >
          Suscríbete
        </a>
      </div>
    </header>
  );
}
