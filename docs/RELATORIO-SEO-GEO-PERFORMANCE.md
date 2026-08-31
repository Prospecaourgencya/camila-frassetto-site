# Relatório — SEO + GEO + Performance (antes × depois)

Projeto: **Camila Frassetto — Psicóloga em Piracicaba** · Reconstrução do site (HTML monolítico → Astro).

## 1. Performance

| Métrica | Antes (HTML monolítico) | Depois (Astro) |
|---|---|---|
| Peso da página (HTML) | **4,38 MB** (95% base64) | **85 KB** |
| Payload total de imagens | ~4,3 MB (base64, sem lazy) | **~200 KB** (AVIF/WebP + lazy) |
| Imagem do hero | 1,6 MB (PNG) | **16 KB** (AVIF) |
| Formatos | PNG/WebP embutidos | AVIF + WebP + fallback, responsivo |
| Fontes | Google Fonts (request externo, render-blocking) | **Self-hosted** (woff2, `display:swap`) |
| JS | inline | bundle mínimo, `type=module`, não bloqueante |
| CSS crítico | — | **inline** no `<head>` |

### Lighthouse (mobile, com throttling)

| Categoria | Score |
|---|---|
| Performance | **100** |
| Accessibility | **100** |
| Best Practices | **96** ¹ |
| SEO | **100** |

**Core Web Vitals:** LCP **1,3 s** (meta < 2,5 s ✅) · CLS **0** (meta < 0,1 ✅) · TBT **0 ms** · FCP 1,0 s · Speed Index 1,0 s.

¹ Os 4 pontos de Best Practices vêm exclusivamente do **iframe do Google Maps** (cookies de terceiros) — inerente ao embed de mapa e aceitável. Removê-lo levaria a 100.

## 2. SEO técnico

| Item | Antes | Depois |
|---|---|---|
| Title / meta description | básicos | otimizados com termos locais |
| Open Graph / Twitter Cards | ❌ | ✅ completos + imagem OG 1200×630 |
| Canonical | ❌ | ✅ |
| robots meta / robots.txt | ❌ | ✅ (+ crawlers de IA liberados) |
| sitemap.xml | ❌ | ✅ `sitemap-index.xml` (automático) |
| Favicon / apple-touch / manifest (PWA) | ❌ | ✅ |
| HTML semântico + hierarquia de headings | parcial | ✅ h1→h2→h3 correta |
| meta geo.* / ICBM | ❌ | ✅ |

## 3. Schema.org / Structured Data (JSON-LD @graph)

Antes: **nenhum**. Depois:

- `ProfessionalService` + `MedicalBusiness` — NAP, `GeoCoordinates`, `OpeningHoursSpecification`, `priceRange`, `areaServed`, `sameAs`
- `Person` (Camila) — jobTitle, knowsAbout, worksFor
- `Service` / `Offer` — terapia de casal, individual e outros
- `AggregateRating` **5,0 / 5** + `Review` ×5 (**depoimentos reais**, não inventados)
- `FAQPage` — **8 perguntas**
- `WebSite` + `BreadcrumbList`

> Validar em https://search.google.com/test/rich-results após o deploy.

## 4. SEO Local / GEO geográfico (Piracicaba)

- NAP consistente (conteúdo + footer + JSON-LD): Rua Cristiano Cleopath, 1776 — Alemães, Piracicaba/SP, CEP 13419-310.
- Termos-alvo trabalhados no conteúdo: *psicóloga Piracicaba*, *terapia de casal Piracicaba*, *terapia individual*, *psicóloga clínica Piracicaba*, *terapia online*.
- Bairro (Alemães), cidade, estado e CEP explícitos.
- Mapa do Google embutido na seção de contato.

## 5. GEO (Generative Engine Optimization — respostas de IA)

- **FAQ de 8 perguntas** em linguagem natural (como funciona terapia de casal, atende online, duração da sessão, nota fiscal, onde fica etc.) — otimizado para citação por Google AI Overviews, Perplexity, ChatGPT, Gemini.
- Respostas diretas e objetivas no início das seções.
- Entidades claras e repetidas (nome, profissão, localização, especialidades).
- `robots.txt` libera explicitamente GPTBot, OAI-SearchBot, PerplexityBot, Google-Extended e ClaudeBot.

## 6. Pendências que dependem da cliente

- **CRP** e **horários oficiais** (preencher em `src/data/business.ts`).
- Coordenadas exatas do consultório (hoje aproximadas do bairro).
- Nota real do Google (para refinar `AggregateRating`, se diferente de 5,0).

Detalhes de migração em `MIGRACAO-SEO.md`.
