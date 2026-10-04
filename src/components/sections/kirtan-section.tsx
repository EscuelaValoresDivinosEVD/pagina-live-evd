import Image from "next/image";

const activities = [
  {
    title: "Hanuman Chalisa",
    time: "6pm (COL-ECU)",
    image: "/chalisa.jpg",
    href: "https://escuelavaloresdivinos.org/chalisa",
  },
  {
    title: "Medita junto a Mataji Shaktiananda",
    time: "6:30pm (COL-ECU)",
    image: "/Medita-junto-a-Mataji.jpg",
    href: "https://escuelavaloresdivinos.org/medita/",
  },
  {
    title: "Kirtan & Fuego Sagrado",
    time: "6:30pm (COL-ECU)",
    image: "/fuego-sagrado-1.jpg",
    href: "https://escuelavaloresdivinos.org/fuegosagrado",
  },
];

export function KirtanSection() {
  return (
    <section className="border-t border-white/5 py-16 md:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <h2 className="mb-10 text-center text-2xl font-light tracking-[0.18em] text-[#e0d9cc] uppercase md:text-3xl">
          Próximas actividades
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {activities.map((item) => (
            <a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="group overflow-hidden rounded-[15px] border border-white/10 bg-[#0a1423]/40 transition hover:border-[#69e5e7]/40"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="space-y-2 p-5 text-center">
                <h3 className="text-lg font-light leading-snug text-[#e0d9cc]">
                  {item.title}
                </h3>
                <p className="text-sm text-[#69e5e7]">{item.time}</p>
                <span className="inline-block pt-1 text-xs tracking-[0.16em] text-[#a4e5e8] uppercase">
                  Saber más →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
