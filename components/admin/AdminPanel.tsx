"use client";

import { useMemo, useState } from "react";
import type { Solicitacao, Lead, Marca, Maquina, ItemGaleria } from "@/lib/supabase/types";
import RegistroRow from "./RegistroRow";
import Dashboard from "./Dashboard";
import CatalogoAdmin from "./CatalogoAdmin";
import GaleriaAdmin from "./GaleriaAdmin";

type Secao = "dashboard" | "solicitacoes" | "leads" | "catalogo" | "galeria";

export default function AdminPanel({
  solicitacoes,
  leads,
  marcas,
  maquinas,
  galeria,
  email,
}: {
  solicitacoes: Solicitacao[];
  leads: Lead[];
  marcas: Marca[];
  maquinas: Maquina[];
  galeria: ItemGaleria[];
  email: string;
}) {
  const [secao, setSecao] = useState<Secao>("dashboard");

  const nav: { id: Secao; label: string; badge?: number }[] = [
    { id: "dashboard", label: "Dashboard" },
    { id: "solicitacoes", label: "Solicitações", badge: solicitacoes.filter((s) => s.status === "novo").length },
    { id: "leads", label: "Leads", badge: leads.filter((l) => l.status === "novo").length },
    { id: "catalogo", label: "Catálogo" },
    { id: "galeria", label: "Galeria" },
  ];

  return (
    <div className="mx-auto max-w-[1240px] px-5 py-8">
      {/* topo */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-h3 text-marinho">Painel Íntegra</h1>
          <p className="text-body-sm text-preto/55">Logado como {email}</p>
        </div>
        <div className="flex items-center gap-2">
          <a href="/" target="_blank" className="rounded-pill border border-linha bg-white px-4 py-2 text-body-sm font-medium text-preto/70 transition hover:border-ouro">Ver site ↗</a>
          <form action="/admin/logout" method="post">
            <button className="rounded-pill border border-linha bg-white px-5 py-2 text-body-sm font-medium text-preto/70 transition hover:border-ouro hover:text-marinho">Sair</button>
          </form>
        </div>
      </div>

      {/* navegação */}
      <div className="mb-7 flex flex-wrap gap-2 border-b border-linha">
        {nav.map((n) => (
          <button
            key={n.id}
            onClick={() => setSecao(n.id)}
            className={`-mb-px flex items-center gap-2 border-b-2 px-4 py-3 text-body-md font-medium transition ${
              secao === n.id ? "border-ouro text-marinho" : "border-transparent text-preto/50 hover:text-preto/80"
            }`}
          >
            {n.label}
            {n.badge ? (
              <span className="rounded-full bg-ouro px-1.5 py-0.5 text-[10px] font-bold text-carvao">{n.badge}</span>
            ) : null}
          </button>
        ))}
      </div>

      {secao === "dashboard" && <Dashboard solicitacoes={solicitacoes} leads={leads} />}
      {secao === "solicitacoes" && <Solicitacoes dados={solicitacoes} />}
      {secao === "leads" && <Leads dados={leads} />}
      {secao === "catalogo" && <CatalogoAdmin marcas={marcas} maquinas={maquinas} />}
      {secao === "galeria" && <GaleriaAdmin itens={galeria} />}
    </div>
  );
}

/* ---------------- filtros reutilizáveis ---------------- */
function useFiltro<T extends { status?: string; criado_em: string; favorito?: boolean }>(
  dados: T[],
  campos: (d: T) => string,
) {
  const [busca, setBusca] = useState("");
  const [status, setStatus] = useState("");
  const [soFav, setSoFav] = useState(false);

  const filtrado = useMemo(() => {
    return dados.filter((d) => {
      if (status && (d.status ?? "novo") !== status) return false;
      if (soFav && !d.favorito) return false;
      if (busca && !campos(d).toLowerCase().includes(busca.toLowerCase())) return false;
      return true;
    });
  }, [dados, busca, status, soFav, campos]);

  const barra = (
    <div className="mb-4 flex flex-wrap items-center gap-2">
      <input
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        placeholder="Buscar nome, telefone, e-mail, cidade..."
        className="min-w-[240px] flex-1 rounded-md border border-linha bg-white px-4 py-2 text-body-sm outline-none focus:border-ouro"
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-md border border-linha bg-white px-3 py-2 text-body-sm outline-none focus:border-ouro">
        <option value="">Todos os status</option>
        <option value="novo">Novo</option>
        <option value="em_andamento">Em andamento</option>
        <option value="atendido">Atendido</option>
      </select>
      <label className="flex items-center gap-1.5 rounded-md border border-linha bg-white px-3 py-2 text-body-sm">
        <input type="checkbox" checked={soFav} onChange={(e) => setSoFav(e.target.checked)} /> ★ Favoritos
      </label>
    </div>
  );

  return { filtrado, barra };
}

/* ---------------- Solicitações ---------------- */
function Solicitacoes({ dados }: { dados: Solicitacao[] }) {
  const { filtrado, barra } = useFiltro(dados, (s) =>
    `${s.nome} ${s.telefone} ${s.email ?? ""} ${s.empresa ?? ""} ${s.mensagem ?? ""}`,
  );
  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="font-serif text-h4 text-marinho">Solicitações de orçamento</h2>
        <div className="flex gap-2">
          <BotaoExport titulo="Solicitações de Orçamento" cols={SOLIC_COLS} linhas={filtrado.map(solicLinha)} tipo="pdf" />
          <BotaoExport titulo="solicitacoes" cols={SOLIC_COLS} linhas={filtrado.map(solicLinha)} tipo="csv" />
        </div>
      </div>
      {barra}
      <Tabela colunas={["Nome", "Telefone", "E-mail", "Empresa", "Mensagem", "Data"]}>
        {filtrado.map((s) => (
          <RegistroRow
            key={s.id}
            tabela="solicitacoes"
            registro={s as unknown as Record<string, unknown> & { id: string }}
            colunas={[
              { label: "Nome", valor: s.nome },
              { label: "Telefone", valor: s.telefone },
              { label: "E-mail", valor: s.email ?? "—" },
              { label: "Empresa", valor: s.empresa ?? "—" },
              { label: "Mensagem", valor: (s.mensagem ?? "—").slice(0, 60) },
              { label: "Data", valor: fmt(s.criado_em) },
            ]}
          />
        ))}
        {filtrado.length === 0 && <VaziaRow cols={9} texto="Nenhuma solicitação encontrada." />}
      </Tabela>
    </div>
  );
}

