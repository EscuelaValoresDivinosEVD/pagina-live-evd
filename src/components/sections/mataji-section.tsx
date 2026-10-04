import Image from "next/image";

export function MatajiSection() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="relative mx-auto aspect-square w-[78%] max-w-[420px] lg:w-full">
          <Image
            src="/fondo-Ma.jpg"
            alt="Mataji Shaktiananda"
            fill
            className="rounded-full object-cover shadow-[0_2px_58px_60px_#0c1422]"
            sizes="(max-width: 1024px) 78vw, 420px"
            priority={false}
          />
        </div>

        <div className="space-y-6 text-[#e0d3ba]">
          <div className="space-y-2 font-serif text-lg leading-relaxed md:text-xl">
            <p>“¿Qué o quién es un meditador?</p>
            <p>Quien a través de sí mismo busca encontrarse.</p>
            <p>Quien sabe habita aquí y allá, y busca unirse.</p>
            <p>Quien sabe que su Ser lo contiene todo”.</p>
          </div>
          <p className="text-sm leading-relaxed md:text-base">
            Meditar es la experiencia interna del alma, la forma de contacto
            entre el alma-mente individual y su conciencia cósmica. Es la visión
            de la belleza y la verdad del Ser.
          </p>
          <details className="group rounded-none border-0 bg-transparent">
            <summary className="cursor-pointer list-none text-sm tracking-[0.12em] text-[#69e5e7] uppercase transition hover:text-[#a4e5e8]">
              Leer más
            </summary>
            <div className="mt-4 space-y-4 text-sm leading-relaxed md:text-base">
              <p>
                Las Meditaciones junto a Mataji Shaktiananda son un evento
                único, surgen de la Esfera Babaji y se ofrendan a los seres
                despiertos a través de los filamentos de Luz que la Madre
                sostiene en conexión plena con los planos de Luz.
              </p>
              <p>
                Cada encuentro genera una nueva aventura hacia el Ser, donde
                Shakti Ma se dispone para entregar la enseñanza de la Luz que
                su memoria cósmica posee. En esos momentos, no hay nada
                previamente preparado, el universo evolutivo se abre para
                contener al meditador en sus potentes corrientes de ascensión.
              </p>
              <p>
                En cada meditación guiada por la Madre Shaktiananda, se genera
                la atmósfera propicia para que el alma se disponga a realizar el
                contacto interno más elevado, aquel que lo reconecta con su
                realidad divina.
              </p>
              <p>
                Experimenta la expansión de tus campos sutiles, medita junto a
                un Ser que habita la Meditación como un estado de la conciencia
                cósmica.
              </p>
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
