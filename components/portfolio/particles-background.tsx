"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { useReducedMotion } from "framer-motion"

interface Particle {
  x: number; y: number
  vx: number; vy: number
  size: number
  color: string
  alpha: number
  decay: number
  rotation: number
  rotSpeed: number
}

const LIGHT_COLORS = ["#2563eb", "#0ea5e9", "#6366f1", "#3b82f6"]
const DARK_COLORS  = ["#3b82f6", "#8b5cf6", "#6366f1", "#60a5fa"]

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}

export function ParticlesBackground() {
  const canvasRef              = useRef<HTMLCanvasElement>(null)
  const themeRef               = useRef<string>("light")
  const animRef                = useRef<number>(0)
  const [isMobile, setIsMobile] = useState(true)
  const { resolvedTheme }      = useTheme()
  const prefersReduced         = useReducedMotion()

  // Keep themeRef in sync so the draw loop always has the latest theme
  useEffect(() => {
    themeRef.current = resolvedTheme ?? "light"
  }, [resolvedTheme])

  // Mobile detection
  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia("(pointer: coarse)").matches)
    check()
    const mql = window.matchMedia("(pointer: coarse)")
    mql.addEventListener("change", check)
    return () => mql.removeEventListener("change", check)
  }, [])

  // Main canvas effect
  useEffect(() => {
    if (isMobile || prefersReduced) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Fill viewport
    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const particles: Particle[] = []

    function spawn(x: number, y: number) {
      const colors = themeRef.current === "dark" ? DARK_COLORS : LIGHT_COLORS
      const angle  = rand(0, Math.PI * 2)
      const speed  = rand(0.8, 2.8)
      particles.push({
        x, y,
        vx:       Math.cos(angle) * speed,
        vy:       Math.sin(angle) * speed,
        size:     rand(2, 4.5),
        color:    colors[Math.floor(Math.random() * colors.length)],
        alpha:    rand(0.65, 0.9),
        decay:    rand(0.007, 0.014),
        rotation: rand(0, Math.PI * 2),
        rotSpeed: rand(-0.06, 0.06),
      })
    }

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x  += p.vx
        p.y  += p.vy
        p.vx *= 0.985          // gentle deceleration
        p.vy *= 0.985
        p.alpha    -= p.decay
        p.rotation += p.rotSpeed

        if (p.alpha <= 0) { particles.splice(i, 1); continue }

        ctx!.save()
        ctx!.translate(p.x, p.y)
        ctx!.rotate(p.rotation)
        ctx!.globalAlpha = p.alpha
        ctx!.fillStyle   = p.color
        // Draw a small rectangle rotated = dash shape like the reference
        ctx!.fillRect(-p.size * 0.5, -p.size * 1.2, p.size, p.size * 2.4)
        ctx!.restore()
      }

      animRef.current = requestAnimationFrame(draw)
    }

    draw()

    // Spawn particles as the mouse moves
    let lastX = 0, lastY = 0
    function onMove(e: MouseEvent) {
      const dx   = e.clientX - lastX
      const dy   = e.clientY - lastY
      const dist = Math.hypot(dx, dy)
      if (dist < 6) return          // only when mouse actually moved
      lastX = e.clientX
      lastY = e.clientY
      for (let i = 0; i < 2; i++) spawn(e.clientX, e.clientY)
    }

    window.addEventListener("mousemove", onMove)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMove)
    }
  }, [isMobile, prefersReduced])

  if (isMobile || prefersReduced) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position:      "fixed",
        inset:         0,
        zIndex:        9990,
        pointerEvents: "none",
      }}
    />
  )
}
