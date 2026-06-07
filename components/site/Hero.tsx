import { WhatsappIcon } from "@/components/icons";
import { whatsappLink } from "@/lib/config";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh max-h-[920px] w-full items-center overflow-hidden bg-carvao text-white"
    >
      {/* foto de fundo — Ricardo com as máquinas ETools */}
      {/* mobile: imagem 130% da largura ancorada à DIREITA — rosto visível, sem buraco */}
      <img
        aria-hidden
        src="/assets/hero-ricardo.jpg"
        alt=""
        className="pointer-events-none absolute inset-y-0 right-0 h-full w-[130%] max-w-none object-cover object-[88%_top] lg:w-full lg:object-right"
      />

      {/* overlay MOBILE: escurece de baixo pra cima (texto), deixa o topo/rosto limpo */}
      <div
        aria-hidden
        className="absolute inset-0 lg:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,37,69,0) 0%, rgba(11,37,69,.15) 30%, rgba(11,37,69,.75) 52%, rgba(11,37,69,.95) 70%, rgba(11,37,69,.98) 100%)",
        }}
      />
      {/* degradê leve horizontal (esquerda → direita) no mobile */}
      <div
        aria-hidden
        className="absolute inset-0 lg:hidden"
        style={{
          background:
            "linear-gradient(90deg, rgba(11,37,69,.55) 0%, rgba(11,37,69,.18) 40%, rgba(11,37,69,0) 75%)",
        }}
      />
      {/* overlay DESKTOP: horizontal — escuro à esquerda, Ricardo à direita */}
      <div
        aria-hidden
        className="absolute inset-0 hidden lg:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(11,37,69,.96) 0%, rgba(11,37,69,.85) 30%, rgba(11,37,69,.4) 52%, rgba(11,37,69,0) 70%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "radial-gradient(circle at 15% 10%, rgba(200,151,47,.16), transparent 45%)" }}
      />

      {/* no mobile o conteúdo vai pro fim (texto embaixo, rosto do Ricardo visível em cima) */}
      <div className="container-wide relative z-10 flex min-h-svh max-h-[920px] flex-col justify-end pb-16 pt-28 lg:min-h-0 lg:max-h-none lg:justify-center lg:py-24">
        <div className="max-w-[760px]">
          <span className="eyebrow block text-right lg:text-left">CNC · Automação Industrial · Consultoria</span>

          <h1 className="ml-auto mt-5 max-w-[220px] text-right font-sans text-[clamp(26px,6.5vw,72px)] font-normal leading-[1.12] tracking-[-0.02em] lg:ml-0 lg:mt-6 lg:max-w-none lg:text-[clamp(30px,8vw,72px)] lg:leading-[1.05]">
            A máquina certa transforma sua produção.{" "}
            <span className="bg-ouro-grad bg-clip-text font-serif text-transparent">
              A máquina errada custa caro.
            </span>
          </h1>

          <div className="mt-6 ml-auto max-w-[330px] rounded-2xl border border-white/15 border-l-2 border-l-ouro/60 bg-white/[0.06] px-5 py-4 backdrop-blur-md lg:ml-0 lg:max-w-[600px] lg:px-6 lg:py-5">
            <p className="text-[clamp(14px,4vw,19px)] leading-relaxed text-white/85">
              Há mais de 10 anos ajudamos marcenarias e indústrias a investir em
              tecnologia com segurança — escolhendo o equipamento certo para a sua
              realidade, e não o mais caro do catálogo.
            </p>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:mt-9">
            <a href={whatsappLink("Olá Ricardo! Vim pelo site e quero falar com um especialista.")} target="_blank" rel="noopener noreferrer" className="btn-wa justify-center">
              <WhatsappIcon className="h-5 w-5" />
              Falar com um especialista
            </a>
            <a href="#solucoes" className="btn-ghost justify-center">
              Conhecer as soluções →
            </a>
          </div>

          <p className="mt-7 text-body-md text-white/55 lg:mt-8">
            <span className="font-semibold text-ouro-claro">+500 empresas atendidas</span>{" "}
            · Atendimento consultivo do diagnóstico ao pós-venda
          </p>
        </div>
      </div>
    </section>
  );
}
