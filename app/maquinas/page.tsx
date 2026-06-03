import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { Marca } from "@/lib/supabase/types";
import Header from "@/components/site/Header";
import { Footer, WhatsappFloat } from "@/components/site/Secoes";
import MarcaCard from "@/components/site/MarcaCard";
import { whatsappLink } from "@/lib/config";
import { WhatsappIcon } from "@/components/icons";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Catálogo de Marcas | Íntegra — CNC & Automação",
  description:
    "Conheça as marcas representadas pela Íntegra: ETools CNC, Levita Ferramentas e TM Máquinas. Máquinas CNC, nesting, router, ferramentas e automação industrial.",
};

export default async function CatalogoPage() {
  const supabase = await createClient();

  const [{ data: marcasData }, { data: maquinasData }] = await Promise.all([
    supabase.from("marcas").select("*").eq("ativo", true).order("ordem"),
    supabase.from("maquinas").select("marca_id").eq("ativo", true),
  ]);

  const marcas = (marcasData as Marca[]) ?? [];
  const maquinas = (maquinasData as { marca_id: string | null }[]) ?? [];

  const contar = (marcaId: string) =>
    maquinas.filter((m) => m.marca_id === marcaId).length;

  return (
    <>
      <Header />
      <main>
        {/* cabeçalho */}
        <section className="relative overflow-hidden bg-carvao pt-32 pb-16 text-white">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: "radial-gradient(circle at 80% 0%, rgba(200,151,47,.16), transparent 50%)" }}
          />
          <div className="container-wide relative z-10">
            <span className="eyebrow">Catálogo Íntegra</span>
            <h1 className="mt-4 max-w-[760px] font-serif text-[clamp(30px,4.5vw,56px)] leading-tight">
              As marcas que representamos
            </h1>
            <p className="mt-5 max-w-[640px] text-body-lg text-white/70">
              Da escolha da matéria-prima ao acabamento final — tecnologia para
              produzir mais, com menos desperdício e mais precisão. Escolha uma marca
              para ver os modelos disponíveis.
            </p>
          </div>
        </section>

        {/* marcas */}
        <section className="bg-creme py-16 xl:py-24">
          <div className="container-wide">
            {marcas.length === 0 ? (
              <p className="text-center text-body-lg text-preto/60">
                O catálogo está sendo preparado. Em breve, todas as marcas aqui.
              </p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {marcas.map((m) => (
                  <MarcaCard key={m.id} marca={m} qtdModelos={contar(m.id)} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-marinho py-16 text-center text-white">
          <div className="container-wide">
            <h2 className="mx-auto max-w-[640px] font-serif text-[clamp(24px,3.2vw,36px)]">
              Não sabe qual máquina é a ideal para a sua produção?
            </h2>
            <p className="mx-auto mt-4 max-w-[520px] text-body-lg text-white/70">
              Conte pra gente o seu desafio. O Ricardo analisa o seu processo e indica
              o caminho mais seguro — sem pressa e sem pressão.
            </p>
            <a
              href={whatsappLink("Olá Ricardo! Estava vendo o catálogo e quero ajuda para escolher a máquina certa.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa mt-7"
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
