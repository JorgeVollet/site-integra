"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/lib/actions/auth";
import { LogoIntegra } from "@/components/icons";

const inicial: LoginState = { error: "" };

export default function LoginPage() {
  const [state, formAction] = useActionState(login, inicial);

  return (
    <main className="flex min-h-svh items-center justify-center bg-carvao p-4">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{ background: "radial-gradient(circle at 70% 20%, rgba(200,151,47,.15), transparent 50%)" }}
      />
      <div className="relative z-10 w-full max-w-[400px] rounded-2xl bg-creme p-8 shadow-2xl">
        <div className="mb-6 flex flex-col items-center text-center">
          <LogoIntegra className="h-12 w-auto" cor="#C8972F" />
          <h1 className="mt-4 font-serif text-h4 text-marinho">Painel Íntegra</h1>
          <p className="mt-1 text-body-sm text-preto/55">Acesso restrito · Administração</p>
        </div>

        <form action={formAction} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-body-sm font-medium text-preto/80">E-mail</span>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              className="rounded-md border border-linha bg-white px-4 py-2.5 text-body-md outline-none focus:border-ouro focus:ring-2 focus:ring-ouro/20"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-body-sm font-medium text-preto/80">Senha</span>
            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
              className="rounded-md border border-linha bg-white px-4 py-2.5 text-body-md outline-none focus:border-ouro focus:ring-2 focus:ring-ouro/20"
            />
          </label>

          {state.error && <p className="text-body-sm text-red-600">{state.error}</p>}

          <button type="submit" className="btn-primary mt-2 w-full uppercase tracking-wide">
            Entrar
          </button>
        </form>

        <a href="/" className="mt-6 block text-center text-body-sm text-mute hover:text-ouro">
          ← Voltar ao site
        </a>
      </div>
    </main>
  );
}
