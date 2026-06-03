"use client";

import { useState, useTransition } from "react";
import {
  atualizarStatus,
  atualizarNotas,
  alternarFavorito,
  excluirRegistro,
} from "@/lib/actions/admin";

type Tabela = "solicitacoes" | "leads";

export type Registro = {
  id: string;
  status?: string;
  notas?: string | null;
  favorito?: boolean;
  [k: string]: unknown;
};

const STATUS = [
  { v: "novo", label: "Novo", cor: "bg-ouro-suave text-[#7a5a12]" },
  { v: "em_andamento", label: "Em andamento", cor: "bg-blue-100 text-blue-800" },
  { v: "atendido", label: "Atendido", cor: "bg-green-100 text-green-800" },
];

function soDigitos(t?: string | null) {
  return (t ?? "").replace(/\D/g, "");
}

export default function RegistroRow({
  tabela,
  registro,
  colunas,
}: {
  tabela: Tabela;
  registro: Registro;
  colunas: { label: string; valor: string }[];
}) {
  const [aberto, setAberto] = useState(false);
  const [notas, setNotas] = useState(registro.notas ?? "");
  const [pending, start] = useTransition();

  const tel = soDigitos(registro.telefone as string);
  const waLink = `https://wa.me/55${tel}?text=${encodeURIComponent(
    `Olá ${registro.nome ?? ""}! Aqui é o Ricardo, da Íntegra. Recebi seu contato pelo site.`,
  )}`;

  const statusAtual = registro.status ?? "novo";
  const statusInfo = STATUS.find((s) => s.v === statusAtual) ?? STATUS[0];

  return (
    <>
      <tr className="border-b border-linha/60 last:border-0 hover:bg-creme/40">
        <td className="px-3 py-3">
          <button
            onClick={() =>
              start(() => alternarFavorito(tabela, registro.id, !registro.favorito))
            }
            title="Favoritar"
            className={`text-lg leading-none ${registro.favorito ? "text-ouro" : "text-linha hover:text-ouro/60"}`}
          >
            ★
          </button>
        </td>
        {colunas.map((c) => (
          <td key={c.label} className="px-3 py-3 align-top text-preto/75">{c.valor}</td>
        ))}
        <td className="px-3 py-3">
          <span className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusInfo.cor}`}>
            {statusInfo.label}
          </span>
        </td>
        <td className="px-3 py-3">
          <div className="flex items-center gap-1.5">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              title="Responder no WhatsApp"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366] text-white transition hover:brightness-110"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.5A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .9.9-2.9-.2-.3A8 8 0 1 1 12 20zm4.5-5.6c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.7-.8-2.8-1.5-3.9-3.4-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.5 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.3 5.2 4.6 2 .8 2.7.9 3.7.8.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3z"/></svg>
            </a>
            <button
              onClick={() => setAberto((v) => !v)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-linha text-preto/60 transition hover:border-ouro"
              title="Detalhes"
            >
              {aberto ? "▲" : "▼"}
            </button>
          </div>
        </td>
      </tr>

      {aberto && (
        <tr className="bg-creme/50">
          <td colSpan={colunas.length + 3} className="px-5 py-4">
            <div className="flex flex-wrap items-start gap-6">
              {/* status */}
              <div>
                <div className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-preto/50">Status</div>
                <div className="flex gap-1.5">
                  {STATUS.map((s) => (
                    <button
                      key={s.v}
                      disabled={pending}
                      onClick={() => start(() => atualizarStatus(tabela, registro.id, s.v))}
                      className={`rounded-full px-3 py-1 text-[11px] font-semibold transition ${
                        statusAtual === s.v ? s.cor : "bg-white text-preto/50 hover:bg-creme-dark"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* notas */}
              <div className="min-w-[260px] flex-1">
                <div className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-preto/50">Anotações</div>
                <div className="flex gap-2">
                  <textarea
                    value={notas}
                    onChange={(e) => setNotas(e.target.value)}
                    rows={2}
                    placeholder="Anote algo sobre este contato..."
                    className="flex-1 rounded-md border border-linha bg-white px-3 py-2 text-body-sm outline-none focus:border-ouro"
                  />
                  <button
                    disabled={pending}
                    onClick={() => start(() => atualizarNotas(tabela, registro.id, notas))}
                    className="self-start rounded-md bg-marinho px-3 py-2 text-[11px] font-semibold text-white transition hover:bg-marinho-2"
                  >
                    Salvar
                  </button>
                </div>
              </div>

              {/* ações */}
              <div>
                <div className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-preto/50">Ações</div>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigator.clipboard?.writeText(String(registro.telefone ?? ""))}
                    className="rounded-md border border-linha bg-white px-3 py-2 text-[11px] font-medium text-preto/70 hover:border-ouro"
                  >
                    Copiar telefone
                  </button>
                  <button
                    onClick={() => {
                      if (confirm("Excluir este registro? Esta ação não pode ser desfeita."))
                        start(() => excluirRegistro(tabela, registro.id));
                    }}
                    className="rounded-md border border-red-200 bg-white px-3 py-2 text-[11px] font-medium text-red-600 hover:bg-red-50"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
