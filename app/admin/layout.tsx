import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Painel Administrativo | Íntegra",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-svh bg-creme">{children}</div>;
}
