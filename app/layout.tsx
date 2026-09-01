import './globals.css';
import type { Metadata, Viewport } from 'next';
import { business, services, reviews, aggregateRating, faqs, SITE_URL } from './lib/business';

const a = business.address;
const title = 'Camila Frassetto | Psicóloga em Piracicaba — Terapia de Casal e Individual';
const ogImage = '/img/og.jpg';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description: business.description,
  alternates: { canonical: '/' },
  authors: [{ name: business.name }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: business.name,
    title,
    description: business.description,
    url: SITE_URL,
    images: [{ url: ogImage, width: 1200, height: 630, alt: `${business.name} — ${business.jobTitle} em ${a.city}` }],
  },
  twitter: { card: 'summary_large_image', title, description: business.description, images: [ogImage] },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/img/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  other: {
    'geo.region': 'BR-SP',
    'geo.placename': 'Piracicaba',
    'geo.position': `${business.geo.lat};${business.geo.lng}`,
    ICBM: `${business.geo.lat}, ${business.geo.lng}`,
  },
};

export const viewport: Viewport = { themeColor: '#0E2C20' };

const orgId = `${SITE_URL}/#business`;
const personId = `${SITE_URL}/#camila`;

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['ProfessionalService', 'MedicalBusiness'],
      '@id': orgId,
      name: business.name,
      alternateName: 'Camila Frassetto Psicóloga',
      description: business.description,
      url: SITE_URL,
      image: new URL(ogImage, SITE_URL).href,
      logo: new URL('/img/favicon-512.png', SITE_URL).href,
      telephone: business.phoneE164,
      priceRange: business.priceRange,
      currenciesAccepted: 'BRL',
      medicalSpecialty: 'Psychiatric',
      knowsLanguage: 'pt-BR',
      founder: { '@id': personId },
      employee: { '@id': personId },
      address: {
        '@type': 'PostalAddress',
        streetAddress: a.street,
        addressLocality: a.city,
        addressRegion: a.state,
        postalCode: a.postalCode,
        addressCountry: a.country,
      },
      geo: { '@type': 'GeoCoordinates', latitude: business.geo.lat, longitude: business.geo.lng },
      hasMap: business.mapsUrl,
      areaServed: business.areaServed.map((name) => ({ '@type': 'City', name })),
      openingHoursSpecification: business.openingHours.map((h) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: h.days,
        opens: h.opens,
        closes: h.closes,
      })),
      sameAs: [business.instagram],
      makesOffer: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.name, description: s.description, serviceType: 'Psicoterapia' },
      })),
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: aggregateRating.ratingValue,
        reviewCount: aggregateRating.reviewCount,
        bestRating: aggregateRating.bestRating,
        worstRating: aggregateRating.worstRating,
      },
      review: reviews.map((rv) => ({
        '@type': 'Review',
        reviewRating: { '@type': 'Rating', ratingValue: rv.rating, bestRating: 5 },
        author: { '@type': 'Person', name: rv.author },
        reviewBody: rv.body,
      })),
    },
    {
      '@type': 'Person',
      '@id': personId,
      name: business.name,
      jobTitle: business.jobTitle,
      worksFor: { '@id': orgId },
      url: SITE_URL,
      image: new URL(ogImage, SITE_URL).href,
      sameAs: [business.instagram],
      knowsAbout: ['Terapia de casal', 'Terapia individual', 'Psicologia clínica', 'Autoestima', 'Relacionamentos'],
      address: { '@type': 'PostalAddress', addressLocality: a.city, addressRegion: a.state, addressCountry: a.country },
      ...(business.crp ? { identifier: business.crp } : {}),
    },
    { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: SITE_URL, name: business.name, inLanguage: 'pt-BR', publisher: { '@id': orgId } },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#faq`,
      mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Início', item: SITE_URL }] },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Newsreader:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap"
          rel="stylesheet"
        />
        <link rel="preload" as="image" href="/img/hero-desktop.avif" type="image/avif" media="(min-width: 821px)" fetchPriority="high" />
        <link rel="preload" as="image" href="/img/hero-mobile.avif" type="image/avif" media="(max-width: 820px)" fetchPriority="high" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </head>
      <body>
        {children}
        <script src="/js/app.js" defer />
      </body>
    </html>
  );
}
