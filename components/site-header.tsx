"use client"

import * as React from "react"
import Link from "next/link"

import { Logo } from "@/components/logo"
import { MainNav } from "@/components/main-nav"
import { MobileMenu } from "@/components/mobile-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

function useScrolled(threshold = 16) {
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > threshold)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [threshold])

  return scrolled
}

export function SiteHeader() {
  const scrolled = useScrolled(16)

  return (
    <header className="sticky top-0 z-50 w-full">
      <div
        className={cn(
          "mx-auto grid grid-cols-[1fr_auto_1fr] items-center border duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "transition-[width,max-width,height,padding,margin-top,border-radius,border-color,background-color,box-shadow,backdrop-filter]",
          scrolled
            ? "mt-3 h-12 w-[calc(100%-1.5rem)] max-w-3xl rounded-full border-border/60 bg-background/65 px-3 shadow-[0_10px_30px_-14px_rgb(0_0_0/0.22),0_2px_8px_-4px_rgb(0_0_0/0.08)] backdrop-blur-xl supports-backdrop-filter:bg-background/55"
            : "h-14 max-w-7xl rounded-none border-transparent bg-transparent px-4 md:px-6",
        )}
      >
        <div className="flex items-center justify-self-start">
          <Link
            href="/"
            aria-label={`${siteConfig.name} — Inicio`}
            className="flex items-center transition-opacity hover:opacity-80"
          >
            <Logo />
          </Link>
        </div>

        <div className="flex items-center justify-self-center">
          <MainNav />
        </div>

        <div className="flex items-center gap-1.5 justify-self-end">
          <ThemeToggle />
          <Button
            size="sm"
            nativeButton={false}
            className="hidden h-8 rounded-md px-3 text-sm font-medium md:inline-flex"
            render={
              <Link
                href={siteConfig.links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            Cotizar
          </Button>
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
