"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react"

import { AnimatedIcon } from "@/components/animated-icon"
import type { IconAnimation } from "@/config/pricing"

const CARDS = {
  chat: { icon: "solar:chat-round-dots-linear", animation: "pulse" as IconAnimation },
  rocket: { icon: "solar:rocket-2-linear", animation: "bob" as IconAnimation },
  bolt: { icon: "solar:bolt-circle-linear", animation: "pulse" as IconAnimation },
  graph: { icon: "solar:graph-new-up-linear", animation: "bob" as IconAnimation },
} as const

import { BorderBeam } from "@/components/ui/border-beam"
import { NumberTicker } from "@/components/ui/number-ticker"
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

export function WhyUs() {
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
      id="por-que-devscor"
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
            Por qué devscor
          </motion.p>
          <motion.h2
            variants={item}
            className="mt-3 text-balance text-3xl font-medium tracking-tight md:text-5xl"
          >
            Diferente a las{" "}
            <span className="font-serif font-normal italic text-foreground/90">
              agencias
            </span>{" "}
            de siempre.
          </motion.h2>
          <motion.p
            variants={item}
            className="mt-4 text-base text-muted-foreground md:text-lg"
          >
            Equipo pequeño, decisiones rápidas, código moderno y trato directo.
            Lo que un freelance no puede darte y una agencia grande no quiere
            darte.
          </motion.p>
        </motion.div>

        <motion.div
          variants={container}
          {...motionState}
          className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3"
        >
          <FeaturedCard variants={item} />
          <DeliveryCard variants={item} />
          <TechCard variants={item} />
          <SellingCard variants={item} />
        </motion.div>
      </div>
    </section>
  )
}

function CardShell({
  className,
  children,
  innerClassName,
}: {
  className?: string
  children: React.ReactNode
  innerClassName?: string
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border bg-card transition-colors duration-300 hover:border-foreground/20",
        className,
      )}
    >
      <div className={cn("relative flex h-full flex-col", innerClassName)}>
        {children}
      </div>
    </div>
  )
}

function CardIcon({
  icon,
  animation = "none",
}: {
  icon: string
  animation?: IconAnimation
}) {
  return (
    <div className="flex size-10 items-center justify-center rounded-md border border-border bg-background/50 text-foreground/80 transition-colors duration-300 group-hover:border-foreground/30 group-hover:text-foreground">
      <AnimatedIcon icon={icon} animation={animation} iconClassName="size-5" />
    </div>
  )
}

function FeaturedCard({ variants }: { variants: Variants }) {
  return (
    <motion.div variants={variants} className="lg:col-span-2">
      <CardShell className="h-full" innerClassName="p-6 md:p-8">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 size-72 rounded-full bg-foreground/4 blur-3xl dark:bg-foreground/8"
        />

        <BorderBeamDuo />

        <div className="relative flex h-full flex-col">
          <CardIcon icon={CARDS.chat.icon} animation={CARDS.chat.animation} />

          <h3 className="mt-6 max-w-md text-balance text-2xl font-medium tracking-tight text-foreground md:text-3xl">
            Hablas con quien{" "}
            <span className="font-serif font-normal italic text-foreground/90">
              diseña
            </span>{" "}
            tu sitio.
          </h3>

          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
            Sin tickets, sin call centers, sin managers. Una conversación
            humana por WhatsApp con la persona que está construyendo tu web.
          </p>

          <div className="mt-8 flex-1" />

          <AnimatedChat />
        </div>
      </CardShell>
    </motion.div>
  )
}

function BorderBeamDuo() {
  return (
    <>
      <div className="block dark:hidden">
        <BorderBeam
          duration={8}
          size={140}
          colorFrom="rgb(0 0 0 / 0.45)"
          colorTo="rgb(0 0 0 / 0)"
        />
      </div>
      <div className="hidden dark:block">
        <BorderBeam
          duration={8}
          size={140}
          colorFrom="rgb(255 255 255 / 0.7)"
          colorTo="rgb(255 255 255 / 0)"
        />
      </div>
    </>
  )
}

