"use client"

import { useState, useEffect } from "react"
import { Menu, X, Sun, Moon, Globe } from "lucide-react"
import { useTheme } from "next-themes"
import { useTranslations } from "next-intl"
import { useLocale } from "@/components/locale-provider"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("inicio")
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const { locale, setLocale } = useLocale()
  const t = useTranslations("Navbar")

  const navLinks = [
    { href: "#inicio",      label: t("inicio") },
    { href: "#about",       label: t("about") },
    { href: "#skills",      label: t("skills") },
    { href: "#projects",    label: t("projects") },
    { href: "#experience",  label: t("experience") },
    { href: "#testimonials",label: t("testimonials") },
  ]

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = navLinks.map(link => link.href.replace("#", ""))
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [navLinks])

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark")
  const toggleLocale = () => setLocale(locale === "es" ? "en" : "es")
  const isDark = mounted && theme === "dark"

  return (
    <nav
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500",
        scrolled ? "w-[96%] max-w-5xl" : "w-[90%] max-w-5xl"
      )}
    >
      <div className={cn(
        "relative rounded-2xl transition-all duration-500",
        scrolled
          ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl shadow-lg shadow-primary/5 border border-border/50"
          : "bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/50 dark:border-slate-700/50"
      )}>
        <div className="px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#inicio" className="group flex items-center gap-3">
              <div className="relative">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30 group-hover:shadow-primary/50 transition-all duration-300 group-hover:scale-105">
                  <img src="/icon.jpg" alt="Logo" width={44} height={44} className="rounded-xl" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white dark:border-slate-900 animate-pulse" />
              </div>
              <div className="hidden sm:block">
                <span className="block font-bold text-foreground text-sm tracking-tight">Andres Chacua</span>
                <span className="block text-xs text-muted-foreground">Developer</span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center">
              <div className="flex items-center bg-secondary/50 rounded-xl p-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative px-2.5 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap",
                      activeSection === link.href.replace("#", "")
                        ? "text-white"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {activeSection === link.href.replace("#", "") && (
                      <span className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-lg shadow-md" />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Right side: divider + Lang + Theme + Mobile Button */}
            <div className="flex items-center gap-2">
              {/* Visual separator from nav pill (desktop only) */}
              <div className="hidden lg:block w-px h-6 bg-border/60 mx-1" />

              {/* Language Toggle */}
              <button
                onClick={toggleLocale}
                aria-label="Switch language"
                className="flex items-center gap-1.5 h-9 px-3 rounded-xl bg-secondary/50 hover:bg-secondary dark:hover:bg-slate-700 text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105"
              >
                <Globe size={15} className="shrink-0" />
                <span className="text-xs font-bold tracking-wider">
                  {mounted ? t("langSwitch") : "EN"}
                </span>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle dark mode"
                className="w-9 h-9 rounded-xl bg-secondary/50 hover:bg-secondary dark:hover:bg-slate-700 flex items-center justify-center transition-all duration-300 hover:scale-105"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mounted && (
                    <motion.span
                      key={isDark ? "moon" : "sun"}
                      initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isDark
                        ? <Sun size={17} className="text-yellow-400" />
                        : <Moon size={17} className="text-slate-600" />
                      }
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* CTA Button - desktop only */}
              <div className="hidden lg:block">
                <a
                  href="#contact"
                  className="group relative inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold text-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:scale-105"
                >
                  <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <Sparkles size={16} className="relative z-10" />
                  <span className="relative z-10">{t("cta")}</span>
                </a>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2.5 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-400",
            isOpen ? "max-h-[500px] pb-4" : "max-h-0"
          )}
        >
          <div className="px-4 pb-2 space-y-1">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300",
                  activeSection === link.href.replace("#", "")
                    ? "bg-gradient-to-r from-primary to-accent text-white shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50" />
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
