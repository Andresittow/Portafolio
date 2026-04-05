"use client"

import { ReactNode } from "react"
import { motion } from "framer-motion"
import { staggerItemVariants } from "@/lib/animations"

interface StaggerItemProps {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
}

export function StaggerItem({
  children,
  className,
  style,
}: StaggerItemProps) {
  return (
    <motion.div
      variants={staggerItemVariants}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}