const CHAT_TIMING = [600, 1300, 900, 1500, 5000] as const

function AnimatedChat() {
  const [phase, setPhase] = React.useState(0)
  const reduce = useReducedMotion()

  React.useEffect(() => {
    if (reduce) {
      setPhase(4)
      return
    }
    const id = setTimeout(() => {
      setPhase((p) => (p + 1) % CHAT_TIMING.length)
    }, CHAT_TIMING[phase])
    return () => clearTimeout(id)
  }, [phase, reduce])

  return (
    <motion.div
      layout
      className="relative mt-6 flex min-h-[120px] flex-col gap-2"
    >
      <AnimatePresence mode="wait">
        {phase === 1 && (
          <motion.div
            key="customer-typing"
            layout
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.22 }}
            className="flex max-w-[85%] items-end gap-2"
          >
            <ChatAvatar tone="muted">☕</ChatAvatar>
            <TypingDots side="left" />
          </motion.div>
        )}
        {phase >= 2 && (
          <motion.div
            key="customer-msg"
            layout
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
            className="flex max-w-[85%] items-end gap-2"
          >
            <ChatAvatar tone="muted">☕</ChatAvatar>
            <ChatBubble side="left">
              Hola, necesito una web para mi cafetería 👋
            </ChatBubble>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {phase === 3 && (
          <motion.div
            key="devscor-typing"
            layout
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.22 }}
            className="flex max-w-[85%] items-end gap-2 self-end"
          >
            <TypingDots side="right" />
            <ChatAvatar tone="strong">d</ChatAvatar>
          </motion.div>
        )}
        {phase >= 4 && (
          <motion.div
            key="devscor-msg"
            layout
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
            className="flex max-w-[85%] items-end gap-2 self-end"
          >
            <ChatBubble side="right">
              Perfecto, te paso un mockup en 48h ✨
            </ChatBubble>
            <ChatAvatar tone="strong">d</ChatAvatar>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function ChatAvatar({
  tone,
  children,
}: {
  tone: "muted" | "strong"
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
        tone === "muted" && "bg-muted text-muted-foreground",
        tone === "strong" && "bg-foreground text-background",
      )}
    >
      {children}
    </div>
  )
}

function ChatBubble({
  side,
  children,
}: {
  side: "left" | "right"
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "px-3.5 py-2 text-xs shadow-xs md:text-sm",
        side === "left"
          ? "rounded-2xl rounded-bl-sm border border-border bg-background text-foreground"
          : "rounded-2xl rounded-br-sm bg-foreground text-background",
      )}
    >
      {children}
    </div>
  )
}

