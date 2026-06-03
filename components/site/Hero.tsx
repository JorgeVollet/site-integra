import { WhatsappIcon } from "@/components/icons";
import { whatsappLink } from "@/lib/config";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh max-h-[860px] w-full items-center overflow-hidden bg-carvao text-white"
    >
      {/* foto de fundo — Ricardo com as máquinas ETools */}
      <img
        aria-hidden
        src="/assets/hero-ricardo.jpg"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-right"
      />
      {/* overlay: escurece à esquerda (texto) e mantém o Ricardo visível à direita */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(11,37,69,.96) 0%, rgba(11,37,69,.85) 30%, rgba(11,37,69,.4) 52%, rgba(11,37,69,0) 70%)",
        }}
      />
      {/* leve brilho dourado no topo */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "radial-gradient(circle at 15% 10%, rgba(200,151,47,.16), transparent 45%)" }}
      />

      <div className="container-wide relative z-10 pt-24 pb-16">
        <div className="max-w-[760px]">
          <span className="eyebrow">CNC · Automação Industrial · Consultoria</span>

          <h1 className="mt-6 font-sans text-[clamp(34px,5.2vw,72px)] font-normal leading-[1.05] tracking-[-0.02em]">
            A máquina certa transforma sua produção.{" "}
            <span className="bg-ouro-grad bg-clip-text font-serif text-transparent">
              A máquina errada custa caro.
            </span>
          </h1>

          <div className="mt-7 max-w-[600px] rounded-2xl border border-white/15 border-l-2 border-l-ouro/60 bg-white/[0.06] px-6 py-5 backdrop-blur-md">
            <p className="text-[clamp(15px,1.9vw,19px)] leading-relaxed text-white/85">
              Há mais de 10 anos ajudamos marcenarias e indústrias a investir em
              tecnologia com segurança — escolhendo o equipamento certo para a sua
              realidade, e não o mais caro do catálogo.
            </p>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href={whatsappLink("Olá Ricardo! Vim pelo site e quero falar com um especialista.")} target="_blank" rel="noopener noreferrer" className="btn-wa">
              <WhatsappIcon className="h-5 w-5" />
              Falar com um especialista
            </a>
            <a href="#solucoes" className="btn-ghost">
              Conhecer as soluções →
            </a>
          </div>

          <p className="mt-8 text-body-md text-white/55">
            <span className="font-semibold text-ouro-claro">+500 empresas atendidas</span>{" "}
            · Atendimento consultivo do diagnóstico ao pós-venda
          </p>
        </div>
      </div>
    </section>
  );
}
