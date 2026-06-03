"use client";

import { useState } from "react";

const itens = [
  {
    q: "Não sei se minha empresa tem demanda para uma máquina dessas.",
    a: "Essa é a primeira coisa que analisamos juntos. No diagnóstico, avaliamos sua demanda atual e seu potencial de crescimento para indicar a solução do tamanho certo — nem mais, nem menos do que você precisa.",
  },
  {
    q: "Meu galpão é pequeno, será que cabe?",
    a: "Consideramos seu espaço físico antes de qualquer indicação. Existem soluções para diferentes tamanhos de operação, e nosso papel é encontrar a que se encaixa na sua estrutura real.",
  },
  {
    q: "Minha equipe não sabe operar o software. E agora?",
    a: "Orientamos sobre treinamento e a adaptação dos seus processos como parte do projeto. Você não fica sozinho na hora de colocar a máquina para funcionar.",
  },
  {
    q: "Em quanto tempo eu tenho retorno do investimento?",
    a: "Depende do seu cenário — por isso fazemos o diagnóstico antes. Apresentamos expectativas reais de retorno com base na sua produção, sem promessas vazias.",
  },
  {
    q: "Como funciona o suporte depois da compra?",
    a: "Acompanhamos a entrega, a instalação e a evolução do projeto, fazendo a ponte com o fabricante. Mantemos contato mesmo sem negociação em andamento — suporte de verdade.",
  },
];

export default function Faq() {
  const [aberto, setAberto] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-creme-dark py-20 xl:py-28">
      <div className="container-wide max-w-[820px]">
        <h2 className="mb-12 text-center font-serif text-[clamp(27px,3.6vw,40px)] text-marinho">
          Dúvidas frequentes
        </h2>
        {itens.map((item, i) => {
          const open = aberto === i;
          return (
            <div key={i} className="border-b border-linha">
              <button
                onClick={() => setAberto(open ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left font-sans text-h6 font-semibold text-marinho"
              >
                {item.q}
                <span className={`shrink-0 text-3xl text-ouro transition-transform ${open ? "rotate-45" : ""}`}>
                  +
                </span>
              </button>
              <div className={`grid transition-all ${open ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">
                  <p className="text-body-lg text-preto/65">{item.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
