import type { FaqItem } from "@/config/faq"
import { siteConfig } from "@/config/site"

/**
 * IDs estables para cross-referenciar entidades dentro del mismo @graph.
 * Schema.org permite usar @id como puntero entre nodos del grafo.
 */
const ORG_ID = `${siteConfig.url}/#organization`
const BUSINESS_ID = `${siteConfig.url}/#business`
const WEBSITE_ID = `${siteConfig.url}/#website`

/**
 * Teléfono en formato E.164 (estándar internacional).
 * Lo derivamos del link de WhatsApp: https://wa.me/51902222771 → +51902222771
 */
const PHONE_E164 = "+51902222771"

/**
 * Email limpio (sin el prefijo "mailto:").
 */
const EMAIL = siteConfig.links.email.replace(/^mailto:/, "")

/* ──────────────────────────────────────────────────────────────────────────
 * ORGANIZATION
 * Le dice a Google: "esta es la entidad/marca devscor".
 * Habilita el Knowledge Panel en búsquedas de marca.
 * ────────────────────────────────────────────────────────────────────────── */
export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: siteConfig.name,
    legalName: "devscor",
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: `${siteConfig.url}/logo.svg`,
      contentUrl: `${siteConfig.url}/logo.svg`,
    },
    image: `${siteConfig.url}/og.png`,
    description: siteConfig.description,
    email: EMAIL,
    telephone: PHONE_E164,
    sameAs: [
      siteConfig.links.instagram,
      siteConfig.links.linkedin,
      siteConfig.links.x,
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: PHONE_E164,
      email: EMAIL,
      contactType: "customer service",
      areaServed: ["PE", "LATAM"],
      availableLanguage: ["Spanish", "English"],
    },
  }
}

/* ──────────────────────────────────────────────────────────────────────────
 * LOCAL BUSINESS (ProfessionalService)
 * Activa SEO local: panel lateral en búsquedas como "agencia web Lima",
 * Google Maps integration, ranking local prioritario.
 * ────────────────────────────────────────────────────────────────────────── */
export function localBusinessSchema() {
  return {
    "@type": "ProfessionalService",
    "@id": BUSINESS_ID,
    name: siteConfig.name,
    url: siteConfig.url,
    image: `${siteConfig.url}/og.png`,
    logo: `${siteConfig.url}/logo.svg`,
    description: siteConfig.description,
    telephone: PHONE_E164,
    email: EMAIL,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lima",
      addressRegion: "Lima",
      addressCountry: "PE",
    },
    areaServed: [
      { "@type": "Country", name: "Peru" },
      { "@type": "Place", name: "Latinoamérica" },
    ],
    serviceType: [
      "Diseño y desarrollo web",
      "Landing pages",
      "Rediseño web",
      "Optimización de conversión",
      "Automatización con IA",
    ],
    knowsAbout: [
      "Diseño web",
      "Desarrollo web",
      "Landing pages",
      "Rediseño web",
      "Páginas web profesionales",
      "Sitios web para negocios",
      "Web design",
      "Next.js",
      "React",
      "Tailwind CSS",
      "Optimización SEO",
    ],
    sameAs: [
      siteConfig.links.instagram,
      siteConfig.links.linkedin,
      siteConfig.links.x,
    ],
    provider: { "@id": ORG_ID },
  }
}

/* ──────────────────────────────────────────────────────────────────────────
 * WEBSITE
 * Identifica el sitio como entidad. Habilita sitelinks en SERP.
 * ────────────────────────────────────────────────────────────────────────── */
export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: "es-PE",
    publisher: { "@id": ORG_ID },
  }
}

/* ──────────────────────────────────────────────────────────────────────────
 * FAQ PAGE
 * Activa rich snippets de preguntas/respuestas en el resultado de Google.
 * Solo inyectar en la página donde el FAQ realmente aparece visible.
 * ────────────────────────────────────────────────────────────────────────── */
export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }
}

/* ──────────────────────────────────────────────────────────────────────────
 * BREADCRUMB LIST
 * Mejora navegación en SERP (muestra "devscor › Servicios › Landing pages").
 * Útil para páginas internas. Se construye desde el path real.
 * ────────────────────────────────────────────────────────────────────────── */
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/* ──────────────────────────────────────────────────────────────────────────
 * GLOBAL @graph
 * Combina las 3 entidades base (Organization + LocalBusiness + WebSite)
 * en un solo grafo para inyectar en el layout. @id permite referencias
 * cruzadas (ej. provider/publisher apuntan a Organization).
 * ────────────────────────────────────────────────────────────────────────── */
export function globalGraphSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema(),
      localBusinessSchema(),
      websiteSchema(),
    ],
  }
}
