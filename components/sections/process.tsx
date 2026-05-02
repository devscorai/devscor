"use client"

import { motion, useReducedMotion, type Variants } from "motion/react"

import { CornerMarks } from "@/components/corner-marks"
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
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
}

const steps = [
  {
    title: "Conversación",
    description:
      "Entendemos tu negocio, tu cliente y qué resultado quieres lograr. Sin reuniones eternas — todo por WhatsApp.",
  },
  {
    title: "Diseño",
    description:
      "En 48 horas tienes el primer mockup. Te enseñamos el rumbo antes de construir nada.",
  },
  {
    title: "Construcción",
    description:
      "Desarrollamos tu sitio con feedback continuo. Tú decides cuándo está listo para lanzar.",
  },
  {
    title: "Lanzamiento",
    description:
      "Publicamos online, configuramos tu dominio y te entrenamos para usarlo solo.",
  },
] as const

export interface ProcessProps {
  /** When true, hides the internal header and removes the top border. Useful when embedding in a dedicated page that already has its own hero. */
  bare?: boolean
}

export function Process({ bare = false }: ProcessProps = {}) {
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
      id={bare ? undefined : "proceso"}
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
              Proceso
            </motion.p>
            <motion.h2
              variants={item}
              className="mt-3 text-balance text-3xl font-medium tracking-tight md:text-5xl"
            >
              Cómo{" "}
              <span className="font-serif font-normal italic text-foreground/90">
                trabajamos
              </span>{" "}
              juntos.
            </motion.h2>
            <motion.p
              variants={item}
              className="mt-4 text-base text-muted-foreground md:text-lg"
            >
              Un proceso simple, transparente y rápido. Sin burocracia ni
              reuniones eternas.
            </motion.p>
          </motion.div>
        ) : null}

        <motion.div variants={item} {...motionState} className="relative">
          <CornerMarks />
          <ol className="grid grid-cols-1 overflow-hidden rounded-xl border border-dashed border-border/60 bg-card/30 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <motion.li
                key={step.title}
                variants={item}
                className={cn(
                  "group relative flex flex-col gap-6 p-6 transition-colors duration-300 md:p-8",
                  "hover:bg-card/70",
                  "border-dashed border-border/50",
                  index > 0 && "border-t",
                  index === 1 && "sm:border-t-0",
                  index % 2 === 1 && "sm:border-l",
                  (index === 2 || index === 3) && "lg:border-t-0",
                  index > 0 && "lg:border-l",
                )}
              >
                <span
                  aria-hidden
                  className="font-serif text-6xl font-normal italic leading-none text-foreground/25 transition-colors duration-300 group-hover:text-foreground/45"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  <h3 className="text-base font-semibold tracking-tight text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </motion.div>
      </div>
    </section>
  )
}
