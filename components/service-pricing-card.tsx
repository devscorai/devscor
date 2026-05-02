import Link from "next/link"
import { Icon } from "@iconify/react"
import { ArrowUpRight } from "lucide-react"

import { CornerMarks } from "@/components/corner-marks"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"

interface ServicePricingCardProps {
  /** Big headline price, e.g. "Desde $500" or "Cotización" */
  price: string
  /** Small label above price, e.g. "Inversión" */
  label?: string
  /** Description below price */
  description: string
  /** Primary CTA label. Defaults to "Cotizar por WhatsApp" */
  ctaLabel?: string
}

export function ServicePricingCard({
  price,
  label = "Inversión",
  description,
  ctaLabel = "Cotizar por WhatsApp",
}: ServicePricingCardProps) {
  return (
    <section className="border-t border-border/40 py-20 md:py-28">
      <div className="mx-auto w-full max-w-3xl px-4 md:px-6">
        <div className="relative">
          <CornerMarks />
          <div className="overflow-hidden rounded-xl border border-dashed border-border/60 bg-card/30 p-8 text-center md:p-12">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              {label}
            </p>
            <p className="mt-4 text-5xl font-medium tracking-tight text-foreground md:text-6xl">
              {price}
            </p>
            <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
              {description}
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button
                size="lg"
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
                  icon="simple-icons:whatsapp"
                  className="size-4"
                  aria-hidden
                />
                {ctaLabel}
                <ArrowUpRight className="size-4" />
              </Button>

              <Button
                size="lg"
                variant="ghost"
                nativeButton={false}
                className="h-10 rounded-md px-5 text-sm font-medium text-muted-foreground hover:text-foreground"
                render={<Link href="/precios" />}
              >
                Ver todos los planes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
