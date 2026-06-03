# Deploy na Vercel — Site Íntegra

Guia rápido para colocar o site no ar. ~10 minutos.

## Pré-requisitos
- Conta no **GitHub** (gratuita) — vamos subir o código pra lá
- Conta na **Vercel** (gratuita) — entra com o GitHub
- Git instalado na máquina

---

## Passo 1 — Subir o código pro GitHub

No terminal, dentro da pasta `site-integra`:

```bash
cd "E:\DESENVOLVIMENTO DE SITES\SITE RICARDO CNC\SITE RICARDO CNC\site-integra"

git init
git add .
git commit -m "Site Íntegra - primeira versão"
```

Depois crie um repositório **privado** no GitHub (github.com → New repository → nome: `site-integra` → Private → Create).
O GitHub mostra os comandos; cole estes (troque SEU-USUARIO):

```bash
git remote add origin https://github.com/SEU-USUARIO/site-integra.git
git branch -M main
git push -u origin main
```

> ✅ O `.env.local` **não vai** pro GitHub (está no .gitignore). As chaves ficam seguras.

---

## Passo 2 — Importar na Vercel

1. Acesse **vercel.com** → entre com o GitHub
2. **Add New → Project**
3. Selecione o repositório `site-integra` → **Import**
4. A Vercel detecta o Next.js automaticamente. **Não mude** as configurações de build.

---

## Passo 3 — Variáveis de ambiente (MUITO IMPORTANTE)

Antes de clicar em Deploy, em **Environment Variables**, adicione as 4 (copie do seu `.env.local`):

| Nome | Valor |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | https://xjcgmcphxwvbnhituozi.supabase.co |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | (a anon key) |
| `SUPABASE_SERVICE_ROLE_KEY` | (a service_role key) |
| `NEXT_PUBLIC_WHATSAPP_NUMERO` | 55 + DDD + número (ex: 5547999999999) |

Depois clique em **Deploy**. Em ~2 minutos o site está no ar com uma URL `.vercel.app`.

---

## Passo 4 — Ajustes finais

1. **No Supabase** → Authentication → URL Configuration → adicione a URL da Vercel em **Site URL** e **Redirect URLs** (pro login do admin funcionar no domínio novo).
2. **Domínio próprio** (ex: integracnc.com.br): Vercel → Project → Settings → Domains → Add. A Vercel te dá os registros DNS pra apontar.

---

## Atualizações futuras
Toda vez que quiser publicar uma mudança:
```bash
git add .
git commit -m "descrição da mudança"
git push
```
A Vercel faz o deploy automático a cada push. 🚀

---

## Checklist antes de mostrar pro Ricardo
- [ ] Rodou todos os SQLs no Supabase (setup, marcas, textos, leads, admin-extras)
- [ ] Trocou o `NEXT_PUBLIC_WHATSAPP_NUMERO` pelo número real
- [ ] Usuário admin criado no Supabase
- [ ] Site Url / Redirect configurados no Supabase Auth
- [ ] Testou: pop-up, formulário de orçamento, login admin, catálogo
