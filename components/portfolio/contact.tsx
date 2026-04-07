"use client"

import { useState } from "react"
import {
  Mail, Phone, MapPin, Send, Github, Linkedin,
  CheckCircle, MessageCircle, Sparkles, X,
} from "lucide-react"
import { useTranslations } from "next-intl"
import { RevealText } from "@/components/ui/reveal-text"
import { StaggerContainer } from "@/components/ui/stagger-container"
import { StaggerItem } from "@/components/ui/stagger-item"

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/Andresittow", color: "hover:bg-gray-900 hover:text-white" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/edison-chacua1313/", color: "hover:bg-blue-600 hover:text-white" },
  { icon: X, label: "X", href: "https://x.com/aandresitohh", color: "hover:bg-sky-500 hover:text-white" },
]

export function Contact() {
  const t = useTranslations("Contact")

  const contactInfo = [
    { icon: Mail, label: "Email", value: "andreschacua24@gmail.com", href: "mailto:andreschacua24@gmail.com" },
    { icon: Phone, label: t("phoneLabel"), value: "+57 318 581 1263", href: "tel:+573185811263" },
    { icon: MapPin, label: t("locationLabel"), value: "Colombia", href: null },
  ]

  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormState({ name: "", email: "", subject: "", message: "" })
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section id="contact" className="py-16 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <RevealText
            as="div"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6"
            delay={0}
          >
            <MessageCircle size={16} />
            <span>{t("badge")}</span>
          </RevealText>
          <RevealText
            as="h2"
            className="text-4xl sm:text-5xl font-extrabold text-foreground mb-6 tracking-tight pb-2"
            delay={0.1}
          >
            {t("heading")} <span className="text-gradient">{t("headingHighlight")}</span>
          </RevealText>
          <RevealText
            as="p"
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
            delay={0.2}
          >
            {t("sub")}
          </RevealText>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Side - Info */}
          <div className="lg:col-span-5 space-y-8">
            {/* Contact Cards */}
            <StaggerContainer className="space-y-4">
              {contactInfo.map((info) => (
                <StaggerItem key={info.label}>
                  <div className="group flex items-center gap-5 p-5 rounded-2xl bg-gradient-to-r from-secondary/50 to-transparent hover:from-primary/10 hover:to-transparent transition-all duration-300">
                    <div className="w-14 h-14 rounded-2xl bg-white dark:bg-card shadow-lg shadow-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:shadow-primary/20 transition-all duration-300 shrink-0">
                      <info.icon className="text-primary" size={24} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-muted-foreground font-medium">{info.label}</p>
                      {info.href ? (
                        <a href={info.href} className="font-semibold text-foreground hover:text-primary transition-colors text-base sm:text-lg break-all">
                          {info.value}
                        </a>
                      ) : (
                        <p className="font-semibold text-foreground text-base sm:text-lg">{info.value}</p>
                      )}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Social Links */}
            <div className="pt-4">
              <RevealText as="h3" className="font-bold text-foreground mb-5 text-lg" delay={0}>
                {t("connectTitle")}
              </RevealText>
              <StaggerContainer className="flex gap-3">
                {socialLinks.map((social) => (
                  <StaggerItem key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-14 h-14 rounded-2xl bg-white dark:bg-card shadow-md flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg ${social.color}`}
                      aria-label={social.label}
                    >
                      <social.icon size={22} />
                    </a>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>

            {/* Availability Badge */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-800/30">
              <div className="flex items-center gap-3 mb-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="font-bold text-green-700 dark:text-green-400">{t("availabilityTitle")}</span>
              </div>
              <p className="text-sm text-green-600/80 dark:text-green-500/80 leading-relaxed">
                {t("availabilityDesc")}
              </p>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:col-span-7">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mb-6 shadow-lg shadow-green-500/30">
                  <CheckCircle className="text-white" size={40} />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">{t("successTitle")}</h3>
                <p className="text-muted-foreground text-lg">{t("successDesc")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-semibold text-foreground">
                      {t("nameLabel")}
                    </label>
                    <input
                      type="text" id="name" name="name"
                      value={formState.name} onChange={handleChange} required
                      className="w-full px-5 py-4 rounded-xl bg-secondary/50 border-2 border-transparent focus:border-primary focus:bg-white dark:bg-card outline-none transition-all duration-300 text-foreground placeholder:text-muted-foreground font-medium"
                      placeholder={t("namePlaceholder")}
                    />
                  </div>
                  {/* Email */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-semibold text-foreground">
                      {t("emailLabel")}
                    </label>
                    <input
                      type="email" id="email" name="email"
                      value={formState.email} onChange={handleChange} required
                      className="w-full px-5 py-4 rounded-xl bg-secondary/50 border-2 border-transparent focus:border-primary focus:bg-white dark:bg-card outline-none transition-all duration-300 text-foreground placeholder:text-muted-foreground font-medium"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-sm font-semibold text-foreground">
                    {t("subjectLabel")}
                  </label>
                  <input
                    type="text" id="subject" name="subject"
                    value={formState.subject} onChange={handleChange} required
                    className="w-full px-5 py-4 rounded-xl bg-secondary/50 border-2 border-transparent focus:border-primary focus:bg-white dark:bg-card outline-none transition-all duration-300 text-foreground placeholder:text-muted-foreground font-medium"
                    placeholder={t("subjectPlaceholder")}
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-semibold text-foreground">
                    {t("messageLabel")}
                  </label>
                  <textarea
                    id="message" name="message"
                    value={formState.message} onChange={handleChange} required rows={6}
                    className="w-full px-5 py-4 rounded-xl bg-secondary/50 border-2 border-transparent focus:border-primary focus:bg-white dark:bg-card outline-none transition-all duration-300 text-foreground placeholder:text-muted-foreground resize-none font-medium"
                    placeholder={t("messagePlaceholder")}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit" disabled={isSubmitting}
                  className="group w-full flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-[1.02]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                      {t("submitting")}
                    </>
                  ) : (
                    <>
                      <Sparkles size={22} />
                      {t("submitButton")}
                      <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
