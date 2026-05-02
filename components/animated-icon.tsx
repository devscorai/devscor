"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { motion, useReducedMotion, type TargetAndTransition } from "motion/react"

import type { IconAnimation } from "@/config/pricing"
import { cn } from "@/lib/utils"

const ANIMATIONS: Record<
  Exclude<IconAnimation, "none">,
  { animate: TargetAndTransition; duration: number; repeatDelay?: number }
> = {
  bob: {
    animate: { y: [0, -3, 0] },
    duration: 2.2,
  },
  wave: {
    animate: { rotate: [0, -4, 4, -3, 3, 0] },
    duration: 1.8,
    repeatDelay: 1.4,
  },
  pulse: {
    animate: { scale: [1, 1.06, 1] },
    duration: 2.6,
  },
}

interface AnimatedIconProps {
  icon: string
  animation?: IconAnimation
  className?: string
  iconClassName?: string
}

export function AnimatedIcon({
  icon,
  animation = "none",
  className,
  iconClassName,
}: AnimatedIconProps) {
  const reduce = useReducedMotion()
  const config =
    animation !== "none" && !reduce ? ANIMATIONS[animation] : null

  return (
    <motion.span
      animate={config ? config.animate : undefined}
      transition={
        config
          ? {
              duration: config.duration,
              repeat: Infinity,
              repeatDelay: config.repeatDelay ?? 0,
              ease: "easeInOut",
            }
          : undefined
      }
      className={cn(
        "inline-flex items-center justify-center transition-transform duration-300 group-hover:scale-110",
        className,
      )}
    >
      <Icon
        icon={icon}
        className={cn("size-5", iconClassName)}
        aria-hidden
      />
    </motion.span>
  )
}