function TypingDots({ side }: { side: "left" | "right" }) {
  return (
    <div
      className={cn(
        "flex h-8 items-center gap-1 px-3.5 shadow-xs",
        side === "left"
          ? "rounded-2xl rounded-bl-sm border border-border bg-background"
          : "rounded-2xl rounded-br-sm bg-foreground",
      )}
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          aria-hidden
          className={cn(
            "size-1.5 rounded-full",
            side === "left" ? "bg-muted-foreground/60" : "bg-background/70",
          )}
          animate={{
            y: [0, -3, 0],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 1.1,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

function DeliveryCard({ variants }: { variants: Variants }) {
  const reduce = useReducedMotion()

  return (
    <motion.div variants={variants}>
      <CardShell className="h-full" innerClassName="p-6 md:p-8">
        <CardIcon icon={CARDS.rocket.icon} animation={CARDS.rocket.animation} />

        <div className="mt-6 flex items-baseline gap-2">
          <motion.span
            initial={reduce ? false : { opacity: 0, scale: 0.6, y: 10 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.15 }}
            className="font-serif text-7xl font-normal italic leading-none tracking-tight text-foreground md:text-8xl"
          >
            7
          </motion.span>
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            días hábiles
          </span>
        </div>

        <h3 className="mt-6 text-base font-semibold tracking-tight text-foreground">
          Lanzamos rápido
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Una semana, no tres meses. Sabes exactamente cuándo está listo.
        </p>
      </CardShell>
    </motion.div>
  )
}

const TECH_STACK = [
  { icon: "simple-icons:nextdotjs", name: "Next.js" },
  { icon: "simple-icons:vercel", name: "Vercel" },
  { icon: "simple-icons:tailwindcss", name: "Tailwind" },
  { icon: "simple-icons:shadcnui", name: "shadcn/ui" },
] as const

function TechCard({ variants }: { variants: Variants }) {
  const reduce = useReducedMotion()

  return (
    <motion.div variants={variants}>
      <CardShell className="h-full" innerClassName="p-6 md:p-8">
        <CardIcon icon={CARDS.bolt.icon} animation={CARDS.bolt.animation} />

        <div className="mt-6 flex flex-wrap gap-1.5">
          {TECH_STACK.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: 0.4,
                delay: 0.2 + index * 0.07,
                ease: EASE_OUT_EXPO,
              }}
              whileHover={{ y: -2 }}
              className="group/chip inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/40 px-2 py-1 transition-colors duration-200 hover:border-foreground/20 hover:bg-muted"
            >
              <Icon
                icon={tech.icon}
                className="size-3.5 text-foreground/70 transition-all duration-200 group-hover/chip:scale-110 group-hover/chip:text-foreground"
                aria-hidden
              />
              <span className="font-mono text-[11px] font-medium tracking-tight text-foreground/80">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>

        <h3 className="mt-6 text-base font-semibold tracking-tight text-foreground">
          Tecnología premium
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Hasta 4× más rápido que un sitio en Wix o WordPress común.
        </p>
      </CardShell>
    </motion.div>
  )
}

function SellingCard({ variants }: { variants: Variants }) {
  return (
    <motion.div variants={variants} className="lg:col-span-2">
      <CardShell className="h-full" innerClassName="p-6 md:p-8">
        <CardIcon icon={CARDS.graph.icon} animation={CARDS.graph.animation} />

        <h3 className="mt-6 max-w-md text-balance text-2xl font-medium tracking-tight text-foreground md:text-3xl">
          Diseño pensado para{" "}
          <span className="font-serif font-normal italic text-foreground/90">
            convertir
          </span>
          .
        </h3>

        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
          Cada sección de tu sitio tiene un objetivo de negocio claro. No
          hacemos &ldquo;bonito sin propósito&rdquo;: cada botón, copy y
          jerarquía está pensada para mover al visitante hacia una acción.
        </p>

        <div className="mt-8 flex-1" />

        <ConversionMetrics />
      </CardShell>
    </motion.div>
  )
}

function ConversionMetrics() {
  return (
    <div className="mt-6 grid grid-cols-3 gap-4 border-t border-border/60 pt-6">
      <Metric label="Visitas" value={100} tone="muted" delay={0} />
      <Metric label="Interacciones" value={38} tone="muted" delay={0.15} />
      <Metric label="Contactos" value={12} tone="strong" delay={0.3} />
    </div>
  )
}

function Metric({
  label,
  value,
  tone,
  delay,
}: {
  label: string
  value: number
  tone: "muted" | "strong"
  delay: number
}) {
  return (
    <div className="flex flex-col gap-1">
      <NumberTicker
        value={value}
        delay={delay}
        className={cn(
          "text-2xl font-semibold leading-none tracking-tight tabular-nums md:text-3xl",
          tone === "strong"
            ? "text-foreground dark:text-foreground"
            : "text-muted-foreground/70 dark:text-muted-foreground/70",
        )}
      />
      <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </span>
    </div>
  )
}
