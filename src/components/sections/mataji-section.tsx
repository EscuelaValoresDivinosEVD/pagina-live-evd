"use client";

import { useState } from "react";
import Image from "next/image";
import Script from "next/script";
import { Plus } from "lucide-react";
import { siteConfig } from "@/lib/config";

export function MatajiSection() {
  const [open, setOpen] = useState(false);

  return (
    <section
      aria-label="Mataji Shaktiananda"
      className="relative isolate overflow-hidden bg-[linear-gradient(90deg,#0a1423_22%,#231724_91%)] pb-[4vh] md:pb-[6vh]"
    >
      {/* Botón YouTube (como en live.evdsky.com) */}
      <div className="relative z-20 flex justify-center pt-2 md:pt-0">
        <div className="overflow-hidden rounded-[10px]">
          <div
            className="g-ytsubscribe"
            data-channelid={siteConfig.youtubeChannelId}
            data-layout="default"
            data-count="default"
          />
        </div>
      </div>
      <Script src="https://apis.google.com/js/platform.js" strategy="lazyOnload" />

      {/*
        Contenedor de contenido: en desktop ~65% (como Divi row_3),
        en mobile 95% con margen superior amplio para el retrato.
      */}
      <div className="relative z-10 mx-auto mt-[52vw] w-[95%] max-w-[1080px] px-1 sm:mt-[40vw] md:mt-[16vw] md:w-[65%]">
        {/* Retrato circular con glow — absoluto, detrás del texto */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-[9vw] top-[-58vw] z-0 w-full max-w-none scale-[1.7] md:left-[-21vw] md:top-[-23vw] md:scale-100"
        >
          <div className="relative aspect-[1086/1186] w-full overflow-hidden rounded-full shadow-[0_2px_58px_80px_#0c1422]">
            <Image
              src="/fondo-Ma.jpg"
              alt=""
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 95vw, 65vw"
              priority={false}
            />
          </div>
        </div>

        {/* Cita */}
        <div className="relative z-10 pt-[3vw] text-center md:pb-8">
          <div className="font-heading space-y-1 text-[17px] leading-[1.55] text-[#e0d3ba] md:text-[22px] md:leading-[1.5]">
            <p>“¿Qué o quién es un meditador?</p>
            <p>Quien a través de sí mismo busca encontrarse.</p>
            <p>Quien sabe habita aquí y allá, y busca unirse.</p>
            <p>Quien sabe que su Ser lo contiene todo”.</p>
          </div>
        </div>

        {/* Divider con nombre */}
        <div className="relative z-10 mt-2 flex w-full items-center gap-4 md:mt-2 md:gap-5">
          <div className="h-px flex-1 bg-[#e0d3ba]" />
          <h3 className="shrink-0 text-[15px] font-normal tracking-[0.02em] text-[#e0d3ba]">
            Mataji Shaktiananda
          </h3>
          <div className="h-px flex-1 bg-[#e0d3ba]" />
        </div>

        {/* Descripción + leer más */}
        <div className="relative z-10 mx-auto mt-[54px] px-[12vw] text-center md:mt-20 md:px-[12%]">
          <p className="text-left text-[14px] leading-relaxed text-[#e0d3ba] md:text-[15px] md:leading-7">
            Meditar es la experiencia interna del alma, la forma de contacto
            entre el alma-mente individual y su conciencia cósmica. Es la visión
            de la belleza y la verdad del Ser.
          </p>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            className="mt-4 inline-flex items-center gap-3 text-[13px] text-[#e0d3ba] transition hover:text-[#69e5e7]"
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
              open ? "mt-6 max-h-[900px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="space-y-4 text-left text-[14px] leading-relaxed text-[#e0d3ba] md:text-[15px] md:leading-7">
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
