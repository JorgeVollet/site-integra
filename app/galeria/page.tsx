import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { ItemGaleria } from "@/lib/supabase/types";
import Header from "@/components/site/Header";
import { Footer, WhatsappFloat } from "@/components/site/Secoes";
import GaleriaGrid from "@/components/site/GaleriaGrid";
import { whatsappLink } from "@/lib/config";
import { WhatsappIcon } from "@/components/icons";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Galeria de Provas Sociais | Íntegra — CNC & Automação",
  description:
    "Veja fotos e vídeos de máquinas CNC, automações e clientes atendidos pela Íntegra. Resultados reais em marcenarias e indústrias.",
};

export default async function GaleriaPage() {
  let itens: ItemGaleria[] = [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("galeria")
      .select("*")
      .eq("ativo", true)
      .order("ordem")
      .order("criado_em", { ascending: false });
    itens = (data as ItemGaleria[]) ?? [];
  } catch (e) {
    console.error("Erro ao carregar galeria:", e);
  }

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
            <span className="eyebrow">Provas Sociais</span>
            <h1 className="mt-4 max-w-[760px] font-serif text-[clamp(30px,4.5vw,56px)] leading-tight">
              Resultados reais em quem confiou na Íntegra
            </h1>
            <p className="mt-5 max-w-[640px] text-body-lg text-white/70">
              Máquinas instaladas, automações em funcionamento e clientes satisfeitos.
              Veja na prática o que a tecnologia certa faz pela sua produção.
            </p>
          </div>
        </section>

        {/* grade */}
        <section className="bg-creme py-16 xl:py-24">
          <div className="container-wide">
            <GaleriaGrid itens={itens} />
          </div>
        </section>

        {/* CTA */}
        <section className="bg-marinho py-16 text-center text-white">
          <div className="container-wide">
            <h2 className="mx-auto max-w-[640px] font-serif text-[clamp(24px,3.2vw,36px)]">
              Quer ver a sua produção transformada assim?
            </h2>
            <a
              href={whatsappLink("Olá Ricardo! Vi a galeria de projetos e quero conversar.")}
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
