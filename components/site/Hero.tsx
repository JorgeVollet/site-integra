import { WhatsappIcon } from "@/components/icons";
import { whatsappLink } from "@/lib/config";

export default function Hero() {
  return (
    <section id="top" className="relative w-full overflow-hidden bg-carvao text-white">
      {/* ===================== DESKTOP (lg+) ===================== */}
      <div className="relative hidden min-h-svh max-h-[860px] items-center lg:flex">
        <img
          aria-hidden
          src="/assets/hero-ricardo.jpg"
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-right"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "linear-gradient(90deg, rgba(11,37,69,.96) 0%, rgba(11,37,69,.85) 30%, rgba(11,37,69,.4) 52%, rgba(11,37,69,0) 70%)" }}
        />
        <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(circle at 15% 10%, rgba(200,151,47,.16), transparent 45%)" }} />
        <div className="container-wide relative z-10 py-24">
          <Conteudo />
        </div>
      </div>

      {/* ===================== MOBILE (< lg) ===================== */}
      <div className="lg:hidden">
        {/* texto sobre fundo marinho sólido */}
        <div className="relative bg-carvao px-6 pt-28 pb-10">
          <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(circle at 90% 8%, rgba(200,151,47,.18), transparent 45%)" }} />
          <div className="relative z-10">
            <Conteudo />
          </div>
        </div>
        {/* foto do Ricardo numa faixa própria, limpa e à direita */}
        <div className="relative h-[360px] w-full overflow-hidden sm:h-[460px]">
          <img
            src="/assets/hero-ricardo.jpg"
            alt="Ricardo Senhorinha com as máquinas ETools"
            className="h-full w-full object-cover object-[68%_top]"
          />
          {/* leve fade no topo da foto p/ emendar com o bloco de texto */}
          <div aria-hidden className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-carvao to-transparent" />
        </div>
      </div>
    </section>
  );
}

function Conteudo() {
  return (
    <div className="max-w-[760px]">
      <span className="eyebrow">CNC · Automação Industrial · Consultoria</span>

      <h1 className="mt-5 font-sans text-[clamp(30px,8vw,72px)] font-normal leading-[1.08] tracking-[-0.02em] lg:mt-6 lg:leading-[1.05]">
        A máquina certa transforma sua produção.{" "}
        <span className="bg-ouro-grad bg-clip-text font-serif text-transparent">
          A máquina errada custa caro.
        </span>
      </h1>

      <div className="mt-6 max-w-[600px] rounded-2xl border border-white/15 border-l-2 border-l-ouro/60 bg-white/[0.06] px-5 py-4 backdrop-blur-md lg:mt-7 lg:px-6 lg:py-5">
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
  );
}
