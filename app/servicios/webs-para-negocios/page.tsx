import type { Metadata } from "next"
import { Icon } from "@iconify/react"

import { CornerMarks } from "@/components/corner-marks"
import { CTA } from "@/components/sections/cta"
import { FeatureGrid, type Feature } from "@/components/feature-grid"
import { PageHero } from "@/components/page-hero"
import { Process } from "@/components/sections/process"
import { ServicePricingCard } from "@/components/service-pricing-card"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Webs para negocios",
  description:
    "Sitios web modernos y profesionales para negocios que quieren generar confianza desde el primer click.",
}

const features: Feature[] = [
  {
    icon: "solar:palette-linear",
    title: "Diseño 100% personalizado",
    description:
      "Cero plantillas. Cada sección pensada para tu marca, tu cliente y tu industria.",
  },
  {
    icon: "solar:widget-linear",
    title: "Hasta 6 secciones a medida",
    description:
      "Inicio, servicios, sobre nosotros, contacto, galería, testimonios — lo que necesite tu negocio.",
  },
  {
    icon: "solar:smartphone-linear",
    title: "Responsive de verdad",
    description:
      "No 'se ve bien en móvil', se ve perfecto. Cada breakpoint diseñado a mano.",
  },
  {
    icon: "solar:phone-calling-linear",
    title: "WhatsApp + formularios",
    description:
      "Botón flotante de WhatsApp, formulario de contacto, integración con email — todo conectado.",
  },
  {
    icon: "solar:magnifer-linear",
    title: "SEO técnico configurado",
    description:
      "Meta tags, sitemap, schema, Open Graph. Tu web lista para Google desde el día uno.",
  },
  {
    icon: "solar:bolt-circle-linear",
    title: "Hosting y dominio incluidos",
    description:
      "Te entregamos publicado, configurado y con métricas. El primer año va por nuestra cuenta.",
  },
]

export default function WebsParaNegociosPage() {
  return (
    <>
      <PageHero
        eyebrow="Servicio · Webs para negocios"
        size="md"
        title={
          <>
            La web que tu{" "}
            <span className="font-serif font-normal italic text-foreground/90">
              negocio
            </span>{" "}
            merece.
          </>
        }
        lead="Sitios modernos y profesionales para negocios que quieren generar confianza desde el primer click y convertir visitas en clientes reales."
        primaryCta={{
          label: "Cotizar mi web",
          href: siteConfig.links.whatsapp,
          external: true,
        }}
        secondaryCta={{ label: "Ver casos", href: "/casos" }}
      />

      <FeaturesSection />

      <ForWhomSection />

      <Process bare />

      <ServicePricingCard
        price="Desde $500"
        description="Plan Profesional. Incluye todo lo de arriba más 1 mes de soporte post-lanzamiento. Si necesitas algo más complejo, te armamos una cotización a medida."
        ctaLabel="Cotizar mi web"
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
            Todo lo necesario para verte{" "}
            <span className="font-serif font-normal italic text-foreground/90">
              profesional
            </span>
            .
          </h2>
        </div>

        <FeatureGrid features={features} columns={3} />
      </div>
    </section>
  )
}

const targetAudience = [
  "Negocios establecidos que dependen de redes sociales o solo WhatsApp",
  "Profesionales independientes que necesitan una web seria",
  "Locales (restaurantes, clínicas, barberías, gimnasios) que quieren reservar online",
  "Marcas personales que quieren posicionarse como expertas",
  "Tiendas físicas que quieren empezar a aparecer en Google",
]

function ForWhomSection() {
  return (
    <section className="border-t border-border/40 py-20 md:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Para quién es
            </p>
            <h2 className="mt-3 text-balance text-3xl font-medium tracking-tight md:text-4xl">
              Hecho para negocios que{" "}
              <span className="font-serif font-normal italic text-foreground/90">
                ya están vendiendo
              </span>
              .
            </h2>
            <p className="mt-4 text-base text-muted-foreground md:text-lg">
              Si tu negocio funciona pero tu presencia digital no acompaña, este
              servicio es para ti.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="relative">
              <CornerMarks />
              <ul className="flex flex-col gap-4 rounded-xl border border-dashed border-border/60 bg-card/30 p-6 md:p-8">
                {targetAudience.map((item) => (
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

