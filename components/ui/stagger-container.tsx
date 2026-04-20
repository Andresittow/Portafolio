"use client"

import { useRef, ReactNode } from "react"
import { motion, useInView } from "framer-motion"
import { staggerContainerVariants } from "@/lib/animations"

interface StaggerContainerProps {
  children: ReactNode
  className?: string
  delay?: number
  amount?: number
  style?: React.CSSProperties
}

export function StaggerContainer({
  children,
  className,
  delay = 0,
  amount = 0.1,
  style,
}: StaggerContainerProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount })

  const variants = {
    hidden: staggerContainerVariants.hidden,
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: delay,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}
