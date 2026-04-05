import { Variants } from "framer-motion"

// ─── Text Reveal (clip-path, estilo dennissnellenberg) ─────────────────────
export const textRevealVariants: Variants = {
  hidden: {
    clipPath: "inset(0 0 100% 0)",
    y: "100%",
    opacity: 0,
  },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.85,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

// ─── Wrapper del text reveal (para el overflow-hidden externo) ──────────────
export const textRevealContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

// ─── Stagger container ──────────────────────────────────────────────────────
export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
}

// ─── Stagger item (fade + translateY) ──────────────────────────────────────
export const staggerItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

// ─── Fade up simple (para elementos standalone) ────────────────────────────
export const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}
