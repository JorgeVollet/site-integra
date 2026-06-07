import type { Marca } from "@/lib/supabase/types";

// Card de MARCA (nível 1 do catálogo). Clica → /maquinas/[marca]
export default function MarcaCard({
  marca,
  qtdModelos,
}: {
  marca: Marca;
  qtdModelos?: number;
}) {
  return (
    <a
      href={`/maquinas/${marca.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-linha bg-white transition hover:-translate-y-1 hover:border-ouro hover:shadow-[0_18px_40px_rgba(11,37,69,0.12)]"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-white">
        {marca.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={marca.logo}
            alt={marca.nome}
            className="h-full w-full object-contain p-3 transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-marinho to-carvao">
            <span className="px-6 text-center font-serif text-3xl text-ouro/70">{marca.nome}</span>
          </div>
        )}
        <span className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-ouro-grad transition group-hover:scale-x-100" />
      </div>

      <div className="flex flex-1 flex-col p-7">
        <h3 className="font-serif text-h5 text-marinho">{marca.nome}</h3>
        {marca.descricao && (
          <p className="mt-2 flex-1 text-body-md text-preto/60">{marca.descricao}</p>
        )}
        <span className="mt-5 inline-flex items-center gap-1 text-body-sm font-bold uppercase tracking-wide text-ouro transition group-hover:text-marinho">
          {qtdModelos ? `Ver ${qtdModelos} ${qtdModelos === 1 ? "modelo" : "modelos"}` : "Ver modelos"} →
        </span>
      </div>
    </a>
  );
}
