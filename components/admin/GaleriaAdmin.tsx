"use client";

import { useState, useTransition, useRef } from "react";
import type { ItemGaleria } from "@/lib/supabase/types";
import { registrarItensGaleria, excluirItemGaleria } from "@/lib/actions/galeria";
import { createClient } from "@/lib/supabase/client";

export default function GaleriaAdmin({ itens }: { itens: ItemGaleria[] }) {
  const [modal, setModal] = useState(false);

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="font-serif text-h4 text-marinho">Galeria de provas sociais</h2>
          <p className="text-body-sm text-preto/55">Fotos e vídeos exibidos na página /galeria ({itens.length} itens)</p>
        </div>
        <button onClick={() => setModal(true)} className="btn-primary px-4 py-2 text-body-sm">
          + Adicionar foto/vídeo
        </button>
      </div>

      {itens.length === 0 ? (
        <p className="rounded-2xl border border-linha bg-white p-10 text-center text-preto/50">
          Nenhum item ainda. Adicione fotos e vídeos dos projetos.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {itens.map((item) => (
            <div key={item.id} className="group relative aspect-square overflow-hidden rounded-xl border border-linha bg-carvao">
              {item.tipo === "video" ? (
                <video src={item.url} muted playsInline preload="metadata" className="h-full w-full object-cover" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.url} alt={item.titulo ?? ""} className="h-full w-full object-cover" />
              )}
              <span className="absolute left-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-semibold uppercase text-white">
                {item.tipo}
              </span>
              <button
                onClick={() => { if (confirm("Excluir este item da galeria?")) excluirItemGaleria(item.id); }}
                className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-600/90 text-white opacity-0 transition group-hover:opacity-100"
                title="Excluir"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {modal && <ModalUpload onClose={() => setModal(false)} />}
    </div>
  );
}

function ModalUpload({ onClose }: { onClose: () => void }) {
  const [pending, start] = useTransition();
  const [erro, setErro] = useState("");
  const [arquivos, setArquivos] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [progresso, setProgresso] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function addFiles(lista: FileList | null) {
    if (!lista) return;
    const novos = Array.from(lista).filter(
      (f) => f.type.startsWith("image/") || f.type.startsWith("video/"),
    );
    setArquivos((prev) => [...prev, ...novos]);
  }

  function slugify(t: string) {
    return (t || "item").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "item";
  }

  function enviar() {
    if (arquivos.length === 0) { setErro("Selecione ao menos um arquivo."); return; }
    setErro("");
    const titulo = (document.getElementById("g-titulo") as HTMLInputElement)?.value.trim() || null;
    const ordemBase = Number((document.getElementById("g-ordem") as HTMLInputElement)?.value || 0);
    const supabase = createClient();

    start(async () => {
      try {
        const registros: { tipo: "foto" | "video"; url: string; titulo: string | null; ordem: number }[] = [];
        let i = 0;
        for (const f of arquivos) {
          setProgresso(`Enviando ${i + 1} de ${arquivos.length}: ${f.name}`);
          const isVideo = f.type.startsWith("video/");
          const ext = f.name.split(".").pop() || (isVideo ? "mp4" : "jpg");
          const caminho = `${slugify(titulo ?? f.name)}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}.${ext}`;
          // upload DIRETO do navegador para o Supabase (não passa pela Vercel)
          const { error: upErr } = await supabase.storage.from("galeria").upload(caminho, f, {
            contentType: f.type, upsert: false,
          });
          if (upErr) throw new Error(`Falha em "${f.name}": ${upErr.message}`);
          const { data: pub } = supabase.storage.from("galeria").getPublicUrl(caminho);
          registros.push({ tipo: isVideo ? "video" : "foto", url: pub.publicUrl, titulo, ordem: ordemBase + i });
          i++;
        }
        setProgresso("Salvando...");
        await registrarItensGaleria(registros);
        onClose();
      } catch (e) {
        setErro(e instanceof Error ? e.message : "Erro ao enviar");
        setProgresso("");
      }
    });
  }

  return (
    <div className="fixed inset-0 z-[120] flex items-start justify-center overflow-auto bg-black/50 p-4 backdrop-blur-sm"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="mt-[6vh] w-full max-w-[520px] rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-serif text-h5 text-marinho">Adicionar à galeria</h3>
          <button onClick={onClose} className="text-preto/50 hover:text-preto">✕</button>
        </div>

        {/* área de drag-and-drop */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); addFiles(e.dataTransfer.files); }}
          onClick={() => inputRef.current?.click()}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 text-center transition ${
            dragOver ? "border-ouro bg-ouro-suave/40" : "border-linha bg-creme/50 hover:border-ouro/60"
          }`}
        >
          <svg viewBox="0 0 24 24" className="mb-2 h-8 w-8 text-ouro" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M12 16V4m0 0l-4 4m4-4l4 4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" strokeLinecap="round" />
          </svg>
          <p className="text-body-md font-medium text-marinho">Arraste fotos e vídeos aqui</p>
          <p className="text-body-sm text-preto/50">ou clique para selecionar (vários de uma vez)</p>
          <input
            ref={inputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            className="hidden"
            onChange={(e) => addFiles(e.target.files)}
          />
        </div>

        {/* lista de selecionados */}
        {arquivos.length > 0 && (
          <ul className="mt-3 max-h-40 space-y-1.5 overflow-auto">
            {arquivos.map((f, i) => (
              <li key={i} className="flex items-center justify-between rounded-md bg-creme px-3 py-1.5 text-body-sm">
                <span className="truncate">
                  {f.type.startsWith("video/") ? "🎬" : "🖼️"} {f.name}{" "}
                  <span className="text-preto/40">({(f.size / 1024 / 1024).toFixed(1)} MB)</span>
                </span>
                <button onClick={() => setArquivos((p) => p.filter((_, j) => j !== i))} className="ml-2 text-preto/40 hover:text-red-600">✕</button>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-3 grid grid-cols-[1fr_auto] gap-3">
          <div>
            <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-preto/50">Título (opcional, aplica a todos)</label>
            <input id="g-titulo" className="w-full rounded-md border border-linha bg-white px-3 py-2 text-body-sm outline-none focus:border-ouro" />
          </div>
          <div className="w-24">
            <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-preto/50">Ordem</label>
            <input id="g-ordem" type="number" defaultValue={0} className="w-full rounded-md border border-linha bg-white px-3 py-2 text-body-sm outline-none focus:border-ouro" />
          </div>
        </div>

        {erro && <p className="mt-2 text-body-sm text-red-600">{erro}</p>}
        {pending && progresso && <p className="mt-2 text-center text-body-sm text-marinho">{progresso}</p>}

        <button onClick={enviar} disabled={pending} className="btn-primary mt-4 w-full disabled:opacity-60">
          {pending ? "Enviando..." : `Enviar ${arquivos.length || ""} para a galeria`}
        </button>
        <p className="mt-2 text-center text-[11px] text-mute">Upload direto e seguro. Vídeos grandes podem demorar alguns segundos cada.</p>
      </div>
    </div>
  );
}
