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
          <p className="mb-3 text-xs font-medium tracking-[0.28em] text-[#d4a85a] uppercase">
            Comunidad EVD
          </p>
          <h2
            id="suscribete-heading"
            className="font-heading text-3xl text-[#f7f1e6] md:text-4xl"
          >
            Suscríbete
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#d7cbb8] md:text-base">
            Recibe avisos de transmisiones en vivo, meditaciones y actividades
            de la Escuela Valores Divinos.
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
