"use client"

import { useState, useCallback, lazy, Suspense } from "react"
import { Navbar } from "@/components/portfolio/navbar"
import { Hero } from "@/components/portfolio/hero"
import { InitialLoader } from "@/components/portfolio/initial-loader"
import { CustomCursor } from "@/components/portfolio/custom-cursor"
import { ParticlesBackground } from "@/components/portfolio/particles-background"

// Lazy-load below-the-fold sections to reduce initial JS bundle
const About       = lazy(() => import("@/components/portfolio/about").then(m => ({ default: m.About })))
const Skills      = lazy(() => import("@/components/portfolio/skills").then(m => ({ default: m.Skills })))
const Projects    = lazy(() => import("@/components/portfolio/projects").then(m => ({ default: m.Projects })))
const Experience  = lazy(() => import("@/components/portfolio/experience").then(m => ({ default: m.Experience })))
const Testimonials = lazy(() => import("@/components/portfolio/testimonials").then(m => ({ default: m.Testimonials })))
const Contact     = lazy(() => import("@/components/portfolio/contact").then(m => ({ default: m.Contact })))
const Footer      = lazy(() => import("@/components/portfolio/footer").then(m => ({ default: m.Footer })))

// Minimal skeleton so layout doesn't jump during lazy load
function SectionSkeleton() {
  return <div className="py-20" aria-hidden="true" />
}

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
        <Suspense fallback={<SectionSkeleton />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Testimonials />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Contact />
        </Suspense>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </main>
    </>
  )
}
