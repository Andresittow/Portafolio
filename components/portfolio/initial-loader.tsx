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
const WORD_DURATION = 180
// How long "Hola" stays before exit
const FINAL_HOLD = 900
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
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-primary"
          aria-live="polite"
          aria-label="Cargando portafolio"
        >
          {/* Subtle radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(255,255,255,0.08),transparent)] pointer-events-none" />

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
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                initial={{ y: 60, opacity: 0, filter: "blur(8px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -60, opacity: 0, filter: "blur(8px)" }}
                transition={{
                  duration: 0.22,
                  ease: [0.76, 0, 0.24, 1],
                }}
                className="block text-white font-extrabold text-center leading-none select-none"
                style={{
                  fontSize: "clamp(4rem, 14vw, 10rem)",
                  fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif",
                  direction: isArabic ? "rtl" : "ltr",
                  // Last greeting gets a subtle glow
                  textShadow:
                    index === greetings.length - 1
                      ? "0 0 60px rgba(255,255,255,0.35)"
                      : "none",
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
