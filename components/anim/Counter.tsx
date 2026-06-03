"use client";

import { useEffect, useState } from "react";
import { useInView } from "./useInView";

/**
 * Conta de 0 até `value` quando entra na tela.
 * `prefix`/`suffix` ficam fixos (ex: prefix="+", value=500).
 * Para conteúdo não-numérico, use o componente <CounterText> abaixo.
 */
export function Counter({
  value,
  prefix = "",
  suffix = "",
  duration = 1600,
  className = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) {
      // saiu da tela → volta a zero para recontar quando reaparecer
      setN(0);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      // easeOutExpo para desacelerar bonito no fim
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setN(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {n.toLocaleString("pt-BR")}
      {suffix}
    </span>
  );
}

/** Variante para valores textuais (ex: "Oficial", faixa de preço) — só fade-in. */
export function CounterText({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  return (
    <span
      ref={ref}
      className={className}
      style={{
        display: "inline-block",
        opacity: inView ? 1 : 0,
        transform: inView ? "scale(1)" : "scale(0.8)",
        transition:
          "opacity .7s ease-out, transform .7s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      {children}
    </span>
  );
}