/* ---------------- Leads ---------------- */
function Leads({ dados }: { dados: Lead[] }) {
  const { filtrado, barra } = useFiltro(dados, (l) =>
    `${l.nome} ${l.telefone} ${l.email ?? ""} ${l.empresa ?? ""} ${l.cidade ?? ""} ${l.estado ?? ""} ${l.nicho ?? ""}`,
  );
  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="font-serif text-h4 text-marinho">Leads captados</h2>
        <div className="flex gap-2">
          <BotaoExport titulo="Leads Captados" cols={LEAD_COLS} linhas={filtrado.map(leadLinha)} tipo="pdf" />
          <BotaoExport titulo="leads" cols={LEAD_COLS} linhas={filtrado.map(leadLinha)} tipo="csv" />
        </div>
      </div>
      {barra}
      <Tabela colunas={["Nome", "Empresa", "Nicho", "Telefone", "Cidade/UF", "Data"]}>
        {filtrado.map((l) => (
          <RegistroRow
            key={l.id}
            tabela="leads"
            registro={l as unknown as Record<string, unknown> & { id: string }}
            colunas={[
              { label: "Nome", valor: l.nome },
              { label: "Empresa", valor: l.empresa ?? "—" },
              { label: "Nicho", valor: l.nicho ?? "—" },
              { label: "Telefone", valor: l.telefone },
              { label: "Cidade/UF", valor: `${l.cidade ?? "—"}${l.estado ? "/" + l.estado : ""}` },
              { label: "Data", valor: fmt(l.criado_em) },
            ]}
          />
        ))}
        {filtrado.length === 0 && <VaziaRow cols={9} texto="Nenhum lead encontrado." />}
      </Tabela>
    </div>
  );
}

