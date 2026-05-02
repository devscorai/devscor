"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Icon } from "@iconify/react"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react"

import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { mainNav, siteConfig, type NavItem } from "@/config/site"
import { cn } from "@/lib/utils"

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.08 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE_OUT_EXPO },
  },
}

export function MobileMenu() {
  const [open, setOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const reduce = useReducedMotion()
  const pathname = usePathname()
  const previousPathname = React.useRef(pathname)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    if (pathname !== previousPathname.current) {
      previousPathname.current = pathname
      setOpen(false)
    }
  }, [pathname])

  React.useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open])

  const close = React.useCallback(() => setOpen(false), [])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="relative z-50 flex size-9 items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted md:hidden"
      >
        <HamburgerIcon open={open} />
      </button>

      {mounted
        ? createPortal(
            <AnimatePresence>
              {open ? (
                <MobilePanel onClose={close} reduce={!!reduce} />
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </>
  )
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div
      aria-hidden
      className="relative flex h-[14px] w-[18px] flex-col items-stretch justify-between"
    >
      <motion.span
        className="block h-px w-full origin-center bg-current"
        animate={open ? { y: 6, rotate: 45 } : { y: 0, rotate: 0 }}
        transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
      />
      <motion.span
        className="block h-px w-full origin-center bg-current"
        animate={open ? { y: -6, rotate: -45 } : { y: 0, rotate: 0 }}
        transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
      />
    </div>
  )
}

function MobilePanel({
  onClose,
  reduce,
}: {
  onClose: () => void
  reduce: boolean
}) {
  return (
    <motion.div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menú principal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-40 md:hidden"
    >
      <button
        type="button"
        aria-label="Cerrar menú"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-background"
      />

      <motion.div
        initial={reduce ? false : { y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -16, opacity: 0 }}
        transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
        className="relative flex h-full flex-col overflow-y-auto"
      >
        <motion.div
          variants={containerVariants}
          initial={reduce ? false : "hidden"}
          animate="visible"
          className="mx-auto flex w-full max-w-xl flex-1 flex-col gap-8 px-4 pb-10 pt-20"
        >
          <MenuSection title="Servicios">
            <ul className="flex flex-col p-1.5">
              {mainNav.services.map((service, i) => (
                <ServiceRow
                  key={service.href}
                  service={service}
                  onClick={onClose}
                  isLast={i === mainNav.services.length - 1}
                />
              ))}
            </ul>
          </MenuSection>

          <MenuSection title="Explora">
            <ul className="flex flex-col p-1.5">
              {[
                ...mainNav.links,
                { title: "Preguntas frecuentes", href: "/#faq" },
              ].map((link, i, arr) => (
                <LinkRow
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  isLast={i === arr.length - 1}
                >
                  {link.title}
                </LinkRow>
              ))}
            </ul>
          </MenuSection>

          <motion.div
            variants={itemVariants}
            className="mt-auto flex flex-col gap-5 border-t border-dashed border-border/50 pt-6"
          >
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Tema
              </span>
              <ThemeToggle />
            </div>

            <Button
              size="lg"
              nativeButton={false}
              className="h-11 w-full rounded-md text-sm font-medium"
              render={
                <Link
                  href={siteConfig.links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
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
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

function MenuSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <motion.section variants={itemVariants} className="flex flex-col gap-3">
      <p className="px-1 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
        {title}
      </p>
      <div className="overflow-hidden rounded-xl border border-dashed border-border/60 bg-card/30">
        {children}
      </div>
    </motion.section>
  )
}

function ServiceRow({
  service,
  onClick,
  isLast,
}: {
  service: NavItem
  onClick: () => void
  isLast: boolean
}) {
  return (
    <li
      className={cn(
        !isLast && "border-b border-dashed border-border/40",
      )}
    >
      <Link
        href={service.href}
        onClick={onClick}
        className="group/row flex items-center gap-3 rounded-lg px-3 py-3 transition-colors active:bg-muted/80 hover:bg-muted"
      >
        {service.icon ? (
          <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-border bg-background text-foreground/80 transition-colors group-hover/row:border-foreground/30 group-hover/row:text-foreground">
            <Icon icon={service.icon} className="size-4" aria-hidden />
          </span>
        ) : null}

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">
              {service.title}
            </span>
            {service.comingSoon ? (
              <span className="rounded-full border border-border px-1.5 py-px text-[9px] font-medium uppercase tracking-wider text-muted-foreground">
                Próximo
              </span>
            ) : null}
          </div>
          {service.description ? (
            <p className="mt-0.5 truncate text-xs text-muted-foreground">
              {service.description}
            </p>
          ) : null}
        </div>

        <ArrowRight className="size-4 shrink-0 text-muted-foreground/60 transition-transform duration-200 group-hover/row:translate-x-0.5 group-hover/row:text-foreground" />
      </Link>
    </li>
  )
}

function LinkRow({
  href,
  onClick,
  isLast,
  children,
}: {
  href: string
  onClick: () => void
  isLast: boolean
  children: React.ReactNode
}) {
  return (
    <li
      className={cn(
        !isLast && "border-b border-dashed border-border/40",
      )}
    >
      <Link
        href={href}
        onClick={onClick}
        className="group/link flex items-center justify-between rounded-lg px-3 py-3.5 transition-colors active:bg-muted/80 hover:bg-muted"
      >
        <span className="text-sm font-medium text-foreground">{children}</span>
        <ArrowRight className="size-4 text-muted-foreground/60 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:text-foreground" />
      </Link>
    </li>
  )
}
