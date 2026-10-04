export function HeroIntro() {
  return (
    <section className="relative overflow-hidden pt-28 pb-10 md:pt-36 md:pb-14">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,168,90,0.18),_transparent_55%),radial-gradient(ellipse_at_bottom,_rgba(40,80,120,0.35),_transparent_60%)]" />
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:48px_48px]" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
        <p className="mb-4 text-xs font-medium tracking-[0.32em] text-[#d4a85a] uppercase">
          Escuela Valores Divinos
        </p>
        <h1 className="font-heading max-w-4xl text-4xl leading-[1.1] text-[#f7f1e6] sm:text-5xl md:text-6xl">
          Transmisiones en vivo desde la escuela valores divinos
        </h1>

        <div className="mt-8 max-w-2xl space-y-2 border-l border-[#d4a85a]/50 pl-4 text-[#e4d6c0]">
          <p className="text-base md:text-lg">
            Quien a través de sí mismo busca encontrarse.
          </p>
          <p className="text-base md:text-lg">
            Quien sabe habita aquí y allá, y busca unirse.
          </p>
          <p className="text-base md:text-lg">
            Quien sabe que su Ser lo contiene todo”.
          </p>
        </div>
      </div>
    </section>
  );
}
