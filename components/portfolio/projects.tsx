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
    title: "FreshCut",
    tags: ["Spring Boot", "TypeScript", "AI"],
    github: "https://github.com/freshcutm/freshCut-Frontend.git",
    demo: "https://fresh-cut-frontend.vercel.app",
    color: "from-blue-500 to-cyan-400",
    shadowColor: "shadow-blue-500/20",
    image: "/FreshCut.png"
  },
  {
    id: 2,
    title: "DevConnect Hub",
    tags: ["Python", "HTML", "CSS"],
    github: "https://github.com/Andréschacua/devconnect",
    demo: "https://devconnect-demo.vercel.app",
    color: "from-violet-500 to-purple-400",
    shadowColor: "shadow-violet-500/20",
  },
  {
    id: 3,
    title: "EcoMarket Place",
    tags: ["HTML", "CSS", "Tailwind"],
    github: "https://github.com/Andréschacua/ecomarket",
    demo: "https://ecomarket-demo.vercel.app",
    color: "from-emerald-500 to-teal-400",
    shadowColor: "shadow-emerald-500/20",
  },
  {
    id: 4,
    title: "TaskFlow AI",
    tags: ["Java", "Python", "HTML"],
    github: "https://github.com/Andréschacua/taskflow",
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

        {/* Projects Grid */}
        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project) => (
            <StaggerItem key={project.id}>
              <div
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative flex flex-col h-full bg-white dark:bg-card border border-border/50 rounded-[2.5rem] overflow-hidden hover:border-primary/50 transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20"
              >
                {/* Top Section - Decorative Mesh/Gradient Background */}
                <div className="relative h-64 w-full overflow-hidden bg-secondary dark:bg-muted/50 p-8 flex flex-col justify-between">
                  {/* Project Image Background */}
                  {(project as any).image && (
                    <img 
                      src={(project as any).image} 
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                  )}
                  {/* Base Gradient Layer */}
                  <div className={cn(
                    "absolute inset-0 transition-opacity duration-700 bg-gradient-to-br",
                    (project as any).image ? "mix-blend-overlay opacity-60 dark:opacity-40 group-hover:opacity-40" : "mix-blend-overlay opacity-80 group-hover:opacity-100",
                    project.color
                  )} />
                  {/* Overlay for text readability if image exists */}
                  {(project as any).image && (
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-700" />
                  )}
                  
                  {/* Animated Blurs for Premium Feel */}
                  <div className={cn("absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000 ease-out", (project as any).image ? "bg-white/10" : "bg-white/20 dark:bg-white/10")} />
                  <div className={cn("absolute bottom-0 left-0 w-48 h-48 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 group-hover:scale-150 transition-transform duration-1000 ease-out delay-100", (project as any).image ? "bg-black/40" : "bg-black/10 dark:bg-black/20")} />

                  {/* Floating ID & Sparkles */}
                  <div className="relative flex justify-between items-start z-10 w-full">
                    <span className="text-7xl font-black text-white/30 tracking-tighter select-none group-hover:scale-110 transition-transform duration-500 origin-top-left">
                      0{project.id}
                    </span>
                    <div className={cn(
                      "w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-xl transition-all duration-700",
                      hoveredId === project.id ? "rotate-12 scale-110 bg-white/30" : ""
                    )}>
                      <Sparkles className="text-white" size={26} />
                    </div>
                  </div>

                  {/* Tags Overlapping Content */}
                  <div className="relative z-10 flex flex-wrap gap-2 mt-auto translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-sm text-xs font-bold tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Section - Content */}
                <div className="relative flex-1 p-8 flex flex-col justify-between bg-white dark:bg-card">
                  <div>
                    <h3 className="text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-8">
                      {project.description}
                    </p>
                  </div>

                  {/* Call to Actions */}
                  <div className="flex items-center gap-4 mt-auto pt-6 border-t border-border/50">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 rounded-2xl bg-secondary text-foreground hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/20"
                      aria-label="View GitHub"
                    >
                      <Github size={24} />
                    </a>

                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "group/btn flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-2xl text-white font-bold text-sm sm:text-base transition-all duration-300 hover:scale-[1.02] hover:shadow-xl bg-gradient-to-r",
                        project.color,
                        project.shadowColor
                      )}
                    >
                      <span>{t("demoButton")}</span>
                      <ExternalLink size={20} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </a>
                  </div>
                </div>

                {/* Outer Glow on Hover */}
                <div
                  className={cn("absolute inset-0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay bg-gradient-to-br", project.color)}
                  style={{ opacity: hoveredId === project.id ? 0.05 : 0 }}
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
