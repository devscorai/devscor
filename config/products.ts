export type Product = {
  name: string
  slug: string
  href: string
  byline: string
  summary: string
}

export const products: Product[] = [
  {
    name: "SKORD",
    slug: "skord",
    href: "/products/skord",
    byline: "by Devscor",
    summary: "Producto propio de Devscor para el ecosistema de Discord.",
  },
]
