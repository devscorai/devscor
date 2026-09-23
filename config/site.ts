export type NavItem = {
  title: string
  href: string
  description?: string
}

export const siteConfig = {
  name: "devscor",
  description:
    "Devscor diseña, construye y desarrolla sus propios productos de software.",
  url: "https://devscor.com",
  location: "Lima, Perú",
  links: {
    email: "mailto:hello@devscor.com",
    instagram: "https://www.instagram.com/devscorai/",
    linkedin: "https://www.linkedin.com/company/devscorai",
    x: "https://x.com/devscorai",
  },
} as const

export const mainNav: NavItem[] = [
  { title: "Compañía", href: "/" },
  { title: "Productos", href: "/products" },
  { title: "Nosotros", href: "/about" },
]
