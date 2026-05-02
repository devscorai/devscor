import type { Metadata } from "next"
import Link from "next/link"
import { Icon } from "@iconify/react"
import { ArrowUpRight } from "lucide-react"

import { CornerMarks } from "@/components/corner-marks"
import { CTA } from "@/components/sections/cta"
import { FeatureGrid, type Feature } from "@/components/feature-grid"
import { PageHero } from "@/components/page-hero"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Automatización con IA",
  description:
    "Próximamente: flujos inteligentes para captar, responder y organizar clientes automáticamente con IA.",
}

const upcomingFeatures: Feature[] = [
  {
    icon: "solar:chat-round-dots-linear",
    title: "Asistente de WhatsApp 24/7",
    description:
      "Un agente IA que responde consultas, agenda citas y filtra leads mientras tú trabajas en lo importante.",
  },
  {
    icon: "solar:calendar-mark-linear",
    title: "Reservas y agenda automática",
    description:
      "Tus clientes reservan directo desde WhatsApp o tu web. Sin doble registro, sin coordinaciones manuales.",
  },
  {
    icon: "solar:database-linear",
    title: "CRM ligero integrado",
    description:
      "Cada conversación queda guardada con contexto. Sabes quién es cada cliente sin abrir 5 herramientas.",
  },
  {
    icon: "solar:graph-up-linear",
    title: "Insights de tus conversaciones",
    description:
      "Qué preguntan tus clientes, qué objeciones aparecen, qué productos buscan. Data accionable de tu negocio.",
  },
  {
    icon: "solar:bolt-circle-linear",
    title: "Automatizaciones a medida",
    description:
      "Conectamos WhatsApp, email, calendario, hojas de cálculo y tu sitio en flujos que ahorran horas por semana.",
  },
  {
    icon: "solar:atom-linear",
    title: "IA entrenada con tu negocio",
    description:
      "El asistente aprende de tus catálogos, FAQs y forma de hablar. Suena como tú, no como un bot genérico.",
  },
]

export default function AutomatizacionIAPage() {
  return (
    <>
      <PageHero
        eyebrow="Servicio · Automatización con IA"
        size="md"
        title={
          <>
            La{" "}
            <span className="font-serif font-normal italic text-foreground/90">
              próxima
            </span>{" "}
            generación de tu negocio.
          </>
        }
        lead="Estamos construyendo el set de herramientas con IA que va a cambiar la forma en que pequeños negocios captan, atienden y venden. Próximamente."
        primaryCta={{
          label: "Ser de los primeros",
          href: siteConfig.links.whatsapp,
          external: true,
        }}
        secondaryCta={{ label: "Ver otros servicios", href: "/servicios" }}
      />

      <ComingSoonBanner />

      <FeaturesSection />

      <EarlyAccessSection />

      <CTA />
    </>
  )
}

function ComingSoonBanner() {
  return (
    <section className="border-t border-border/40 py-12 md:py-16">
      <div className="mx-auto w-full max-w-3xl px-4 md:px-6">
        <div className="relative">
          <CornerMarks />
          <div
            className={cn(
              "flex flex-col items-center gap-4 rounded-xl border border-dashed border-border/60 bg-card/30 p-6 text-center md:flex-row md:gap-6 md:p-8 md:text-left",
            )}
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-md border border-border bg-background text-foreground">
              <Icon
                icon="solar:atom-linear"
                className="size-6"
                aria-hidden
              />
            </span>
            <div className="flex-1">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Próximamente · Q4 2026
              </p>
              <h2 className="mt-2 text-xl font-medium tracking-tight text-foreground md:text-2xl">
                Estamos construyéndolo ahora.
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                Si te interesa ser de los primeros en tener acceso (con
                descuento de early adopter), avísanos por WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FeaturesSection() {
  return (
    <section className="border-t border-border/40 py-20 md:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="mb-12 max-w-2xl md:mb-16">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Lo que estamos construyendo
          </p>
          <h2 className="mt-3 text-balance text-3xl font-medium tracking-tight md:text-4xl">
            Herramientas que{" "}
            <span className="font-serif font-normal italic text-foreground/90">
              trabajan
            </span>{" "}
            por ti.
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            Diseñadas para ahorrar horas por semana y captar clientes incluso
            mientras duermes.
          </p>
        </div>

        <FeatureGrid features={upcomingFeatures} columns={3} />
      </div>
    </section>
  )
}

function EarlyAccessSection() {
  return (
    <section className="border-t border-border/40 py-20 md:py-28">
      <div className="mx-auto w-full max-w-3xl px-4 text-center md:px-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-3 py-1 text-xs font-medium text-muted-foreground">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
            <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
          </span>
          Lista de early access abierta
        </span>

        <h2 className="mt-6 text-balance text-3xl font-medium tracking-tight md:text-4xl">
          Sé de los{" "}
          <span className="font-serif font-normal italic text-foreground/90">
            primeros
          </span>{" "}
          en probarlo.
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
          Los primeros 10 negocios en sumarse tienen 50% de descuento durante
          los primeros 6 meses y acceso directo a darnos feedback de qué
          construir.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            size="lg"
            nativeButton={false}
            className="h-10 rounded-md px-5 text-sm font-medium"
            render={
              <Link
                href={siteConfig.links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            <Icon
              icon="simple-icons:whatsapp"
              className="size-4"
              aria-hidden
            />
            Quiero entrar a la lista
            <ArrowUpRight className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
