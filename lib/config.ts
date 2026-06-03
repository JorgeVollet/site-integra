// Configurações globais do site

export const WHATSAPP_NUMERO =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMERO || "55SEUNUMERO";

export function whatsappLink(mensagem?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMERO}`;
  return mensagem ? `${base}?text=${encodeURIComponent(mensagem)}` : base;
}

export const INSTAGRAM = "https://instagram.com/ricardocncbr";
