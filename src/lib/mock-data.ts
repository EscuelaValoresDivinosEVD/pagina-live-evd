import type { MeditationPost, PodcastEpisode } from "@/lib/types";

/** Últimos posts públicos observados en shaktianandama.com/meditaciones/ */
export const mockMeditationPosts: MeditationPost[] = [
  {
    id: "mock-1",
    title: "Tu respiro modula, vacía y sana",
    excerpt:
      "¿Crees que el respiro se piensa? ¿Piensas para respirar? Y no hace falta que tengas una respuesta, simplemente, y lo sabes, el respiro se produce…",
    date: "2026-09-30",
    url: "https://shaktianandama.com/meditaciones/",
    imageUrl: "/podcast-cover.jpg",
  },
  {
    id: "mock-2",
    title: "Invoca a la conciencia",
    excerpt:
      "Invócate a lo que creas seas, con respiraciones sutiles pero profundas, tal y como has adiestrado este sistema físico…",
    date: "2026-09-23",
    url: "https://shaktianandama.com/meditaciones/",
    imageUrl: "/podcast-cover.jpg",
  },
  {
    id: "mock-3",
    title: "Tu servicio hacia ti",
    excerpt:
      "Permítete pensar que respiras, que tu mente sepa lo que haces, y que comprenda además, lo que quieres en este momento: servirte.",
    date: "2026-09-16",
    url: "https://shaktianandama.com/meditaciones/",
    imageUrl: "/podcast-cover.jpg",
  },
  {
    id: "mock-4",
    title: "Tu acuerdo fue encontrarte",
    excerpt:
      "Hazte presente y respira, hazte consciente y respira, llenándote como quieres y puedes, así como vaciándote…",
    date: "2026-09-09",
    url: "https://shaktianandama.com/meditaciones/",
    imageUrl: "/podcast-cover.jpg",
  },
];

export const mockPodcastEpisodes: PodcastEpisode[] = [
  {
    id: "mock-ep-1",
    title: "Tu respiro modula, vacía y sana",
    description:
      "Me abro en mi espacio, me hago un tiempo interno y me comunico con mi Ser.",
    pubDate: "2026-10-02T17:39:40.000Z",
    duration: "00:35:01",
    audioUrl: null,
    link: "https://open.spotify.com/show/5zDFfqLFzHcOtTLucM77yR",
    imageUrl: "/podcast-cover.jpg",
  },
  {
    id: "mock-ep-2",
    title: "Invoca a la conciencia",
    description:
      "Invoco a la conciencia que me habita, la insustancia capaz de crear lo que mi sustancia es.",
    pubDate: "2026-09-29T20:02:56.000Z",
    duration: "00:37:34",
    audioUrl: null,
    link: "https://open.spotify.com/show/5zDFfqLFzHcOtTLucM77yR",
    imageUrl: "/podcast-cover.jpg",
  },
  {
    id: "mock-ep-3",
    title: "Tu servicio hacia ti",
    description:
      "Meditar es la más alta expresión de mi servicio hacia mí.",
    pubDate: "2026-09-21T20:54:30.000Z",
    duration: "00:37:17",
    audioUrl: null,
    link: "https://open.spotify.com/show/5zDFfqLFzHcOtTLucM77yR",
    imageUrl: "/podcast-cover.jpg",
  },
  {
    id: "mock-ep-4",
    title: "Tu acuerdo fue encontrarte",
    description:
      "En un mundo que me lleva a consumir tanto, haciéndome creer en tal necesidad…",
    pubDate: "2026-09-11T18:02:20.000Z",
    duration: "00:39:44",
    audioUrl: null,
    link: "https://open.spotify.com/show/5zDFfqLFzHcOtTLucM77yR",
    imageUrl: "/podcast-cover.jpg",
  },
];
