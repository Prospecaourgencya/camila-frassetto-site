# Camila Frassetto — Site (Astro)

Site institucional de **Camila Frassetto — Psicóloga Clínica em Piracicaba** (terapia de casal e individual, presencial e online). Reconstruído a partir de um `index.html` monolítico de 4,3 MB para um projeto **Astro + TypeScript** com SEO técnico, SEO local (GEO), Schema.org rico, GEO (Generative Engine Optimization) e performance de topo.

- **Domínio de produção:** https://psicamilafrassetto.com.br
- **Stack:** Astro 5, TypeScript, sharp (pipeline de imagens), `@astrojs/sitemap`, fontes self-hosted (`@fontsource-variable`)
- **Saída:** 100% estática (ideal para Netlify/Vercel)

---

## Como rodar

Requisitos: Node 18.20+/20.3+/22+ (testado em Node 24).

```bash
npm install        # instala dependências
npm run images     # (re)gera imagens otimizadas AVIF/WebP + OG + favicons
npm run dev        # servidor de desenvolvimento (http://localhost:4321)
npm run build      # build de produção -> ./dist
npm run preview    # serve o ./dist localmente
```

> `npm run images` lê os originais em `assets-src/` e escreve em `public/img/`. Rode-o sempre que trocar uma foto.

---

## Estrutura

```
site/
├─ astro.config.mjs         # site URL, sitemap, HTML/CSS inline+minify
├─ assets-src/              # imagens ORIGINAIS (fonte para o pipeline sharp)
├─ scripts/optimize-images.mjs   # gera AVIF/WebP responsivo, OG e favicons
├─ public/
│  ├─ robots.txt            # + libera GPTBot/Perplexity/ClaudeBot (GEO)
│  ├─ site.webmanifest      # PWA
│  ├─ _headers              # segurança (CSP/HSTS) + cache (Netlify)
│  ├─ _redirects            # 301 de URLs antigas do WordPress
│  ├─ favicon.svg, apple-touch-icon.png
│  └─ img/                  # imagens otimizadas geradas
└─ src/
   ├─ data/business.ts      # FONTE ÚNICA: NAP, serviços, reviews, FAQ (alimenta conteúdo + Schema)
   ├─ layouts/Base.astro    # <head>: SEO, OG/Twitter, canonical, JSON-LD, preload do LCP
   ├─ components/           # Header, Hero, Footer
   └─ pages/index.astro     # a landing (single-page) + FAQ + mapa + scripts
```

### Onde editar conteúdo
- **Dados do negócio, serviços, depoimentos, FAQ:** `src/data/business.ts`
- **Textos das seções:** `src/pages/index.astro`
- **Fotos:** troque em `assets-src/` e rode `npm run images`

> ⚠️ **A confirmar com a cliente** (em `src/data/business.ts`): número do **CRP** e **horários de atendimento**. O CRP fica oculto no site e no schema enquanto estiver vazio.

---

## Como fazer deploy

### Netlify (recomendado — o site antigo já era Netlify)
1. **Via Git (ideal):** conecte o repositório. Build command `npm run build`, publish directory `dist`. `_headers` e `_redirects` são aplicados automaticamente.
2. **Via drag-and-drop:** rode `npm run build` e arraste a pasta `dist/` em app.netlify.com (ou publique o zip `CAMILA-FRASSETTO-SITE-ASTRO-NETLIFY.zip`).
3. Aponte o domínio `psicamilafrassetto.com.br` para o site e habilite HTTPS (SSL grátis Netlify).

### Vercel
- Framework preset **Astro**, build `npm run build`, output `dist`. Recrie os headers de `_headers` em `vercel.json` se necessário.

---

## O que foi implementado

**Performance (Lighthouse mobile):** Performance **100** · Accessibility **100** · Best Practices **96** · SEO **100**. LCP **1,3 s** · CLS **0** · TBT **0 ms**.
- Imagens base64 (4,3 MB) → AVIF/WebP responsivo (~200 KB no total). Hero 1,6 MB → **16 KB**.
- Preload do LCP com `fetchpriority=high` (art-direction desktop/mobile).
- Fontes self-hosted (sem request ao Google Fonts), CSS crítico inline, zero JS bloqueante.
- HTML final: **85 KB** (era 4,38 MB).

**SEO técnico:** `<title>`/description locais, canonical, robots meta, Open Graph + Twitter Cards com imagem OG 1200×630, `sitemap-index.xml`, `robots.txt`, favicons + apple-touch + manifest, HTML semântico e hierarquia de headings correta.

**Schema.org (JSON-LD @graph):** `ProfessionalService`+`MedicalBusiness` (NAP, geo, horários, priceRange, areaServed), `Person`, `WebSite`, `Service` (ofertas), `AggregateRating` (5,0/5 — depoimentos reais), `Review` ×5, `FAQPage` (8 perguntas), `BreadcrumbList`.

**SEO local / GEO geográfico:** NAP consistente (site + footer + schema), bairro Alemães + Piracicaba/SP/CEP, mapa Google embutido, meta `geo.*`.

**GEO (Generative Engine Optimization):** FAQ em linguagem natural respondendo perguntas reais, respostas diretas no início das seções, entidades claras (nome, localização, especialidades), `robots.txt` liberando crawlers de IA.

**Segurança/cache:** CSP, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy; cache imutável para assets com hash.

Veja `docs/RELATORIO-SEO-GEO-PERFORMANCE.md` (antes×depois) e `docs/MIGRACAO-SEO.md` (passos manuais do cliente).
