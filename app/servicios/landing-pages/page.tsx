import type { Metadata } from "next"
import { Icon } from "@iconify/react"

import { CornerMarks } from "@/components/corner-marks"
import { CTA } from "@/components/sections/cta"
import { FeatureGrid, type Feature } from "@/components/feature-grid"
import { PageHero } from "@/components/page-hero"
import { ServicePricingCard } from "@/components/service-pricing-card"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Landing pages",
  description:
    "Landing pages diseñadas para una sola cosa: convertir. Ideal para campañas, lanzamientos y productos específicos.",
}

const features: Feature[] = [
  {
    icon: "solar:target-linear",
    title: "Foco quirúrgico",
    description:
      "Una sola página, una sola acción. Cada elemento empuja al visitante a hacer lo que tu negocio necesita.",
  },
  {
    icon: "solar:bolt-circle-linear",
    title: "Carga ultra rápida",
    description:
      "Optimizada para que cargue en menos de 1 segundo. Cada décima cuenta para tu tasa de conversión.",
  },
  {
    icon: "solar:phone-calling-linear",
    title: "WhatsApp + formulario",
    description:
      "Botón flotante de WhatsApp y formulario de contacto integrados. Cero fricción para que te escriban.",
  },
  {
    icon: "solar:graph-new-up-linear",
    title: "Lista para anuncios",
    description:
      "Pixel de Facebook, Google Ads y eventos de conversión preinstalados. Solo conectas tu cuenta.",
  },
  {
    icon: "solar:chart-square-linear",
    title: "Analytics integrado",
    description:
      "Sabes exactamente cuántos visitantes entran, de dónde vienen y cuántos convierten.",
  },
  {
    icon: "solar:test-tube-linear",
    title: "Lista para A/B testing",
    description:
      "Estructurada para que puedas probar variantes (titular, CTA, hero) sin reescribir la página.",
  },
]

const idealFor = [
  "Campañas pagadas en Google Ads o Meta Ads",
  "Lanzamientos de producto o evento",
  "Promociones por temporada (Black Friday, Día de la Madre, etc.)",
  "Captura de leads para servicios específicos",
  "Validar una idea de negocio antes de invertir en una web completa",
]

export default function LandingPagesPage() {
  return (
    <>
      <PageHero
        eyebrow="Servicio · Landing pages"
        size="md"
        title={
          <>
            Landing pages que{" "}
            <span className="font-serif font-normal italic text-foreground/90">
              convierten
            </span>
            .
          </>
        }
        lead="Una página, un objetivo. Diseñadas para que cada visita tenga muchas más probabilidades de terminar en una venta o consulta."
        primaryCta={{
          label: "Cotizar mi landing",
          href: siteConfig.links.whatsapp,
          external: true,
        }}
        secondaryCta={{ label: "Ver casos", href: "/casos" }}
      />

      <FeaturesSection />

      <IdealForSection />

      <ServicePricingCard
        price="Desde $250"
        description="Plan Landing. Una página optimizada para conversión, lista para conectar a campañas pagadas o tráfico orgánico desde el día uno."
        ctaLabel="Empezar mi landing"
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
            Diseñada para una{" "}
            <span className="font-serif font-normal italic text-foreground/90">
              sola cosa
            </span>
            : vender.
          </h2>
        </div>

        <FeatureGrid features={features} columns={3} />
      </div>
    </section>
  )
}

function IdealForSection() {
  return (
    <section className="border-t border-border/40 py-20 md:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Ideal para
            </p>
            <h2 className="mt-3 text-balance text-3xl font-medium tracking-tight md:text-4xl">
              Cuando necesitas{" "}
              <span className="font-serif font-normal italic text-foreground/90">
                resultados
              </span>{" "}
              ya.
            </h2>
            <p className="mt-4 text-base text-muted-foreground md:text-lg">
              Una landing es la herramienta más rápida para validar, capturar o
              vender. En 5-7 días la tienes lista.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="relative">
              <CornerMarks />
              <ul className="flex flex-col gap-4 rounded-xl border border-dashed border-border/60 bg-card/30 p-6 md:p-8">
                {idealFor.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-base leading-relaxed text-foreground/90"
                  >
                    <Icon
                      icon="solar:check-circle-linear"
                      className="mt-1 size-5 shrink-0 text-foreground/60"
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
