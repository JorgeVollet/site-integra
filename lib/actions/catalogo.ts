"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function slugify(t: string) {
  return t
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function guard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autorizado");
  return supabase;
}

function revalida() {
  revalidatePath("/");
  revalidatePath("/maquinas");
  revalidatePath("/admin");
}

/* ---------------- MARCAS ---------------- */
export async function salvarMarca(formData: FormData) {
  const supabase = await guard();
  const id = (formData.get("id") as string) || null;
  const nome = (formData.get("nome") as string)?.trim();
  if (!nome) return;
  const dados = {
    nome,
    slug: ((formData.get("slug") as string)?.trim() || slugify(nome)),
    descricao: (formData.get("descricao") as string)?.trim() || null,
    chamada: (formData.get("chamada") as string)?.trim() || null,
    ordem: Number(formData.get("ordem") || 0),
    ativo: formData.get("ativo") === "on",
  };
  if (id) {
    await supabase.from("marcas").update(dados).eq("id", id);
  } else {
    await supabase.from("marcas").insert(dados);
  }
  revalida();
}

export async function excluirMarca(id: string) {
  const supabase = await guard();
  await supabase.from("marcas").delete().eq("id", id);
  revalida();
}

/* ---------------- MÁQUINAS ---------------- */
export async function salvarMaquina(formData: FormData) {
  const supabase = await guard();
  const id = (formData.get("id") as string) || null;
  const nome = (formData.get("nome") as string)?.trim();
  if (!nome) return;

  // upload de fotos (vários arquivos)
  const fotosExistentes = ((formData.get("fotos_existentes") as string) || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const arquivos = formData.getAll("fotos") as File[];
  const novasUrls: string[] = [];
  for (const file of arquivos) {
    if (!file || file.size === 0) continue;
    const ext = file.name.split(".").pop() || "jpg";
    const caminho = `${slugify(nome)}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}.${ext}`;
    const { error } = await supabase.storage.from("maquinas").upload(caminho, file, {
      contentType: file.type || "image/jpeg",
      upsert: false,
    });
    if (!error) {
      const { data } = supabase.storage.from("maquinas").getPublicUrl(caminho);
      novasUrls.push(data.publicUrl);
    }
  }

  const dados = {
    nome,
    slug: ((formData.get("slug") as string)?.trim() || slugify(nome)),
    marca_id: (formData.get("marca_id") as string) || null,
    resumo: (formData.get("resumo") as string)?.trim() || null,
    descricao: (formData.get("descricao") as string)?.trim() || null,
    fotos: [...fotosExistentes, ...novasUrls],
    destaque: formData.get("destaque") === "on",
    ordem: Number(formData.get("ordem") || 0),
    ativo: formData.get("ativo") === "on",
  };

  if (id) {
    await supabase.from("maquinas").update(dados).eq("id", id);
  } else {
    await supabase.from("maquinas").insert(dados);
  }
  revalida();
}

export async function excluirMaquina(id: string) {
  const supabase = await guard();
  await supabase.from("maquinas").delete().eq("id", id);
  revalida();
}
