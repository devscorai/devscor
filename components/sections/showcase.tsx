"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { motion, useReducedMotion, type Variants } from "motion/react"

import { BrowserWindow } from "@/components/browser-window"
import { ShowcaseFrame } from "@/components/showcase-frame"
import { projects, type Project } from "@/config/projects"
import { cn } from "@/lib/utils"

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
}

const MARQUEE_COPIES = 3

export function Showcase() {
  const reduce = useReducedMotion()
  const motionState = reduce
    ? { initial: false as const, animate: "visible" as const }
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.15 },
      }

  return (
    <section
      id="casos"
      className="relative border-t border-border/40 py-20 md:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <motion.div
          variants={container}
          {...motionState}
          className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-xl">
            <motion.p
              variants={item}
              className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground"
            >
              Nuestro trabajo
            </motion.p>
            <motion.h2
              variants={item}
              className="mt-3 text-balance text-3xl font-medium tracking-tight md:text-5xl"
            >
              Webs que ya están{" "}
              <span className="font-serif font-normal italic text-foreground/90">
                vendiendo
              </span>
              .
            </motion.h2>
            <motion.p
              variants={item}
              className="mt-4 text-base text-muted-foreground md:text-lg"
            >
              Sitios reales que entregamos. Cada uno construido a medida para su
              negocio.
            </motion.p>
          </div>
        </motion.div>
      </div>

      <motion.div
        variants={item}
        {...motionState}
        className="relative mx-auto w-full max-w-7xl px-4 md:px-6"
      >
        <div
          className="group/marquee flex gap-(--gap) overflow-hidden [--duration:25s] [--gap:1rem] md:[--gap:1.5rem]"
        >
          {Array.from({ length: MARQUEE_COPIES }).map((_, copyIdx) => (
            <div
              key={copyIdx}
              aria-hidden={copyIdx > 0}
              className="flex shrink-0 gap-(--gap) animate-marquee group-hover/marquee:paused motion-reduce:animate-none"
            >
              {projects.map((project) => (
                <div
                  key={`${copyIdx}-${project.url}`}
                  className="w-[88vw] shrink-0 sm:w-[60vw] lg:w-[42vw] xl:w-[32vw] xl:max-w-[420px]"
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          ))}
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-1/8 bg-linear-to-r from-background from-30% sm:w-1/6"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-1/8 bg-linear-to-l from-background from-30% sm:w-1/6"
        />
      </motion.div>
    </section>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative flex h-full flex-col gap-5">
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
              sizes="(min-width: 1280px) 32vw, (min-width: 1024px) 42vw, (min-width: 640px) 60vw, 88vw"
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

      <div className="px-1">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          {project.industry}
        </p>
        <h3 className="mt-2 text-lg font-medium tracking-tight text-foreground">
          <Link
            href={`https://${project.url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 outline-none after:absolute after:inset-0 after:content-[''] focus-visible:[&>svg]:opacity-60"
            aria-label={`Visitar ${project.name} en ${project.url}`}
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
