export type NavItem = {
  title: string
  href: string
  description?: string
  /** Iconify icon name, e.g. "solar:target-linear" */
  icon?: string
  comingSoon?: boolean
  /** Bullet-point highlights, used in featured contexts. */
  highlights?: string[]
}

export const siteConfig = {
  name: "devscor",
  description:
    "Diseñamos páginas web modernas para negocios que quieren verse más profesionales y vender mejor.",
  url: "https://devscor.com",
  location: "Lima, Perú",
  links: {
    whatsapp: "https://wa.me/51902222771",
    email: "mailto:devscor.dev@gmail.com",
    instagram: "https://www.instagram.com/devscorai/",
    linkedin: "https://www.linkedin.com/company/devscorai",
    x: "https://x.com/devscorai",
  },
} as const

export const mainNav: {
  services: NavItem[]
  servicesIndex: NavItem
  links: NavItem[]
} = {
  services: [
    {
      title: "Webs para negocios",
      href: "/servicios/webs-para-negocios",
      description:
        "Sitios modernos que muestran tu marca, servicios y generan confianza desde el primer click.",
      icon: "solar:window-frame-linear",
      highlights: [
        "Diseño 100% personalizado a tu marca",
        "Hasta 6 secciones optimizadas para conversión",
        "WhatsApp, formularios y reservas integrados",
        "SEO técnico y métricas configuradas",
      ],
    },
    {
      title: "Landing pages",
      href: "/servicios/landing-pages",
      description: "Diseñadas para convertir visitas en clientes.",
      icon: "solar:target-linear",
    },
    {
      title: "Rediseño web",
      href: "/servicios/redisenio",
      description: "Renovamos tu sitio actual para que venda mejor.",
      icon: "solar:palette-linear",
    },
    {
      title: "Automatización con IA",
      href: "/servicios/automatizacion-ia",
      description: "Flujos para captar, responder y organizar clientes.",
      icon: "solar:atom-linear",
      comingSoon: true,
    },
  ],
  servicesIndex: {
    title: "Ver todos los servicios",
    href: "/servicios",
  },
  links: [
    { title: "Proceso", href: "/proceso" },
    { title: "Casos", href: "/casos" },
    { title: "Precios", href: "/precios" },
  ],
}
