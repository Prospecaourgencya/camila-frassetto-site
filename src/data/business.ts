/**
 * Fonte ÚNICA de verdade do negócio (NAP + SEO + Schema.org).
 * Tudo que aparece em conteúdo, meta tags e JSON-LD sai daqui.
 *
 * ⚠️ CAMPOS A CONFIRMAR COM A CLIENTE (marcados com TODO):
 *   - crp: número de registro no Conselho Regional de Psicologia
 *   - openingHours: horários oficiais de atendimento
 *   - geo: coordenadas exatas (hoje aproximadas do bairro Alemães)
 */

export const SITE_URL = 'https://psicamilafrassetto.com.br';

export const business = {
  name: 'Camila Frassetto',
  jobTitle: 'Psicóloga Clínica',
  legalName: 'Camila Frassetto',
  /** TODO: confirmar CRP (ex.: "CRP 06/123456"). Vazio = oculto no site e no schema. */
  crp: '',
  description:
    'Psicóloga clínica em Piracicaba especializada em terapia de casal e individual. Atendimento particular, humano, ético e sigiloso — presencial no bairro Alemães e online para todo o Brasil.',
  yearsExperience: 7,
  foundingYear: 2018,

  // Contato / canais
  phoneDisplay: '(19) 99861-6509',
  phoneE164: '+5519998616509',
  whatsapp: '5519998616509',
  instagram: 'https://www.instagram.com/camilafrassetto.psi/',
  instagramHandle: '@camilafrassetto.psi',

  // Endereço (NAP) — consultório
  address: {
    street: 'Rua Cristiano Cleopath, 1776',
    neighborhood: 'Alemães',
    city: 'Piracicaba',
    state: 'SP',
    stateName: 'São Paulo',
    postalCode: '13419-310',
    country: 'BR',
  },
  /** TODO: refinar coordenadas exatas (via Google Business Profile). Aproximadas do bairro Alemães. */
  geo: { lat: -22.7086, lng: -47.6472 },
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Rua+Cristiano+Cleopath+1776+Alem%C3%A3es+Piracicaba+SP',
  mapsEmbed:
    'https://www.google.com/maps?q=Rua+Cristiano+Cleopath+1776+Alem%C3%A3es+Piracicaba+SP&output=embed',

  // Área de atuação
  areaServed: ['Piracicaba', 'Rio das Pedras', 'Saltinho', 'Santa Bárbara d’Oeste', 'Brasil (online)'],
  priceRange: '$$',

  /** Horários confirmados (Google): seg–sex 09:00–19:00; sáb/dom fechado. */
  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '19:00' },
  ],
} as const;

export type Service = { name: string; description: string };
export const services: Service[] = [
  { name: 'Terapia de casal', description: 'Reconstruir a comunicação, a confiança e a conexão — em um espaço neutro e seguro para os dois.' },
  { name: 'Terapia individual', description: 'Entender os seus padrões nas relações e construir vínculos mais saudáveis e leves.' },
  { name: 'Ciúme, insegurança e términos', description: 'Atravessar crises, ciúmes e separações sem se perder no caminho.' },
  { name: 'Autoestima e autoconhecimento', description: 'Voltar a se reconhecer e se respeitar — a base para amar bem sem se anular.' },
];

export type Review = { author: string; rating: 5; body: string; source: string };
/** Depoimentos REAIS (Google/pacientes). Base legítima para AggregateRating. */
export const reviews: Review[] = [
  { author: 'Naila Gama', rating: 5, source: 'Paciente há mais de 1 ano', body: 'Acompanho a Camila há mais de um ano. Só tenho a agradecer pelo respeito, pelo acolhimento e pela escuta em cada sessão — o meu crescimento é reflexo desse cuidado.' },
  { author: 'Nathalia Santos', rating: 5, source: 'Google', body: 'Ótima profissional, atenciosa e sempre disposta a ajudar. Recomendo!' },
  { author: 'Gabriele Oliveira', rating: 5, source: 'Google', body: 'Comunicativa, engraçada e uma excelente ouvinte. Me sinto muito acolhida nas sessões.' },
  { author: 'Angela Araujo', rating: 5, source: 'Google', body: 'Excelente profissional. Recomendo de olhos fechados.' },
  { author: 'Lucas Frassetto', rating: 5, source: 'Google', body: 'Psicóloga muito estudiosa e acolhedora. Faz toda a diferença no processo.' },
];

/** Nota e total REAIS do Google Business Profile (print da cliente). */
export const aggregateRating = {
  ratingValue: 5.0,
  reviewCount: 28,
  bestRating: 5,
  worstRating: 1,
};

export type Faq = { q: string; a: string };
/** FAQ otimizado para GEO (respostas diretas p/ IAs) e para FAQPage schema. */
export const faqs: Faq[] = [
  {
    q: 'A Camila Frassetto atende terapia de casal em Piracicaba?',
    a: 'Sim. Camila Frassetto é psicóloga clínica em Piracicaba e atende terapia de casal e terapia individual, de forma presencial no consultório (bairro Alemães) e online para todo o Brasil.',
  },
  {
    q: 'Como funciona a terapia de casal?',
    a: 'A terapia de casal acontece em encontros semanais, num espaço neutro e sigiloso, onde os dois podem falar sem julgamento. O trabalho ajuda a reconstruir a comunicação, a confiança e a conexão, respeitando o ritmo do casal — sem fórmulas prontas.',
  },
  {
    q: 'O atendimento é online? Como funciona?',
    a: 'Sim. Além do consultório em Piracicaba, Camila atende online por videochamada para todo o Brasil, com a mesma escuta e sigilo do atendimento presencial. A modalidade é combinada na primeira conversa.',
  },
  {
    q: 'Quanto tempo dura uma sessão e com que frequência?',
    a: 'As sessões duram cerca de 50 minutos e, em geral, acontecem semanalmente, em acompanhamento contínuo. A frequência é ajustada conforme a necessidade de cada pessoa ou casal.',
  },
  {
    q: 'O atendimento é particular? Emite nota fiscal para reembolso?',
    a: 'Sim. O atendimento é particular, com agenda limitada para garantir dedicação real a cada caso, e há emissão de nota fiscal para você solicitar reembolso junto ao seu plano de saúde.',
  },
  {
    q: 'Onde fica o consultório da Camila em Piracicaba?',
    a: 'O consultório fica na Rua Cristiano Cleopath, 1776, bairro Alemães, Piracicaba–SP (CEP 13419-310). O atendimento presencial é com hora marcada.',
  },
  {
    q: 'Qual é a abordagem da Camila?',
    a: 'O centro do trabalho é a escuta. Cada processo é construído com o paciente, respeitando sua história e seu tempo, num espaço de sigilo, ética e acolhimento, sem julgamento.',
  },
  {
    q: 'Como faço para agendar a primeira conversa?',
    a: 'Basta chamar pelo WhatsApp (19) 99861-6509 ou pelo Instagram @camilafrassetto.psi. O primeiro passo é uma conversa para entender a sua necessidade e combinar o melhor horário.',
  },
];
