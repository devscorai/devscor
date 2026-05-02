import type { Metadata } from "next"
import Link from "next/link"
import { Icon } from "@iconify/react"
import { ArrowUpRight } from "lucide-react"

import { CornerMarks } from "@/components/corner-marks"
import { CTA } from "@/components/sections/cta"
import { PageHero } from "@/components/page-hero"
import { mainNav, siteConfig, type NavItem } from "@/config/site"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Diseño web, landing pages, rediseño y automatización con IA. Todo lo que tu negocio necesita para verse profesional y vender mejor.",
}

export default function ServiciosPage() {
  return (
    <>
      <PageHero
        eyebrow="Servicios"
        title={
          <>
            Todo lo que hacemos por tu{" "}
            <span className="font-serif font-normal italic text-foreground/90">
              negocio
            </span>
            .
          </>
        }
        lead="Diseño web, landing pages, rediseño y, próximamente, automatización con IA. Cada servicio pensado para resolver un problema real de tu negocio."
        primaryCta={{
          label: "Cotizar mi proyecto",
          href: siteConfig.links.whatsapp,
          external: true,
        }}
        secondaryCta={{ label: "Ver casos", href: "/casos" }}
      />

      <ServicesDetailGrid />

      <CTA />
    </>
  )
}

function ServicesDetailGrid() {
  return (
    <section className="border-t border-border/40 py-20 md:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {mainNav.services.map((service) => (
            <ServiceDetailCard key={service.href} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceDetailCard({ service }: { service: NavItem }) {
  return (
    <div className="relative">
      <CornerMarks />
      <Link
        href={service.href}
        className={cn(
          "group/card flex h-full flex-col gap-5 rounded-xl border border-dashed border-border/60 bg-card/30 p-6 transition-colors duration-300 md:p-8",
          "hover:border-foreground/25 hover:bg-card/50",
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-md border border-border bg-background text-foreground/80 transition-colors group-hover/card:border-foreground/30 group-hover/card:text-foreground">
            {service.icon ? (
              <Icon icon={service.icon} className="size-5" aria-hidden />
            ) : null}
          </span>

          {service.comingSoon ? (
            <span className="rounded-full border border-border bg-background px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Próximamente
            </span>
          ) : null}
        </div>

        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
            {service.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
            {service.description}
          </p>
        </div>

        {service.highlights && service.highlights.length > 0 ? (
          <ul className="mt-2 grid grid-cols-1 gap-2.5">
            {service.highlights.map((h) => (
              <li
                key={h}
                className="flex items-start gap-2 text-sm leading-snug text-foreground/80"
              >
                <Icon
                  icon="solar:check-circle-linear"
                  className="mt-0.5 size-4 shrink-0 text-foreground/60"
                  aria-hidden
                />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-auto flex items-center gap-2 pt-4 text-sm font-medium text-foreground transition-transform duration-300 group-hover/card:translate-x-1">
          <span>Ver detalle del servicio</span>
          <ArrowUpRight className="size-4" />
        </div>
      </Link>
    </div>
  )
}
