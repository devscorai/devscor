import type { Metadata } from "next"
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google"
import "./globals.css"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { StructuredData } from "@/components/structured-data"
import { ThemeProvider } from "@/components/theme-provider"
import { siteConfig } from "@/config/site"
import { globalGraphSchema } from "@/lib/structured-data"

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} · Web studio`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} · Web studio`,
    description: siteConfig.description,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Diseño web profesional en Perú`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} · Web studio`,
    description: siteConfig.description,
    images: ["/og.png"],
    creator: "@devscorai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <StructuredData id="ld-global" data={globalGraphSchema()} />
      </head>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SiteHeader />
          <main className="flex flex-1 flex-col">{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  )
}
