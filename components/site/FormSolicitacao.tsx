"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { enviarSolicitacao, type FormState } from "@/lib/actions/solicitacao";

const inicial: FormState = { ok: false, message: "" };

function Botao() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary w-full disabled:opacity-60">
      {pending ? "Enviando..." : "Enviar solicitação"}
    </button>
  );
}

export default function FormSolicitacao({ maquinaId }: { maquinaId?: string }) {
  const [state, formAction] = useActionState(enviarSolicitacao, inicial);

  if (state.ok) {
    return (
      <div className="rounded-2xl border border-ouro/40 bg-ouro-suave/40 p-8 text-center">
        <p className="font-serif text-h5 text-marinho">Solicitação recebida! 🎉</p>
        <p className="mt-3 text-body-lg text-preto/70">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {maquinaId && <input type="hidden" name="maquina_id" value={maquinaId} />}

      <div className="grid gap-4 sm:grid-cols-2">
        <Campo name="nome" label="Seu nome*" placeholder="Nome completo" required />
        <Campo name="telefone" label="WhatsApp/Telefone*" placeholder="(00) 00000-0000" required />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Campo name="email" label="E-mail" type="email" placeholder="seu@email.com" />
        <Campo name="empresa" label="Empresa" placeholder="Nome da sua empresa" />
      </div>
      <label className="flex flex-col gap-1.5">
        <span className="text-body-md font-medium text-preto/80">Como podemos ajudar?</span>
        <textarea
          name="mensagem"
          rows={4}
          placeholder="Conte um pouco sobre seu projeto, sua produção ou sua dúvida..."
          className="rounded-md border border-linha bg-white px-4 py-3 text-body-lg outline-none transition focus:border-ouro focus:ring-2 focus:ring-ouro/20"
        />
      </label>

      {state.message && !state.ok && (
        <p className="text-body-md text-red-600">{state.message}</p>
      )}

      <Botao />
      <p className="text-center text-body-sm text-mute">
        Resposta rápida · Sem compromisso · Atendimento direto com o Ricardo
      </p>
    </form>
  );
}

function Campo({
  name,
  label,
  placeholder,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-body-md font-medium text-preto/80">{label}</span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="rounded-md border border-linha bg-white px-4 py-3 text-body-lg outline-none transition focus:border-ouro focus:ring-2 focus:ring-ouro/20"
      />
    </label>
  );
}
