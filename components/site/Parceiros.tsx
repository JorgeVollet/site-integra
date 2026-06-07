// Carrossel infinito de logos de parceiros (desliza da direita para a esquerda, sem buracos).
// Renderiza a lista de logos em DUAS cópias idênticas; a animação vai de 0 a -50%,
// então o fim da 1ª cópia coincide com o início da 2ª = loop perfeito e contínuo.

const LOGOS = [
  { src: "/parceiros/dinabox.png", alt: "DinaBox" },
  { src: "/parceiros/mabcloud.png", alt: "Mabcloud" },
  { src: "/parceiros/promob.png", alt: "Promob" },
  { src: "/parceiros/rhex.png", alt: "R-hex" },
  { src: "/parceiros/topsolid.png", alt: "TopSolid" },
  { src: "/parceiros/wps.png", alt: "WPS" },
  { src: "/parceiros/comac.png", alt: "COMAC" },
];

export default function Parceiros() {
  return (
    <section className="border-y border-linha bg-creme py-12 xl:py-16">
      <div className="container-wide">
        <h3 className="mb-8 text-center font-sans text-body-sm font-semibold uppercase tracking-[0.25em] text-ouro">
          Parceiros e tecnologias que integram nossas soluções
        </h3>
      </div>

      {/* faixa cinza contínua, de borda a borda, atrás dos logos */}
      <div className="marquee-wrap relative overflow-hidden bg-[#eeedec] py-6">
        {/* fades nas laterais (na cor da faixa) */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#eeedec] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#eeedec] to-transparent" />

        <div className="marquee-track">
          {/* 2 cópias idênticas para loop contínuo */}
          {[0, 1].map((copia) => (
            <ul
              key={copia}
              className="flex shrink-0 items-center"
              aria-hidden={copia === 1}
            >
              {LOGOS.map((logo, i) => (
                <li key={i} className="flex w-[180px] shrink-0 items-center justify-center px-4 md:w-[220px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-10 w-auto object-contain opacity-75 transition hover:opacity-100 md:h-12"
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
