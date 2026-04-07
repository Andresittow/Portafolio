"use client"

import { useState, useEffect } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"

const greetings = [
  { word: "Hello",     lang: "en" },
  { word: "Bonjour",   lang: "fr" },
  { word: "Ciao",      lang: "it" },
  { word: "こんにちは", lang: "ja" },
  { word: "안녕하세요", lang: "ko" },
  { word: "Hallo",     lang: "de" },
  { word: "Olá",       lang: "pt" },
  { word: "مرحبا",     lang: "ar" },
  { word: "Hola",      lang: "es" },
]

// Duration in ms each greeting is visible (except the last)
const WORD_DURATION = 350
// How long "Hola" stays before exit
const FINAL_HOLD = 1200
// Exit animation duration
const EXIT_DURATION = 0.7

interface InitialLoaderProps {
  onComplete: () => void
}

export function InitialLoader({ onComplete }: InitialLoaderProps) {
  const [index, setIndex] = useState(0)
  const [exiting, setExiting] = useState(false)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    // If user prefers reduced motion, skip the loader entirely
    if (prefersReduced) {
      onComplete()
      return
    }

    let timeout: ReturnType<typeof setTimeout>

    if (index < greetings.length - 1) {
      // Cycle through greetings
      timeout = setTimeout(() => {
        setIndex((prev) => prev + 1)
      }, WORD_DURATION)
    } else {
      // Last word ("Hola"): hold, then trigger exit
      timeout = setTimeout(() => {
        setExiting(true)
        setTimeout(onComplete, EXIT_DURATION * 1000)
      }, FINAL_HOLD)
    }

    return () => clearTimeout(timeout)
  }, [index, onComplete, prefersReduced])

  const isArabic = greetings[index].lang === "ar"

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: EXIT_DURATION, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "#060b18" }}
          aria-live="polite"
          aria-label="Cargando portafolio"
        >
          {/* Deep radial blue glow */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(37,99,235,0.22) 0%, rgba(14,165,233,0.07) 55%, transparent 100%)" }} />
          {/* Noise/grain texture overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.035]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />

          {/* Counter bar */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-40 h-[2px] bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white/80 rounded-full"
                initial={{ width: "0%" }}
                animate={{
                  width: `${((index + 1) / greetings.length) * 100}%`,
                }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              />
            </div>
            <span className="text-white/40 text-xs font-mono tracking-widest uppercase">
              {greetings[index].lang}
            </span>
          </motion.div>

          {/* Greeting word */}
          <div className="relative flex items-center justify-center">
            {/* Soft bloom glow — radial gradient behind text, blends naturally */}
            <motion.div
              key={`glow-${index}`}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{
                opacity: index === greetings.length - 1 ? 0.55 : 0.3,
                scale: 1,
              }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute pointer-events-none"
              style={{
                width: "clamp(300px, 60vw, 700px)",
                height: "clamp(150px, 25vw, 320px)",
                background:
                  index === greetings.length - 1
                    ? "radial-gradient(ellipse at 50% 50%, rgba(147,197,255,0.45) 0%, rgba(99,160,255,0.2) 35%, transparent 70%)"
                    : "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.2) 0%, rgba(200,220,255,0.08) 40%, transparent 70%)",
                filter: "blur(18px)",
              }}
            />
            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{
                  duration: 0.12,
                  ease: [0.76, 0, 0.24, 1],
                }}
                className="relative block text-white font-extrabold text-center leading-none select-none"
                style={{
                  fontSize: "clamp(4rem, 14vw, 10rem)",
                  fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif",
                  direction: isArabic ? "rtl" : "ltr",
                }}
              >
                {greetings[index].word}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
