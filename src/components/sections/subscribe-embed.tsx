"use client";

import Script from "next/script";

const FORM_ID = "1mA20h8rIqVPdvsD22Dg";
const IFRAME_ID = `inline-${FORM_ID}`;

/**
 * Embed LeadConnector / GoHighLevel — layout 2 columnas como live.evdsky.com:
 * texto a la izquierda (alineado a la derecha en desktop) + formulario a la derecha.
 */
export function SubscribeEmbed() {
  return (
    <section
      id="suscribete"
      className="scroll-mt-24 border-t border-white/5 bg-[linear-gradient(180deg,#0a1423_0%,#120a18_55%,#0a0a12_100%)] py-12 md:py-16"
      aria-labelledby="suscribete-heading"
    >
      <div className="mx-auto w-[95%] max-w-[1280px] rounded-[15px] px-4 py-8 sm:px-8 md:px-10 md:py-10">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
          <div className="md:pl-[8%] lg:pl-[12%]">
            <h2 id="suscribete-heading" className="sr-only">
              Suscríbete
            </h2>
            <p className="text-left text-[15px] font-light leading-[1.5] text-[#e0d4c0] md:text-right md:text-[clamp(0.95rem,1.1vw,1.15rem)] md:leading-[1.5]">
              Suscríbete para recibir notificaciones de próximas actividades,
              novedades y recibir en tu correo la meditación para su lectura y
              estudio. Pronto podrás acceder a nuevos materiales y enseñanzas.
            </p>
          </div>

          <div
            className="overflow-hidden rounded-[8px] bg-[#141414] shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
            style={{ minHeight: 410, height: 410 }}
          >
            <iframe
              src={`https://api.leadconnectorhq.com/widget/form/${FORM_ID}`}
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                borderRadius: 0,
              }}
              id={IFRAME_ID}
              data-layout={"{'id':'INLINE'}"}
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="live.escuelavaloresdivinos.org"
              data-height="410"
              data-layout-iframe-id={IFRAME_ID}
              data-form-id={FORM_ID}
              title="Suscríbete · Escuela Valores Divinos"
            />
          </div>
        </div>
      </div>

      <Script
        src="https://link.msgsndr.com/js/form_embed.js"
        strategy="lazyOnload"
      />
    </section>
  );
}
