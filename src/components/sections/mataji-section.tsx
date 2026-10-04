"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";

export function MatajiSection() {
  const [open, setOpen] = useState(false);

  return (
    <section
      aria-label="Mataji Shaktiananda"
      className="relative isolate overflow-hidden border-t border-[#387799]/25 bg-[linear-gradient(90deg,#0a1423_22%,#231724_93%)]"
    >
      {/* Imagen de fondo de la sección (capa absoluta, no columna) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="/fondo-Ma.jpg"
          alt=""
          fill
          className="object-cover object-[12%_center] opacity-95 sm:object-contain sm:object-left [mask-image:linear-gradient(90deg,black_0%,black_40%,transparent_86%)]"
          sizes="100vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_22%_48%,rgba(140,150,190,0.16),transparent_52%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,transparent_30%,rgba(10,20,35,0.55)_58%,#0a1423_78%,#231724_100%)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[70vw] w-full max-w-6xl flex-col justify-center px-4 py-16 sm:px-6 md:min-h-[520px] md:py-24 lg:min-h-[600px]">
        <div className="ml-auto w-full max-w-xl text-center md:max-w-[48%] lg:max-w-[44%]">
          <div className="font-heading space-y-1 text-[clamp(1.15rem,2vw,1.7rem)] leading-[1.55] text-[#e0d3ba]">
            <p>“¿Qué o quién es un meditador?</p>
            <p>Quien a través de sí mismo busca encontrarse.</p>
            <p>Quien sabe habita aquí y allá, y busca unirse.</p>
            <p>Quien sabe que su Ser lo contiene todo”.</p>
          </div>
        </div>

        <div className="mt-10 flex w-full items-center gap-4 md:mt-14 md:gap-6">
          <div className="h-px flex-1 bg-[#e0d3ba]/55" />
          <h3 className="shrink-0 text-sm font-light tracking-[0.06em] text-[#e0d3ba] md:text-[15px]">
            Mataji Shaktiananda
          </h3>
          <div className="h-px flex-1 bg-[#e0d3ba]/55" />
        </div>

        <div className="mx-auto mt-8 max-w-3xl text-center md:mt-10">
          <p className="text-sm leading-relaxed text-[#e0d3ba] md:text-[15px] md:leading-7">
            Meditar es la experiencia interna del alma, la forma de contacto
            entre el alma-mente individual y su conciencia cósmica. Es la visión
            de la belleza y la verdad del Ser.
          </p>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            className="mt-6 inline-flex items-center gap-3 text-sm text-[#e0d3ba] transition hover:text-[#69e5e7]"
          >
            <span>{open ? "leer menos..." : "leer más..."}</span>
            <span
              className={`inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#e0d3ba]/70 transition ${
                open ? "rotate-45" : ""
              }`}
            >
              <Plus className="h-3.5 w-3.5" strokeWidth={1.75} />
            </span>
          </button>

          <div
            className={`overflow-hidden transition-all duration-500 ease-out ${
              open ? "mt-6 max-h-[800px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="space-y-4 text-left text-sm leading-relaxed text-[#e0d3ba] md:text-[15px] md:leading-7">
              <p>
                Las Meditaciones junto a Mataji Shaktiananda son un evento
                único, surgen de la Esfera Babaji y se ofrendan a los seres
                despiertos a través de los filamentos de Luz que la Madre
                sostiene en conexión plena con los planos de Luz.
              </p>
              <p>
                Cada encuentro genera una nueva aventura hacia el Ser, donde
                Shakti Ma se dispone para entregar la enseñanza de la Luz que
                su memoria cósmica posee. En esos momentos, no hay nada
                previamente preparado, el universo evolutivo se abre para
                contener al meditador en sus potentes corrientes de ascensión.
              </p>
              <p>
                En cada meditación guiada por la Madre Shaktiananda, se genera
                la atmósfera propicia para que el alma se disponga a realizar el
                contacto interno más elevado, aquel que lo reconecta con su
                realidad divina.
              </p>
              <p>
                Experimenta la expansión de tus campos sutiles, medita junto a
                un Ser que habita la Meditación como un estado de la conciencia
                cósmica.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[radial-gradient(circle_at_center,#387799_0%,rgba(30,40,66,0)_80%)]"
      />
    </section>
  );
}
