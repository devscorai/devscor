import { Icon } from "@iconify/react"

import { CornerMarks } from "@/components/corner-marks"
import { cn } from "@/lib/utils"

export interface Feature {
  icon: string
  title: string
  description: string
}

interface FeatureGridProps {
  features: Feature[]
  /** Tailwind grid columns at sm and lg breakpoints. Defaults to 2 cols. */
  columns?: 2 | 3
  className?: string
}

export function FeatureGrid({
  features,
  columns = 2,
  className,
}: FeatureGridProps) {
  return (
    <div className={cn("relative", className)}>
      <CornerMarks />
      <div
        className={cn(
          "grid grid-cols-1 overflow-hidden rounded-xl border border-dashed border-border/60 bg-card/30",
          columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3",
        )}
      >
        {features.map((feature, index) => (
          <FeatureCell
            key={feature.title}
            feature={feature}
            index={index}
            columns={columns}
            total={features.length}
          />
        ))}
      </div>
    </div>
  )
}

function FeatureCell({
  feature,
  index,
  columns,
  total,
}: {
  feature: Feature
  index: number
  columns: 2 | 3
  total: number
}) {
  const isTwo = columns === 2

  return (
    <div
      className={cn(
        "group flex items-start gap-4 p-6 transition-colors duration-300 md:p-8",
        "hover:bg-card/70",
        "border-dashed border-border/50",
        index > 0 && "border-t",
        isTwo && index === 1 && "sm:border-t-0",
        isTwo && index % 2 === 1 && "sm:border-l",
        !isTwo && index === 1 && "sm:border-t-0",
        !isTwo && index === 2 && "lg:border-t-0",
        !isTwo && index % 2 === 1 && "sm:border-l",
        !isTwo && "lg:border-l-0",
        !isTwo && index % 3 !== 0 && "lg:border-l",
        index >= total - 1 && "",
      )}
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-md border border-border bg-background text-foreground/80 transition-colors group-hover:border-foreground/30 group-hover:text-foreground">
        <Icon icon={feature.icon} className="size-5" aria-hidden />
      </span>
      <div>
        <h3 className="text-base font-semibold tracking-tight text-foreground">
          {feature.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {feature.description}
        </p>
      </div>
    </div>
  )
}
