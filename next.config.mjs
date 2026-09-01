// @ts-check

const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "img-src 'self' data:",
  "font-src 'self' https://fonts.gstatic.com data:",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "script-src 'self' 'unsafe-inline'",
  "connect-src 'self'",
  "frame-src https://www.google.com https://maps.google.com",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join('; ');

const security = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=(), interest-cohort=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
];

const r = (source, destination) => ({ source, destination, permanent: true });

/** @type {import('next').NextConfig} */
export default {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      { source: '/:path*', headers: security },
      { source: '/js/:f*', headers: [{ key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' }] },
      { source: '/img/:f*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
    ];
  },
  async redirects() {
    return [
      r('/home', '/'),
      r('/inicio', '/'),
      r('/index.php', '/'),
      r('/sobre', '/#sobre'),
      r('/sobre-mim', '/#sobre'),
      r('/quem-sou', '/#sobre'),
      r('/servicos', '/#servicos'),
      r('/atendimento', '/#servicos'),
      r('/terapia-de-casal', '/#servicos'),
      r('/depoimentos', '/#depoimentos'),
      r('/contato', '/#contato'),
      r('/agendar', '/#contato'),
      r('/faq', '/#faq'),
      r('/blog', '/'),
      r('/blog/:s*', '/'),
    ];
  },
};
