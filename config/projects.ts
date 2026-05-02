export type Project = {
  name: string
  industry: string
  url: string
  description: string
  /** Path en /public, ej: "/showcase/cafe-aurora.webp". Si no hay, usa gradient placeholder. */
  imageSrc?: string
  /** Slug del caso completo, ej: "/casos/cafe-aurora" */
  caseHref?: string
  /** Tailwind gradient classes para placeholder cuando no hay imageSrc */
  placeholderGradient?: string
}

export const projects: Project[] = [
  {
    name: "Café Aurora",
    industry: "Restaurante",
    url: "cafeaurora.pe",
    description: "Sitio web para reservas y menú digital.",
    placeholderGradient: "from-amber-200 via-orange-300 to-rose-400",
  },
  {
    name: "Clínica Dental Norte",
    industry: "Salud",
    url: "clinicadentalnorte.pe",
    description: "Web institucional con sistema de citas.",
    placeholderGradient: "from-sky-200 via-blue-300 to-indigo-400",
  },
  {
    name: "Inmobiliaria Lima Sur",
    industry: "Inmobiliaria",
    url: "inmobiliarialimasur.com",
    description: "Landing con catálogo de propiedades.",
    placeholderGradient: "from-emerald-200 via-teal-300 to-cyan-400",
  },
  {
    name: "Coach Mariana Reyes",
    industry: "Marca personal",
    url: "marianareyes.com",
    description: "Sitio profesional para coach ejecutiva.",
    placeholderGradient: "from-fuchsia-200 via-purple-300 to-violet-400",
  },
]
