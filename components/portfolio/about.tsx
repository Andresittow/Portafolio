"use client"

import { Code2, GraduationCap, Heart, Lightbulb, User } from "lucide-react"
import { useTranslations } from "next-intl"
import { RevealText } from "@/components/ui/reveal-text"
import { StaggerContainer } from "@/components/ui/stagger-container"
import { StaggerItem } from "@/components/ui/stagger-item"

const highlightIcons = [GraduationCap, Code2, Lightbulb, Heart]

const stats = [
  { value: "5+", key: "projects" },
  { value: "2+", key: "years" },
  { value: "5",  key: "technologies" },
  { value: "100%", key: "dedication" },
]

export function About() {
  const t = useTranslations("About")
  const highlights = t.raw("highlights") as Array<{ title: string; description: string }>

  return (
    <section id="about" className="py-16 sm:py-28 relative overflow-hidden">
      {/* Background decorations */}
      <div className="hidden md:block absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="hidden md:block absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-20">
          <RevealText
            as="div"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6"
            delay={0}
          >
            <User size={16} />
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

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Visual Element */}
          <div className="relative h-full flex items-center">
            <div className="relative w-full max-w-2xl mx-auto lg:mx-0">
              {/* Background shapes */}
              <div className="absolute inset-0 sm:-inset-6 bg-gradient-to-br from-primary/10 sm:from-primary/20 to-accent/10 sm:to-accent/20 rounded-[2.5rem] rotate-1 sm:rotate-2 blur-sm sm:blur-lg opacity-30 sm:opacity-30 transition-all" />
              <div className="absolute inset-0 sm:-inset-6 bg-gradient-to-br from-accent/10 sm:from-accent/20 to-primary/10 sm:to-primary/20 rounded-[2.5rem] -rotate-1 sm:-rotate-2 blur-sm sm:blur-lg opacity-30 sm:opacity-30 transition-all" />
              
              {/* Main card */}
              <div className="relative bg-white dark:bg-card rounded-[2.5rem] p-8 sm:p-12 shadow-sm shadow-primary/5 border border-border/50 w-full">
                {/* Stats Grid */}
                <StaggerContainer className="grid grid-cols-2 gap-4 mb-6">
                  {stats.map((stat, index) => (
                    <StaggerItem key={index}>
                      <div className="text-center p-5 rounded-2xl bg-gradient-to-br from-secondary dark:from-secondary/70/50 to-transparent hover:from-primary/10 hover:to-transparent transition-all duration-300 group">
                        <div className="text-4xl font-black text-gradient group-hover:scale-110 transition-transform duration-300">{stat.value}</div>
                        <div className="text-sm text-muted-foreground font-medium mt-1">{t(`stats.${stat.key}`)}</div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>

                {/* Quote */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/10">
                  <p className="text-base italic text-foreground leading-relaxed">
                    &quot;{t("quote")}&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-8">
            <div className="space-y-6 text-justify">
              <RevealText as="p" className="text-xl text-muted-foreground leading-relaxed" delay={0}>
                {t("p1Pre")} <span className="text-foreground font-bold">{t("p1Name")}</span>
                {t("p1Mid")}{" "}
                <span className="text-primary font-semibold">{t("p1Uni")}</span>
                {t("p1Post")}
              </RevealText>
              <RevealText as="p" className="text-lg text-muted-foreground leading-relaxed" delay={0.1}>
                {t("p2")}
              </RevealText>
              <RevealText as="p" className="text-lg text-muted-foreground leading-relaxed" delay={0.2}>
                {t("p3")}
              </RevealText>
            </div>

            {/* Highlights */}
            <StaggerContainer className="grid sm:grid-cols-2 gap-4">
              {highlights.map((item, index) => {
                const Icon = highlightIcons[index]
                return (
                  <StaggerItem key={index}>
                    <div className="group p-5 rounded-2xl bg-white dark:bg-card border border-border/50 hover:border-primary/30 hover:shadow-sm hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 h-full">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary group-hover:from-primary group-hover:to-accent group-hover:text-white transition-all duration-300">
                          <Icon size={22} />
                        </div>
                        <div>
                          <h3 className="font-bold text-foreground">{item.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                )
              })}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  )
}
