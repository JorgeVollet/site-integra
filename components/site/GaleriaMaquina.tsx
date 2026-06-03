"use client";

import { useState } from "react";

export default function GaleriaMaquina({
  fotos,
  nome,
}: {
  fotos: string[];
  nome: string;
}) {
  const [ativa, setAtiva] = useState(0);

  if (!fotos || fotos.length === 0) {
    return (
      <div className="flex aspect-[4/3] w-full items-center justify-center rounded-2xl border border-linha bg-gradient-to-br from-marinho to-carvao">
        <span className="font-serif text-7xl text-ouro/50">{nome.charAt(0)}</span>
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-hidden rounded-2xl border border-linha bg-creme-dark">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={fotos[ativa]} alt={nome} className="aspect-[4/3] w-full object-cover" />
      </div>
      {fotos.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto">
          {fotos.map((f, i) => (
            <button
              key={i}
              onClick={() => setAtiva(i)}
              className={`h-20 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                i === ativa ? "border-ouro" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f} alt={`${nome} ${i + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
