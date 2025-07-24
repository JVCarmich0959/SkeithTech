'use client' // Required because we're using client-side features

import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import ChatSection from '@/components/ChatSection'
import Process from '@/components/Process'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import CuteFloaters from '@/components/CuteFloaters'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

// Type-safe page section definition with motion enhancements
type PageSection = {
  component: React.ComponentType
  containerClass?: string
  key: string
  motionConfig?: {
    yOffset?: number
    opacityRange?: [number, number]
  }
}

// Centralized page composition with hypnotic motion parameters
const PAGE_SECTIONS: PageSection[] = [
  { 
    component: CuteFloaters, 
    key: 'floaters',
    motionConfig: {
      yOffset: 50,
      opacityRange: [0.8, 1]
    }
  },
  { 
    component: Header, 
    key: 'header',
    motionConfig: {
      yOffset: 20,
      opacityRange: [0.9, 1]
    }
  },
  { 
    component: Hero, 
    key: 'hero',
    containerClass: 'container mx-auto px-4',
    motionConfig: {
      yOffset: 100,
      opacityRange: [0.7, 1]
    }
  },
  { 
    component: Services, 
    key: 'services',
    containerClass: 'container mx-auto px-4',
    motionConfig: {
      yOffset: 80,
      opacityRange: [0.8, 1]
    }
  },
  { 
    component: ChatSection, 
    key: 'chat',
    containerClass: 'container mx-auto px-4',
    motionConfig: {
      yOffset: 60,
      opacityRange: [0.85, 1]
    }
  },
  { 
    component: Process, 
    key: 'process',
    containerClass: 'container mx-auto px-4',
    motionConfig: {
      yOffset: 40,
      opacityRange: [0.9, 1]
    }
  },
  { 
    component: Contact, 
    key: 'contact',
    containerClass: 'container mx-auto px-4',
    motionConfig: {
      yOffset: 30,
      opacityRange: [0.95, 1]
    }
  },
  { 
    component: Footer, 
    key: 'footer',
    motionConfig: {
      yOffset: 20,
      opacityRange: [0.9, 1]
    }
  }
]

// 🧠 Hypnotic Section Renderer with Scroll-triggered Animations
function PageSectionRenderer({ 
  component: Component, 
  containerClass,
  motionConfig
}: PageSection) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [motionConfig?.yOffset || 0, 0]
  )
  
  const opacity = useTransform(
    scrollYProgress,
    [0, 1],
    motionConfig?.opacityRange || [1, 1]
  )

  const content = containerClass ? (
    <main className={containerClass}>
      <Component />
    </main>
  ) : (
    <Component />
  )

  return motionConfig ? (
    <motion.section
      ref={ref}
      style={{ y, opacity }}
      transition={{ type: 'spring', damping: 15 }}
    >
      {content}
    </motion.section>
  ) : (
    <section ref={ref}>{content}</section>
  )
}

// Background elements component
function FloatingBackgroundElements() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-accent/10 blur-3xl animate-float-slow" />
      <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-accent/10 blur-3xl animate-float-delay" />
    </div>
  )
}

// 🌀 Hypnotic Homepage Composition
export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      <FloatingBackgroundElements />
      {PAGE_SECTIONS.map((section) => (
        <PageSectionRenderer 
          key={section.key}
          component={section.component}
          containerClass={section.containerClass}
          motionConfig={section.motionConfig}
        />
      ))}
    </div>
  )
}