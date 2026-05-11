"use client"

import * as React from "react"
import Link from "next/link"
import { Icon } from "@iconify/react"
import { motion, useReducedMotion, type Variants } from "motion/react"

import { AnimatedIcon } from "@/components/animated-icon"
import { Button } from "@/components/ui/button"
import { BorderBeam } from "@/components/ui/border-beam"
import { pricingTiers, type PricingTier } from "@/config/pricing"
import { cn } from "@/lib/utils"

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_OUT_EXPO },
  },
}

export interface PricingProps {
  /** When true, hides the internal header and removes the top border. Useful when embedding in a dedicated page that already has its own hero. */
  bare?: boolean
}

export function Pricing({ bare = false }: PricingProps = {}) {
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
      id={bare ? undefined : "precios"}
      className={cn(
        "relative py-20 md:py-28",
        !bare && "border-t border-border/40",
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        {!bare ? (
          <motion.div
            variants={container}
            {...motionState}
            className="mb-12 max-w-2xl md:mb-16"
          >
            <motion.p
              variants={item}
              className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground"
            >
              Precios
            </motion.p>
            <motion.h2
              variants={item}
              className="mt-3 text-balance text-3xl font-medium tracking-tight md:text-5xl"
            >
              Inversión{" "}
              <span className="font-serif font-normal italic text-foreground/90">
                clara
              </span>
              . Sin sorpresas.
            </motion.h2>
            <motion.p
              variants={item}
              className="mt-4 text-base text-muted-foreground md:text-lg"
            >
              Planes pensados para diferentes etapas. Si tu proyecto es
              complejo, hablemos directo y te armamos una propuesta.
            </motion.p>
          </motion.div>
        ) : null}

        <motion.div
          variants={container}
          {...motionState}
          className="grid grid-cols-1 gap-3 lg:grid-cols-3"
        >
          {pricingTiers.map((tier) => (
            <TierCard key={tier.id} tier={tier} variants={item} />
          ))}
        </motion.div>

        <motion.p
          variants={item}
          {...motionState}
          className="mt-8 text-center text-xs text-muted-foreground"
        >
          Todos los planes incluyen diseño responsive, optimización de
          velocidad y entrega lista para publicar.
        </motion.p>
      </div>
    </section>
  )
}

function TierCard({
  tier,
  variants,
}: {
  tier: PricingTier
  variants: Variants
}) {
  const isFeatured = !!tier.featured

  return (
    <motion.div variants={variants} className="h-full">
      <div
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-xl border bg-card p-6 transition-all duration-300 md:p-8",
          isFeatured
            ? "border-foreground/15 bg-card shadow-sm"
            : "border-border hover:border-foreground/20",
        )}
      >
        {isFeatured && (
          <>
            <div
              aria-hidden
              className="pointer-events-none absolute -top-32 right-0 size-72 rounded-full bg-foreground/4 blur-3xl dark:bg-foreground/8"
            />
            <FeaturedBeams />
          </>
        )}

        <div className="relative flex items-center justify-between">
          <span
            className={cn(
              "flex size-10 items-center justify-center rounded-md border border-border bg-background/60 text-foreground/80",
              isFeatured && "border-foreground/15 text-foreground",
            )}
          >
            <AnimatedIcon
              icon={tier.icon}
              animation={tier.iconAnimation}
              iconClassName="size-5"
            />
          </span>

          {isFeatured && (
            <span className="rounded-full border border-foreground/15 bg-background px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground">
              Recomendado
            </span>
          )}
        </div>

        <h3 className="relative mt-6 text-base font-semibold tracking-tight text-foreground">
          {tier.name}
        </h3>

        <div className="relative mt-2 flex items-baseline gap-1.5">
          <span className="text-3xl font-medium tracking-tight text-foreground md:text-4xl">
            {tier.price}
          </span>
        </div>

        <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">
          {tier.description}
        </p>

        <ul className="relative mt-6 flex flex-col gap-2.5 border-t border-border/60 pt-6">
          {tier.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2.5 text-sm leading-snug text-foreground/80"
            >
              <Icon
                icon="solar:check-circle-linear"
                className={cn(
                  "mt-0.5 size-4 shrink-0",
                  isFeatured ? "text-foreground" : "text-muted-foreground",
                )}
                aria-hidden
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="relative mt-8 flex-1" />

        <Button
          variant={isFeatured ? "default" : "outline"}
          size="lg"
          nativeButton={false}
          className="relative h-10 w-full rounded-md text-sm font-medium"
          render={
            <Link
              href={tier.ctaHref}
              target={tier.ctaHref.startsWith("http") ? "_blank" : undefined}
              rel={
                tier.ctaHref.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              aria-label={`${tier.ctaLabel} — plan ${tier.name}${
                tier.ctaHref.includes("wa.me") ? " por WhatsApp" : ""
              }`}
            />
          }
        >
          {tier.ctaLabel}
        </Button>
      </div>
    </motion.div>
  )
}

function FeaturedBeams() {
  return (
    <>
      <div className="block dark:hidden">
        <BorderBeam
          duration={9}
          size={140}
          colorFrom="rgb(0 0 0 / 0.45)"
          colorTo="rgb(0 0 0 / 0)"
        />
      </div>
      <div className="hidden dark:block">
        <BorderBeam
          duration={9}
          size={140}
          colorFrom="rgb(255 255 255 / 0.7)"
          colorTo="rgb(255 255 255 / 0)"
        />
      </div>
    </>
  )
}
