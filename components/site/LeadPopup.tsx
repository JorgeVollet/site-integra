"use client";

import { useEffect, useState } from "react";
import { useActionState } from "react";
import { enviarLead, type LeadState } from "@/lib/actions/lead";
import { LogoIntegra } from "@/components/icons";

const inicial: LeadState = { ok: false, message: "" };
const STORAGE_KEY = "integra_lead_popup_v1";

export default function LeadPopup() {
  const [aberto, setAberto] = useState(false);
  const [state, formAction] = useActionState(enviarLead, inicial);

  useEffect(() => {
    // não reabrir se já inscreveu ou já fechou nesta sessão
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {}
    const t = setTimeout(() => setAberto(true), 3500);
    return () => clearTimeout(t);
  }, []);

  // ao concluir, marca como feito e fecha após um tempinho
  useEffect(() => {
    if (state.ok) {
      try {
        localStorage.setItem(STORAGE_KEY, "done");
      } catch {}
      const t = setTimeout(() => setAberto(false), 2600);
      return () => clearTimeout(t);
    }
  }, [state.ok]);

  function fechar() {
    setAberto(false);
    try {
      localStorage.setItem(STORAGE_KEY, "closed");
    } catch {}
  }

  if (!aberto) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) fechar();
      }}
    >
      <div className="relative w-full max-w-[820px] overflow-hidden rounded-2xl bg-creme shadow-2xl">
        {/* botão fechar */}
        <button
          onClick={fechar}
          aria-label="Fechar"
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/10 text-preto/70 transition hover:bg-black/20"
        >
          ✕
        </button>

        <div className="grid md:grid-cols-[0.9fr_1.1fr]">
          {/* Lado visual */}
          <div className="relative hidden flex-col justify-center overflow-hidden bg-carvao p-8 text-white md:flex">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: "radial-gradient(circle at 30% 20%, rgba(200,151,47,.25), transparent 60%)" }}
            />
            <div className="relative z-10">
              <LogoIntegra className="h-12 w-auto" />
              <h2 className="mt-6 font-serif text-[28px] leading-tight">
                Condições de pagamento <span className="text-ouro-claro">exclusivas</span> para a sua compra
              </h2>
              <p className="mt-4 text-body-md text-white/70">
                Inscreva-se e receba as melhores ofertas e novidades do mercado de
                CNC e automação em primeira mão.
              </p>
            </div>
          </div>

          {/* Formulário */}
          <div className="p-7 sm:p-9">
            {state.ok ? (
              <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                <div className="text-5xl">🎉</div>
                <p className="mt-4 font-serif text-h5 text-marinho">Inscrição confirmada!</p>
                <p className="mt-2 text-body-md text-preto/60">{state.message}</p>
              </div>
            ) : (
              <>
                <span className="eyebrow text-ouro">Oferta exclusiva</span>
                <h3 className="mt-2 font-serif text-h4 text-marinho">Inscreva-se</h3>
                <p className="mt-1 mb-5 text-body-md text-preto/60">
                  Ganhe condições de pagamento exclusivas para sua compra.
                </p>

                <form action={formAction} className="flex flex-col gap-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Campo name="nome" placeholder="Seu nome*" required />
                    <Campo name="empresa" placeholder="Empresa" />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Campo name="nicho" placeholder="Nicho / segmento" />
                    <Campo name="telefone" placeholder="WhatsApp/Telefone*" required />
                  </div>
                  <Campo name="email" type="email" placeholder="E-mail" />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Campo name="cidade" placeholder="Cidade" />
                    <Campo name="estado" placeholder="Estado (UF)" />
                  </div>

                  {state.message && !state.ok && (
                    <p className="text-body-sm text-red-600">{state.message}</p>
                  )}

                  <BotaoEnviar />
                  <p className="text-center text-[11px] text-mute">
                    Seus dados estão seguros. Sem spam.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function BotaoEnviar() {
  // useFormStatus precisa estar dentro do <form>
  return (
    <button type="submit" className="btn-primary mt-1 w-full uppercase tracking-wide">
      Inscrever-se e ganhar condições exclusivas
    </button>
  );
}

function Campo({
  name,
  placeholder,
  type = "text",
  required,
}: {
  name: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      className="w-full rounded-md border border-linha bg-white px-4 py-2.5 text-body-md outline-none transition focus:border-ouro focus:ring-2 focus:ring-ouro/20"
    />
  );
}
