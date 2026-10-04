import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "#en-vivo", label: "Live" },
  { href: "#meditaciones", label: "Meditaciones" },
  { href: "#suscribete", label: "Suscríbete" },
];

export function SiteHeader() {
  return (
    <header className="relative z-30 pt-10 md:pt-14">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-4 sm:px-6">
        <Link href="/" className="group block" aria-label="EVD LIVE">
          <Image
            src="/LIVE-EVD.png"
            alt="LIVE · Escuela Valores Divinos"
            width={400}
            height={400}
            priority
            className="mx-auto h-auto w-[28vw] max-w-[180px] min-w-[96px] drop-shadow-[0_0_28px_rgba(105,229,231,0.35)] transition duration-500 group-hover:drop-shadow-[0_0_40px_rgba(105,229,231,0.55)] md:max-w-[210px]"
          />
        </Link>

        <nav
          aria-label="Secciones"
          className="mt-2 flex w-full max-w-xl items-stretch justify-center text-[#69e5e7] md:mt-0"
        >
          {links.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              className={`flex flex-1 items-center justify-center px-2 py-3 text-center text-base font-light tracking-[0.04em] transition hover:tracking-[0.12em] md:text-[21px] ${
                index < links.length - 1
                  ? "border-r border-[#a4e5e8]/70"
                  : ""
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
