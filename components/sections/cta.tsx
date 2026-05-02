"use client"

import * as React from "react"
import Link from "next/link"
import { Icon } from "@iconify/react"
import { ArrowUpRight } from "lucide-react"
import { motion, useReducedMotion, type Variants } from "motion/react"

import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
}

export function CTA() {
  const reduce = useReducedMotion()
  const motionState = reduce
    ? { initial: false as const, animate: "visible" as const }
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.3 },
      }

  return (
    <section
      id="contacto"
      className="relative isolate overflow-hidden border-t border-border/40 py-28 md:py-44"
    >
      <CTABackground />

      <motion.div
        variants={container}
        {...motionState}
        className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-4 text-center md:px-6"
      >
        <motion.div variants={item}>
          <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
            </span>
            Disponibles para nuevos proyectos
          </span>
        </motion.div>

        <motion.h2
          variants={item}
          className="mt-8 text-balance text-4xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Hagamos que tu negocio se vea{" "}
          <span className="font-serif font-normal italic text-foreground/90">
            increíble
          </span>
          .
        </motion.h2>

        <motion.p
          variants={item}
          className="mt-6 max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Cuéntanos qué necesitas. Te enviamos una propuesta concreta — con
          tiempo, alcance y precio — en menos de 24 horas.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Button
            size="lg"
            nativeButton={false}
            className="h-11 rounded-md px-5 text-sm font-medium"
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
            Cotizar por WhatsApp
            <ArrowUpRight className="size-4" />
          </Button>

          <Button
            size="lg"
            variant="ghost"
            nativeButton={false}
            className="h-11 rounded-md px-5 text-sm font-medium text-muted-foreground hover:text-foreground"
            render={<Link href="/casos" />}
          >
            Ver casos de clientes
          </Button>
        </motion.div>

        <motion.p
          variants={item}
          className="mt-10 text-xs text-muted-foreground/80"
        >
          Respondemos en menos de 1 hora hábil
        </motion.p>
      </motion.div>
    </section>
  )
}

function CTABackground() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-50 dark:opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/[0.035] blur-3xl dark:bg-foreground/6"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-linear-to-r from-transparent via-border/80 to-transparent"
      />
    </>
  )
}
