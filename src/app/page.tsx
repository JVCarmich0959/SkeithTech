import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import ChatSection from '@/components/ChatSection'
import Process from '@/components/Process'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import CuteFloaters from '@/components/CuteFloaters'

// Type-safe page section definition
type PageSection = {
  component: React.ComponentType
  containerClass?: string
  key: string
}

// Centralized page composition configuration
const PAGE_SECTIONS: PageSection[] = [
  { component: CuteFloaters, key: 'floaters' },
  { component: Header, key: 'header' },
  { 
    component: Hero, 
    key: 'hero',
    containerClass: 'container mx-auto px-4' 
  },
  { 
    component: Services, 
    key: 'services',
    containerClass: 'container mx-auto px-4' 
  },
  { 
    component: ChatSection, 
    key: 'chat',
    containerClass: 'container mx-auto px-4' 
  },
  { 
    component: Process, 
    key: 'process',
    containerClass: 'container mx-auto px-4' 
  },
  { 
    component: Contact, 
    key: 'contact',
    containerClass: 'container mx-auto px-4' 
  },
  { component: Footer, key: 'footer' }
]

// 🧩 Section renderer component
const PageSectionRenderer: React.FC<PageSection> = ({ 
  component: Component, 
  containerClass 
}) => (
  containerClass ? (
    <main className={containerClass}>
      <Component />
    </main>
  ) : (
    <Component />
  )
)

// Declarative homepage composition
export default function HomePage() {
  return (
    <>
      {PAGE_SECTIONS.map((section) => (
        <PageSectionRenderer 
          key={section.key}
          component={section.component}
          containerClass={section.containerClass}
        />
      ))}
    </>
  )
}