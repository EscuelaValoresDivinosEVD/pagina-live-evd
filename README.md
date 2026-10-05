# EVD LIVE (migración Next.js)

Migración de [live.evdsky.com](https://live.evdsky.com/) fuera de WordPress a **Next.js + React + TypeScript + Tailwind + shadcn/ui**.

Usuario: Cesar Valderrama · Escuela Valores Divinos.

## Qué incluye

1. **Live de YouTube** — detecta si el canal está en vivo; al pulsar Play carga el embed o avisa que no hay live.
2. **Meditaciones escritas** — últimos 4 posts de [shaktianandama.com](https://shaktianandama.com/meditaciones/) (con fallback local si Cloudflare bloquea).
3. **Podcast Anchor** — últimos 4 episodios del RSS `https://anchor.fm/s/5ae7e064/podcast/rss` (*Meditaciones Guiadas con Mataji Shaktiananda*).
4. **Suscríbete** — embed real de LeadConnector / GoHighLevel (form id `1mA20h8rIqVPdvsD22Dg` + `form_embed.js`).

## Cómo correr

```bash
npm install
npm run dev
```

Abre [http://127.0.0.1:43127](http://127.0.0.1:43127).

## Variables de entorno

Copia `.env.example` a `.env.local`:

| Variable | Obligatoria | Notas |
|---|---|---|
| `YOUTUBE_CHANNEL_ID` | No | Default: `UCs6BtP_OoMkh18UjszWIuqg` |
| `YOUTUBE_API_KEY` | No | Mejora la detección de live vía YouTube Data API v3 |
| `ANCHOR_RSS_URL` | No | Default del podcast de meditaciones |
| `MEDITATIONS_FEED_URL` | No | Feed WP; si falla, se usan mocks |

El embed CRM ya está integrado en código; no requiere variable de entorno.

## Deploy en Cloudflare Workers (OpenNext)

Esta app usa SSR + Route Handlers, así que se publica en **Workers** (no Pages estático).

```bash
# Primera vez (ya hecho en este repo):
# npx @opennextjs/cloudflare migrate

# Preview local en runtime Workers
npm run preview

# Deploy a producción
npm run deploy
```

Worker actual: [https://live-evdsky.adminweb-e49.workers.dev](https://live-evdsky.adminweb-e49.workers.dev)

Secrets (producción):

```bash
npx wrangler secret put YOUTUBE_API_KEY
npx wrangler secret put YOUTUBE_CHANNEL_ID
# …y el resto de vars de .env.example
```

Para dominio custom (`live.evdsky.com`): Cloudflare Dashboard → Workers → `live-evdsky` → Settings → Domains & Routes.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS v4
- shadcn/ui (Button, Card, Input, Label, Separator, Accordion)
- `@opennextjs/cloudflare` + Wrangler
