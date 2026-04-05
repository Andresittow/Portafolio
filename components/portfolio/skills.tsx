"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Zap } from "lucide-react"
import { useTranslations } from "next-intl"
import { RevealText } from "@/components/ui/reveal-text"
import { StaggerContainer } from "@/components/ui/stagger-container"
import { StaggerItem } from "@/components/ui/stagger-item"

const skillsData = [
  {
    name: "Java",
    level: 80,
    category: "backend",
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-500/10",
    textColor: "text-orange-600",
    icon: (
      <svg viewBox="0 0 128 128" className="w-10 h-10">
        <path fill="#0074BD" d="M47.617 98.12s-4.767 2.774 3.397 3.71c9.892 1.13 14.947.968 25.845-1.092 0 0 2.871 1.795 6.873 3.351-24.439 10.47-55.308-.607-36.115-5.969zM44.629 84.455s-5.348 3.959 2.823 4.805c10.567 1.091 18.91 1.18 33.354-1.6 0 0 1.993 2.025 5.132 3.131-29.542 8.64-62.446.68-41.309-6.336z"/>
        <path fill="#EA2D2E" d="M69.802 61.271c6.025 6.935-1.58 13.17-1.58 13.17s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.792 15.635-29.58 0 .001-42.731 10.67-22.324 34.187z"/>
        <path fill="#0074BD" d="M102.123 108.229s3.529 2.91-3.888 5.159c-14.102 4.272-58.706 5.56-71.094.171-4.451-1.938 3.899-4.625 6.526-5.192 2.739-.593 4.303-.485 4.303-.485-4.953-3.487-32.013 6.85-13.743 9.815 49.821 8.076 90.817-3.637 77.896-9.468zM49.912 70.294s-22.686 5.389-8.033 7.348c6.188.828 18.518.638 30.011-.326 9.39-.789 18.813-2.474 18.813-2.474s-3.308 1.419-5.704 3.053c-23.042 6.061-67.544 3.238-54.731-2.958 10.832-5.239 19.644-4.643 19.644-4.643zM90.609 93.041c23.421-12.167 12.591-23.86 5.032-22.285-1.848.385-2.677.72-2.677.72s.688-1.079 2-1.543c14.953-5.255 26.451 15.503-4.823 23.725 0-.002.359-.327.468-.617z"/>
        <path fill="#EA2D2E" d="M76.491 1.587s12.968 12.976-12.303 32.923c-20.266 16.006-4.621 25.13-.007 35.559-11.831-10.673-20.509-20.07-14.688-28.815C58.041 28.42 81.722 22.195 76.491 1.587z"/>
        <path fill="#0074BD" d="M52.214 126.021c22.476 1.437 57-.8 57.817-11.436 0 0-1.571 4.032-18.577 7.231-19.186 3.612-42.854 3.191-56.887.874 0 .001 2.875 2.381 17.647 3.331z"/>
      </svg>
    ),
  },
  {
    name: "Python",
    level: 70,
    category: "backend",
    color: "from-yellow-400 to-blue-500",
    bgColor: "bg-blue-500/10",
    textColor: "text-blue-600",
    icon: (
      <svg viewBox="0 0 128 128" className="w-10 h-10">
        <linearGradient id="python-a" x1="70.252" x2="170.659" y1="1237.476" y2="1151.089" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#5A9FD4"/><stop offset="1" stopColor="#306998"/></linearGradient>
        <linearGradient id="python-b" x1="209.474" x2="173.62" y1="1098.811" y2="1149.537" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#FFD43B"/><stop offset="1" stopColor="#FFE873"/></linearGradient>
        <path fill="url(#python-a)" d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z"/>
        <path fill="url(#python-b)" d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zM77.809 87.927c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z"/>
      </svg>
    ),
  },
  {
    name: "HTML5",
    level: 75,
    category: "frontend",
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-500/10",
    textColor: "text-orange-600",
    icon: (
      <svg viewBox="0 0 128 128" className="w-10 h-10">
        <path fill="#E44D26" d="M19.037 113.876L9.032 1.661h109.936l-10.016 112.198-45.019 12.48z"/>
        <path fill="#F16529" d="M64 116.8l36.378-10.086 8.559-95.878H64z"/>
        <path fill="#EBEBEB" d="M64 52.455H45.788L44.53 38.361H64V24.599H29.489l.33 3.692 3.382 37.927H64zM64 88.198l-.061.017-15.327-4.14-.979-10.975H33.816l1.928 21.609 28.193 7.826.063-.017z"/>
        <path fill="#fff" d="M63.952 52.455v13.763h16.947l-1.597 17.849-15.35 4.143v14.319l28.215-7.82.207-2.325 3.234-36.233.335-3.696h-3.708zM63.952 24.599v13.762h32.432l.269-3.045.63-6.943.329-3.774z"/>
      </svg>
    ),
  },
  {
    name: "CSS3",
    level: 70,
    category: "frontend",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-500/10",
    textColor: "text-blue-600",
    icon: (
      <svg viewBox="0 0 128 128" className="w-10 h-10">
        <path fill="#1572B6" d="M18.814 114.123L8.76 1.352h110.48l-10.064 112.754-45.243 12.543z"/>
        <path fill="#33A9DC" d="M64.001 117.062l36.559-10.136 8.601-96.354h-45.16z"/>
        <path fill="#fff" d="M64.001 51.429h18.302l1.264-14.163H64.001V23.435h34.682l-.332 3.711-3.4 38.114h-30.95z"/>
        <path fill="#EBEBEB" d="M64.083 87.349l-.061.018-15.403-4.159-.985-11.031H33.752l1.937 21.717 28.331 7.863.063-.018z"/>
        <path fill="#fff" d="M81.127 64.675l-1.666 18.522-15.426 4.164v14.39l28.354-7.858.208-2.337 2.406-26.881z"/>
        <path fill="#EBEBEB" d="M64.048 23.435v13.831H30.64l-.277-3.108-.63-7.012-.331-3.711zM64.001 51.431v13.831H48.702l-.277-3.108-.631-7.012-.33-3.711z"/>
      </svg>
    ),
  },
  {
    name: "Tailwind CSS",
    level: 60,
    category: "frontend",
    color: "from-cyan-400 to-cyan-600",
    bgColor: "bg-cyan-500/10",
    textColor: "text-cyan-600",
    icon: (
      <svg viewBox="0 0 128 128" className="w-10 h-10">
        <path fill="#38bdf8" d="M64.004 25.602c-17.067 0-27.73 8.53-32 25.597 6.398-8.531 13.867-11.73 22.398-9.597 4.871 1.214 8.352 4.746 12.207 8.66C72.883 56.629 80.145 64 96.004 64c17.066 0 27.73-8.531 32-25.602-6.399 8.536-13.867 11.735-22.399 9.602-4.87-1.215-8.347-4.746-12.207-8.66-6.27-6.367-13.53-13.738-29.394-13.738zM32.004 64c-17.066 0-27.73 8.531-32 25.602C6.402 81.066 13.87 77.867 22.402 80c4.871 1.215 8.352 4.746 12.207 8.66 6.274 6.367 13.536 13.738 29.395 13.738 17.066 0 27.73-8.53 32-25.597-6.399 8.531-13.867 11.73-22.399 9.597-4.87-1.214-8.347-4.746-12.207-8.66C55.128 71.371 47.868 64 32.004 64zm0 0"/>
      </svg>
    ),
  },
]

