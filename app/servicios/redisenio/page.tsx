import type { Metadata } from "next"
import { Icon } from "@iconify/react"

import { CornerMarks } from "@/components/corner-marks"
import { CTA } from "@/components/sections/cta"
import { FeatureGrid, type Feature } from "@/components/feature-grid"
import { PageHero } from "@/components/page-hero"
import { ServicePricingCard } from "@/components/service-pricing-card"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Rediseño web",
  description:
    "Renovamos tu sitio web actual para que se vea profesional, cargue rápido y empiece a generar consultas reales.",
}

const features: Feature[] = [
  {
    icon: "solar:magnifer-zoom-in-linear",
    title: "Auditoría completa",
    description:
      "Revisamos diseño, copy, velocidad, SEO y conversión. Sabes exactamente qué está fallando.",
  },
  {
    icon: "solar:palette-linear",
    title: "Diseño moderno",
    description:
      "Mantenemos lo que funciona de tu marca y modernizamos todo lo que se ve viejo o roto.",
  },
  {
    icon: "solar:bolt-circle-linear",
    title: "Velocidad x5",
    description:
      "Rebuild técnico para que tu web cargue en menos de 1.5s. Mejor SEO, mejor conversión, mejor experiencia.",
  },
  {
    icon: "solar:document-text-linear",
    title: "Migración de contenido",
    description:
      "Trasladamos tus textos, imágenes y URLs sin perder posicionamiento ni links existentes.",
  },
  {
    icon: "solar:smartphone-linear",
    title: "Mobile first",
    description:
      "Si tu sitio actual no anda bien en móvil, eso se acaba. Diseñamos pensando primero en celular.",
  },
  {
    icon: "solar:graph-new-up-linear",
    title: "SEO mejorado",
    description:
      "Reestructuramos meta tags, headings y schema. Sin perder tu autoridad actual en Google.",
  },
]

const beforeAfter = [
  {
    before: "Diseño anticuado o estilo plantilla genérica",
    after: "Diseño moderno con identidad propia",
  },
  {
    before: "Carga lenta (>5 segundos)",
    after: "Carga en menos de 1.5 segundos",
  },
  {
    before: "Difícil de leer en móvil",
    after: "Experiencia perfecta en cualquier pantalla",
  },
  {
    before: "Sin botón de contacto visible",
    after: "WhatsApp y formulario integrados estratégicamente",
  },
  {
    before: "Mal posicionada en Google",
    after: "SEO técnico configurado y meta tags optimizadas",
  },
]

export default function RedisenioPage() {
  return (
    <>
      <PageHero
        eyebrow="Servicio · Rediseño"
        size="md"
        title={
          <>
            Tu web actual,{" "}
            <span className="font-serif font-normal italic text-foreground/90">
              renovada
            </span>
            .
          </>
        }
        lead="Si tu sitio se ve desactualizado, carga lento o no convierte, te lo dejamos como nuevo. Mantenemos lo bueno y arreglamos lo que no funciona."
        primaryCta={{
          label: "Cotizar mi rediseño",
          href: siteConfig.links.whatsapp,
          external: true,
        }}
        secondaryCta={{ label: "Ver casos", href: "/casos" }}
      />

      <FeaturesSection />

      <BeforeAfterSection />

      <ServicePricingCard
        price="Desde S/ 800"
        description="El precio depende del tamaño de tu sitio actual y de cuánto necesitamos rediseñar. Te enviamos una auditoría gratuita y cotización clara."
        ctaLabel="Auditoría gratuita"
      />

      <CTA />
    </>
  )
}

function FeaturesSection() {
  return (
    <section className="border-t border-border/40 py-20 md:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="mb-12 max-w-2xl md:mb-16">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Qué incluye
          </p>
          <h2 className="mt-3 text-balance text-3xl font-medium tracking-tight md:text-4xl">
            Una{" "}
            <span className="font-serif font-normal italic text-foreground/90">
              transformación
            </span>{" "}
            completa.
          </h2>
        </div>

        <FeatureGrid features={features} columns={3} />
      </div>
    </section>
  )
}

function BeforeAfterSection() {
  return (
    <section className="border-t border-border/40 py-20 md:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="mb-12 max-w-2xl md:mb-16">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Antes y después
          </p>
          <h2 className="mt-3 text-balance text-3xl font-medium tracking-tight md:text-4xl">
            Lo que{" "}
            <span className="font-serif font-normal italic text-foreground/90">
              cambia
            </span>{" "}
            de verdad.
          </h2>
        </div>

        <div className="relative">
          <CornerMarks />
          <div className="overflow-hidden rounded-xl border border-dashed border-border/60 bg-card/30">
            {beforeAfter.map((row, index) => (
              <div
                key={row.after}
                className={cn(
                  "grid grid-cols-1 md:grid-cols-2",
                  index > 0 && "border-t border-dashed border-border/50",
                )}
              >
                <div className="flex items-start gap-3 p-6 text-sm text-muted-foreground line-through decoration-muted-foreground/40 md:p-8">
                  <Icon
                    icon="solar:close-circle-linear"
                    className="mt-0.5 size-5 shrink-0 text-muted-foreground/60"
                    aria-hidden
                  />
                  <span>{row.before}</span>
                </div>
                <div className="flex items-start gap-3 border-t border-dashed border-border/50 p-6 text-base font-medium text-foreground md:border-l md:border-t-0 md:p-8">
                  <Icon
                    icon="solar:check-circle-linear"
                    className="mt-0.5 size-5 shrink-0 text-foreground/80"
                    aria-hidden
                  />
                  <span>{row.after}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
