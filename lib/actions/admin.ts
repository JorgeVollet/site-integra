"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

type Tabela = "solicitacoes" | "leads";

async function guard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autorizado");
  return supabase;
}

export async function atualizarStatus(tabela: Tabela, id: string, status: string) {
  const supabase = await guard();
  await supabase.from(tabela).update({ status }).eq("id", id);
  revalidatePath("/admin");
}

export async function atualizarNotas(tabela: Tabela, id: string, notas: string) {
  const supabase = await guard();
  await supabase.from(tabela).update({ notas }).eq("id", id);
  revalidatePath("/admin");
}

export async function alternarFavorito(tabela: Tabela, id: string, favorito: boolean) {
  const supabase = await guard();
  await supabase.from(tabela).update({ favorito }).eq("id", id);
  revalidatePath("/admin");
}

export async function excluirRegistro(tabela: Tabela, id: string) {
  const supabase = await guard();
  await supabase.from(tabela).delete().eq("id", id);
  revalidatePath("/admin");
}
