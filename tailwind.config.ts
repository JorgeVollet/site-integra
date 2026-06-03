import type { Config } from "tailwindcss";

// Design tokens da Íntegra (base: design system Bobbin, adaptado)
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Marca
        ouro: {
          DEFAULT: "#C8972F",
          claro: "#EAC974",
          suave: "#F6E9C8",
          escuro: "#80590F",
        },
        marinho: {
          DEFAULT: "#0B2545",
          2: "#13315C",
        },
        // INVERSÃO: a base escura do site agora é o azul-marinho.
        carvao: "#0B2545",
        // 'detalhe' = o carvão (marrom escuro) original, usado em ícones/faixas/foto.
        detalhe: {
          DEFAULT: "#2A241D",
          2: "#3A332A",
        },
        creme: {
          DEFAULT: "#F7F4F0",
          dark: "#E8E4DE",
        },
        preto: "#1D1914",
        linha: "#CDC6BC",
        mute: "#A39B8F",
        "footer-text": "#8C8273",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // escala do design system (desktop)
        h1: ["72px", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        h2: ["60px", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        h3: ["48px", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        h4: ["32px", { lineHeight: "1.25" }],
        h5: ["24px", { lineHeight: "1.3" }],
        h6: ["20px", { lineHeight: "1.4" }],
        "body-lg": ["16px", { lineHeight: "1.3" }],
        "body-md": ["14px", { lineHeight: "1.5" }],
        "body-sm": ["12px", { lineHeight: "1.5" }],
        "body-xs": ["10px", { lineHeight: "1.4" }],
      },
      borderRadius: {
        sm: "12px",
        md: "20px",
        lg: "36px",
        "2xl": "16px",
        pill: "9999px",
      },
      maxWidth: {
        wide: "1512px",
      },
      backgroundImage: {
        "ouro-grad": "linear-gradient(135deg,#EAC974,#C8972F)",
      },
    },
  },
  plugins: [],
};

export default config;
