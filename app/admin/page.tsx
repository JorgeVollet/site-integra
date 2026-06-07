import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Solicitacao, Lead, Marca, Maquina, ItemGaleria } from "@/lib/supabase/types";
import AdminPanel from "@/components/admin/AdminPanel";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const [
    { data: solicitacoes },
    { data: leads },
    { data: marcas },
    { data: maquinas },
    { data: galeria },
  ] = await Promise.all([
    supabase.from("solicitacoes").select("*").order("criado_em", { ascending: false }),
    supabase.from("leads").select("*").order("criado_em", { ascending: false }),
    supabase.from("marcas").select("*").order("ordem"),
    supabase.from("maquinas").select("*").order("ordem"),
    supabase.from("galeria").select("*").order("ordem").order("criado_em", { ascending: false }),
  ]);

  return (
    <AdminPanel
      solicitacoes={(solicitacoes as Solicitacao[]) ?? []}
      leads={(leads as Lead[]) ?? []}
      marcas={(marcas as Marca[]) ?? []}
      maquinas={(maquinas as Maquina[]) ?? []}
      galeria={(galeria as ItemGaleria[]) ?? []}
      email={user.email ?? ""}
    />
  );
}
