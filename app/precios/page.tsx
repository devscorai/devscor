import type { Metadata } from "next"
import Link from "next/link"
import { Icon } from "@iconify/react"

import { CornerMarks } from "@/components/corner-marks"
import { CTA } from "@/components/sections/cta"
import { PageHero } from "@/components/page-hero"
import { Pricing } from "@/components/sections/pricing"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Precios",
  description:
    "Precios claros y transparentes para páginas web profesionales. Sin sorpresas, sin letra chica.",
}

export default function PreciosPage() {
  return (
    <>
      <PageHero
        eyebrow="Precios"
        title={
          <>
            Precios{" "}
            <span className="font-serif font-normal italic text-foreground/90">
              honestos
            </span>
            . Sin letra chica.
          </>
        }
        lead="Sabes lo que pagas y lo que recibes desde el primer día. Si tu proyecto no encaja en ningún plan, hablamos directo y armamos una propuesta a medida."
        primaryCta={{
          label: "Cotizar tu proyecto",
          href: siteConfig.links.whatsapp,
          external: true,
        }}
        secondaryCta={{ label: "Ver el proceso", href: "/proceso" }}
      />

      <Pricing bare />

      <IncludedSection />

      <PricingFaqSection />

      <CTA />
    </>
  )
}

const includedItems = [
  {
    icon: "solar:smartphone-linear",
    title: "Diseño 100% responsive",
    description: "Se ve perfecto en móvil, tablet y desktop sin excepción.",
  },
  {
    icon: "solar:bolt-circle-linear",
    title: "Optimización de velocidad",
    description: "Carga rápida = mejor SEO y más conversión.",
  },
  {
    icon: "solar:magnifer-zoom-in-linear",
    title: "SEO técnico básico",
    description: "Meta tags, sitemap, schema. Listo para que Google te encuentre.",
  },
  {
    icon: "solar:graph-new-up-linear",
    title: "Analytics integrado",
    description: "Sabes cuánta gente entra, de dónde y qué hace.",
  },
  {
    icon: "solar:lock-keyhole-linear",
    title: "HTTPS y dominio configurado",
    description: "Tu sitio seguro y profesional desde el día del lanzamiento.",
  },
  {
    icon: "solar:hand-heart-linear",
    title: "Entrega lista para vender",
    description: "Publicado, configurado y con métricas. Sin pendientes.",
  },
]

function IncludedSection() {
  return (
    <section className="relative border-t border-border/40 py-20 md:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="mb-12 max-w-2xl md:mb-16">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Incluido en cada plan
          </p>
          <h2 className="mt-3 text-balance text-3xl font-medium tracking-tight md:text-4xl">
            Lo{" "}
            <span className="font-serif font-normal italic text-foreground/90">
              esencial
            </span>{" "}
            no es extra.
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            No cobramos aparte por las cosas que cualquier web profesional debe
            tener en 2026.
          </p>
        </div>

        <div className="relative">
          <CornerMarks />
          <div className="grid grid-cols-1 overflow-hidden rounded-xl border border-dashed border-border/60 bg-card/30 sm:grid-cols-2 lg:grid-cols-3">
            {includedItems.map((item, index) => (
              <div
                key={item.title}
                className={cn(
                  "group flex items-start gap-4 p-6 transition-colors duration-300 md:p-8",
                  "hover:bg-card/70",
                  "border-dashed border-border/50",
                  index > 0 && "border-t",
                  index === 1 && "sm:border-t-0",
                  index === 2 && "lg:border-t-0",
                  index % 2 === 1 && "sm:border-l",
                  "lg:border-l-0",
                  index % 3 !== 0 && "lg:border-l",
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

const pricingFaqs = [
  {
    question: "¿Necesito pagar todo por adelantado?",
    answer:
      "No. La estructura estándar es 50% para iniciar el proyecto y 50% al entregar. Para proyectos más grandes podemos dividir en 3 hitos.",
  },
  {
    question: "¿Por qué los precios son 'desde'?",
    answer:
      "Porque cada negocio es diferente. El precio base cubre el alcance estándar del plan; si necesitas integraciones específicas, más páginas o funciones a medida, ajustamos la cotización con total transparencia.",
  },
  {
    question: "¿El hosting y dominio están incluidos?",
    answer:
      "El primer año sí, en los planes Landing y Profesional. Después del primer año puedes renovarlos con nosotros (precios de mercado) o migrarlos a tu propio proveedor — te entregamos todo lo necesario.",
  },
  {
    question: "¿Cuánto demora cada plan?",
    answer:
      "Landing: 5-7 días hábiles. Profesional: 10-14 días hábiles. A medida: depende del alcance, te confirmamos un cronograma exacto en la propuesta.",
  },
  {
    question: "¿Qué pasa si necesito cambios después de lanzar?",
    answer:
      "Tienes 30 días de soporte sin costo para ajustes y dudas. Después seguimos disponibles por WhatsApp y cobramos por hora o por paquete según lo que necesites.",
  },
  {
    question: "¿Puedo empezar con un plan y subir después?",
    answer:
      "Sí. Muchos clientes empiezan con Landing y crecen a Profesional cuando el negocio lo pide. El upgrade se cobra solo por la diferencia.",
  },
]

function PricingFaqSection() {
  return (
    <section className="relative border-t border-border/40 py-20 md:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Preguntas sobre precios
            </p>
            <h2 className="mt-3 text-balance text-3xl font-medium tracking-tight md:text-4xl">
              Lo que más nos{" "}
              <span className="font-serif font-normal italic text-foreground/90">
                preguntan
              </span>
              .
            </h2>
            <p className="mt-4 text-base text-muted-foreground md:text-lg">
              Si tu duda no está aquí, escríbenos por WhatsApp. Respondemos en
              menos de 1 hora hábil.
            </p>

            <Link
              href={siteConfig.links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-muted-foreground"
            >
              <Icon
                icon="simple-icons:whatsapp"
                className="size-4"
                aria-hidden
              />
              Pregúntanos por WhatsApp
            </Link>
          </div>

          <div className="lg:col-span-7">
            <div className="relative">
              <CornerMarks />
              <ul className="rounded-xl border border-dashed border-border/60 bg-card/30">
                {pricingFaqs.map((faq, index) => (
                  <li
                    key={faq.question}
                    className={cn(
                      "flex flex-col gap-3 p-6 md:p-7",
                      index > 0 && "border-t border-dashed border-border/50",
                    )}
                  >
                    <h3 className="text-base font-medium tracking-tight text-foreground md:text-lg">
                      {faq.question}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                      {faq.answer}
                    </p>
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
