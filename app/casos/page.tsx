import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Icon } from "@iconify/react"
import { ArrowUpRight } from "lucide-react"

import { BrowserWindow } from "@/components/browser-window"
import { CTA } from "@/components/sections/cta"
import { PageHero } from "@/components/page-hero"
import { projects, type Project } from "@/config/projects"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Casos",
  description:
    "Webs reales que hemos diseñado para negocios en Perú. Cada proyecto construido a medida.",
}

export default function CasosPage() {
  return (
    <>
      <PageHero
        eyebrow="Casos"
        title={
          <>
            Webs que ya están{" "}
            <span className="font-serif font-normal italic text-foreground/90">
              vendiendo
            </span>
            .
          </>
        }
        lead="Una muestra de los proyectos que hemos entregado. Cada uno con identidad propia y diseñado para vender."
        primaryCta={{
          label: "Quiero algo así",
          href: siteConfig.links.whatsapp,
          external: true,
        }}
        secondaryCta={{ label: "Ver precios", href: "/precios" }}
      />

      <ProjectsGrid />

      <SoonSection />

      <CTA />
    </>
  )
}

function ProjectsGrid() {
  return (
    <section className="border-t border-border/40 py-20 md:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-10">
          {projects.map((project) => (
            <ProjectCard key={project.url} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const inner = (
    <>
      <BrowserWindow
        url={project.url}
        className="transition-shadow duration-300 group-hover:shadow-lg"
      >
        {project.imageSrc ? (
          <Image
            src={project.imageSrc}
            alt={`${project.name} — vista del sitio web`}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div
            aria-hidden
            className={cn(
              "absolute inset-0 bg-linear-to-br",
              project.placeholderGradient ??
                "from-zinc-200 via-zinc-300 to-zinc-400",
            )}
          />
        )}
      </BrowserWindow>

      <div className="mt-5 flex items-start justify-between gap-4 px-1">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {project.industry}
          </p>
          <h3 className="mt-2 text-lg font-medium tracking-tight text-foreground transition-colors group-hover:text-foreground/80">
            {project.name}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {project.description}
          </p>
        </div>

        {project.caseHref ? (
          <span
            aria-hidden
            className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-md border border-border text-muted-foreground transition-all duration-300 group-hover:border-foreground/30 group-hover:text-foreground"
          >
            <ArrowUpRight className="size-3.5" />
          </span>
        ) : null}
      </div>
    </>
  )

  if (project.caseHref) {
    return (
      <Link href={project.caseHref} className="group block">
        {inner}
      </Link>
    )
  }

  return <article className="group block">{inner}</article>
}

function SoonSection() {
  return (
    <section className="border-t border-border/40 py-20 md:py-28">
      <div className="mx-auto w-full max-w-3xl px-4 text-center md:px-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-3 py-1 text-xs font-medium text-muted-foreground">
          <Icon
            icon="solar:bolt-circle-linear"
            className="size-3.5"
            aria-hidden
          />
          Más casos en camino
        </span>

        <h2 className="mt-6 text-balance text-3xl font-medium tracking-tight md:text-4xl">
          Tu proyecto puede ser{" "}
          <span className="font-serif font-normal italic text-foreground/90">
            el siguiente
          </span>
          .
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
          Estamos sumando casos nuevos cada mes. Si quieres ver tu negocio acá
          con un sitio que se vea profesional desde el primer día, hablemos.
        </p>
      </div>
    </section>
  )
}
