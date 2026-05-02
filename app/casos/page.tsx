import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Icon } from "@iconify/react"
import { ArrowUpRight } from "lucide-react"

import { BrowserWindow } from "@/components/browser-window"
import { CTA } from "@/components/sections/cta"
import { PageHero } from "@/components/page-hero"
import { ShowcaseFrame } from "@/components/showcase-frame"
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
  const isExternal = !project.caseHref
  const href = project.caseHref ?? `https://${project.url}`

  return (
    <article className="group relative flex flex-col">
      <ShowcaseFrame className={project.frameClassName}>
        <BrowserWindow
          url={project.url}
          className="shadow-2xl shadow-black/30 ring-1 ring-black/5 transition-transform duration-500 group-hover:scale-[1.01]"
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
      </ShowcaseFrame>

      <div className="mt-5 px-1">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          {project.industry}
        </p>
        <h3 className="mt-2 text-lg font-medium tracking-tight text-foreground">
          <Link
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="inline-flex items-center gap-1 outline-none after:absolute after:inset-0 after:content-[''] focus-visible:[&>svg]:opacity-60"
            aria-label={
              isExternal
                ? `Visitar ${project.name} en ${project.url}`
                : `Ver caso de estudio de ${project.name}`
            }
          >
            {project.name}
            <ArrowUpRight
              aria-hidden
              className="size-4 -translate-y-px opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-60"
            />
          </Link>
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {project.description}
        </p>
      </div>
    </article>
  )
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
