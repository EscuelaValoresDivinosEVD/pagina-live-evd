export function KirtanSection() {
  return (
    <section className="border-t border-white/10 py-16 md:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-sm border border-white/10 bg-[linear-gradient(135deg,#142033,#0b1624_55%,#1b140c)] px-6 py-12 md:px-12 md:py-16">
          <div className="absolute -right-10 -bottom-16 h-56 w-56 rounded-full bg-[#d4a85a]/15 blur-3xl" />
          <div className="relative max-w-2xl">
            <p className="mb-3 text-xs font-medium tracking-[0.28em] text-[#d4a85a] uppercase">
              Práctica
            </p>
            <h2 className="font-heading text-3xl text-[#f7f1e6] md:text-4xl">
              Kirtan & Fuego Sagrado
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#d7cbb8] md:text-base">
              Espacios de canto devocional y Homa Vidya que acompañan el camino
              de Shiva Kriya Yoga. Consulta horarios en tus sedes EVD y
              conéctate a las transmisiones cuando se anuncien en vivo.
            </p>
            <a
              href="https://escuelavaloresdivinos.org/medita/"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex text-sm tracking-[0.16em] text-[#d4a85a] uppercase transition hover:text-[#f0d59a]"
            >
              Ver horarios →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
