import Image from "next/image";
import type { MeditationPost } from "@/lib/types";
import type { PodcastEpisode } from "@/lib/types";
import { PodcastEpisodes } from "@/components/sections/podcast-episodes";

type Props = {
  posts: MeditationPost[];
  source: string;
  episodes: PodcastEpisode[];
  podcastSource: string;
};

export function MeditationPosts({
  posts,
  source,
  episodes,
  podcastSource,
}: Props) {
  return (
    <section id="meditaciones" className="scroll-mt-24 py-10 md:py-14">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <h2 className="mb-8 text-center text-2xl font-light tracking-[0.06em] text-[#e0d9cc] md:mb-10 md:text-[2rem]">
          Meditaciones con Mataji Shaktiananda
        </h2>

        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-10">
          <div>
            <h3 className="mb-4 text-lg font-light tracking-[0.04em] text-[#cfd6e0] md:text-xl">
              Leer Meditaciones
            </h3>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {posts.slice(0, 4).map((post) => (
                <a
                  key={post.id}
                  href={post.url}
                  target="_blank"
                  rel="noreferrer"
                  title={post.title}
                  className="group relative block overflow-hidden rounded-[12px] bg-[#0d1b2b] shadow-[0_8px_24px_rgba(0,0,0,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(0,0,0,0.4)]"
                >
                  <div className="relative aspect-[16/10] w-full">
                    <Image
                      src={post.imageUrl || "/meditations/banner-1.jpg"}
                      alt={post.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 1024px) 45vw, 26vw"
                    />
                  </div>
                </a>
              ))}
            </div>

            {source === "mock" && (
              <p className="mt-3 text-xs text-[#9f917c]">
                Mostrando banners de respaldo (feed remoto no disponible).
              </p>
            )}
          </div>

          <PodcastEpisodes episodes={episodes} source={podcastSource} />
        </div>
      </div>
    </section>
  );
}
