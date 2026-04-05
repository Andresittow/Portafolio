"use client"

import { useState } from "react"
import { GraduationCap, Briefcase, Calendar, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
import { RevealText } from "@/components/ui/reveal-text"
import { StaggerContainer } from "@/components/ui/stagger-container"
import { StaggerItem } from "@/components/ui/stagger-item"

type ExperienceItem = {
  title: string
  organization: string
  location: string
  period: string
  description: string
  achievements: string[]
  current?: boolean
}

const currentFlags = {
  education: [true, true, false, false],
  work: [true],
}

export function Experience() {
  const t = useTranslations("Experience")
  const [activeTab, setActiveTab] = useState<"education" | "work">("education")

  const tabs = [
    { id: "education" as const, label: t("tabs.education"), icon: GraduationCap },
    { id: "work" as const, label: t("tabs.work"), icon: Briefcase },
  ]

  const rawEducation = t.raw("education") as ExperienceItem[]
  const rawWork = t.raw("work") as ExperienceItem[]

  const experiences = {
    education: rawEducation.map((item, i) => ({ ...item, current: currentFlags.education[i] ?? false })),
    work: rawWork.map((item, i) => ({ ...item, current: currentFlags.work[i] ?? false })),
  }

  const currentExperiences = experiences[activeTab]

  return (
    <section id="experience" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <RevealText
            as="span"
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
            delay={0}
          >
            {t("badge")}
          </RevealText>
          <RevealText
            as="h2"
            className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
            delay={0.1}
          >
            {t("heading")}
          </RevealText>
          <RevealText
            as="p"
            className="text-muted-foreground max-w-2xl mx-auto"
            delay={0.2}
          >
            {t("sub")}
          </RevealText>
        </div>

        {/* Tabs */}
        <StaggerContainer className="flex justify-center gap-4 mb-12" delay={0.05}>
          {tabs.map((tab) => (
            <StaggerItem key={tab.id}>
              <button
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all",
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
              >
                <tab.icon size={20} />
                {tab.label}
              </button>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

            {/* Timeline Items */}
            <StaggerContainer key={activeTab} className="relative">
              {currentExperiences.map((item, index) => (
                <StaggerItem key={index}>
                  <div
                    className={cn(
                      "relative flex items-start mb-12 last:mb-0",
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    )}
                  >
                    {/* Timeline Dot */}
                    <div
                      className={cn(
                        "absolute left-0 md:left-1/2 w-4 h-4 rounded-full border-4 border-background md:-translate-x-1/2 z-10",
                        item.current ? "bg-primary animate-pulse" : "bg-muted-foreground/50"
                      )}
                    />

                    {/* Content */}
                    <div className={cn("ml-8 md:ml-0 md:w-1/2 p-4", index % 2 === 0 ? "md:pr-12" : "md:pl-12")}>
                      <div className={cn(
                        "p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1",
                        item.current ? "bg-primary/5 border-primary/30" : "bg-card border-border hover:border-primary/20"
                      )}>
                        {/* Header */}
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                          <div>
                            <h3 className="font-semibold text-lg text-foreground">{item.title}</h3>
                            <p className="text-primary font-medium">{item.organization}</p>
                          </div>
                          {item.current && (
                            <span className="px-2 py-1 rounded-md bg-primary/20 text-primary text-xs font-medium">
                              {t("currentBadge")}
                            </span>
                          )}
                        </div>

                        {/* Meta */}
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            {item.period}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin size={14} />
                            {item.location}
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-muted-foreground text-sm mb-4">{item.description}</p>

                        {/* Achievements */}
                        <ul className="space-y-2">
                          {item.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">{t("ctaText")}</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
          >
            {t("ctaButton")}
          </a>
        </div>
      </div>
    </section>
  )
}