import type { Metadata } from "next"
import { Icon } from "@iconify/react"

import { CornerMarks } from "@/components/corner-marks"
import { CTA } from "@/components/sections/cta"
import { PageHero } from "@/components/page-hero"
import { Process } from "@/components/sections/process"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Nuestro proceso",
  description:
    "Cómo trabajamos cada proyecto en devscor: conversación directa, diseño rápido, construcción transparente y entrega lista para vender.",
}

export default function ProcesoPage() {
  return (
    <>
      <PageHero
        eyebrow="Proceso"
        title={
          <>
            El{" "}
            <span className="font-serif font-normal italic text-foreground/90">
              cómo
            </span>{" "}
            detrás de cada proyecto.
          </>
        }
        lead="Sin reuniones eternas ni propuestas de 30 páginas. Un proceso directo y transparente diseñado para llegar al lanzamiento sin fricción."
        primaryCta={{
          label: "Empezar ahora",
          href: siteConfig.links.whatsapp,
          external: true,
        }}
        secondaryCta={{ label: "Ver precios", href: "/precios" }}
      />

      <Process bare />

      <ExpectationsSection />

      <PrinciplesSection />

      <CTA />
    </>
  )
}

const expectations = [
  {
    icon: "solar:chat-round-line-linear",
    title: "Comunicación directa",
    description:
      "Todo se hace por WhatsApp o email. Sin slacks corporativos ni 5 herramientas distintas.",
  },
  {
    icon: "solar:gallery-edit-linear",
    title: "Tu marca y contenido",
    description:
      "Logo (si lo tienes), textos clave, fotos. Si te falta algo, te ayudamos a definirlo.",
  },
  {
    icon: "solar:clock-circle-linear",
    title: "Decisiones rápidas",
    description:
      "Mientras más rápido nos confirmes hitos, más rápido llegamos al lanzamiento. Promedio: 7-14 días.",
  },
  {
    icon: "solar:hand-heart-linear",
    title: "Confianza en el proceso",
    description:
      "Iteramos rápido, mostramos avance constante. Tú decides cuándo está listo para lanzar.",
  },
]

function ExpectationsSection() {
  return (
    <section className="relative border-t border-border/40 py-20 md:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="mb-12 max-w-2xl md:mb-16">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Qué necesitamos de ti
          </p>
          <h2 className="mt-3 text-balance text-3xl font-medium tracking-tight md:text-4xl">
            Trabajamos{" "}
            <span className="font-serif font-normal italic text-foreground/90">
              juntos
            </span>
            , no para ti.
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            Los mejores proyectos pasan cuando hay ida y vuelta. Esto es lo que
            esperamos de tu lado para que todo fluya.
          </p>
        </div>

        <div className="relative">
          <CornerMarks />
          <div className="grid grid-cols-1 overflow-hidden rounded-xl border border-dashed border-border/60 bg-card/30 sm:grid-cols-2">
            {expectations.map((item, index) => (
              <div
                key={item.title}
                className={cn(
                  "group relative flex gap-4 p-6 transition-colors duration-300 md:p-8",
                  "hover:bg-card/70",
                  "border-dashed border-border/50",
                  index > 0 && "border-t",
                  index === 1 && "sm:border-t-0",
                  index % 2 === 1 && "sm:border-l",
                )}
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-md border border-border bg-background text-foreground/80 transition-colors group-hover:border-foreground/30 group-hover:text-foreground">
                  <Icon icon={item.icon} className="size-5" aria-hidden />
                </span>
                <div>
                  <h3 className="text-base font-semibold tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const principles = [
  {
    title: "Sin reuniones que no aporten",
    description:
      "Si se puede resolver en un mensaje, lo hacemos en un mensaje. Las reuniones son para decisiones, no para alinear emails.",
  },
  {
    title: "Mockups antes de código",
    description:
      "Siempre te enseñamos un diseño aprobable antes de construir nada. Cero sorpresas al final.",
  },
  {
    title: "Feedback continuo",
    description:
      "Te enviamos avances cada pocos días. No hay 'desapariciones' de 2 semanas para reaparecer con todo hecho.",
  },
  {
    title: "Cero tecnicismos",
    description:
      "Te explicamos todo en idioma de negocio, no de developer. Las decisiones técnicas las tomamos nosotros.",
  },
  {
    title: "Entrega lista para vender",
    description:
      "Te entregamos publicado, configurado y con métricas. No 'listo pero falta deployar'.",
  },
  {
    title: "Soporte después del lanzamiento",
    description:
      "Tienes 30 días de soporte sin costo para ajustes y dudas. Después seguimos disponibles por WhatsApp.",
  },
]

function PrinciplesSection() {
  return (
    <section className="relative border-t border-border/40 py-20 md:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="mb-12 max-w-2xl md:mb-16">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Principios
          </p>
          <h2 className="mt-3 text-balance text-3xl font-medium tracking-tight md:text-4xl">
            Cómo{" "}
            <span className="font-serif font-normal italic text-foreground/90">
              pensamos
            </span>{" "}
            cada decisión.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {principles.map((principle) => (
            <div
              key={principle.title}
              className="group flex flex-col gap-3 bg-card p-6 transition-colors duration-300 hover:bg-card/70 md:p-8"
            >
              <div className="flex items-center gap-2.5">
                <Icon
                  icon="solar:check-circle-linear"
                  className="size-4 text-foreground/70 transition-colors group-hover:text-foreground"
                  aria-hidden
                />
                <h3 className="text-base font-semibold tracking-tight text-foreground">
                  {principle.title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
