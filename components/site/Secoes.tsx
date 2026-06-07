import type { Maquina, Depoimento, Marca } from "@/lib/supabase/types";
import { WhatsappIcon } from "@/components/icons";
import { whatsappLink, INSTAGRAM } from "@/lib/config";
import FormSolicitacao from "./FormSolicitacao";
import DarkVeil from "@/components/DarkVeil";
import MarcaCard from "./MarcaCard";
import Reveal from "@/components/anim/Reveal";
import { Counter, CounterText } from "@/components/anim/Counter";

/* ---------------- PARA QUEM É ---------------- */
export function ParaQuem() {
  const itens = [
    "Quer automatizar a produção, mas tem medo de errar no investimento",
    "Depende de mão de obra qualificada cada vez mais difícil de encontrar",
    "Perde dinheiro com desperdício de chapa e retrabalho",
    "Quer crescer e aumentar a produção sem perder qualidade",
  ];
  return (
    <section className="border-b border-linha bg-creme">
      <div className="container-wide py-16 xl:py-20">
        <h3 className="mb-3 text-center font-sans text-body-sm font-bold uppercase tracking-[0.25em] text-ouro">
          A Íntegra é para você
        </h3>
        <h2 className="mx-auto mb-12 max-w-[760px] text-center font-serif text-[clamp(26px,3.4vw,40px)] leading-tight text-marinho">
          Se você se identifica com algum destes pontos, precisamos conversar.
        </h2>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {itens.map((t, i) => (
            <Reveal key={t} delay={i * 80}>
              <div className="group-pq group flex h-full flex-col items-center justify-center gap-4 rounded-2xl border border-linha bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-ouro/60 hover:shadow-[0_16px_36px_rgba(11,37,69,0.10)]">
                <p className="text-center font-sans text-[12px] font-normal uppercase leading-relaxed tracking-[0.08em] text-preto transition-colors group-hover:text-marinho">
                  {t}
                </p>
                <span aria-hidden className="barra-glow h-[5px] w-2/3 rounded-full" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- MANIFESTO ---------------- */
export function Manifesto() {
  return (
    <section className="relative overflow-hidden bg-carvao text-white">
      {/* DarkVeil — fundo animado (parâmetros exatos solicitados) */}
      <div className="absolute inset-0">
        <DarkVeil
          hueShift={36}
          noiseIntensity={0.02}
          scanlineIntensity={0}
          speed={2.7}
          scanlineFrequency={5}
          warpAmount={0.3}
        />
      </div>
      {/* leve escurecimento p/ legibilidade do texto sobre o véu */}
      <div aria-hidden className="absolute inset-0 bg-carvao/45" />

      <div className="container-wide relative z-10 max-w-[1200px] py-24 text-center">
        {/* bloco de cima — maior */}
        <p className="font-serif text-[clamp(26px,3.8vw,42px)] leading-[1.35] text-white">
          Tem gente que vende máquina.{" "}
          <strong className="font-normal text-ouro-claro">Nós ajudamos você a decidir.</strong>
        </p>

        {/* bloco do meio — menor */}
        <p className="mx-auto mt-[38px] max-w-[820px] font-sans text-[clamp(17px,2.1vw,22px)] font-light leading-[1.55] text-white/85">
          Nenhum investimento de centenas de milhares de reais deveria começar com
          um vendedor com pressa. Antes de falar de equipamento, a gente entende a
          sua fábrica: o seu processo, o seu espaço, a sua demanda e o seu momento.
        </p>

        {/* bloco de baixo — maior */}
        <p className="mt-[38px] font-serif text-[clamp(26px,3.8vw,42px)] leading-[1.35] text-white">
          Porque a tecnologia certa não é a mais cara —{" "}
          <strong className="font-normal text-ouro-claro">
            é a que faz o seu negócio crescer.
          </strong>
        </p>

        <div className="mt-10 text-body-sm uppercase tracking-[0.2em] text-ouro">
          Íntegra · Tecnologia com integridade
        </div>
      </div>
    </section>
  );
}

/* ---------------- DIFERENCIAL ---------------- */
export function Diferencial() {
  const pilares = [
    {
      t: "Diagnóstico antes da indicação",
      d: "Analisamos seu processo, espaço, demanda e objetivos antes de falar de equipamento. A máquina vem depois de entender a sua fábrica.",
    },
    {
      t: "Honestidade que protege seu bolso",
      d: "Se um equipamento mais simples resolve, é ele que vamos indicar. Preferimos perder uma venda a entregar a máquina errada.",
    },
    {
      t: "Acompanhamento de ponta a ponta",
      d: "Estamos com você na negociação, na produção, na entrega e na instalação — fazendo a ponte entre você e o fabricante.",
    },
    {
      t: "Suporte que não some no pós-venda",
      d: "Mantemos contato e acompanhamos a evolução do projeto — disponíveis mesmo quando não há negociação em andamento.",
    },
  ];
  return (
    <section id="diferencial" className="bg-creme-dark py-20 xl:py-28">
      <div className="container-wide">
        <div className="mx-auto mb-14 max-w-[720px] text-center">
          <h2 className="font-serif text-[clamp(25px,3.3vw,36px)] text-marinho">
            Você não compra uma máquina. Você faz um investimento.
          </h2>
          <p className="mt-4 text-body-lg text-preto/65">
            Por isso, nosso trabalho começa muito antes da venda — e não termina nela.
          </p>
        </div>

        <div className="mx-auto grid max-w-[900px] gap-5 md:grid-cols-2">
          {pilares.map((p, i) => (
            <Reveal key={p.t} delay={i * 90} className="flex gap-5 rounded-2xl border border-linha bg-white p-7">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-carvao font-serif text-h6 text-ouro-claro">
                {i + 1}
              </div>
              <div>
                <h3 className="font-sans text-body-lg font-semibold text-marinho">{p.t}</h3>
                <p className="mt-1.5 text-body-md text-preto/65">{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-[900px] rounded-2xl bg-carvao px-8 py-8 text-center text-white">
          <p className="text-body-lg italic text-white/70">
            &ldquo;Tenho demanda para uma máquina dessas?&rdquo; · &ldquo;Meu espaço comporta?&rdquo; ·
            &ldquo;Minha equipe vai conseguir operar?&rdquo; · &ldquo;Em quanto tempo tenho retorno?&rdquo;
          </p>
          <p className="mt-3 font-serif text-h6 text-ouro-claro">
            Essas são exatamente as perguntas que respondemos antes de você decidir. Sem pressa, sem pressão.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- NÚMEROS ---------------- */
export function Numeros() {
  const bigCls =
    "bg-ouro-grad bg-clip-text font-serif text-[clamp(26px,6vw,46px)] font-semibold text-transparent";
  return (
    <section className="bg-carvao py-14 text-white xl:py-16">
      <div className="container-wide grid grid-cols-2 gap-x-4 gap-y-10 text-center xl:grid-cols-4">
        <div>
          <Counter value={10} prefix="+" className={bigCls} />
          <div className="mt-1.5 text-body-md text-white/55">anos de mercado em CNC e automação</div>
        </div>
        <div>
          <Counter value={500} prefix="+" className={bigCls} />
          <div className="mt-1.5 text-body-md text-white/55">empresas atendidas e orientadas</div>
        </div>
        <div>
          <Counter value={20} prefix="R$" suffix=" mil a +R$1mi" className={bigCls} />
          <div className="mt-1.5 text-body-md text-white/55">projetos para cada momento</div>
        </div>
        <div>
          <CounterText className={bigCls}>Oficial</CounterText>
          <div className="mt-1.5 text-body-md text-white/55">parceria com a ETools Imports</div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- DEPOIMENTOS (dinâmico) ---------------- */
export function Depoimentos({ depoimentos }: { depoimentos: Depoimento[] }) {
  const placeholders: Depoimento[] = [
    { id: "p1", nome: "Cliente", empresa: "Marcenaria", cidade: "Cidade", texto: "[Espaço para depoimento sobre como a Íntegra ajudou a escolher a máquina certa e o impacto na produção.]", foto: null, ativo: true, ordem: 0, criado_em: "" },
    { id: "p2", nome: "Cliente", empresa: "Indústria", cidade: "Cidade", texto: "[Espaço para depoimento sobre a honestidade, o acompanhamento e o suporte recebido.]", foto: null, ativo: true, ordem: 0, criado_em: "" },
    { id: "p3", nome: "Cliente", empresa: "Empresa", cidade: "Cidade", texto: "[Espaço para depoimento sobre o retorno do investimento e a parceria de longo prazo.]", foto: null, ativo: true, ordem: 0, criado_em: "" },
  ];
  const lista = depoimentos.length > 0 ? depoimentos : placeholders;
  const vazio = depoimentos.length === 0;

  return (
    <section id="depoimentos" className="bg-creme py-20 xl:py-28">
      <div className="container-wide">
        <div className="mx-auto mb-14 max-w-[720px] text-center">
          <h2 className="font-serif text-[clamp(27px,3.6vw,40px)] text-marinho">
            Quem investiu com a Íntegra, investiu com segurança
          </h2>
          <p className="mt-4 text-body-lg text-preto/65">
            A confiança dos nossos clientes é construída antes, durante e depois da compra.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {lista.map((d, i) => (
            <Reveal key={d.id} delay={i * 90} as="figure" className="rounded-2xl border border-linha bg-white p-7">
              <div className="font-serif text-5xl leading-none text-ouro-claro">&ldquo;</div>
              <blockquote className={`mt-2 text-body-lg italic ${vazio ? "text-mute" : "text-preto/80"}`}>
                {d.texto}
              </blockquote>
              <figcaption className="mt-4 text-body-md font-semibold text-preto/60">
                — {d.nome}{d.empresa ? `, ${d.empresa}` : ""}{d.cidade ? ` · ${d.cidade}` : ""}
              </figcaption>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-center text-body-md text-preto/60">
          Acompanhe o trabalho no dia a dia:{" "}
          <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="font-semibold text-ouro hover:text-marinho">
            @ricardocncbr
          </a>
        </p>
      </div>
    </section>
  );
}

/* ---------------- SOBRE ---------------- */
export function Sobre() {
  return (
    <section id="sobre" className="bg-creme-dark py-20 xl:py-28">
      <div className="container-wide grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="mx-auto w-full max-w-[440px] overflow-hidden rounded-2xl border border-linha bg-detalhe">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/ricardo-retrato.png"
            alt="Ricardo Senhorinha — fundador da Íntegra"
            className="h-auto w-full object-contain"
          />
        </div>
        <div>
          <span className="eyebrow text-ouro">Quem integra a Íntegra</span>
          <h2 className="mt-2 font-serif text-[clamp(26px,3.4vw,38px)] text-marinho">
            Ricardo Senhorinha
          </h2>
          <p className="mt-1 text-body-lg font-semibold text-ouro">Fundador · Íntegra Representações</p>
          <div className="mt-5 space-y-4 text-body-lg text-preto/75">
            <p>
              Há mais de 10 anos eu acompanho de perto a evolução da tecnologia CNC e
              da automação industrial. Nesse caminho, atendi cerca de 500 empresas — das
              pequenas marcenarias dando os primeiros passos na automação às indústrias
              buscando alta produtividade.
            </p>
            <p>
              Em todas elas, aprendi uma coisa:{" "}
              <strong className="text-marinho">cada empresa tem a sua realidade, o seu momento e os seus objetivos.</strong>{" "}
              Por isso nunca vendi a mesma máquina para todo mundo. Meu compromisso é
              entender o seu negócio primeiro e, só então, recomendar o que realmente faz
              sentido — mesmo que isso signifique perder uma venda.
            </p>
            <p>
              Fora do mundo das máquinas, sou marido da Deisi — uma história de mais de 15
              anos — e pai do Heitor, que está com 8 meses e me ensina todo dia o significado
              de propósito. No fim das contas, eu acredito que{" "}
              <strong className="text-marinho">os negócios são feitos por pessoas.</strong>{" "}
              É assim que eu trabalho — e é assim que a Íntegra nasceu.
            </p>
          </div>
          <p className="mt-6 font-serif text-h6 text-marinho">Ricardo Senhorinha</p>

          {/* Conecte-se + galeria de provas sociais */}
          <div className="mt-8 border-t border-linha pt-6">
            <p className="font-sans text-body-sm font-semibold uppercase tracking-[0.18em] text-ouro">
              Conecte-se com Ricardo
            </p>
            <a href="/galeria" className="btn-primary mt-4 uppercase tracking-wide">
              Galeria de provas sociais →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- CATÁLOGO (seção na home) ---------------- */
export function CatalogoHome({ marcas }: { marcas: Marca[] }) {
  if (!marcas || marcas.length === 0) return null;
  return (
    <section id="catalogo" className="bg-creme py-20 xl:py-28">
      <div className="container-wide">
        <div className="mx-auto mb-14 max-w-[720px] text-center">
          <span className="eyebrow text-ouro">Catálogo</span>
          <h2 className="mt-3 font-serif text-[clamp(27px,3.6vw,40px)] text-marinho">
            As marcas que representamos
          </h2>
          <p className="mt-4 text-body-lg text-preto/65">
            Da escolha da matéria-prima ao acabamento final — tecnologia para
            produzir mais, com menos desperdício e mais precisão.
          </p>
          <p className="mt-3 text-body-md text-preto/55">
            Trabalhamos com marcas selecionadas para cada etapa da sua fábrica.
            Escolha uma marca para ver os modelos e fale com o Ricardo para um orçamento.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {marcas.map((m, i) => (
            <Reveal key={m.id} delay={i * 100} className="h-full">
              <MarcaCard marca={m} />
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="/maquinas" className="btn-primary">
            Ver catálogo completo →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- CTA + FORMULÁRIO ---------------- */
export function CtaTransbordo() {
  return (
    <section id="contato" className="relative overflow-hidden bg-carvao py-20 text-white xl:py-28">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "radial-gradient(circle at 50% 0%, rgba(200,151,47,.16), transparent 55%)" }}
      />
      <div className="container-wide relative z-10 grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div>
          <h2 className="font-serif text-[clamp(27px,3.8vw,42px)] leading-tight">
            Antes de investir, converse com quem vai defender o seu investimento.
          </h2>
          <p className="mt-5 text-body-lg text-white/70">
            Conte pra gente o seu desafio. Vamos entender o seu processo, suas
            necessidades e indicar o caminho mais seguro — sem pressa e sem pressão.
            A primeira conversa não custa nada e pode evitar o erro mais caro da sua produção.
          </p>
          <a
            href={whatsappLink("Olá Ricardo! Quero iniciar um atendimento.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wa mt-7"
          >
            <WhatsappIcon className="h-5 w-5" />
            Iniciar atendimento no WhatsApp
          </a>
        </div>
        <div className="rounded-2xl bg-creme p-7 text-preto sm:p-9">
          <h3 className="mb-1 font-serif text-h5 text-marinho">Solicite um orçamento</h3>
          <p className="mb-6 text-body-md text-preto/60">
            Preencha e o Ricardo entra em contato. Sem compromisso.
          </p>
          <FormSolicitacao />
        </div>
      </div>
    </section>
  );
}

/* ---------------- RODAPÉ ---------------- */
export function Footer() {
  return (
    <footer className="bg-[#1a1611] px-6 py-14 text-mute">
      <div className="container-wide flex flex-wrap justify-between gap-10">
        <div className="max-w-[280px]">
          <p className="font-serif text-h5 text-white">Íntegra</p>
          <p className="mt-3 text-body-md">
            Tecnologia com integridade. CNC, automação industrial e consultoria
            para quem quer crescer com segurança.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-body-sm uppercase tracking-wider text-white">Navegação</h4>
          <ul className="space-y-2 text-body-md">
            <li><a href="#solucoes" className="hover:text-ouro-claro">Soluções</a></li>
            <li><a href="#diferencial" className="hover:text-ouro-claro">Por que a Íntegra</a></li>
            <li><a href="#sobre" className="hover:text-ouro-claro">Sobre o Ricardo</a></li>
            <li><a href="/galeria" className="hover:text-ouro-claro">Galeria de projetos</a></li>
            <li><a href="#faq" className="hover:text-ouro-claro">Dúvidas frequentes</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-body-sm uppercase tracking-wider text-white">Contato</h4>
          <ul className="space-y-2 text-body-md">
            <li><a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-ouro-claro">WhatsApp</a></li>
            <li><a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="hover:text-ouro-claro">Instagram @ricardocncbr</a></li>
          </ul>
        </div>
      </div>
      <div className="container-wide mt-10 flex flex-col items-center gap-3 border-t border-white/10 pt-6 text-body-sm text-footer-text sm:flex-row sm:justify-between">
        <span className="text-center sm:text-left">
          Íntegra Representações · Parceiro oficial ETools Imports · © {new Date().getFullYear()}
        </span>

        <span className="text-center text-[12px] text-footer-text">
          Site desenvolvido por{" "}
          <a
            href="https://wa.me/5547991969766"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-footer-text transition hover:text-ouro-claro"
          >
            JV WEB STUDIO
          </a>
        </span>

        <a
          href="/admin"
          aria-label="Acesso restrito — equipe Íntegra"
          title="Staff only"
          className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.15em] text-footer-text/60 transition hover:text-ouro-claro"
        >
          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <rect x="5" y="11" width="14" height="9" rx="2" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>
          Staff only
        </a>
      </div>
    </footer>
  );
}

/* ---------------- WHATSAPP FLUTUANTE ---------------- */
export function WhatsappFloat() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-xl transition hover:scale-110"
    >
      <WhatsappIcon className="h-7 w-7 text-white" />
    </a>
  );
}
