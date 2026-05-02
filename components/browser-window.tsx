import * as React from "react"
import { Lock } from "lucide-react"

import { cn } from "@/lib/utils"

interface BrowserWindowProps {
  url?: string
  children: React.ReactNode
  className?: string
  contentClassName?: string
}

export function BrowserWindow({
  url,
  children,
  className,
  contentClassName,
}: BrowserWindowProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-card shadow-sm",
        className
      )}
    >
      <div className="relative flex h-9 items-center gap-1.5 border-b border-border bg-muted/40 px-3">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" aria-hidden />
          <span className="size-2.5 rounded-full bg-[#febc2e]" aria-hidden />
          <span className="size-2.5 rounded-full bg-[#28c840]" aria-hidden />
        </div>

        {url ? (
          <div className="absolute left-1/2 flex h-5 max-w-[60%] -translate-x-1/2 items-center gap-1.5 rounded-md border border-border/60 bg-background px-2 text-[10px] font-medium text-muted-foreground">
            <Lock className="size-2.5" aria-hidden />
            <span className="truncate">{url}</span>
          </div>
        ) : null}
      </div>

      <div className={cn("relative aspect-video bg-card", contentClassName)}>
        {children}
      </div>
    </div>
  )
}
