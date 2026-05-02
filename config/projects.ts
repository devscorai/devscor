export type Project = {
  name: string
  industry: string
  url: string
  description: string
  /** Path en /public, ej: "/showcase/cafe-aurora.webp". Si no hay, usa gradient placeholder. */
  imageSrc?: string
  /** Slug del caso completo, ej: "/casos/cafe-aurora" */
  caseHref?: string
  /** Tailwind classes para el marco de color que envuelve el browser window. */
  frameClassName?: string
  /** Tailwind gradient classes para placeholder cuando no hay imageSrc */
  placeholderGradient?: string
}

export const projects: Project[] = [
  {
    name: "Jherry",
    industry: "Portfolio",
    url: "jherry.me",
    description: "Portfolio personal con animaciones suaves.",
    imageSrc: "/showcase/jherry.webp",
    frameClassName:
      "bg-linear-to-br from-rose-300 via-pink-300 to-fuchsia-400",
    placeholderGradient: "from-violet-200 via-indigo-300 to-blue-400",
  },
  {
    name: "Quotely",
    industry: "Cotizaciones",
    url: "quotelygdh.vercel.app",
    description: "Generador de cotizaciones moderno.",
    imageSrc: "/showcase/quotely.webp",
    frameClassName:
      "bg-linear-to-br from-amber-200 via-orange-300 to-rose-300",
    placeholderGradient: "from-sky-200 via-cyan-300 to-teal-400",
  },
  {
    name: "Solgas en Lima",
    industry: "Distribución",
    url: "solgasenlima.pe",
    description: "Pedidos de gas con conversión por WhatsApp.",
    imageSrc: "/showcase/solgasenlima.webp",
    frameClassName:
      "bg-linear-to-br from-orange-300 via-amber-300 to-orange-400",
    placeholderGradient: "from-orange-200 via-amber-300 to-red-400",
  },
  {
    name: "Solgas Envío Gratis",
    industry: "Landing de campaña",
    url: "solgasenviogratis.com",
    description: "Landing con promo de envío gratis.",
    imageSrc: "/showcase/solgasenviogratis.webp",
    frameClassName: "bg-linear-to-br from-sky-300 via-blue-400 to-indigo-500",
    placeholderGradient: "from-rose-200 via-orange-300 to-amber-400",
  },
]
