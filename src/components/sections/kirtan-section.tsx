import Image from "next/image";

const activities = [
  {
    title: "Hanuman Chalisa",
    time: "6pm (COL-ECU)",
    image: "/chalisa.jpg",
    href: "https://escuelavaloresdivinos.org/chalisa",
    buttonClass: "bg-[#c4787a] hover:bg-[#b56a6c]",
  },
  {
    title: "Medita junto a Mataji Shaktiananda",
    time: "6:30pm (COL-ECU)",
    image: "/Medita-junto-a-Mataji.jpg",
    href: "https://escuelavaloresdivinos.org/medita/",
    buttonClass: "bg-[#4a5d73] hover:bg-[#3e5166]",
  },
  {
    title: "Kirtan & Fuego Sagrado",
    time: "6:30pm (COL-ECU)",
    image: "/fuego-sagrado-1.jpg",
    href: "https://escuelavaloresdivinos.org/fuegosagrado",
    buttonClass: "bg-[#a88b6a] hover:bg-[#967a5c]",
  },
];

export function KirtanSection() {
  return (
    <section className="border-t border-white/5 py-14 md:py-16">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <h2 className="mb-10 text-center text-2xl font-light tracking-[0.18em] text-[#e0d9cc] uppercase md:mb-12 md:text-3xl">
          Próximas actividades
        </h2>

        <div className="grid gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
          {activities.map((item) => (
            <article key={item.title} className="flex flex-col items-start">
              <h3 className="text-[1.15rem] font-semibold leading-snug text-white md:text-[1.25rem]">
                {item.title}
              </h3>
              <p className="mt-1 text-sm font-normal text-[#b8b8c0] md:text-[15px]">
                {item.time}
              </p>

              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="group mt-4 block w-full"
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-[18px]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 30vw"
                  />
                </div>
              </a>

              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className={`mt-4 inline-flex items-center rounded-full px-5 py-2 text-sm font-medium text-white transition ${item.buttonClass}`}
              >
                Saber más
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
