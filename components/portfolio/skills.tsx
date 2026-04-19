"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Zap, Database, Leaf, Brain, Layers } from "lucide-react"
import { useTranslations } from "next-intl"
import { RevealText } from "@/components/ui/reveal-text"
import { StaggerContainer } from "@/components/ui/stagger-container"
import { StaggerItem } from "@/components/ui/stagger-item"

const skillsData = [
  {
    name: "Java",
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
    name: "Next.js",
    category: "frontend",
    color: "from-gray-700 to-black dark:from-gray-300 dark:to-white",
    bgColor: "bg-gray-500/10",
    textColor: "text-foreground",
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10 text-foreground fill-current">
        <path d="M9.145 18.29c-2.264-1.39-3.64-3.896-3.64-6.67 0-4.227 3.428-7.656 7.655-7.656 4.228 0 7.656 3.429 7.656 7.656 0 4.228-3.428 7.656-7.656 7.656a7.64 7.64 0 0 1-4.015-1.127L12.59 20h.01a11.956 11.956 0 0 0 4.094-11.666c-1.31-5.696-6.3-9.52-12.16-9.308-5.748.209-10.457 4.912-10.669 10.662-.16 4.382 2.146 8.358 6.002 10.373l1.282-1.771z" opacity=".2"/>
        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm-1.866 16.273h-1.378V8.411h1.492l5.594 7.643V8.411h1.38v7.862h-1.283l-5.805-7.925v7.925z"/>
      </svg>
    )
  },
  {
    name: "Spring Boot",
    category: "backend",
    color: "from-green-500 to-green-700",
    bgColor: "bg-green-500/10",
    textColor: "text-green-600",
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="#6DB33F">
        <path d="M12.01 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm0 2.228a9.771 9.771 0 1 1 0 19.542 9.771 9.771 0 0 1 0-19.542zm4.35 12.399c-1.077 0-1.897-.333-2.457-.999-.545-.632-.821-1.464-.821-2.493V9.756h-1.638s.114 1.564.114 1.932v2.535c0 1.25.32 2.215.962 2.893.642.677 1.493 1.018 2.553 1.018.525 0 1.026-.065 1.5-.195v-1.6c-.322.091-.655.138-1.002.138zm-8.882-6.52c-.417.808-.626 1.765-.626 2.871 0 1.391.314 2.476.942 3.256.627.784 1.488 1.173 2.584 1.173a3.526 3.526 0 0 0 1.802-.533 3.655 3.655 0 0 0 1.341-1.3c.319-.53.479-1.037.479-1.517 0-.756-.252-1.36-.757-1.815-.505-.455-1.281-.84-2.327-1.156-1.04-.3-1.666-.582-1.878-.85a1.055 1.055 0 0 1-.228-.686c0-.494.17-.852.511-1.073.342-.224.786-.335 1.332-.335.533 0 .991.104 1.373.313.38.208.625.433.729.673H9.72c-.22-.387-.565-.688-1.037-.9A3.87 3.87 0 0 0 7.025 5.922c-.66 0-1.196.155-1.603.465-.407.31-.611.758-.611 1.34 0 .546.223 1.001.667 1.365.445.364 1.189.702 2.235 1.019 1.433.435 2.378.96 2.837 1.576.459.614.688 1.311.688 2.09a2.536 2.536 0 0 1-.586 1.63c-.391.468-.916.827-1.576 1.076a5.539 5.539 0 0 1-2.029.355c-1.139 0-2.062-.257-2.766-.772-.703-.513-1.132-1.21-1.286-2.09l1.637-.202a1.804 1.804 0 0 0 .762 1.337c.456.302 1.035.452 1.737.452.613 0 1.107-.133 1.488-.398.384-.263.576-.622.576-1.073 0-.455-.224-.816-.671-1.082-.445-.26-1.144-.555-2.094-.881-1.229-.426-2.05-.89-2.464-1.39A2.96 2.96 0 0 1 7.478 8.107z"/>
      </svg>
    )
  },
  {
    name: "MySQL",
    category: "backend",
    color: "from-blue-500 to-blue-700",
    bgColor: "bg-blue-500/10",
    textColor: "text-blue-600",
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="#4479A1">
        <path d="M12.923 20.254c-.168-.113-.377-.184-.523-.082-.323.23-1.012.78-1.536 1.488-1.583.568-1.93-1.084-2.673-1.347-3.953-.615-5.32 1.252-5.46 1.572-.352.827-.123 1.932 1.295 4.542 0 0 1.934 3.753 5.485 5.503 2.146 1.056 4.398 1.559 6.814 1.76.126.012.245.02.355.022.083.003.167.004.252.004 2.871 0 5.46-.714 7.625-2.096v-5.6191c0-1.89-1.986-1.57-2.668-1.359-1.096.34-1.748.784-2.031 1.026a1.218 1.218 0 0 0-.256.32c-.087.165-.12.436-.089.849.034.455.51 1.107 1.436 1.472a1.002 1.002 0 0 0 .584.062c-.105-.083-.16-.24-.132-.435.035-.253.279-.533.684-.663v-.001a1.21 1.21 0 0 1 .536-.033c.31.066.452.261.432.484-.044.492-.562 1.009-1.306 1.139-.24.041-.497.03-.787-.015-1.583-.243-2.686-1.258-2.905-2.158-.17-.698.053-1.346.241-1.704.288-.548 1.226-1.42 3.014-1.942.36-.104.99-.214 1.794-.214.393 0 .809.032 1.221.09V6.019a27.697 27.697 0 0 0-4.305-.339c-.588 0-1.155.026-1.718.067-.354.025-.693.06-1.025.1-4.839.544-9.355 2.1-13.435 4.606v4.618c.843-.728 2.05-1.298 3.525-1.298.544 0 1.154.093 1.802.264.444.116 1.34.407 1.696.862zm-6.264-10.43c4.004-3.565 6.27-5.908 6.486-6.155a5.576 5.576 0 0 1 .425-.436.42.42 0 0 1 .059-.04 1.082 1.082 0 0 1 .28-.15c.197-.047.533-.064 1.037.235.39.231.547.466.621.611a1.328 1.328 0 0 1 .158.463c.046.299-.02.766-.511 1.61-.177.306-1.127 1.83-2.88 4.542l.666.302c2.095-3.323 3.323-5.26 3.54-5.603.491-.78 1.05-1.575 1.571-1.575.253 0 .47.085.642.235.297.262.392.659.395 1.01.004.4-.11.836-.264 1.258-2.617 7.218-3.082 8.358-3.13 8.358-.093 0-.083.567-.091 1.025-.01.542-.023 1.036-.046 1.144-.029.13-.23.111-.318.106-2.584-.146-5.83-.092-9.256-4.992zC5.811 10.957 3.3 8.1 3.3 4.316V2.62s.06 0 .092-.01l.732.186c.07.037.195.127.3.36.14.306.184.815.143 1.378-.145 2.015-1.282 3.867-1.488 4.2-2.316 3.738-3.167 6.353-3.081 8.21.085 1.854.891 3.23 2.158 4.143 1.833 1.322 4.321 1.004 5.378.799a3.81 3.81 0 0 0 .584-2.128c.004-1.92-2.34-1.95-2.806-1.942-1.905-.038-2.923 1.066-2.981 1.144-.035-.045.093-.207.243-.464.444-.755 1.365-2.32 3.197-2.32.766 0 1.272.23 1.548.434-.14-.028-.276-.041-.399-.041-.652 0-1.127.53-1.127 1.01 0 .285.12.56.326.792.204.23.498.397.838.484zm8.6-8.995s3.235 3.013 7.842-1.503c.536-.525.86-.98 1.02-1.24.167-.272.261-.592.268-1.021.005-.382-.075-.68-.198-.901-.32-.577-.962-.898-1.556-.898-.671 0-1.455.437-2.029 1.045-.259.274-1.898 2.094-5.347 4.518"/>
      </svg>
    )
  },
  {
    name: "MongoDB",
    category: "backend",
    color: "from-green-600 to-green-800",
    bgColor: "bg-green-600/10",
    textColor: "text-green-700",
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="#47A248">
        <path d="M12.247 24c0 0 2.29-6.42.063-12.72L10.374 9.1v-2l1.936-2.176s2.592-3.235 2.592-4.143v-.921s-.31.393-2.103 1.9c0 0-3.14-1.066-5.012 3.109C5.908 9.07 5.093 17.5 11.458 20.306c.465.205 1.554.49 1.056-.47-.481-.977-1.127-2.316-1.127-2.316s-2.046.22-3.488-2.616c-.022 1.403 1.144 3.766 2.721 3.535 0 0 .5-.05.59-.115L12.246 24V24z"/>
      </svg>
    )
  },
  {
    name: "Manejo de IA en proyectos",
    category: "backend",
    color: "from-purple-500 to-purple-700",
    bgColor: "bg-purple-500/10",
    textColor: "text-purple-600",
    icon: (
      <svg viewBox="0 0 128 128" className="w-10 h-10">
        <path fill="currentColor" d="M64 12c-28.7 0-52 23.3-52 52s23.3 52 52 52 52-23.3 52-52-23.3-52-52-52zm0 100c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm0-76c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 24c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 24c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm-24-12c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm48 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm-24 0c4.4 0 8-3.6 8-8s-3.6-8-8-8-8 3.6-8 8 3.6 8 8 8z" />
      </svg>
    )
  },
  {
    name: "Tailwind CSS",
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
    description: t(`descriptions.${s.name.replace(/\./g, '')}`),
  }))

  const filteredSkills =
    activeCategory === "all"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory)

  return (
    <section id="skills" className="py-16 sm:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-transparent to-secondary/30" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
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
                  </div>
                  <div className="h-3 bg-secondary rounded-full overflow-hidden">
                    <div
                      className={cn("h-full rounded-full transition-all duration-700 ease-out bg-gradient-to-r", skill.color)}
                      style={{ width: hoveredSkill === skill.name ? `100%` : "0%" }}
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
