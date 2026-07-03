"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"


type Direction = "up" | "down" | "left" | "right" | "none"

function getInitial(direction: Direction) {
  switch (direction) {
    case "up":
      return { opacity: 0, y: 60 }
    case "down":
      return { opacity: 0, y: -60 }
    case "left":
      return { opacity: 0, x: 60 }
    case "right":
      return { opacity: 0, x: -60 }
    case "none":
      return { opacity: 0 }
  }
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: Direction
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={getInitial(direction)}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : getInitial(direction)}
      transition={{
        duration: 0.7,
        ease: [0.21, 0.45, 0.32, 0.98],
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
