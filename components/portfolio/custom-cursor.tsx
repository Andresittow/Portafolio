"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion"

/**
 * CustomCursor
 * -----------
 * - Dot: follows the mouse exactly (no spring)
 * - Ring: follows the mouse with a smooth spring (lerp feel)
 * - Hover state: ring expands when over a[href], button, [data-cursor-expand]
 * - Magnetic effect: buttons with [data-magnetic] attract the cursor
 * - Desktop only: hides on touch / pointer:coarse devices
 * - Respects prefers-reduced-motion (skips spring lag when reduced)
 */

const SPRING_CONFIG = { damping: 28, stiffness: 220, mass: 0.5 }
const MAGNETIC_RADIUS = 90   // px — distance to activate magnet
const MAGNETIC_STRENGTH = 0.38  // 0–1, how hard the element pulls

export function CustomCursor() {
  const prefersReduced = useReducedMotion()

  // Raw pointer position
  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)

  // Dot: snaps instantly
  const dotX = useMotionValue(-200)
  const dotY = useMotionValue(-200)

  // Ring: spring-smoothed
  const springX = useSpring(mouseX, prefersReduced ? { stiffness: 1000, damping: 10 } : SPRING_CONFIG)
  const springY = useSpring(mouseY, prefersReduced ? { stiffness: 1000, damping: 10 } : SPRING_CONFIG)

  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  // Magnetic state — offset applied to the magnetic element
  const magneticTargetRef = useRef<HTMLElement | null>(null)
  const magneticAnimFrame = useRef<number | null>(null)

  useEffect(() => {
    // Only activate on pointer:fine (mouse) devices
    const mql = window.matchMedia("(pointer: fine)")
    setIsDesktop(mql.matches)
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  useEffect(() => {
    if (!isDesktop) return

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      dotX.set(e.clientX)
      dotY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const onLeave = () => setIsVisible(false)
    const onEnter = () => setIsVisible(true)

    // ── Hover detection ──────────────────────────────────────────────────────
    const HOVER_SELECTOR = "a, button, [data-cursor-expand], label, [role='button']"

    const onMouseOver = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest(HOVER_SELECTOR)
      if (t) setIsHovering(true)
    }
    const onMouseOut = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest(HOVER_SELECTOR)
      if (t) setIsHovering(false)
    }

    // ── Magnetic effect ──────────────────────────────────────────────────────
    const magneticEls = () =>
      Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"))

    const runMagnetic = (e: MouseEvent) => {
      if (magneticAnimFrame.current) cancelAnimationFrame(magneticAnimFrame.current)

      magneticAnimFrame.current = requestAnimationFrame(() => {
        magneticEls().forEach((el) => {
          const rect = el.getBoundingClientRect()
          const cx = rect.left + rect.width / 2
          const cy = rect.top + rect.height / 2
          const dx = e.clientX - cx
          const dy = e.clientY - cy
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < MAGNETIC_RADIUS) {
            const pull = (1 - dist / MAGNETIC_RADIUS) * MAGNETIC_STRENGTH
            el.style.transform = `translate(${dx * pull}px, ${dy * pull}px)`
            el.style.transition = "transform 0.1s linear"
          } else {
            el.style.transform = ""
            el.style.transition = "transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)"
          }
        })
      })
    }

    const resetMagnetic = () => {
      magneticEls().forEach((el) => {
        el.style.transform = ""
        el.style.transition = "transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)"
      })
    }

    window.addEventListener("mousemove", onMove)
    window.addEventListener("mousemove", runMagnetic)
    window.addEventListener("mouseleave", onLeave)
    window.addEventListener("mouseenter", onEnter)
    document.addEventListener("mouseover", onMouseOver)
    document.addEventListener("mouseout", onMouseOut)

    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mousemove", runMagnetic)
      window.removeEventListener("mouseleave", onLeave)
      window.removeEventListener("mouseenter", onEnter)
      document.removeEventListener("mouseover", onMouseOver)
      document.removeEventListener("mouseout", onMouseOut)
      resetMagnetic()
      if (magneticAnimFrame.current) cancelAnimationFrame(magneticAnimFrame.current)
    }
  }, [isDesktop, isVisible, dotX, dotY, mouseX, mouseY])

  // Don't render anything on mobile / touch devices
  if (!isDesktop) return null

  const ringSize = isHovering ? 52 : 36
  const ringOpacity = isVisible ? 1 : 0
  const dotOpacity = isVisible ? 1 : 0

  return (
    <>
      {/* ── Ring (spring-smoothed) ────────────────────────────────────────── */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 99998,
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: ringOpacity,
        }}
        animate={{
          width: ringSize,
          height: ringSize,
        }}
        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            border: "1.5px solid rgba(37,99,235,0.65)",
            backgroundColor: isHovering ? "rgba(37,99,235,0.08)" : "transparent",
            backdropFilter: isHovering ? "blur(2px)" : "none",
            transition: "background-color 0.25s, border-color 0.25s, backdrop-filter 0.25s",
          }}
        />
      </motion.div>

      {/* ── Dot (exact position, no delay) ───────────────────────────────── */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 99999,
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: dotOpacity,
          width: 6,
          height: 6,
          borderRadius: "50%",
          backgroundColor: "#2563eb",
          transition: "opacity 0.2s",
        }}
      />
    </>
  )
}
