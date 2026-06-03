"use client";

import { useInView } from "./useInView";

// Wrapper de scroll-reveal: fade-in + leve subida quando entra na tela.
export default function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "figure" | "section" | "li";
}) {
  const { ref, inView } = useInView<HTMLDivElement>();

  const style: React.CSSProperties = {
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(24px)",
    transition: `opacity .7s ease-out ${delay}ms, transform .7s ease-out ${delay}ms`,
    willChange: "opacity, transform",
  };

  const props = { ref, className, style };

  if (as === "figure") return <figure {...props}>{children}</figure>;
  if (as === "section") return <section {...props}>{children}</section>;
  if (as === "li") return <li {...props}>{children}</li>;
  return <div {...props}>{children}</div>;
}
