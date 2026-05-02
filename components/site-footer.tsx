import Link from "next/link"
import { Icon } from "@iconify/react"

import { CornerMarks } from "@/components/corner-marks"
import { Logo } from "@/components/logo"
import { mainNav, siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

type FooterLink = {
  title: string
  href: string
  external?: boolean
}

const footerColumns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Servicios",
    links: mainNav.services.map((s) => ({ title: s.title, href: s.href })),
  },
  {
    title: "Empresa",
    links: [
      ...mainNav.links,
      { title: "Preguntas frecuentes", href: "/#faq" },
    ],
  },
  {
    title: "Contacto",
    links: [
      {
        title: "WhatsApp",
        href: siteConfig.links.whatsapp,
        external: true,
      },
      {
        title: "Email",
        href: siteConfig.links.email,
      },
    ],
  },
]

const socialLinks = [
  {
    label: "Instagram",
    href: siteConfig.links.instagram,
    icon: "simple-icons:instagram",
  },
  {
    label: "LinkedIn",
    href: siteConfig.links.linkedin,
    icon: "simple-icons:linkedin",
  },
  {
    label: "X",
    href: siteConfig.links.x,
    icon: "simple-icons:x",
  },
  {
    label: "WhatsApp",
    href: siteConfig.links.whatsapp,
    icon: "simple-icons:whatsapp",
  },
]

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-border/40 bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <div className="relative">
          <CornerMarks />

          <div className="flex flex-col rounded-xl border border-dashed border-border/60 bg-card/20 md:flex-row">
            <div className="flex flex-col p-8 md:max-w-sm md:p-10">
              <Link
                href="/"
                aria-label={`${siteConfig.name} — Inicio`}
                className="inline-flex items-center transition-opacity hover:opacity-80"
              >
                <Logo className="h-7 w-auto" />
              </Link>

              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                Diseñamos páginas web modernas para negocios que quieren verse
                más profesionales y vender mejor.
              </p>

              <div className="mt-6 flex items-center gap-1">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={cn(
                      "flex size-9 items-center justify-center rounded-md border border-transparent text-muted-foreground transition-colors",
                      "hover:border-border hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <Icon icon={social.icon} className="size-4" aria-hidden />
                  </a>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 flex-1 border-t border-dashed border-border/50 sm:grid-cols-3 md:border-l md:border-t-0">
              {footerColumns.map((column, i) => (
                <FooterColumn
                  key={column.title}
                  {...column}
                  className={cn(
                    "border-dashed border-border/50",
                    i > 0 && "border-t sm:border-l sm:border-t-0",
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 px-2 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>
            © {year} {siteConfig.name} — {siteConfig.location}
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/legal/terminos"
              className="transition-colors hover:text-foreground"
            >
              Términos
            </Link>
            <Link
              href="/legal/privacidad"
              className="transition-colors hover:text-foreground"
            >
              Privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({
  title,
  links,
  className,
}: {
  title: string
  links: FooterLink[]
  className?: string
}) {
  return (
    <div className={cn("flex flex-col gap-3 p-8 md:p-10", className)}>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
        {title}
      </p>
      <ul className="flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
