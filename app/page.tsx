import { createClient } from "@/lib/supabase/server";
import type { Depoimento, Marca } from "@/lib/supabase/types";
import Header from "@/components/site/Header";
import Hero from "@/components/site/Hero";
import Faq from "@/components/site/Faq";
import Parceiros from "@/components/site/Parceiros";
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

export const dynamic = "force-dynamic";

export default async function Home() {
  let marcas: Marca[] = [];
  let depoimentos: Depoimento[] = [];
  try {
    const supabase = await createClient();
    const [r1, r2] = await Promise.all([
      supabase.from("marcas").select("*").eq("ativo", true).order("ordem"),
      supabase.from("depoimentos").select("*").eq("ativo", true).order("ordem"),
    ]);
    marcas = (r1.data as Marca[]) ?? [];
    depoimentos = (r2.data as Depoimento[]) ?? [];
  } catch (e) {
    console.error("Erro ao carregar dados da home:", e);
  }

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
        <Parceiros />
        <Faq />
        <CtaTransbordo />
      </main>
      <Footer />
      <WhatsappFloat />
      <LeadPopup />
    </>
  );
}
