"use client"

import * as React from "react"
import Link from "next/link"
import { Icon } from "@iconify/react"
import { ArrowRight } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { mainNav, type NavItem } from "@/config/site"
import { cn } from "@/lib/utils"

export function MainNav() {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Servicios</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[560px] p-2">
              <ul className="grid grid-cols-2 gap-1">
                {mainNav.services.map((service) => (
                  <ServiceItem key={service.href} service={service} />
                ))}
              </ul>
              <div className="mt-1 border-t border-border/60 pt-1">
                <NavigationMenuLink
                  render={<Link href={mainNav.servicesIndex.href} />}
                  className="group/cta flex items-center justify-between rounded-md px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <span>{mainNav.servicesIndex.title}</span>
                  <ArrowRight className="size-3.5 transition-transform group-hover/cta:translate-x-0.5" />
                </NavigationMenuLink>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {mainNav.links.map((item) => (
          <NavigationMenuItem key={item.href}>
            <NavigationMenuLink
              render={<Link href={item.href} />}
              className={navigationMenuTriggerStyle()}
            >
              {item.title}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function ServiceItem({ service }: { service: NavItem }) {
  return (
    <li>
      <NavigationMenuLink
        render={<Link href={service.href} />}
        className={cn(
          "group/item flex flex-row items-start gap-3 rounded-md p-3 leading-none no-underline outline-none transition-colors",
          "hover:bg-muted focus:bg-muted"
        )}
      >
        {service.icon ? (
          <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-background text-foreground/70 transition-colors group-hover/item:border-foreground/30 group-hover/item:text-foreground">
            <Icon icon={service.icon} className="size-4" aria-hidden />
          </span>
        ) : null}

        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium leading-none">
              {service.title}
            </span>
            {service.comingSoon ? (
              <span className="rounded-full border border-border px-1.5 py-px text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Próximo
              </span>
            ) : null}
          </div>
          {service.description ? (
            <span className="line-clamp-2 text-xs leading-snug text-muted-foreground">
              {service.description}
            </span>
          ) : null}
        </div>
      </NavigationMenuLink>
    </li>
  )
}
