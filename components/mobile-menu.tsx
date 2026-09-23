"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRight } from "lucide-react"
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react"

import { ThemeToggle } from "@/components/theme-toggle"
import { mainNav } from "@/config/site"
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
          <motion.nav variants={itemVariants} aria-label="Secciones">
            <ul className="overflow-hidden rounded-xl border border-dashed border-border/60 bg-card/30">
              {mainNav.map((link, i) => (
                <li
                  key={link.href}
                  className={cn(
                    i < mainNav.length - 1 &&
                      "border-b border-dashed border-border/40",
                  )}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="group/link flex items-center justify-between rounded-lg px-3 py-3.5 transition-colors hover:bg-muted active:bg-muted/80"
                  >
                    <span className="text-sm font-medium text-foreground">
                      {link.title}
                    </span>
                    <ArrowRight className="size-4 text-muted-foreground/60 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:text-foreground" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          <motion.div
            variants={itemVariants}
            className="mt-auto flex items-center justify-between border-t border-dashed border-border/50 px-1 pt-6"
          >
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Tema
            </span>
            <ThemeToggle />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
