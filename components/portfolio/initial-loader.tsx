"use client"

import { useState, useEffect, useRef } from "react"
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

// Tiempos ajustados para que sea más fluido y rápido en móvil
const WORD_DURATION = 300
const FINAL_HOLD    = 900
const EXIT_DURATION = 0.55

// Timeout de seguridad: si algo falla, el loader desaparece igual
const MAX_LOADER_MS = 4500

interface InitialLoaderProps {
  onComplete: () => void
}

export function InitialLoader({ onComplete }: InitialLoaderProps) {
  const [index, setIndex]     = useState(0)
  const [exiting, setExiting] = useState(false)
  const prefersReduced        = useReducedMotion()
  const doneRef               = useRef(false)

  // Helper para llamar onComplete una sola vez
  const finish = () => {
    if (doneRef.current) return
    doneRef.current = true
    onComplete()
  }

  // Si prefiere movimiento reducido → skip inmediato
  useEffect(() => {
    if (prefersReduced) { finish(); return }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReduced])

  // Timeout de seguridad: nunca bloquea más de MAX_LOADER_MS
  useEffect(() => {
    const safetyTimer = setTimeout(finish, MAX_LOADER_MS)
    return () => clearTimeout(safetyTimer)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Ciclo de palabras
  useEffect(() => {
    if (prefersReduced || doneRef.current) return

    let t: ReturnType<typeof setTimeout>

    if (index < greetings.length - 1) {
      t = setTimeout(() => setIndex(p => p + 1), WORD_DURATION)
    } else {
      t = setTimeout(() => {
        setExiting(true)
        setTimeout(finish, EXIT_DURATION * 1000)
      }, FINAL_HOLD)
    }

    return () => clearTimeout(t)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, prefersReduced])

  const isArabic   = greetings[index].lang === "ar"
  const isLast     = index === greetings.length - 1
  const progress   = ((index + 1) / greetings.length) * 100

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: EXIT_DURATION, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-sky-50 dark:bg-[#060b18]"
          style={{ willChange: "opacity, transform" }}
          aria-live="polite"
          aria-label="Cargando portafolio"
        >
          {/* Palabra del saludo */}
          <div className="relative flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                initial={{ y: 28, opacity: 0 }}
                animate={{ y: 0,  opacity: 1 }}
                exit={{ y: -28,   opacity: 0 }}
                transition={{ duration: 0.1, ease: [0.76, 0, 0.24, 1] }}
                className="relative block text-primary dark:text-white font-extrabold text-center leading-none select-none drop-shadow-[0_10px_35px_rgba(37,99,235,0.4)]"
                style={{
                  fontSize: "clamp(3.5rem, 13vw, 9rem)",
                  fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif",
                  direction: isArabic ? "rtl" : "ltr",
                  willChange: "transform, opacity",
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
