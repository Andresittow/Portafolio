"use client"

import { useState, useCallback } from "react"
import { Navbar } from "@/components/portfolio/navbar"
import { Hero } from "@/components/portfolio/hero"
import { About } from "@/components/portfolio/about"
import { Skills } from "@/components/portfolio/skills"
import { Projects } from "@/components/portfolio/projects"
import { Experience } from "@/components/portfolio/experience"
import { Testimonials } from "@/components/portfolio/testimonials"
import { Contact } from "@/components/portfolio/contact"
import { Footer } from "@/components/portfolio/footer"
import { InitialLoader } from "@/components/portfolio/initial-loader"
import { CustomCursor } from "@/components/portfolio/custom-cursor"
import { ParticlesBackground } from "@/components/portfolio/particles-background"

export default function Home() {
  const [loaderDone, setLoaderDone] = useState(false)

  const handleLoaderComplete = useCallback(() => {
    setLoaderDone(true)
  }, [])

  return (
    <>
      <CustomCursor />
      {!loaderDone && <InitialLoader onComplete={handleLoaderComplete} />}
      <ParticlesBackground />
      <main className="relative z-10 min-h-screen">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
