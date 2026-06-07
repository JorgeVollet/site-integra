"use client";

import { useState } from "react";
import LogoIntegraFull from "@/components/LogoIntegra";

const links = [
  { href: "/#diferencial", label: "Por que a Íntegra" },
  { href: "/#depoimentos", label: "Depoimentos" },
  { href: "/#sobre", label: "Sobre" },
  { href: "/maquinas", label: "Catálogo" },
  { href: "/#faq", label: "Dúvidas" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-carvao/90 text-white backdrop-blur-md">
      <div className="container-wide flex h-[72px] items-center justify-between">
        <a href="/" className="flex items-center" aria-label="Íntegra — início">
          <LogoIntegraFull className="h-11 w-auto shrink-0 transition-transform duration-300 hover:scale-[1.03]" />
        </a>

        <nav className="hidden items-center gap-1 xl:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="flex h-[38px] items-center rounded-pill px-4 text-body-sm font-medium uppercase tracking-[0.12em] opacity-90 transition hover:bg-white/10 hover:opacity-100"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a href="/#contato" className="btn-primary h-[38px] px-5 py-0 text-body-sm uppercase tracking-wide">
            Solicite Orçamento
          </a>
        </div>

        <button
          className="flex h-12 w-12 items-center justify-center xl:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menu"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-carvao px-6 py-4 xl:hidden">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-3 text-body-sm font-medium uppercase tracking-[0.12em]">
              {l.label}
            </a>
          ))}
          <a href="/#contato" onClick={() => setOpen(false)} className="btn-primary mt-3 w-full uppercase tracking-wide">
            Solicite Orçamento
          </a>
        </nav>
      )}
    </header>
  );
}
