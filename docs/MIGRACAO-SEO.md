# Guia de Migração SEO — o que a Camila (ou você) precisa fazer manualmente

O site novo usa o **mesmo domínio** (`psicamilafrassetto.com.br`) do antigo (WordPress). Isso preserva **autoridade de domínio e backlinks** já existentes. Abaixo, os passos que **não dá para automatizar** — em ordem de prioridade.

## ✅ O que já está pronto no site (feito pelo agente)
- SEO técnico, Open Graph, canonical, sitemap, robots.txt, Schema.org completo.
- `_redirects` com 301 dos caminhos comuns de WordPress (`/sobre`, `/contato`, `/blog`, etc.) → nova home.
- Performance e acessibilidade no topo (Lighthouse 96–100).

---

## 1. Domínio, DNS e SSL  🔴 (crítico)
1. Confirmar que `psicamilafrassetto.com.br` está apontando para a nova hospedagem (Netlify/Vercel).
2. Habilitar **HTTPS/SSL** (grátis no Netlify) e forçar redirecionamento http→https e www→sem-www.
3. Testar: `https://psicamilafrassetto.com.br` deve abrir o novo site com cadeado.

## 2. Google Search Console  🔴 (crítico)
1. Acessar https://search.google.com/search-console com a conta que já era dona do domínio antigo.
2. Se a propriedade já existir (mesmo domínio), ela continua válida — apenas confirme a verificação.
3. **Enviar o sitemap:** `https://psicamilafrassetto.com.br/sitemap-index.xml`.
4. Usar **Inspeção de URL** → *Solicitar indexação* para a home.
5. Em **Páginas/Cobertura**, observar URLs antigas do WordPress ainda indexadas; se aparecerem 404, os `_redirects` já cobrem as mais comuns — adicione novas regras em `public/_redirects` conforme surgirem.

## 3. Redirecionamentos 301 (URLs antigas)  🟠
- O arquivo `public/_redirects` já trata `/sobre`, `/servicos`, `/contato`, `/depoimentos`, `/blog`, `/blog/*`, `/index.php` etc.
- **Ação:** depois de 1–2 semanas, veja no Search Console (aba Páginas) quais URLs antigas o Google ainda conhece e **adicione uma linha** para cada padrão não coberto:
  ```
  /caminho-antigo    /#secao-nova    301
  ```

## 4. Google Business Profile (Perfil da Empresa)  🔴 (essencial p/ "psicóloga Piracicaba")
1. Reivindicar/atualizar o perfil em https://business.google.com.
2. **NAP idêntico ao do site:** Camila Frassetto · Rua Cristiano Cleopath, 1776 — Alemães, Piracicaba/SP · (19) 99861-6509.
3. Categoria: **Psicólogo**. Adicionar site novo, horários reais, fotos e serviços (terapia de casal, individual, online).
4. Pedir avaliações no Google aos pacientes (reforça o ranking local e o `AggregateRating`).
5. **Enviar as coordenadas exatas** do consultório para eu atualizar em `src/data/business.ts` (`geo`).

## 5. Dados a confirmar e preencher no código  🟠
Em `src/data/business.ts`:
- `crp`: número do CRP (ex.: `CRP 06/123456`) — obrigatório por ética profissional; hoje está oculto.
- `openingHours`: horários reais de atendimento (hoje: seg–sex 08:00–19:00 como suposição).
- `geo`: coordenadas exatas (hoje aproximadas do bairro Alemães).

## 6. Analytics e Tag Manager  🟠
- Não há analytics no site novo (mantido leve). Recomendo criar/migrar **Google Analytics 4** e, se quiser, **Google Tag Manager**.
- Me envie o **ID de medição (G-XXXXXXX)** que eu adiciono de forma performática (script diferido).

## 7. Diretórios e perfis externos  🟢
Atualizar o link do site novo em:
- **Doctoralia** (perfil da Camila) — e sincronizar NAP.
- **Instagram** (@camilafrassetto.psi) — link na bio.
- **Linktree / outros** — apontar para `psicamilafrassetto.com.br`.
- Conexa Saúde e demais diretórios em que houver cadastro.

## 8. Validações finais (pós-deploy)  🟢
- **Rich Results:** https://search.google.com/test/rich-results (esperado: LocalBusiness/ProfessionalService, FAQ, Review válidos).
- **Open Graph:** https://www.opengraph.xyz ou o depurador do Facebook/LinkedIn.
- **Lighthouse/PageSpeed:** https://pagespeed.web.dev (rodar já no domínio real, com CDN/Brotli da Netlify).

---

### Ordem sugerida
1 (DNS/SSL) → 2 (Search Console + sitemap) → 4 (Business Profile) → 5 (CRP/horários) → 3/6/7/8.
