"use client"

import { ArrowUp, Github, Linkedin, Twitter, Mail, Heart, X } from "lucide-react"
import { useTranslations } from "next-intl"
import { StaggerContainer } from "@/components/ui/stagger-container"
import { StaggerItem } from "@/components/ui/stagger-item"

const socialLinks = [
  { icon: Github, href: "https://github.com/Andresittow", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/aAndrésitohh", label: "LinkedIn" },
  { icon: X, href: "https://twitter.com/aandresitohh", label: "Twitter" },
  { icon: Mail, href: "mailto:andreschacua24@gmail.com", label: "Email" },
]

export function Footer() {
  const t = useTranslations("Footer")

  const footerLinks = {
    navigation: [
      { label: t("nav.inicio"), href: "#inicio" },
      { label: t("nav.about"), href: "#about" },
      { label: t("nav.skills"), href: "#skills" },
      { label: t("nav.projects"), href: "#projects" },
    ],
    more: [
      { label: t("more.experience"), href: "#experience" },
      { label: t("more.testimonials"), href: "#testimonials" },
      { label: t("more.contact"), href: "#contact" },
    ],
  }

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-gradient-to-b from-background to-secondary/30">
      {/* Decorative top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#inicio" className="inline-flex items-center gap-4 mb-6 group">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-105 transition-transform">
                <img src="/icon.jpg" alt="Icon" className="w-full h-full rounded-2xl" />
              </div>
              <div>
                <span className="font-bold text-xl text-foreground block">Andrés Chacua</span>
                <span className="text-sm text-muted-foreground">{t("roleLabel")}</span>
              </div>
            </a>
            {/* Social Links */}
            <StaggerContainer className="flex gap-3" amount={0.05}>
              {socialLinks.map((social) => (
                <StaggerItem key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-white dark:bg-card border border-border hover:border-primary/30 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </a>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-bold text-foreground mb-5">{t("navTitle")}</h3>
            <StaggerContainer className="space-y-3" amount={0.05}>
              {footerLinks.navigation.map((link) => (
                <StaggerItem key={link.href}>
                  <a href={link.href} className="text-muted-foreground hover:text-primary transition-colors font-medium block">
                    {link.label}
                  </a>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* More Links */}
          <div>
            <h3 className="font-bold text-foreground mb-5">{t("moreTitle")}</h3>
            <StaggerContainer className="space-y-3" amount={0.05}>
              {footerLinks.more.map((link) => (
                <StaggerItem key={link.href}>
                  <a href={link.href} className="text-muted-foreground hover:text-primary transition-colors font-medium block">
                    {link.label}
                  </a>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              © {currentYear} Andrés Chacua. {t("copyright")}{" "}
              <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" /> {t("copyrightPost")}
            </p>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              {t("backToTop")}
              <span className="w-10 h-10 rounded-xl bg-white dark:bg-card border border-border group-hover:border-primary/30 group-hover:bg-primary group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                <ArrowUp size={18} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
