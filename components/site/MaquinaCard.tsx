import type { Maquina } from "@/lib/supabase/types";

// Card de máquina/modelo. Leva para /maquinas/[marca]/[modelo].
// Se a máquina ainda não tem foto, mostra um placeholder elegante com a inicial.
export default function MaquinaCard({
  maquina,
  marcaSlug,
}: {
  maquina: Maquina;
  marcaSlug: string;
}) {
  const capa = maquina.fotos?.[0];

  return (
    <a
      href={`/maquinas/${marcaSlug}/${maquina.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-linha bg-white transition hover:-translate-y-1 hover:border-ouro hover:shadow-[0_18px_40px_rgba(11,37,69,0.12)]"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-creme-dark">
        {capa ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={capa}
            alt={maquina.nome}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-marinho to-carvao">
            <span className="font-serif text-6xl text-ouro/60">{maquina.nome.charAt(0)}</span>
          </div>
        )}
        <span className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-ouro-grad transition group-hover:scale-x-100" />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-sans text-h6 text-marinho">{maquina.nome}</h3>
        {maquina.resumo && (
          <p className="mt-2 flex-1 text-body-md text-preto/60">{maquina.resumo}</p>
        )}
        <span className="mt-4 inline-flex items-center gap-1 text-body-sm font-bold uppercase tracking-wide text-ouro transition group-hover:text-marinho">
          Ver detalhes →
        </span>
      </div>
    </a>
  );
}
