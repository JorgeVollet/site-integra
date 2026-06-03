import type { Metadata } from "next";
import { Fraunces, Inter_Tight, Xanh_Mono } from "next/font/google";
import "./globals.css";

// Tipografia gratuita (substitui GT Alpina + GT Standard)
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-serif",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const xanhMono = Xanh_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Íntegra — CNC & Automação Industrial | A máquina certa para a sua produção",
  description:
    "Há mais de 10 anos ajudamos marcenarias e indústrias a investir em tecnologia CNC e automação com segurança. Atendimento consultivo do diagnóstico ao pós-venda.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${interTight.variable} ${xanhMono.variable}`}>
      <body className="bg-creme font-sans text-preto antialiased">
        {children}
      </body>
    </html>
  );
}
