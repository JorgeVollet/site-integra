import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createStaticClient } from "@/lib/supabase/static";
import type { Maquina, Marca } from "@/lib/supabase/types";
import Header from "@/components/site/Header";
import { Footer, WhatsappFloat } from "@/components/site/Secoes";
import GaleriaMaquina from "@/components/site/GaleriaMaquina";
import FormSolicitacao from "@/components/site/FormSolicitacao";
import MaquinaCard from "@/components/site/MaquinaCard";
import { whatsappLink } from "@/lib/config";
import { WhatsappIcon } from "@/components/icons";

export const revalidate = 60;
export const dynamicParams = true;

type Params = { marca: string; modelo: string };

export async function generateStaticParams() {
  const supabase = createStaticClient();
  const { data } = await supabase
    .from("maquinas")
    .select("slug, marcas:marca_id(slug)")
    .eq("ativo", true);
  return (data ?? [])
    .filter((m: { slug: string; marcas: { slug: string } | null }) => m.marcas?.slug)
    .map((m: { slug: string; marcas: { slug: string } | null }) => ({
      marca: m.marcas!.slug,
      modelo: m.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { modelo } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("maquinas").select("nome,resumo").eq("slug", modelo).maybeSingle();
  if (!data) return { title: "Modelo não encontrado | Íntegra" };
  return {
    title: `${data.nome} | Íntegra — CNC & Automação`,
    description: data.resumo ?? `Conheça a ${data.nome} na Íntegra.`,
  };
}

export default async function ModeloPage({ params }: { params: Promise<Params> }) {
  const { marca: marcaSlug, modelo } = await params;
  const supabase = await createClient();

  const { data: maquinaData } = await supabase
    .from("maquinas")
    .select("*")
    .eq("slug", modelo)
    .eq("ativo", true)
    .maybeSingle();

  if (!maquinaData) notFound();
  const maquina = maquinaData as Maquina;

  // marca + modelos relacionados da mesma marca
  let marca: Marca | null = null;
  let relacionadas: Maquina[] = [];
  if (maquina.marca_id) {
    const [{ data: mk }, { data: rel }] = await Promise.all([
      supabase.from("marcas").select("*").eq("id", maquina.marca_id).maybeSingle(),
      supabase
        .from("maquinas")
        .select("*")
        .eq("ativo", true)
        .eq("marca_id", maquina.marca_id)
        .neq("id", maquina.id)
        .order("ordem")
        .limit(3),
    ]);
    marca = (mk as Marca) ?? null;
    relacionadas = (rel as Maquina[]) ?? [];
  }

  const msgWhats = `Olá Ricardo! Tenho interesse na máquina ${maquina.nome}${marca ? ` (${marca.nome})` : ""}. Pode me passar mais informações?`;

  return (
    <>
      <Header />
      <main>
        {/* breadcrumb */}
        <div className="bg-carvao pt-28 pb-2">
          <div className="container-wide text-body-sm text-white/60">
            <a href="/" className="hover:text-ouro-claro">Início</a>
            <span className="px-2">/</span>
            <a href="/maquinas" className="hover:text-ouro-claro">Catálogo</a>
            {marca && (
              <>
                <span className="px-2">/</span>
                <a href={`/maquinas/${marca.slug}`} className="hover:text-ouro-claro">{marca.nome}</a>
              </>
            )}
            <span className="px-2">/</span>
            <span className="text-white/90">{maquina.nome}</span>
          </div>
        </div>

        {/* topo: galeria + info */}
        <section className="bg-carvao pb-16 text-white">
          <div className="container-wide grid gap-12 lg:grid-cols-2">
            <GaleriaMaquina fotos={maquina.fotos ?? []} nome={maquina.nome} />

            <div className="flex flex-col">
              {marca && <span className="eyebrow">{marca.nome}</span>}
              <h1 className="mt-3 font-serif text-[clamp(28px,4vw,48px)] leading-tight">
                {maquina.nome}
              </h1>
              {maquina.resumo && (
                <p className="mt-4 text-body-lg text-white/75">{maquina.resumo}</p>
              )}

              <div className="mt-8 flex flex-wrap gap-3">
                <a href={whatsappLink(msgWhats)} target="_blank" rel="noopener noreferrer" className="btn-wa">
                  <WhatsappIcon className="h-5 w-5" />
                  Solicitar orçamento
                </a>
                <a href="#form" className="btn-ghost">Pedir pelo formulário</a>
              </div>

              <p className="mt-6 text-body-sm text-white/50">
                Atendimento consultivo · O Ricardo ajuda você a avaliar se esta é a
                máquina ideal para a sua produção.
              </p>
            </div>
          </div>
        </section>

        {/* descrição / especificações */}
        {maquina.descricao && (
          <section className="bg-creme py-16">
            <div className="container-wide max-w-[820px]">
              <h2 className="mb-5 font-serif text-h4 text-marinho">Especificações e detalhes</h2>
              <div className="whitespace-pre-wrap text-body-lg leading-relaxed text-preto/75">
                {maquina.descricao}
              </div>
            </div>
          </section>
        )}

        {/* formulário vinculado à máquina */}
        <section id="form" className="bg-creme-dark py-16">
          <div className="container-wide max-w-[680px]">
            <div className="rounded-2xl bg-white p-7 shadow-sm sm:p-9">
              <h2 className="mb-1 font-serif text-h5 text-marinho">
                Solicite um orçamento da {maquina.nome}
              </h2>
              <p className="mb-6 text-body-md text-preto/60">
                Preencha e o Ricardo entra em contato com as informações. Sem compromisso.
              </p>
              <FormSolicitacao maquinaId={maquina.id} />
            </div>
          </div>
        </section>

        {/* relacionadas */}
        {relacionadas.length > 0 && marca && (
          <section className="bg-creme py-16">
            <div className="container-wide">
              <div className="mb-7 flex items-center gap-4">
                <h2 className="font-serif text-h4 text-marinho">Outros modelos da {marca.nome}</h2>
                <span className="h-px flex-1 bg-linha" />
              </div>
              <div className="flex flex-wrap justify-center gap-7">
                {relacionadas.map((m) => (
                  <div key={m.id} className="w-full max-w-[520px] lg:w-[500px]">
                    <MaquinaCard maquina={m} marcaSlug={marca.slug} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <WhatsappFloat />
    </>
  );
}
