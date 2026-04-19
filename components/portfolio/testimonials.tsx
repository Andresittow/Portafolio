"use client"

import { useState, useEffect } from "react"
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
import { RevealText } from "@/components/ui/reveal-text"
import { StaggerContainer } from "@/components/ui/stagger-container"
import { StaggerItem } from "@/components/ui/stagger-item"

type Testimonial = {
  name: string
  role: string
  company: string
  content: string
  avatar: string
}

export function Testimonials() {
  const t = useTranslations("Testimonials")
  const testimonials = t.raw("items") as Testimonial[]

  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, testimonials.length])

  const nextTestimonial = () => {
    setIsAutoPlaying(false)
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setIsAutoPlaying(false)
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8">
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

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <button
            onClick={prevTestimonial}
            className="p-3 rounded-xl bg-secondary hover:bg-primary/20 hover:text-primary transition-colors"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => { setIsAutoPlaying(false); setActiveIndex(index) }}
                className={cn(
                  "w-3 h-3 rounded-full transition-all",
                  index === activeIndex ? "bg-primary scale-125" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
              />
            ))}
          </div>

          <button
            onClick={nextTestimonial}
            className="p-3 rounded-xl bg-secondary hover:bg-primary/20 hover:text-primary transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto mt-16 md:mt-0">
          <div className="relative">
            {/* Quote Icon */}
            <div className="absolute -top-10 md:-top-16 left-1/2 md:left-8 -translate-x-1/2 md:translate-x-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center z-10 shadow-lg">
              <Quote className="text-primary" size={24} />
            </div>

            {/* Card */}
            <div className="glass rounded-3xl p-8 md:p-12">
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className="fill-primary text-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8 italic">
                &quot;{testimonials[activeIndex].content}&quot;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center text-primary-foreground font-bold text-lg">
                  {testimonials[activeIndex].avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{testimonials[activeIndex].name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonials[activeIndex].role}</p>
                  <p className="text-xs text-primary">{testimonials[activeIndex].company}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mini Testimonials */}
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16">
          {testimonials.map((testimonial, index) => (
            <StaggerItem key={index}>
              <button
                onClick={() => { setIsAutoPlaying(false); setActiveIndex(index) }}
                className={cn(
                  "p-4 rounded-xl text-left transition-all w-full h-full",
                  index === activeIndex
                    ? "bg-primary/10 border border-primary/30"
                    : "bg-card border border-border hover:border-primary/20"
                )}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/50 to-cyan-500/50 flex items-center justify-center text-xs font-bold shrink-0">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{testimonial.content}</p>
              </button>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
