"use client"

import { useEffect, useState } from "react"
import { Download, Github, Linkedin, Mail, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { RevealText } from "@/components/ui/reveal-text"
import { StaggerContainer } from "@/components/ui/stagger-container"
import { StaggerItem } from "@/components/ui/stagger-item"
import { fadeUpVariants } from "@/lib/animations"

export function Hero() {
  const t = useTranslations("Hero")
  const roles = t.raw("roles") as string[]

  const [currentRole, setCurrentRole] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  // Reset typewriter when locale changes (roles array changes)
  useEffect(() => {
    setDisplayText("")
    setIsDeleting(false)
    setCurrentRole(0)
  }, [roles[0]])

  useEffect(() => {
    const role = roles[currentRole]
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < role.length) {
            setDisplayText(role.slice(0, displayText.length + 1))
          } else {
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(role.slice(0, displayText.length - 1))
          } else {
            setIsDeleting(false)
            setCurrentRole((prev) => (prev + 1) % roles.length)
          }
        }
      },
      isDeleting ? 50 : 100
    )

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentRole, roles])

  return (
    <section
      id="inicio"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24"
    >
      {/* Background Elements — hidden on mobile for perf */}
      <div className="absolute inset-0 overflow-hidden hidden sm:block" aria-hidden="true">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Subtle grid — hidden on mobile for perf */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:80px_80px] hidden sm:block" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span className="text-sm text-foreground font-semibold">
                {t("badge")}
              </span>
            </motion.div>

            {/* Heading */}
            <div className="space-y-4">
              <div className="space-y-1">
                <RevealText as="h1" className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight tracking-tight text-foreground" delay={0.05}>
                  {t("greeting")}
                </RevealText>
                <RevealText as="span" className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight tracking-tight text-gradient" delay={0.18}>
                  Andrés Chacua
                </RevealText>
              </div>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUpVariants}
                transition={{ delay: 0.4 }}
                className="h-10 sm:h-12"
              >
                <span className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground font-medium">
                  {displayText}
                  <span className="animate-pulse text-primary ml-0.5">|</span>
                </span>
              </motion.div>
            </div>

            {/* Description */}
            <RevealText as="p" className="text-base sm:text-xl text-muted-foreground max-w-lg leading-relaxed" delay={0.1}>
              {t("descriptionPre")}{" "}
              <span className="text-foreground font-semibold">
                {t("university")}
              </span>
              {t("descriptionPost")}
            </RevealText>

            {/* Buttons */}
            <StaggerContainer className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4" delay={0.2}>
              <StaggerItem>
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 sm:gap-3 px-5 py-3 sm:px-7 sm:py-4 bg-gradient-to-r from-primary to-accent text-white rounded-2xl font-bold hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                >
                  <Sparkles size={20} />
                  {t("cta")}
                </a>
              </StaggerItem>
              <StaggerItem>
                <a
                  href="/CV_Andres_Chacua.pdf"
                  download="CV_Andres_Chacua.pdf"
                  className="inline-flex items-center gap-2 sm:gap-3 px-5 py-3 sm:px-7 sm:py-4 bg-white dark:bg-card text-foreground rounded-2xl font-bold border-2 border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                >
                  <Download size={20} />
                  {t("cvDownload")}
                </a>
              </StaggerItem>
            </StaggerContainer>

            {/* Social Links */}
            <StaggerContainer className="flex items-center justify-center lg:justify-start gap-5 pt-4" delay={0.3}>
              <StaggerItem>
                <span className="text-sm text-muted-foreground font-medium">{t("followLabel")}</span>
              </StaggerItem>
              <div className="flex items-center gap-2">
                {[
                  { icon: Github, href: "https://github.com/Andresittow", label: "GitHub" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/edison-chacua1313/", label: "LinkedIn" },
                  { icon: Mail, href: "mailto:andreschacua24@gmail.com", label: "Email" },
                ].map((social) => (
                  <StaggerItem key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl bg-white dark:bg-card border border-border hover:border-primary/30 hover:bg-primary/5 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                      aria-label={social.label}
                    >
                      <social.icon size={20} className="text-foreground" />
                    </a>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          </div>

          {/* Right Content - Modern Avatar */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative flex justify-center lg:justify-end mt-6 lg:mt-0"
          >
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -inset-4 sm:-inset-8 bg-gradient-to-r from-primary/10 sm:from-primary/20 to-accent/10 sm:to-accent/20 rounded-full blur-xl sm:blur-2xl animate-pulse transition-all" />

              {/* Main avatar container */}
              <div className="relative w-60 h-60 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-[3rem] rotate-6 opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-[3rem] -rotate-6 opacity-10" />
                <div className="relative h-full bg-white dark:bg-card rounded-[3rem] shadow-sm shadow-primary/5 flex items-center justify-center overflow-hidden border border-border/50">
                  <Image
                    src="/foto.jpeg"
                    alt="Foto de perfil de Andrés Chacua"
                    fill
                    priority
                    sizes="(max-width: 640px) 240px, (max-width: 1024px) 320px, 384px"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-2 right-2 sm:-top-4 sm:-right-4 px-3 py-1.5 sm:px-5 sm:py-2.5 bg-white dark:bg-card rounded-2xl shadow-sm shadow-primary/5 border border-border/50 animate-bounce">
                <span className="text-xs sm:text-sm font-bold text-foreground">Java</span>
              </div>
              <div className="absolute -bottom-2 left-2 sm:-bottom-4 sm:-left-4 px-3 py-1.5 sm:px-5 sm:py-2.5 bg-white dark:bg-card rounded-2xl shadow-sm shadow-primary/5 border border-border/50 animate-bounce" style={{ animationDelay: "150ms" }}>
                <span className="text-xs sm:text-sm font-bold text-foreground">Python</span>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 right-1 sm:-right-8 px-3 py-1.5 sm:px-5 sm:py-2.5 bg-gradient-to-r from-primary to-accent text-white rounded-2xl shadow-sm shadow-primary/10 animate-bounce" style={{ animationDelay: "300ms" }}>
                <span className="text-xs sm:text-sm font-bold">Tailwind</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2">
          <span className="text-sm text-muted-foreground font-medium">Scroll</span>
          <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex justify-center pt-2 gap-4">
            <div className="w-1.5 h-3 rounded-full bg-primary animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  )
}
