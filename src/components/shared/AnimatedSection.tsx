"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

export function AnimatedSection({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
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
