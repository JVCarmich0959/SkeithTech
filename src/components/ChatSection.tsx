'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, ReactElement } from 'react'

interface ValueCard {
  title: string
  description: string
  icon: ReactElement
}

const VALUE_CARDS: ValueCard[] = [
  {
    title: 'Big Tech Experience',
    description: 'Enterprise-grade solutions adapted for your small business, without the corporate price tag.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M11.644 1.59a.75.75 0 01.712 0l9.75 5.25a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.712 0l-9.75-5.25a.75.75 0 010-1.32l9.75-5.25z" />
        <path d="M3.265 10.602l7.668 4.129a2.25 2.25 0 002.134 0l7.668-4.13 1.37.739a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.71 0l-9.75-5.25a.75.75 0 010-1.32l1.37-.738z" />
        <path d="M10.933 19.231l-7.668-4.13-1.37.739a.75.75 0 000 1.32l9.75 5.25c.221.12.489.12.71 0l9.75-5.25a.75.75 0 000-1.32l-1.37-.738-7.668 4.13a2.25 2.25 0 01-2.134-.001z" />
      </svg>
    )
  },
  {
    title: 'Built for Growth',
    description: 'Systems designed to scale with you - no more outgrowing your tech every 12 months.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm.53 5.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72v5.69a.75.75 0 001.5 0v-5.69l1.72 1.72a.75.75 0 101.06-1.06l-3-3z" clipRule="evenodd" />
      </svg>
    )
  },
  {
    title: 'No Black Boxes',
    description: 'Clear explanations and full control over your tools - I train you to use everything.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
        <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
      </svg>
    )
  },
  {
    title: 'Right-Sized Solutions',
    description: 'Only what you need today, with a roadmap for where you want to be tomorrow.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
      </svg>
    )
  }
]

interface ValueCardProps extends ValueCard {
  transition?: {
    delay?: number
    duration?: number
    type?: "spring" | "tween" | "keyframes"
  }
}

const ValueCard = ({ title, description, icon, transition }: ValueCardProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: transition?.delay ?? 0, type: transition?.type ?? "spring" }}
      className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-200 transition-all hover:shadow-lg"
    >
      <div className="flex items-start gap-4">
        <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </motion.div>
  )
}

const ValueProposition = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Technology That <span className="text-blue-600">Works For You</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Custom solutions for Goldsboro businesses ready to level up
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {VALUE_CARDS.map((card, index) => (
            <ValueCard
              key={card.title}
              title={card.title}
              description={card.description}
              icon={card.icon}
              transition={{ delay: index * 0.1 }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center bg-blue-50 rounded-xl p-6 border border-blue-200 max-w-2xl mx-auto"
        >
          <p className="text-gray-700">
            <span className="font-medium text-blue-600">The sweet spot:</span> Between consumer tools that don&apos;t scale and
            enterprise systems you can&apos;t afford.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default ValueProposition