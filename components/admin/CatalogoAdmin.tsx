"use client";

import { useState, useTransition } from "react";
import type { Marca, Maquina } from "@/lib/supabase/types";
import {
  salvarMarca,
  excluirMarca,
  salvarMaquina,
  excluirMaquina,
} from "@/lib/actions/catalogo";

export default function CatalogoAdmin({
  marcas,
  maquinas,
}: {
  marcas: Marca[];
  maquinas: Maquina[];
}) {
  const [editandoMarca, setEditandoMarca] = useState<Marca | "nova" | null>(null);
  const [editandoMaq, setEditandoMaq] = useState<Maquina | "nova" | null>(null);

  return (
    <div className="space-y-10">
      {/* MARCAS */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-serif text-h5 text-marinho">Marcas ({marcas.length})</h3>
          <button onClick={() => setEditandoMarca("nova")} className="btn-primary px-4 py-2 text-body-sm">
            + Nova marca
          </button>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {marcas.map((m) => (
            <div key={m.id} className="rounded-xl border border-linha bg-white p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="font-semibold text-marinho">{m.nome}</div>
                  <div className="text-[11px] text-preto/50">/{m.slug} · {maquinas.filter((x) => x.marca_id === m.id).length} modelos</div>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${m.ativo ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-600"}`}>
                  {m.ativo ? "ativa" : "oculta"}
                </span>
              </div>
              <div className="mt-3 flex gap-2">
                <button onClick={() => setEditandoMarca(m)} className="rounded-md border border-linha px-3 py-1.5 text-[11px] font-medium hover:border-ouro">Editar</button>
                <button onClick={() => { if (confirm(`Excluir a marca ${m.nome}?`)) excluirMarca(m.id); }} className="rounded-md border border-red-200 px-3 py-1.5 text-[11px] font-medium text-red-600 hover:bg-red-50">Excluir</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MÁQUINAS */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-serif text-h5 text-marinho">Máquinas / Modelos ({maquinas.length})</h3>
          <button onClick={() => setEditandoMaq("nova")} className="btn-primary px-4 py-2 text-body-sm">
            + Nova máquina
          </button>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-linha bg-white">
          <table className="w-full text-left text-body-sm">
            <thead className="border-b border-linha bg-creme/60">
              <tr>
                <th className="px-4 py-3 font-semibold text-marinho">Nome</th>
                <th className="px-4 py-3 font-semibold text-marinho">Marca</th>
                <th className="px-4 py-3 font-semibold text-marinho">Fotos</th>
                <th className="px-4 py-3 font-semibold text-marinho">Destaque</th>
                <th className="px-4 py-3 font-semibold text-marinho">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {maquinas.map((mq) => (
                <tr key={mq.id} className="border-b border-linha/60 last:border-0">
                  <td className="px-4 py-3 font-medium text-preto/80">{mq.nome}</td>
                  <td className="px-4 py-3 text-preto/60">{marcas.find((b) => b.id === mq.marca_id)?.nome ?? "—"}</td>
                  <td className="px-4 py-3 text-preto/60">{mq.fotos?.length ?? 0}</td>
                  <td className="px-4 py-3">{mq.destaque ? "⭐" : "—"}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${mq.ativo ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-600"}`}>
                      {mq.ativo ? "ativa" : "oculta"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => setEditandoMaq(mq)} className="rounded-md border border-linha px-3 py-1.5 text-[11px] font-medium hover:border-ouro">Editar</button>
                      <button onClick={() => { if (confirm(`Excluir ${mq.nome}?`)) excluirMaquina(mq.id); }} className="rounded-md border border-red-200 px-3 py-1.5 text-[11px] font-medium text-red-600 hover:bg-red-50">Excluir</button>
                    </div>
                  </td>
                </tr>
              ))}
              {maquinas.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-preto/50">Nenhuma máquina cadastrada ainda.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {editandoMarca && (
        <ModalMarca
          marca={editandoMarca === "nova" ? null : editandoMarca}
          onClose={() => setEditandoMarca(null)}
        />
      )}
      {editandoMaq && (
        <ModalMaquina
          maquina={editandoMaq === "nova" ? null : editandoMaq}
          marcas={marcas}
          onClose={() => setEditandoMaq(null)}
        />
      )}
    </div>
  );
}

/* ---------------- MODAIS ---------------- */
function Modal({ titulo, children, onClose }: { titulo: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[120] flex items-start justify-center overflow-auto bg-black/50 p-4 backdrop-blur-sm" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="mt-[4vh] w-full max-w-[560px] rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-serif text-h5 text-marinho">{titulo}</h3>
          <button onClick={onClose} className="text-preto/50 hover:text-preto">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

const inputCls = "w-full rounded-md border border-linha bg-white px-3 py-2 text-body-sm outline-none focus:border-ouro";
const labelCls = "mb-1 block text-[11px] font-semibold uppercase tracking-wide text-preto/50";

function ModalMarca({ marca, onClose }: { marca: Marca | null; onClose: () => void }) {
  const [pending, start] = useTransition();
  return (
    <Modal titulo={marca ? "Editar marca" : "Nova marca"} onClose={onClose}>
      <form
        action={(fd) => start(async () => { await salvarMarca(fd); onClose(); })}
        className="space-y-3"
      >
        {marca && <input type="hidden" name="id" value={marca.id} />}
        <div><label className={labelCls}>Nome*</label><input name="nome" defaultValue={marca?.nome ?? ""} required className={inputCls} /></div>
        <div><label className={labelCls}>Slug (opcional)</label><input name="slug" defaultValue={marca?.slug ?? ""} placeholder="gerado automaticamente" className={inputCls} /></div>
        <div><label className={labelCls}>Subtítulo (card)</label><textarea name="descricao" defaultValue={marca?.descricao ?? ""} rows={2} className={inputCls} /></div>
        <div><label className={labelCls}>Chamada (página da marca)</label><textarea name="chamada" defaultValue={marca?.chamada ?? ""} rows={3} className={inputCls} /></div>
        <div className="flex items-center gap-4">
          <div className="w-24"><label className={labelCls}>Ordem</label><input name="ordem" type="number" defaultValue={marca?.ordem ?? 0} className={inputCls} /></div>
          <label className="mt-5 flex items-center gap-2 text-body-sm"><input type="checkbox" name="ativo" defaultChecked={marca?.ativo ?? true} /> Ativa no site</label>
        </div>
        <button disabled={pending} className="btn-primary w-full">{pending ? "Salvando..." : "Salvar marca"}</button>
      </form>
    </Modal>
  );
}

function ModalMaquina({ maquina, marcas, onClose }: { maquina: Maquina | null; marcas: Marca[]; onClose: () => void }) {
  const [pending, start] = useTransition();
  return (
    <Modal titulo={maquina ? "Editar máquina" : "Nova máquina"} onClose={onClose}>
      <form
        action={(fd) => start(async () => { await salvarMaquina(fd); onClose(); })}
        className="space-y-3"
      >
        {maquina && <input type="hidden" name="id" value={maquina.id} />}
        {maquina && <input type="hidden" name="fotos_existentes" value={(maquina.fotos ?? []).join(",")} />}
        <div><label className={labelCls}>Nome*</label><input name="nome" defaultValue={maquina?.nome ?? ""} required className={inputCls} /></div>
        <div>
          <label className={labelCls}>Marca</label>
          <select name="marca_id" defaultValue={maquina?.marca_id ?? ""} className={inputCls}>
            <option value="">— selecione —</option>
            {marcas.map((b) => <option key={b.id} value={b.id}>{b.nome}</option>)}
          </select>
        </div>
        <div><label className={labelCls}>Resumo (card)</label><textarea name="resumo" defaultValue={maquina?.resumo ?? ""} rows={2} className={inputCls} /></div>
        <div><label className={labelCls}>Descrição</label><textarea name="descricao" defaultValue={maquina?.descricao ?? ""} rows={4} className={inputCls} /></div>
        <div>
          <label className={labelCls}>Especificações técnicas (uma por linha: Rótulo: Valor)</label>
          <textarea
            name="especificacoes"
            defaultValue={(maquina?.especificacoes ?? []).map((e) => `${e.rotulo}: ${e.valor}`).join("\n")}
            rows={6}
            placeholder={"Comando CNC: Syntec 60 WE\nMotor Spindle: 9kW (12 cv) 24.000 RPM\nÁrea de trabalho: 1840 x 2750 x 80 mm"}
            className={`${inputCls} font-mono text-[12px]`}
          />
        </div>
        <div>
          <label className={labelCls}>Adicionar fotos {maquina && `(já tem ${maquina.fotos?.length ?? 0})`}</label>
          <input type="file" name="fotos" accept="image/*" multiple className="text-body-sm" />
        </div>
        <div className="flex items-center gap-4">
          <div className="w-24"><label className={labelCls}>Ordem</label><input name="ordem" type="number" defaultValue={maquina?.ordem ?? 0} className={inputCls} /></div>
          <label className="mt-5 flex items-center gap-2 text-body-sm"><input type="checkbox" name="destaque" defaultChecked={maquina?.destaque ?? false} /> Destaque</label>
          <label className="mt-5 flex items-center gap-2 text-body-sm"><input type="checkbox" name="ativo" defaultChecked={maquina?.ativo ?? true} /> Ativa</label>
        </div>
        <button disabled={pending} className="btn-primary w-full">{pending ? "Salvando..." : "Salvar máquina"}</button>
      </form>
    </Modal>
  );
}
