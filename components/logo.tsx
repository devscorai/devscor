import Image, { type ImageProps } from "next/image"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

type LogoProps = Omit<ImageProps, "src" | "alt" | "width" | "height"> & {
  width?: number
  height?: number
}

export function Logo({
  className,
  width = 240,
  height = 76,
  priority = true,
  ...props
}: LogoProps) {
  return (
    <Image
      src="/logo.svg"
      alt={siteConfig.name}
      width={width}
      height={height}
      priority={priority}
      unoptimized
      className={cn("h-8 w-auto dark:invert", className)}
      {...props}
    />
  )
}
