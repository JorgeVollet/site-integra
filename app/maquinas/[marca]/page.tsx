import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createStaticClient } from "@/lib/supabase/static";
import type { Marca, Maquina } from "@/lib/supabase/types";
import Header from "@/components/site/Header";
import { Footer, WhatsappFloat } from "@/components/site/Secoes";
import MaquinaCard from "@/components/site/MaquinaCard";
import { whatsappLink } from "@/lib/config";
import { WhatsappIcon } from "@/components/icons";

export const revalidate = 60;
export const dynamicParams = true;

type Params = { marca: string };

export async function generateStaticParams() {
  const supabase = createStaticClient();
  const { data } = await supabase.from("marcas").select("slug").eq("ativo", true);
  return (data ?? []).map((m: { slug: string }) => ({ marca: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { marca: slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("marcas").select("nome,descricao").eq("slug", slug).maybeSingle();
  if (!data) return { title: "Marca não encontrada | Íntegra" };
  return {
    title: `${data.nome} | Catálogo Íntegra`,
    description: data.descricao ?? `Modelos da marca ${data.nome} na Íntegra.`,
  };
}

export default async function MarcaPage({ params }: { params: Promise<Params> }) {
  const { marca: slug } = await params;
  const supabase = await createClient();

  const { data: marcaData } = await supabase
    .from("marcas")
    .select("*")
    .eq("slug", slug)
    .eq("ativo", true)
    .maybeSingle();

  if (!marcaData) notFound();
  const marca = marcaData as Marca;

  const { data: modelosData } = await supabase
    .from("maquinas")
    .select("*")
    .eq("ativo", true)
    .eq("marca_id", marca.id)
    .order("ordem");

  const modelos = (modelosData as Maquina[]) ?? [];

  return (
    <>
      <Header />
      <main>
        {/* breadcrumb + cabeçalho */}
        <section className="relative overflow-hidden bg-carvao pt-28 pb-14 text-white">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: "radial-gradient(circle at 80% 0%, rgba(200,151,47,.16), transparent 50%)" }}
          />
          <div className="container-wide relative z-10">
            <div className="text-body-sm text-white/60">
              <a href="/" className="hover:text-ouro-claro">Início</a>
              <span className="px-2">/</span>
              <a href="/maquinas" className="hover:text-ouro-claro">Catálogo</a>
              <span className="px-2">/</span>
              <span className="text-white/90">{marca.nome}</span>
            </div>
            <h1 className="mt-5 font-serif text-[clamp(28px,4.2vw,52px)] leading-tight">{marca.nome}</h1>
            {(marca.chamada || marca.descricao) && (
              <p className="mt-4 max-w-[720px] text-body-lg leading-relaxed text-white/80">
                {marca.chamada || marca.descricao}
              </p>
            )}
          </div>
        </section>

        {/* modelos */}
        <section className="bg-creme py-16 xl:py-24">
          <div className="container-wide">
            {modelos.length === 0 ? (
              <div className="text-center">
                <p className="text-body-lg text-preto/60">
                  Os modelos desta marca estão sendo cadastrados. Fale com o Ricardo
                  para conhecer as opções disponíveis.
                </p>
                <a
                  href={whatsappLink(`Olá Ricardo! Quero conhecer os modelos da ${marca.nome}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary mt-6"
                >
                  Falar sobre a {marca.nome}
                </a>
              </div>
            ) : (
              <div className="flex flex-wrap justify-center gap-7">
                {modelos.map((m) => (
                  <div key={m.id} className="w-full max-w-[520px] lg:w-[500px]">
                    <MaquinaCard maquina={m} marcaSlug={marca.slug} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-marinho py-14 text-center text-white">
          <div className="container-wide">
            <h2 className="mx-auto max-w-[600px] font-serif text-[clamp(22px,3vw,32px)]">
              Quer ajuda para escolher o modelo certo da {marca.nome}?
            </h2>
            <a
              href={whatsappLink(`Olá Ricardo! Quero ajuda para escolher um modelo da ${marca.nome}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa mt-6"
            >
              <WhatsappIcon className="h-5 w-5" />
              Falar com o Ricardo
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsappFloat />
    </>
  );
}
