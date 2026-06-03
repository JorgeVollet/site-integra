"use client";

import type { Solicitacao, Lead } from "@/lib/supabase/types";

// Dashboard com métricas e gráficos em SVG puro (sem dependências).
export default function Dashboard({
  solicitacoes,
  leads,
}: {
  solicitacoes: Solicitacao[];
  leads: Lead[];
}) {
  // ---- leads + solicitações por mês (últimos 6 meses) ----
  const meses = ultimosMeses(6);
  const serieLeads = meses.map((m) => contarNoMes(leads, m.ano, m.mes));
  const serieSolic = meses.map((m) => contarNoMes(solicitacoes, m.ano, m.mes));
  const maxBar = Math.max(1, ...serieLeads, ...serieSolic);

  // ---- conversão (solicitações = intenção de compra / leads) ----
  const totalContatos = leads.length + solicitacoes.length;
  const atendidos =
    solicitacoes.filter((s) => s.status === "atendido").length +
    leads.filter((l) => l.status === "atendido").length;
  const taxaAtend = totalContatos ? Math.round((atendidos / totalContatos) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* cards de resumo */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card titulo="Solicitações" valor={solicitacoes.length} />
        <Card titulo="Leads captados" valor={leads.length} />
        <Card
          titulo="Aguardando atendimento"
          valor={
            solicitacoes.filter((s) => s.status === "novo").length +
            leads.filter((l) => l.status === "novo").length
          }
          destaque
        />
        <Card titulo="Taxa de atendimento" valor={`${taxaAtend}%`} />
      </div>

      {/* gráfico de barras por mês */}
      <div className="rounded-2xl border border-linha bg-white p-6">
        <h3 className="mb-1 font-serif text-h5 text-marinho">Contatos por mês</h3>
        <p className="mb-5 text-body-sm text-preto/50">Últimos 6 meses · leads (dourado) e solicitações (azul)</p>
        <div className="flex items-end gap-4">
          {meses.map((m, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex h-40 w-full items-end justify-center gap-1.5">
                <Barra valor={serieLeads[i]} max={maxBar} cor="bg-ouro" />
                <Barra valor={serieSolic[i]} max={maxBar} cor="bg-marinho" />
              </div>
              <span className="text-[11px] text-preto/50">{m.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* marcas mais procuradas */}
      <MarcasMaisProcuradas solicitacoes={solicitacoes} />
    </div>
  );
}

function Card({ titulo, valor, destaque }: { titulo: string; valor: number | string; destaque?: boolean }) {
  return (
    <div className={`rounded-2xl border p-5 ${destaque ? "border-ouro bg-ouro-suave/40" : "border-linha bg-white"}`}>
      <div className="font-serif text-h3 text-marinho">{valor}</div>
      <div className="text-body-sm text-preto/55">{titulo}</div>
    </div>
  );
}

function Barra({ valor, max, cor }: { valor: number; max: number; cor: string }) {
  const h = Math.round((valor / max) * 100);
  return (
    <div className="relative flex w-5 flex-col items-center justify-end" style={{ height: "100%" }}>
      <span className="mb-1 text-[10px] font-semibold text-preto/60">{valor || ""}</span>
      <div
        className={`w-full rounded-t ${cor} transition-all`}
        style={{ height: `${h}%`, minHeight: valor ? 4 : 0 }}
      />
    </div>
  );
}

function MarcasMaisProcuradas({ solicitacoes }: { solicitacoes: Solicitacao[] }) {
  // conta solicitações com maquina_id agrupando — aqui usamos contagem simples por presença
  const comMaquina = solicitacoes.filter((s) => s.maquina_id).length;
  const semMaquina = solicitacoes.length - comMaquina;
  const total = Math.max(1, solicitacoes.length);
  return (
    <div className="rounded-2xl border border-linha bg-white p-6">
      <h3 className="mb-1 font-serif text-h5 text-marinho">Origem das solicitações</h3>
      <p className="mb-5 text-body-sm text-preto/50">De páginas de produto vs. contato geral</p>
      <Linha label="Página de uma máquina" valor={comMaquina} total={total} cor="bg-ouro" />
      <Linha label="Formulário geral" valor={semMaquina} total={total} cor="bg-marinho" />
    </div>
  );
}

function Linha({ label, valor, total, cor }: { label: string; valor: number; total: number; cor: string }) {
  const p = Math.round((valor / total) * 100);
  return (
    <div className="mb-3">
      <div className="mb-1 flex justify-between text-body-sm">
        <span className="text-preto/70">{label}</span>
        <span className="font-semibold text-marinho">{valor} ({p}%)</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-creme-dark">
        <div className={`h-full rounded-full ${cor}`} style={{ width: `${p}%` }} />
      </div>
    </div>
  );
}

/* utils */
function ultimosMeses(n: number) {
  const out: { ano: number; mes: number; label: string }[] = [];
  const nomes = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
  const d = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const dt = new Date(d.getFullYear(), d.getMonth() - i, 1);
    out.push({ ano: dt.getFullYear(), mes: dt.getMonth(), label: nomes[dt.getMonth()] });
  }
  return out;
}
function contarNoMes(arr: { criado_em: string }[], ano: number, mes: number) {
  return arr.filter((x) => {
    const d = new Date(x.criado_em);
    return d.getFullYear() === ano && d.getMonth() === mes;
  }).length;
}
