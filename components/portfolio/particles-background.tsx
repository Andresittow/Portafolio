"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"
import { useTheme } from "next-themes"
import { useReducedMotion } from "framer-motion"
import type { ISourceOptions } from "@tsparticles/engine"

export function ParticlesBackground() {
  const [engineReady, setEngineReady] = useState(false)
  const [isMobile, setIsMobile]       = useState(true) // SSR-safe default
  const [mounted, setMounted]         = useState(false)
  const { resolvedTheme }             = useTheme()
  const prefersReduced                = useReducedMotion()

  useEffect(() => {
    setMounted(true)
    const check = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches)
    check()
    const mql = window.matchMedia("(max-width: 768px)")
    mql.addEventListener("change", check)
    return () => mql.removeEventListener("change", check)
  }, [])

  useEffect(() => {
    // Don't even initialize the engine on mobile — huge perf win
    if (isMobile) return
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setEngineReady(true))
  }, [isMobile])

  const isDark = mounted && resolvedTheme === "dark"

  // Memoize options so they don't get re-created on every render
  const options: ISourceOptions = useMemo(() => ({
    fullScreen: {
      enable: true,
      zIndex: 1,
    },
    fpsLimit: 45, // reduced from 60 — imperceptible but saves GPU budget
    background: { color: { value: "transparent" } },
    particles: {
      number: {
        value: 35, // reduced from 50 on desktop
        density: { enable: true, width: 1200, height: 800 },
      },
      color: {
        value: isDark
          ? ["#3b82f6", "#8b5cf6", "#6366f1"]
          : ["#2563eb", "#0ea5e9", "#3b82f6"],
      },
      shape: { type: "circle" },
      opacity: {
        value: isDark ? 0.5 : 0.45,
        animation: {
          enable: !prefersReduced,
          speed: 0.4,
          sync: false,
        },
      },
      size: {
        value: { min: 1.5, max: 3.5 },
        animation: {
          enable: !prefersReduced,
          speed: 1.2,
          sync: false,
        },
      },
      links: {
        enable: true,
        distance: 130,
        color: isDark ? "#3b82f6" : "#2563eb",
        opacity: isDark ? 0.15 : 0.18,
        width: 1,
      },
      move: {
        enable: !prefersReduced,
        speed: 0.55,
        direction: "none",
        random: true,
        straight: false,
        outModes: { default: "out" },
      },
    },
    interactivity: {
      detectsOn: "window",
      events: {
        onHover: {
          enable: !prefersReduced,
          mode: "repulse",
        },
        resize: { enable: true },
      },
      modes: {
        repulse: {
          distance: 90,
          duration: 0.5,
          speed: 0.6,
          maxSpeed: 3,
          easing: "ease-out-quad",
        },
      },
    },
    detectRetina: true,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [isDark, prefersReduced])

  const particlesLoaded = useCallback(async () => {}, [])

  // Don't render on mobile at all — huge perf win
  if (isMobile || !engineReady || !mounted) return null

  return (
    <Particles
      id="tsparticles"
      options={options}
      particlesLoaded={particlesLoaded}
      style={{ pointerEvents: "none" }}
    />
  )
}
