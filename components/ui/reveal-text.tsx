"use client"

import { useRef, ElementType, HTMLAttributes } from "react"
import { motion, useInView } from "framer-motion"
import { textRevealVariants } from "@/lib/animations"

interface RevealTextProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
  delay?: number
  amount?: number
}

export function RevealText({
  as: Tag = "div",
  children,
  className,
  delay = 0,
  amount = 0.3,
  ...props
}: RevealTextProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount })

  const variants = {
    hidden: textRevealVariants.hidden,
    visible: {
      ...textRevealVariants.visible,
      transition: {
        ...(textRevealVariants.visible as { transition: object }).transition,
        delay,
      },
    },
  }

  return (
    // El overflow-hidden externo es la "máscara" que oculta el texto
    <div ref={ref} style={{ overflow: "hidden" }}>
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={variants}
      >
        <Tag className={className} {...props}>
          {children}
        </Tag>
      </motion.div>
    </div>
  )
}
