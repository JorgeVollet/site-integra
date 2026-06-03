"use server";

import { createClient } from "@/lib/supabase/server";
import type { NovaSolicitacao } from "@/lib/supabase/types";

export type FormState = {
  ok: boolean;
  message: string;
};

export async function enviarSolicitacao(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const nome = (formData.get("nome") as string)?.trim();
  const telefone = (formData.get("telefone") as string)?.trim();
  const email = (formData.get("email") as string)?.trim() || undefined;
  const empresa = (formData.get("empresa") as string)?.trim() || undefined;
  const mensagem = (formData.get("mensagem") as string)?.trim() || undefined;
  const maquina_id = (formData.get("maquina_id") as string)?.trim() || undefined;

  // Validação simples server-side
  if (!nome || nome.length < 2) {
    return { ok: false, message: "Por favor, informe seu nome." };
  }
  if (!telefone || telefone.replace(/\D/g, "").length < 10) {
    return { ok: false, message: "Por favor, informe um telefone válido." };
  }

  const payload: NovaSolicitacao = { nome, telefone, email, empresa, mensagem, maquina_id };

  const supabase = await createClient();
  const { error } = await supabase.from("solicitacoes").insert(payload);

  if (error) {
    return {
      ok: false,
      message: "Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp.",
    };
  }

  return {
    ok: true,
    message: "Recebemos sua solicitação! O Ricardo vai entrar em contato em breve.",
  };
}
