"use client";

import Script from "next/script";

const FORM_ID = "1mA20h8rIqVPdvsD22Dg";
const IFRAME_ID = `inline-${FORM_ID}`;

/**
 * Embed real de LeadConnector / GoHighLevel para «Suscríbete».
 * Fuente: store del Project → internal/crm-suscribete-embed.html
 */
export function SubscribeEmbed() {
  return (
    <section
      id="suscribete"
      className="border-t border-white/10 bg-[#08121f] py-16 md:py-20"
      aria-labelledby="suscribete-heading"
    >
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <div className="mb-8 text-center">
          <h2
            id="suscribete-heading"
            className="text-3xl font-light tracking-[0.12em] text-[#e0d9cc] uppercase md:text-4xl"
          >
            Suscríbete
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#e0d4c0] md:text-base">
            Suscríbete para recibir notificaciones de próximas actividades,
            novedades y recibir en tu correo la meditación para su lectura y
            estudio. Pronto podrás acceder a nuevos materiales y enseñanzas.
          </p>
        </div>

        <div
          className="overflow-hidden rounded-sm bg-white shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
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
            title="live.escuelavaloresdivinos.org"
          />
        </div>
      </div>

      <Script
        src="https://link.msgsndr.com/js/form_embed.js"
        strategy="lazyOnload"
      />
    </section>
  );
}
