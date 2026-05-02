"use client"

import * as React from "react"
import Link from "next/link"
import { Icon } from "@iconify/react"
import { ArrowUpRight } from "lucide-react"
import { motion, useReducedMotion, type Variants } from "motion/react"
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"

import { Button } from "@/components/ui/button"
import { CornerMarks } from "@/components/corner-marks"
import { faqs } from "@/config/faq"
import { siteConfig } from "@/config/site"
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

export function Faq() {
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
      id="faq"
      className="relative border-t border-border/40 py-20 md:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            variants={container}
            {...motionState}
            className="lg:col-span-5"
          >
            <div className="lg:sticky lg:top-24">
              <motion.p
                variants={item}
                className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground"
              >
                Preguntas frecuentes
              </motion.p>
              <motion.h2
                variants={item}
                className="mt-3 text-balance text-3xl font-medium tracking-tight md:text-5xl"
              >
                Lo que más nos{" "}
                <span className="font-serif font-normal italic text-foreground/90">
                  preguntan
                </span>
                .
              </motion.h2>
              <motion.p
                variants={item}
                className="mt-4 text-base text-muted-foreground md:text-lg"
              >
                Si tienes otra duda, escríbenos directo. Respondemos por
                WhatsApp en menos de una hora hábil.
              </motion.p>

              <motion.div variants={item} className="mt-8">
                <Button
                  size="lg"
                  variant="outline"
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
                  <Icon
                    icon="solar:chat-round-line-linear"
                    className="size-4"
                    aria-hidden
                  />
                  Pregunta por WhatsApp
                  <ArrowUpRight className="size-3.5" />
                </Button>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            variants={container}
            {...motionState}
            className="lg:col-span-7"
          >
            <div className="relative">
              <CornerMarks />

              <AccordionPrimitive.Root
                defaultValue={[faqs[0]?.id ?? ""]}
                className="rounded-xl border border-dashed border-border/60 bg-card/30 px-5 md:px-7"
              >
                {faqs.map((faq, index) => (
                  <motion.div key={faq.id} variants={item}>
                    <FaqItem faq={faq} isLast={index === faqs.length - 1} />
                  </motion.div>
                ))}
              </AccordionPrimitive.Root>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function FaqItem({
  faq,
  isLast,
}: {
  faq: { id: string; question: string; answer: string }
  isLast: boolean
}) {
  return (
    <AccordionPrimitive.Item
      value={faq.id}
      className={cn(
        !isLast && "border-b border-dashed border-border/50",
      )}
    >
      <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger
          className={cn(
            "group/trigger flex w-full items-center justify-between gap-6 py-5 text-left text-base font-medium tracking-tight text-foreground outline-none transition-colors md:py-6 md:text-lg",
            "hover:text-foreground/80 focus-visible:text-foreground/80",
          )}
        >
          <span className="flex-1">{faq.question}</span>

          <span
            aria-hidden
            className={cn(
              "relative flex size-7 shrink-0 items-center justify-center rounded-md border border-border bg-background text-foreground/70",
              "transition-all duration-300",
              "group-hover/trigger:border-foreground/30 group-hover/trigger:text-foreground",
              "group-aria-expanded/trigger:bg-foreground group-aria-expanded/trigger:text-background group-aria-expanded/trigger:border-foreground",
            )}
          >
            <svg
              viewBox="0 0 14 14"
              className="size-3.5 transition-transform duration-300 group-aria-expanded/trigger:rotate-45"
            >
              <line
                x1="7"
                y1="1"
                x2="7"
                y2="13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="1"
                y1="7"
                x2="13"
                y2="7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>

      <AccordionPrimitive.Panel className="overflow-hidden text-sm leading-relaxed data-open:animate-accordion-down data-closed:animate-accordion-up">
        <div className="h-(--accordion-panel-height) data-ending-style:h-0 data-starting-style:h-0">
          <p className="pb-6 pr-12 text-sm leading-relaxed text-muted-foreground md:text-base">
            {faq.answer}
          </p>
        </div>
      </AccordionPrimitive.Panel>
    </AccordionPrimitive.Item>
  )
}
