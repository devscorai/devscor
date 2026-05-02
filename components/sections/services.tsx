"use client"

import * as React from "react"
import Link from "next/link"
import { Icon } from "@iconify/react"
import { ArrowUpRight, Check } from "lucide-react"
import { motion, useReducedMotion, type Variants } from "motion/react"

import { CornerMarks } from "@/components/corner-marks"
import { mainNav, type NavItem } from "@/config/site"
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

export function Services() {
  const reduce = useReducedMotion()
  const motionState = reduce
    ? { initial: false as const, animate: "visible" as const }
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.15 },
      }

  const [featured, ...rest] = mainNav.services

  return (
    <section
      id="servicios"
      className="relative border-t border-border/40 py-20 md:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <motion.div
          variants={container}
          {...motionState}
          className="mb-12 max-w-2xl md:mb-16"
        >
          <motion.p
            variants={item}
            className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground"
          >
            Servicios
          </motion.p>
          <motion.h2
            variants={item}
            className="mt-3 text-balance text-3xl font-medium tracking-tight md:text-5xl"
          >
            Lo que diseñamos para tu{" "}
            <span className="font-serif font-normal italic text-foreground/90">
              negocio
            </span>
            .
          </motion.h2>
          <motion.p
            variants={item}
            className="mt-4 text-base text-muted-foreground md:text-lg"
          >
            Sitios y herramientas pensadas para que más personas te encuentren,
            te entiendan y te contacten.
          </motion.p>
        </motion.div>

        <motion.div
          variants={container}
          {...motionState}
          className="flex flex-col gap-3"
        >
          {featured && <FeaturedServiceCard service={featured} variants={item} />}

          <motion.div variants={item} className="relative">
            <CornerMarks />
            <div
              className={cn(
                "grid grid-cols-1 overflow-hidden rounded-xl border border-dashed border-border/60 bg-card/30",
                "sm:grid-cols-3",
              )}
            >
              {rest.map((service, i) => (
                <SecondaryServiceCard
                  key={service.href}
                  service={service}
                  isFirst={i === 0}
                  isLast={i === rest.length - 1}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function FeaturedServiceCard({
  service,
  variants,
}: {
  service: NavItem
  variants: Variants
}) {
  return (
    <motion.div variants={variants} className="relative">
      <CornerMarks />
      <Link
        href={service.href}
        className={cn(
          "group/card relative flex flex-col overflow-hidden rounded-xl border border-dashed border-border/60 bg-card transition-colors duration-300 lg:flex-row",
          "hover:border-foreground/25",
        )}
      >
        <div className="flex flex-1 flex-col p-6 md:p-10 lg:max-w-[55%]">
          <div className="flex items-center justify-between gap-4">
            {service.icon ? (
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-foreground/80 transition-all duration-300 group-hover/card:border-foreground/30 group-hover/card:text-foreground">
                <Icon
                  icon={service.icon}
                  className="size-5 transition-transform duration-300 group-hover/card:scale-110"
                  aria-hidden
                />
              </span>
            ) : null}

            <span className="rounded-full border border-border bg-background/60 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Más popular
            </span>
          </div>

          <h3 className="mt-6 text-balance text-2xl font-medium tracking-tight text-foreground md:text-3xl">
            {service.title}
          </h3>
          {service.description ? (
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
              {service.description}
            </p>
          ) : null}

          {service.highlights && service.highlights.length > 0 ? (
            <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {service.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-2 text-sm leading-snug text-foreground/80"
                >
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-foreground/60"
                    aria-hidden
                  />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-8 flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors duration-300 group-hover/card:text-foreground">
            Ver servicio
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5" />
          </div>
        </div>

        <div className="relative flex flex-1 items-center justify-center border-t border-dashed border-border/60 bg-muted/30 p-6 md:p-10 lg:border-l lg:border-t-0">
          <WebsiteMockup />
        </div>
      </Link>
    </motion.div>
  )
}

function SecondaryServiceCard({
  service,
  isFirst,
  isLast,
}: {
  service: NavItem
  isFirst: boolean
  isLast: boolean
}) {
  return (
    <Link
      href={service.href}
      className={cn(
        "group/sec relative flex h-full flex-col gap-5 p-6 transition-colors duration-300 hover:bg-card/80",
        !isFirst && "border-t border-dashed border-border/50 sm:border-l sm:border-t-0",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        {service.icon ? (
          <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-border bg-background text-foreground/80 transition-all duration-300 group-hover/sec:border-foreground/30 group-hover/sec:text-foreground">
            <Icon
              icon={service.icon}
              className="size-4 transition-transform duration-300 group-hover/sec:scale-110"
              aria-hidden
            />
          </span>
        ) : null}

        {service.comingSoon ? (
          <span className="rounded-full border border-border bg-background/60 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            Próximo
          </span>
        ) : null}
      </div>

      <div className="flex-1">
        <h3 className="text-base font-semibold tracking-tight text-foreground">
          {service.title}
        </h3>
        {service.description ? (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {service.description}
          </p>
        ) : null}
      </div>

      <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors duration-300 group-hover/sec:text-foreground">
        Ver servicio
        <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover/sec:-translate-y-0.5 group-hover/sec:translate-x-0.5" />
      </div>
    </Link>
  )
}

function WebsiteMockup() {
  return (
    <div className="relative w-full max-w-md overflow-hidden rounded-lg border border-border bg-background shadow-xs">
      <div className="flex h-7 items-center gap-1.5 border-b border-border bg-muted/40 px-3">
        <div className="flex gap-1">
          <span className="size-1.5 rounded-full bg-muted-foreground/40" />
          <span className="size-1.5 rounded-full bg-muted-foreground/40" />
          <span className="size-1.5 rounded-full bg-muted-foreground/40" />
        </div>
        <div className="ml-2 h-3 flex-1 rounded-sm bg-muted/60" />
      </div>

      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <div className="h-1.5 w-12 rounded-full bg-foreground/40" />
          <div className="flex gap-1.5">
            <div className="h-1 w-6 rounded-full bg-muted-foreground/40" />
            <div className="h-1 w-6 rounded-full bg-muted-foreground/40" />
            <div className="h-1 w-6 rounded-full bg-muted-foreground/40" />
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 py-4">
          <div className="h-2 w-3/4 rounded-full bg-foreground/50" />
          <div className="h-1.5 w-1/2 rounded-full bg-muted-foreground/40" />
          <div className="mt-2 h-4 w-16 rounded-md bg-foreground" />
        </div>

        <div className="grid grid-cols-3 gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex flex-col gap-1 rounded-md bg-muted/50 p-2"
            >
              <div className="size-3 rounded-sm bg-foreground/30" />
              <div className="mt-1 h-1 w-3/4 rounded-full bg-foreground/30" />
              <div className="h-1 w-full rounded-full bg-muted-foreground/40" />
              <div className="h-1 w-2/3 rounded-full bg-muted-foreground/40" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
