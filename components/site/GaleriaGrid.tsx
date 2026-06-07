"use client";

import { useState } from "react";
import type { ItemGaleria } from "@/lib/supabase/types";

export default function GaleriaGrid({ itens }: { itens: ItemGaleria[] }) {
  const [aberto, setAberto] = useState<ItemGaleria | null>(null);

  if (!itens || itens.length === 0) {
    return (
      <p className="rounded-2xl border border-linha bg-white p-12 text-center text-body-lg text-preto/55">
        Em breve, fotos e vídeos dos nossos projetos. Acompanhe!
      </p>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
        {itens.map((item) => (
          <button
            key={item.id}
            onClick={() => setAberto(item)}
            className="group relative aspect-square overflow-hidden rounded-xl border border-linha bg-carvao"
          >
            {item.tipo === "video" ? (
              <>
                {item.poster ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.poster} alt={item.titulo ?? "Vídeo"} className="h-full w-full object-cover transition group-hover:scale-105" />
                ) : (
                  <video
                    src={item.url}
                    muted
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover transition group-hover:scale-105"
                  />
                )}
                {/* ícone play */}
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black/45 backdrop-blur-sm transition group-hover:bg-ouro/80">
                    <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-white" aria-hidden><path d="M8 5v14l11-7z" /></svg>
                  </span>
                </span>
              </>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.url} alt={item.titulo ?? "Foto"} className="h-full w-full object-cover transition group-hover:scale-105" />
            )}
            {item.titulo && (
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-left text-body-sm text-white opacity-0 transition group-hover:opacity-100">
                {item.titulo}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* lightbox */}
      {aberto && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setAberto(null)}
        >
          <button
            onClick={() => setAberto(null)}
            aria-label="Fechar"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20"
          >
            ✕
          </button>
          <div className="max-h-[88vh] max-w-[1100px]" onClick={(e) => e.stopPropagation()}>
            {aberto.tipo === "video" ? (
              <video src={aberto.url} controls autoPlay playsInline className="max-h-[88vh] w-auto rounded-xl" />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={aberto.url} alt={aberto.titulo ?? "Foto"} className="max-h-[88vh] w-auto rounded-xl" />
            )}
            {aberto.titulo && (
              <p className="mt-3 text-center text-body-md text-white/80">{aberto.titulo}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
