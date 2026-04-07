"use client"

import { useState } from "react"
import { ExternalLink, Github, ArrowUpRight, Layers, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
import { RevealText } from "@/components/ui/reveal-text"
import { StaggerContainer } from "@/components/ui/stagger-container"
import { StaggerItem } from "@/components/ui/stagger-item"

const projectsData = [
  {
    id: 1,
    title: "FinTrack Pro",
    tags: ["Java", "Python", "Tailwind"],
    github: "https://github.com/andreschacua/fintrack",
    demo: "https://fintrack-demo.vercel.app",
    color: "from-blue-500 to-cyan-400",
    shadowColor: "shadow-blue-500/20",
  },
  {
    id: 2,
    title: "DevConnect Hub",
    tags: ["Python", "HTML", "CSS"],
    github: "https://github.com/andreschacua/devconnect",
    demo: "https://devconnect-demo.vercel.app",
    color: "from-violet-500 to-purple-400",
    shadowColor: "shadow-violet-500/20",
  },
  {
    id: 3,
    title: "EcoMarket Place",
    tags: ["HTML", "CSS", "Tailwind"],
    github: "https://github.com/andreschacua/ecomarket",
    demo: "https://ecomarket-demo.vercel.app",
    color: "from-emerald-500 to-teal-400",
    shadowColor: "shadow-emerald-500/20",
  },
  {
    id: 4,
    title: "TaskFlow AI",
    tags: ["Java", "Python", "HTML"],
    github: "https://github.com/andreschacua/taskflow",
    demo: "https://taskflow-demo.vercel.app",
    color: "from-orange-500 to-amber-400",
    shadowColor: "shadow-orange-500/20",
  },
]

export function Projects() {
  const t = useTranslations("Projects")
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const projects = projectsData.map(p => ({
    ...p,
    description: t(`descriptions.${p.title}`),
  }))

  return (
    <section id="projects" className="py-16 sm:py-28 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-20">
          <RevealText
            as="div"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6"
            delay={0}
          >
            <Layers size={16} />
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
            className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed"
            delay={0.2}
          >
            {t("sub")}
          </RevealText>
        </div>

        {/* Projects Grid - Bento Style */}
        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <StaggerItem key={project.id}>
              <div
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={cn(
                  "group relative bg-white dark:bg-card rounded-3xl overflow-hidden transition-all duration-500 h-full flex flex-col",
                  "border border-border/50 hover:border-transparent",
                  "float-shadow card-hover",
                  index === 0 && "lg:row-span-2"
                )}
              >
                {/* Gradient Header */}
                <div className={cn(
                  "relative bg-gradient-to-br p-8 flex flex-col justify-between overflow-hidden flex-1",
                  project.color,
                  index === 0 ? "h-64 lg:h-auto" : "h-48 lg:h-56"
                )}>
                  {/* Animated circles */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
                  <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700 delay-100" />
                  
                  {/* Project number */}
                  <div className="relative">
                    <span className="text-white/30 text-7xl font-black">0{project.id}</span>
                  </div>

                  {/* Floating icon */}
                  <div className={cn(
                    "absolute top-8 right-8 w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-500",
                    hoveredId === project.id && "scale-110 bg-white/30"
                  )}>
                    <Sparkles className="text-white" size={24} />
                  </div>

                  {/* Tags */}
                  <div className="relative flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Action buttons */}
                  <div className="flex items-center gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-secondary text-foreground font-medium text-sm hover:bg-secondary/80 transition-all duration-300 hover:scale-105"
                    >
                      <Github size={18} />
                      {t("codeButton")}
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r text-white font-medium text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg",
                        project.color,
                        project.shadowColor
                      )}
                    >
                      <ExternalLink size={18} />
                      {t("demoButton")}
                      <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </div>

                {/* Hover glow effect */}
                <div
                  className={cn("absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none", "bg-gradient-to-br", project.color)}
                  style={{ opacity: hoveredId === project.id ? 0.03 : 0 }}
                />
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* View More CTA */}
        <div className="text-center mt-16">
          <a
            href="https://github.com/Andresittow"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-2xl font-semibold hover:bg-foreground/90 transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <Github size={20} />
            {t("viewAll")}
            <ArrowUpRight size={22} />
          </a>
        </div>
      </div>
    </section>
  )
}
