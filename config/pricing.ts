import { siteConfig } from "@/config/site"

export type IconAnimation = "none" | "bob" | "wave" | "pulse"

export type PricingTier = {
  id: string
  name: string
  price: string
  priceNote?: string
  description: string
  icon: string
  iconAnimation?: IconAnimation
  features: string[]
  ctaLabel: string
  ctaHref: string
  featured?: boolean
}

export const pricingTiers: PricingTier[] = [
  {
    id: "landing",
    name: "Landing",
    price: "Desde $250",
    description:
      "Una página enfocada en convertir visitas en consultas reales.",
    icon: "solar:flag-2-linear",
    iconAnimation: "wave",
    features: [
      "1 página optimizada para conversión",
      "Hero + servicios + testimonios + CTA",
      "Botón de WhatsApp y formulario",
      "100% responsive (móvil, tablet, desktop)",
      "Hosting y dominio incluidos (1er año)",
    ],
    ctaLabel: "Empezar mi landing",
    ctaHref: siteConfig.links.whatsapp,
  },
  {
    id: "profesional",
    name: "Profesional",
    price: "Desde $500",
    description:
      "Sitio completo para mostrar tu negocio con identidad propia.",
    icon: "solar:rocket-2-linear",
    iconAnimation: "bob",
    features: [
      "4 a 6 páginas/secciones a medida",
      "Catálogo o galería de servicios",
      "Diseño 100% personalizado para tu marca",
      "SEO técnico configurado",
      "Hosting + dominio incluidos (1er año)",
      "1 mes de soporte y cambios",
    ],
    ctaLabel: "Cotizar",
    ctaHref: siteConfig.links.whatsapp,
    featured: true,
  },
  {
    id: "a-medida",
    name: "A medida",
    price: "Cotización",
    description:
      "Para proyectos complejos: ecommerce, integraciones, automatización con IA.",
    icon: "solar:layers-minimalistic-linear",
    iconAnimation: "pulse",
    features: [
      "Ecommerce o catálogo dinámico",
      "Integraciones con CRM, ERP o pasarelas",
      "Automatización con IA (próximamente)",
      "Strategy session de 1 hora incluida",
      "Soporte y mejoras continuas",
      "Roadmap a 3-6 meses",
    ],
    ctaLabel: "Hablemos",
    ctaHref: siteConfig.links.whatsapp,
  },
]
