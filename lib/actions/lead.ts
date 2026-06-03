"use server";

import { createClient } from "@/lib/supabase/server";

export type LeadState = { ok: boolean; message: string };

export async function enviarLead(
  _prev: LeadState,
  formData: FormData,
): Promise<LeadState> {
  const nome = (formData.get("nome") as string)?.trim();
  const telefone = (formData.get("telefone") as string)?.trim();
  const email = (formData.get("email") as string)?.trim() || undefined;
  const empresa = (formData.get("empresa") as string)?.trim() || undefined;
  const nicho = (formData.get("nicho") as string)?.trim() || undefined;
  const cidade = (formData.get("cidade") as string)?.trim() || undefined;
  const estado = (formData.get("estado") as string)?.trim() || undefined;

  if (!nome || nome.length < 2) {
    return { ok: false, message: "Por favor, informe seu nome." };
  }
  if (!telefone || telefone.replace(/\D/g, "").length < 10) {
    return { ok: false, message: "Por favor, informe um telefone válido." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("leads").insert({
    nome,
    telefone,
    email,
    empresa,
    nicho,
    cidade,
    estado,
    origem: "popup",
  });

  if (error) {
    return { ok: false, message: "Não foi possível enviar agora. Tente novamente." };
  }

  return {
    ok: true,
    message: "Inscrição confirmada! Em breve você recebe nossas melhores ofertas. 🎉",
  };
}
