'use client'

import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import ChatSection from '@/components/ChatSection'
import Process, { ProcessProps } from '@/components/Process'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import CuteFloaters from '@/components/CuteFloaters'
import ScheduleBot from '@/components/ScheduleBot'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, ComponentType } from 'react'

// Define prop types for all components
type ComponentPropsMap = {
  Process: ProcessProps
  Header: Record<string, never>
  Hero: Record<string, never>
  Services: Record<string, never>
  ChatSection: Record<string, never>
  Contact: Record<string, never>
  Footer: Record<string, never>
  CuteFloaters: Record<string, never>
}

// Type-safe page section definition
type PageSection<T extends keyof ComponentPropsMap> = {
  component: ComponentType<ComponentPropsMap[T]>
  containerClass?: string
  key: string
  motionConfig?: {
    yOffset?: number
    opacityRange?: [number, number] // Changed to mutable array
  }
  props?: ComponentPropsMap[T]
}

// Motion section renderer with proper typing
function PageSectionRenderer<T extends keyof ComponentPropsMap>({ 
  component: Component, 
  containerClass = '',
  motionConfig,
  props = {} as ComponentPropsMap[T]
}: PageSection<T>) {
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
  
  // Create mutable copy of opacityRange for useTransform
  const opacityRange = motionConfig?.opacityRange 
    ? [...motionConfig.opacityRange] 
    : [1, 1]
  
  const opacity = useTransform(
    scrollYProgress,
    [0, 1],
    opacityRange
  )

  const content = containerClass ? (
    <main className={containerClass}>
      <Component {...props} />
    </main>
  ) : (
    <Component {...props} />
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

function FloatingBackgroundElements() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-accent/10 blur-3xl animate-float-slow" />
      <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-accent/10 blur-3xl animate-float-delay" />
    </div>
  )
}

export default function HomePage() {
  const handleScheduleClick = () => {
    const chatButton = document.querySelector('[data-testid="chat-toggle"]') as HTMLButtonElement
    if (chatButton) {
      chatButton.click()
    } else {
      const buttons = document.querySelectorAll('button')
      const chatBtn = Array.from(buttons).find(btn => 
        btn.className.includes('rounded-full') && 
        btn.className.includes('fixed') &&
        btn.className.includes('bottom-6')
      )
      if (chatBtn) {
        (chatBtn as HTMLButtonElement).click()
      }
    }
  }

  // Define sections with proper typing
  const PAGE_SECTIONS = [
    { 
      component: CuteFloaters, 
      key: 'floaters',
      motionConfig: {
        yOffset: 50,
        opacityRange: [0.8, 1]
      }
    } satisfies PageSection<'CuteFloaters'>,
    { 
      component: Header, 
      key: 'header',
      motionConfig: {
        yOffset: 20,
        opacityRange: [0.9, 1]
      }
    } satisfies PageSection<'Header'>,
    { 
      component: Hero, 
      key: 'hero',
      containerClass: 'container mx-auto px-4',
      motionConfig: {
        yOffset: 100,
        opacityRange: [0.7, 1]
      }
    } satisfies PageSection<'Hero'>,
    { 
      component: Services, 
      key: 'services',
      containerClass: 'container mx-auto px-4',
      motionConfig: {
        yOffset: 80,
        opacityRange: [0.8, 1]
      }
    } satisfies PageSection<'Services'>,
    { 
      component: ChatSection, 
      key: 'chat',
      containerClass: 'container mx-auto px-4',
      motionConfig: {
        yOffset: 60,
        opacityRange: [0.85, 1]
      }
    } satisfies PageSection<'ChatSection'>,
    { 
      component: Process, 
      key: 'process',
      containerClass: 'container mx-auto px-4',
      motionConfig: {
        yOffset: 40,
        opacityRange: [0.9, 1]
      },
      props: {
        onScheduleClick: handleScheduleClick
      }
    } satisfies PageSection<'Process'>,
    { 
      component: Contact, 
      key: 'contact',
      containerClass: 'container mx-auto px-4',
      motionConfig: {
        yOffset: 30,
        opacityRange: [0.95, 1]
      }
    } satisfies PageSection<'Contact'>,
    { 
      component: Footer, 
      key: 'footer',
      motionConfig: {
        yOffset: 20,
        opacityRange: [0.9, 1]
      }
    } satisfies PageSection<'Footer'>
  ]

  return (
    <div className="overflow-x-hidden">
      <FloatingBackgroundElements />
      {PAGE_SECTIONS.map((section) => (
        <PageSectionRenderer 
          key={section.key}
          component={section.component}
          containerClass={section.containerClass}
          motionConfig={section.motionConfig}
          props={section.props}
        />  
      ))}
      <ScheduleBot />
    </div>
  )
}