import { cn } from "@/lib/utils"

interface CornerMarksProps {
  className?: string
  size?: "sm" | "md"
}

const POSITIONS = [
  "left-0 top-0 -translate-x-1/2 -translate-y-1/2",
  "right-0 top-0 translate-x-1/2 -translate-y-1/2",
  "left-0 bottom-0 -translate-x-1/2 translate-y-1/2",
  "right-0 bottom-0 translate-x-1/2 translate-y-1/2",
] as const

export function CornerMarks({ className, size = "sm" }: CornerMarksProps) {
  const dim = size === "sm" ? "size-2.5" : "size-3.5"

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 z-10", className)}
    >
      {POSITIONS.map((pos) => (
        <svg
          key={pos}
          viewBox="0 0 12 12"
          className={cn(
            "absolute text-muted-foreground/45",
            dim,
            pos,
          )}
        >
          <line
            x1="6"
            y1="0"
            x2="6"
            y2="12"
            stroke="currentColor"
            strokeWidth="1"
          />
          <line
            x1="0"
            y1="6"
            x2="12"
            y2="6"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      ))}
    </div>
  )
}
