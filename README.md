# Site Íntegra — CNC & Automação (Next.js + Supabase)

Site full stack do Ricardo Senhorinha / Íntegra Representações.
Stack: **Next.js (App Router) + TypeScript + Tailwind + Supabase**, deploy na Vercel.

## Como rodar na sua máquina

Pré-requisito: **Node.js 18.17+** instalado.

```bash
cd site-integra
npm install        # instala as dependências
npm run dev        # sobe o servidor em http://localhost:3000
```

O arquivo `.env.local` já está configurado com as chaves do Supabase e o número de WhatsApp.

> ⚠️ Edite `NEXT_PUBLIC_WHATSAPP_NUMERO` no `.env.local` com o número real do Ricardo (formato: `5547999999999`).

## Estrutura

```
app/                  páginas (App Router)
  page.tsx            landing (lê máquinas + depoimentos do Supabase)
  layout.tsx          fontes (Fraunces + Inter Tight) e metadados
  globals.css         Tailwind + componentes (botões pill, etc.)
components/
  icons.tsx           logo + ícones
  site/               Header, Hero, Secoes, Faq, FormSolicitacao
lib/
  config.ts           WhatsApp / Instagram
  supabase/           clients (browser, server, admin) + tipos
  actions/            Server Actions (envio de solicitação)
middleware.ts         protege /admin
tailwind.config.ts    design tokens (dourado, marinho, carvão, creme)
```

## O que já funciona (Fase 0 + 1)
- Landing completa com design system Íntegra e a copy aprovada.
- Catálogo em destaque + depoimentos lidos do banco (Supabase).
- Formulário de solicitação gravando na tabela `solicitacoes`.
- WhatsApp em todos os CTAs + botão flutuante.

## Próximas fases (a construir)
- Fase 2: catálogo público `/maquinas` e `/maquinas/[slug]`.
- Fase 3-6: painel admin (login, solicitações, CRUD máquinas/depoimentos, dashboard).
- Fase 7: deploy na Vercel.

## Deploy (Vercel) — resumo
1. Subir o projeto para um repositório Git.
2. Importar na Vercel.
3. Colar as variáveis de ambiente do `.env.local` nas Environment Variables da Vercel.
4. Deploy automático.

## Segurança
- `.env.local` está no `.gitignore` (nunca vai pro Git).
- A `service_role` key deve ser tratada como secreta. Recomendado resetá-la no Supabase após o deploy, já que foi compartilhada durante o desenvolvimento.
