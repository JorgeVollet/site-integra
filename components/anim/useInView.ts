"use client";

import { useEffect, useRef, useState } from "react";

// Detecta quando o elemento entra/sai da viewport.
// Por padrão re-ativa: marca false ao sair e true ao voltar, pra repetir a animação.
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit & { once?: boolean },
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // respeita quem prefere menos movimento
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }
    const { once = false, ...obsOptions } = options ?? {};
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) obs.disconnect();
        } else if (!once) {
          // saiu da tela → reseta para reanimar quando voltar
          setInView(false);
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px", ...obsOptions },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return { ref, inView };
}
