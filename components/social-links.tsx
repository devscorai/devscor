"use client"

import { Icon } from "@iconify/react"
import instagramLine from "@iconify-icons/ri/instagram-line"
import linkedinFill from "@iconify-icons/ri/linkedin-fill"
import mailLine from "@iconify-icons/ri/mail-line"
import twitterXFill from "@iconify-icons/ri/twitter-x-fill"

import { siteConfig } from "@/config/site"

const links = [
  { label: "Correo", href: siteConfig.links.email, icon: mailLine },
  { label: "Instagram", href: siteConfig.links.instagram, icon: instagramLine },
  { label: "LinkedIn", href: siteConfig.links.linkedin, icon: linkedinFill },
  { label: "X", href: siteConfig.links.x, icon: twitterXFill },
] as const

export function SocialLinks() {
  return (
    <nav aria-label="Contacto" className="-mx-2 flex items-center gap-1">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          aria-label={link.label}
          title={link.label}
          className="inline-flex size-9 items-center justify-center rounded-md text-[#C9D9F1] transition-colors duration-200 hover:bg-white/10 hover:text-[#F5F3EE] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5F3EE]"
          {...(link.href.startsWith("http")
            ? { target: "_blank", rel: "noreferrer" }
            : {})}
        >
          <Icon icon={link.icon} className="size-[18px]" aria-hidden />
        </a>
      ))}
    </nav>
  )
}
