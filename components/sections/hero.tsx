"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion, useReducedMotion, type Variants } from "motion/react"

import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
}

export function Hero() {
  const reduce = useReducedMotion()

  const motionProps = reduce
    ? { initial: false, animate: "visible" }
    : { initial: "hidden", animate: "visible" }

  return (
    <section className="relative isolate overflow-hidden">
      <BackgroundGlow />

      <motion.div
        variants={container}
        {...motionProps}
        className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 pb-20 pt-24 text-center md:pb-32 md:pt-36"
      >
        <motion.div variants={item}>
          <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm">
            <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden />
            Agencia digital · Perú
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="mt-8 text-balance text-4xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[72px]"
        >
          Webs que hacen que tu negocio{" "}
          <span className="font-serif font-normal italic text-foreground/90">
            venda
          </span>{" "}
          más.
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Diseñamos sitios profesionales que generan confianza desde el primer
          click — y convierten visitas en clientes reales.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
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
            Cotizar por WhatsApp
            <ArrowRight className="size-4" />
          </Button>

          <Button
            size="lg"
            variant="ghost"
            nativeButton={false}
            className="h-10 rounded-md px-5 text-sm font-medium text-muted-foreground hover:text-foreground"
            render={<Link href="/casos" />}
          >
            Ver casos
          </Button>
        </motion.div>

        <motion.p
          variants={item}
          className="mt-10 text-xs text-muted-foreground/80"
        >
          +4 webs entregadas a negocios reales
        </motion.p>
      </motion.div>
    </section>
  )
}

function BackgroundGlow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] overflow-hidden"
    >
      <div className="absolute left-1/2 top-[-300px] h-[700px] w-[1100px] -translate-x-1/2 rounded-full bg-foreground/6 blur-3xl dark:bg-foreground/8" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,var(--background))]" />
    </div>
  )
}