export function Skills() {
  const t = useTranslations("Skills")
  const [activeCategory, setActiveCategory] = useState("all")
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  const categories = [
    { id: "all", label: t("categories.all") },
    { id: "frontend", label: t("categories.frontend") },
    { id: "backend", label: t("categories.backend") },
  ]

  const skills = skillsData.map(s => ({
    ...s,
    description: t(`descriptions.${s.name}`),
  }))

  const filteredSkills =
    activeCategory === "all"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory)

  return (
    <section id="skills" className="py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-transparent to-secondary/30" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <RevealText
            as="div"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6"
            delay={0}
          >
            <Zap size={16} />
            <span>{t("badge")}</span>
          </RevealText>
          <RevealText
            as="h2"
            className="text-4xl sm:text-5xl font-extrabold text-foreground mb-6 tracking-tight"
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

        {/* Category Filter */}
        <StaggerContainer className="flex justify-center gap-2 mb-14" delay={0.05}>
          {categories.map((category) => (
            <StaggerItem key={category.id}>
              <button
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300",
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/30"
                    : "bg-white dark:bg-card text-muted-foreground hover:text-foreground border border-border hover:border-primary/30 hover:shadow-lg"
                )}
              >
                {category.label}
              </button>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Skills Grid */}
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <StaggerItem key={skill.name}>
              <div
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
                className={cn(
                  "group relative p-7 rounded-3xl bg-white dark:bg-card border transition-all duration-500 h-full",
                  hoveredSkill === skill.name
                    ? "border-primary/30 shadow-2xl shadow-primary/10 -translate-y-2"
                    : "border-border/50 shadow-lg shadow-gray-200/50 dark:shadow-slate-900/50 hover:shadow-xl"
                )}
              >
                {/* Category Badge */}
                <div className="absolute top-5 right-5">
                  <span className={cn("px-3 py-1.5 rounded-lg text-xs font-bold", skill.bgColor, skill.textColor)}>
                    {skill.category === "frontend" ? t("categories.frontend") : t("categories.backend")}
                  </span>
                </div>

                {/* Icon & Name */}
                <div className="flex items-start gap-5 mb-5">
                  <div className={cn("p-4 rounded-2xl transition-all duration-300", skill.bgColor, "group-hover:scale-110")}>
                    {skill.icon}
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="font-bold text-xl text-foreground mb-1">{skill.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{skill.description}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground font-medium">{t("mastery")}</span>
                    <span className="text-sm font-bold text-foreground">{skill.level}%</span>
                  </div>
                  <div className="h-3 bg-secondary rounded-full overflow-hidden">
                    <div
                      className={cn("h-full rounded-full transition-all duration-700 ease-out bg-gradient-to-r", skill.color)}
                      style={{ width: hoveredSkill === skill.name ? `${skill.level}%` : "0%" }}
                    />
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-white dark:bg-card rounded-2xl border border-border/50 shadow-lg">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <p className="text-muted-foreground">
              {t("currentlyLearning")}{" "}
              <span className="text-primary font-bold">React y Next.js</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
