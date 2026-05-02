import * as React from "react"

import { cn } from "@/lib/utils"

interface ShowcaseFrameProps {
  className?: string
  children: React.ReactNode
}

/**
 * Marco de color con padding alrededor del BrowserWindow.
 * Inspirado en Magic UI / Linear / Vercel templates.
 *
 * Se le pasa la clase de fondo (solid o gradient) vía `className`,
 * por defecto usa un neutral oscuro.
 */
export function ShowcaseFrame({ className, children }: ShowcaseFrameProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl p-5 sm:p-6 md:p-8 lg:p-10",
        "transition-shadow duration-300",
        className ?? "bg-zinc-900",
      )}
    >
      {children}
    </div>
  )
}
