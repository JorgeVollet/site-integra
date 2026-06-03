import { createClient } from "@/lib/supabase/server";
import type { Depoimento, Marca } from "@/lib/supabase/types";
import Header from "@/components/site/Header";
import Hero from "@/components/site/Hero";
import Faq from "@/components/site/Faq";
import LeadPopup from "@/components/site/LeadPopup";
import {
  ParaQuem,
  Manifesto,
  Diferencial,
  Numeros,
  Depoimentos,
  Sobre,
  CatalogoHome,
  CtaTransbordo,
  Footer,
  WhatsappFloat,
} from "@/components/site/Secoes";

// Revalida o conteúdo do banco a cada 60s (catálogo/depoimentos)
export const revalidate = 60;

export default async function Home() {
  const supabase = await createClient();

  const [{ data: marcas }, { data: depoimentos }] = await Promise.all([
    supabase
      .from("marcas")
      .select("*")
      .eq("ativo", true)
      .order("ordem"),
    supabase
      .from("depoimentos")
      .select("*")
      .eq("ativo", true)
      .order("ordem"),
  ]);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <ParaQuem />
        <Manifesto />
        <Diferencial />
        <Numeros />
        <Depoimentos depoimentos={(depoimentos as Depoimento[]) ?? []} />
        <Sobre />
        <CatalogoHome marcas={(marcas as Marca[]) ?? []} />
        <Faq />
        <CtaTransbordo />
      </main>
      <Footer />
      <WhatsappFloat />
      <LeadPopup />
    </>
  );
}
