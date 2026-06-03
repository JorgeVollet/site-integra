// Ícones SVG reutilizáveis

export function LogoIntegra({
  className = "",
  cor = "#EAC974",
}: {
  className?: string;
  cor?: string;
}) {
  // Símbolo Í-no-anel (versão fina, dourada por padrão)
  return (
    <svg viewBox="0 0 160 210" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="80" cy="100" r="58" fill="none" stroke={cor} strokeWidth="3.4" />
      <rect x="72.5" y="28" width="15" height="150" fill={cor} />
      <rect x="57" y="21" width="46" height="6.5" rx="2" fill={cor} />
      <rect x="57" y="178" width="46" height="6.5" rx="2" fill={cor} />
      <path d="M80 16 L96 -2 L104 -2 L86 16 Z" fill={cor} />
    </svg>
  );
}

export function WhatsappIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.5A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .9.9-2.9-.2-.3A8 8 0 1 1 12 20zm4.5-5.6c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.7-.8-2.8-1.5-3.9-3.4-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.5 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.3 5.2 4.6 2 .8 2.7.9 3.7.8.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3z" />
    </svg>
  );
}

export function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 10h12m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
