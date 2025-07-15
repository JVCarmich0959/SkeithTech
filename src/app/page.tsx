import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import ChatSection from '@/components/ChatSection'
import Process from '@/components/Process'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import CuteFloaters from '@/components/CuteFloaters'

export default function HomePage() {
  return (
    <>
      <CuteFloaters />
      <Header />
      <main className="container mx-auto px-4">
        <Hero />
        <Services />
        <ChatSection />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