/* ---------------- helpers de tabela/export ---------------- */
function Tabela({ colunas, children }: { colunas: string[]; children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-linha bg-white">
      <table className="w-full text-left text-body-sm">
        <thead className="border-b border-linha bg-creme/60">
          <tr>
            <th className="px-3 py-3 font-semibold text-marinho">★</th>
            {colunas.map((c) => <th key={c} className="whitespace-nowrap px-3 py-3 font-semibold text-marinho">{c}</th>)}
            <th className="px-3 py-3 font-semibold text-marinho">Status</th>
            <th className="px-3 py-3 font-semibold text-marinho">Ações</th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
function VaziaRow({ cols, texto }: { cols: number; texto: string }) {
  return <tr><td colSpan={cols} className="px-4 py-10 text-center text-preto/50">{texto}</td></tr>;
}

const SOLIC_COLS = ["Data", "Nome", "Telefone", "E-mail", "Empresa", "Mensagem", "Status"];
const solicLinha = (s: Solicitacao) => [fmt(s.criado_em), s.nome, s.telefone, s.email ?? "—", s.empresa ?? "—", s.mensagem ?? "—", s.status];
const LEAD_COLS = ["Data", "Nome", "Empresa", "Nicho", "Telefone", "E-mail", "Cidade", "Estado", "Status"];
const leadLinha = (l: Lead) => [fmt(l.criado_em), l.nome, l.empresa ?? "—", l.nicho ?? "—", l.telefone, l.email ?? "—", l.cidade ?? "—", l.estado ?? "—", l.status];

function BotaoExport({ titulo, cols, linhas, tipo }: { titulo: string; cols: string[]; linhas: string[][]; tipo: "pdf" | "csv" }) {
  return (
    <button
      onClick={() => (tipo === "pdf" ? exportarPDF(titulo, cols, linhas) : exportarCSV(titulo, cols, linhas))}
      className={tipo === "pdf"
        ? "rounded-pill bg-marinho px-4 py-2 text-body-sm font-medium text-white transition hover:bg-marinho-2"
        : "rounded-pill border border-linha bg-white px-4 py-2 text-body-sm font-medium text-preto/70 transition hover:border-ouro"}
    >
      {tipo === "pdf" ? "Exportar PDF" : "Exportar CSV"}
    </button>
  );
}

function fmt(iso: string) {
  try { return new Date(iso).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" }); } catch { return iso; }
}
function exportarCSV(nome: string, cols: string[], linhas: string[][]) {
  const esc = (v: string) => `"${(v ?? "").replace(/"/g, '""')}"`;
  const csv = [cols.map(esc).join(","), ...linhas.map((l) => l.map(esc).join(","))].join("\n");
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = `integra-${nome}-${new Date().toISOString().slice(0, 10)}.csv`; a.click();
  URL.revokeObjectURL(url);
}
function exportarPDF(titulo: string, cols: string[], linhas: string[][]) {
  const w = window.open("", "_blank");
  if (!w) return;
  const body = linhas.map((l) => `<tr>${l.map((c) => `<td>${(c ?? "").replace(/</g, "&lt;")}</td>`).join("")}</tr>`).join("");
  w.document.write(`<html><head><title>${titulo} — Íntegra</title><style>*{font-family:Arial,sans-serif}body{padding:28px;color:#1d1914}h1{color:#0B2545;font-size:20px;margin:0 0 4px}.s{color:#888;font-size:12px;margin-bottom:18px}table{width:100%;border-collapse:collapse;font-size:11px}th{background:#0B2545;color:#fff;text-align:left;padding:7px 8px}td{padding:6px 8px;border-bottom:1px solid #e1e8ef;vertical-align:top}tr:nth-child(even) td{background:#f7f4f0}</style></head><body><h1>Íntegra · ${titulo}</h1><div class="s">Exportado em ${new Date().toLocaleString("pt-BR")} · ${linhas.length} registro(s)</div><table><thead><tr>${cols.map((c) => `<th>${c}</th>`).join("")}</tr></thead><tbody>${body}</tbody></table><script>window.onload=function(){window.print()}</script></body></html>`);
  w.document.close();
}
