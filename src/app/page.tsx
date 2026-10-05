import { SiteHeader } from "@/components/sections/site-header";
import { HeroIntro } from "@/components/sections/hero-intro";
import { MatajiSection } from "@/components/sections/mataji-section";
import { LivePlayer } from "@/components/sections/live-player";
import { MeditationPosts } from "@/components/sections/meditation-posts";
import { KirtanSection } from "@/components/sections/kirtan-section";
import { SubscribeEmbed } from "@/components/sections/subscribe-embed";
import { getLiveStatus } from "@/lib/youtube";
import { getLatestEpisodes } from "@/lib/podcast";
import { getLatestMeditations } from "@/lib/meditations";

export const revalidate = 60;

export default async function HomePage() {
  const [liveStatus, podcast, meditations] = await Promise.all([
    getLiveStatus(),
    getLatestEpisodes(4),
    getLatestMeditations(),
  ]);

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <HeroIntro />
        <div className="pb-10 md:pb-14">
          <LivePlayer initialStatus={liveStatus} />
        </div>
        <MatajiSection />
        <MeditationPosts
          posts={meditations.posts}
          source={meditations.source}
          episodes={podcast.episodes}
          podcastSource={podcast.source}
        />
        <KirtanSection />
        <SubscribeEmbed />
      </main>
    </>
  );
}
