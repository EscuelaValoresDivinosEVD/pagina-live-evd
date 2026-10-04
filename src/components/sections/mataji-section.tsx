"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";

export function MatajiSection() {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative overflow-hidden py-10 md:py-16">
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-6 md:grid-cols-[1.05fr_0.95fr] md:gap-2 lg:gap-6">
          <div className="relative mx-auto aspect-[1086/1186] w-[min(100%,560px)] md:w-full md:max-w-none">
            <Image
              src="/fondo-Ma.jpg"
              alt="Mataji Shaktiananda"
              fill
              className="object-contain object-center md:object-left"
              sizes="(max-width: 768px) 90vw, 52vw"
              priority={false}
            />
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center px-2 text-center md:-ml-10 lg:-ml-20">
            <div className="font-heading max-w-xl space-y-1 text-[clamp(1.1rem,1.85vw,1.65rem)] leading-[1.55] text-[#e0d3ba]">
              <p>“¿Qué o quién es un meditador?</p>
              <p>Quien a través de sí mismo busca encontrarse.</p>
              <p>Quien sabe habita aquí y allá, y busca unirse.</p>
              <p>Quien sabe que su Ser lo contiene todo”.</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-2 flex items-center gap-4 md:-mt-4 md:gap-6 lg:-mt-8">
          <div className="h-px flex-1 bg-[#e0d3ba]/60" />
          <h3 className="shrink-0 text-sm font-light tracking-[0.06em] text-[#e0d3ba] md:text-[15px]">
            Mataji Shaktiananda
          </h3>
          <div className="h-px flex-1 bg-[#e0d3ba]/60" />
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
    </section>
  );
}
