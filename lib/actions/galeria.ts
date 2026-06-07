"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

async function guard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autorizado");
  return supabase;
}

// Registra no banco itens JÁ enviados ao Storage pelo navegador.
export async function registrarItensGaleria(
  itens: { tipo: "foto" | "video"; url: string; titulo: string | null; ordem: number }[],
) {
  const supabase = await guard();
  if (!itens || itens.length === 0) return;
  await supabase.from("galeria").insert(
    itens.map((it) => ({
      tipo: it.tipo,
      url: it.url,
      titulo: it.titulo,
      ordem: it.ordem,
      ativo: true,
    })),
  );
  revalidatePath("/galeria");
  revalidatePath("/admin");
}

export async function excluirItemGaleria(id: string) {
  const supabase = await guard();
  await supabase.from("galeria").delete().eq("id", id);
  revalidatePath("/galeria");
  revalidatePath("/admin");
}
