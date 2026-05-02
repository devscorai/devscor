"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion, useReducedMotion, type Variants } from "motion/react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
}

export interface PageHeroCta {
  label: string
  href: string
  external?: boolean
}

export interface PageHeroProps {
  eyebrow?: string
  title: React.ReactNode
  lead?: React.ReactNode
  primaryCta?: PageHeroCta
  secondaryCta?: PageHeroCta
  /** Size variant. `sm` for inner detail pages, `md` for landing-style pages. */
  size?: "sm" | "md"
  /** Optional small line below CTAs (e.g. trust line). */
  footnote?: React.ReactNode
}

export function PageHero({
  eyebrow,
  title,
  lead,
  primaryCta,
  secondaryCta,
  size = "sm",
  footnote,
}: PageHeroProps) {
  const reduce = useReducedMotion()

  const motionProps = reduce
    ? { initial: false as const, animate: "visible" }
    : { initial: "hidden", animate: "visible" }

  return (
    <section className="relative isolate overflow-hidden">
      <PageHeroGlow />

      <motion.div
        variants={container}
        {...motionProps}
        className={cn(
          "mx-auto flex w-full flex-col items-center px-4 text-center md:px-6",
          size === "md"
            ? "max-w-3xl pb-20 pt-24 md:pb-28 md:pt-32"
            : "max-w-2xl pb-14 pt-20 md:pb-20 md:pt-28",
        )}
      >
        {eyebrow ? (
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm">
              <span
                className="size-1.5 rounded-full bg-emerald-500"
                aria-hidden
              />
              {eyebrow}
            </span>
          </motion.div>
        ) : null}

        <motion.h1
          variants={item}
          className={cn(
            "text-balance font-medium leading-[1.05] tracking-tight text-foreground",
            eyebrow ? "mt-7" : "mt-0",
            size === "md"
              ? "text-4xl sm:text-5xl md:text-6xl lg:text-[64px]"
              : "text-3xl sm:text-4xl md:text-5xl lg:text-[56px]",
          )}
        >
          {title}
        </motion.h1>

        {lead ? (
          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {lead}
          </motion.p>
        ) : null}

        {primaryCta || secondaryCta ? (
          <motion.div
            variants={item}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
          >
            {primaryCta ? (
              <Button
                size="lg"
                nativeButton={false}
                className="h-10 rounded-md px-5 text-sm font-medium"
                render={
                  <Link
                    href={primaryCta.href}
                    target={primaryCta.external ? "_blank" : undefined}
                    rel={
                      primaryCta.external ? "noopener noreferrer" : undefined
                    }
                  />
                }
              >
                {primaryCta.label}
                <ArrowRight className="size-4" />
              </Button>
            ) : null}

            {secondaryCta ? (
              <Button
                size="lg"
                variant="ghost"
                nativeButton={false}
                className="h-10 rounded-md px-5 text-sm font-medium text-muted-foreground hover:text-foreground"
                render={
                  <Link
                    href={secondaryCta.href}
                    target={secondaryCta.external ? "_blank" : undefined}
                    rel={
                      secondaryCta.external ? "noopener noreferrer" : undefined
                    }
                  />
                }
              >
                {secondaryCta.label}
              </Button>
            ) : null}
          </motion.div>
        ) : null}

        {footnote ? (
          <motion.p
            variants={item}
            className="mt-9 text-xs text-muted-foreground/80"
          >
            {footnote}
          </motion.p>
        ) : null}
      </motion.div>
    </section>
  )
}

function PageHeroGlow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[500px] overflow-hidden"
    >
      <div className="absolute left-1/2 top-[-260px] h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-foreground/5 blur-3xl dark:bg-foreground/7" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,var(--background))]" />
    </div>
  )
}
