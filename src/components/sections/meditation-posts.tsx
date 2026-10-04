import Image from "next/image";
import type { MeditationPost } from "@/lib/types";
import { siteConfig } from "@/lib/config";

type Props = {
  posts: MeditationPost[];
  source: string;
};

function formatDate(value: string) {
  if (!value) return "";
  try {
    return new Intl.DateTimeFormat("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export function MeditationPosts({ posts, source }: Props) {
  return (
    <section
      id="meditaciones"
      className="scroll-mt-24 border-t border-white/10 py-16 md:py-20"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-medium tracking-[0.28em] text-[#d4a85a] uppercase">
              shaktianandama.com
            </p>
            <h2 className="font-heading text-3xl text-[#f7f1e6] md:text-4xl">
              Últimas meditaciones escritas
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#d7cbb8] md:text-base">
              Los 4 posts más recientes del archivo de meditaciones de Mataji
              Shaktiananda.
            </p>
          </div>
          <a
            href={siteConfig.meditationsArchiveUrl}
            target="_blank"
            rel="noreferrer"
            className="text-sm tracking-[0.16em] text-[#d4a85a] uppercase transition hover:text-[#f0d59a]"
          >
            Ver archivo →
          </a>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col overflow-hidden border border-white/10 bg-[#0d1b2b]/55 transition hover:border-[#d4a85a]/45"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={post.imageUrl || "/podcast-cover.jpg"}
                  alt=""
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <p className="text-xs tracking-[0.14em] text-[#d4a85a] uppercase">
                  {formatDate(post.date)}
                </p>
                <h3 className="font-heading mt-2 text-xl leading-snug text-[#f7f1e6]">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm text-[#cbbda8]">
                  {post.excerpt}
                </p>
              </div>
            </a>
          ))}
        </div>

        {source === "mock" && (
          <p className="mt-4 text-xs text-[#9f917c]">
            Mostrando posts de respaldo (Cloudflare bloqueó el feed remoto).
          </p>
        )}
      </div>
    </section>
  );
}
