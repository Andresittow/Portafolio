"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { NextIntlClientProvider } from "next-intl"
import esMessages from "@/messages/es.json"
import enMessages from "@/messages/en.json"

type Locale = "es" | "en"

const allMessages: Record<Locale, typeof esMessages> = {
  es: esMessages,
  en: enMessages,
}

interface LocaleContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
}

const LocaleContext = createContext<LocaleContextType>({
  locale: "es",
  setLocale: () => {},
})

export function useLocale() {
  return useContext(LocaleContext)
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("es")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("portfolio-locale") as Locale | null
    if (stored === "es" || stored === "en") {
      setLocaleState(stored)
    }
    setMounted(true)
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem("portfolio-locale", newLocale)
  }

  // During SSR and first render, use Spanish to avoid hydration mismatch
  const activeLocale = mounted ? locale : "es"

  return (
    <LocaleContext.Provider value={{ locale: activeLocale, setLocale }}>
      <NextIntlClientProvider
        locale={activeLocale}
        messages={allMessages[activeLocale]}
        // Suppress timezone warnings for static content
        timeZone="America/Bogota"
      >
        {children}
      </NextIntlClientProvider>
    </LocaleContext.Provider>
  )
}
