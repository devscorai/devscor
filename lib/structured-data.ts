import { siteConfig } from "@/config/site"

const ORG_ID = `${siteConfig.url}/#organization`
const WEBSITE_ID = `${siteConfig.url}/#website`

const EMAIL = siteConfig.links.email.replace(/^mailto:/, "")

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: `${siteConfig.url}/logo.svg`,
      contentUrl: `${siteConfig.url}/logo.svg`,
    },
    image: `${siteConfig.url}/og.png`,
    description: siteConfig.description,
    email: EMAIL,
    sameAs: [
      siteConfig.links.instagram,
      siteConfig.links.linkedin,
      siteConfig.links.x,
    ],
  }
}

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

export function globalGraphSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationSchema(), websiteSchema()],
  }
}
