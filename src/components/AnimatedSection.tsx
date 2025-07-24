';use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ReactNode, useRef } from 'react'
export default function AnimatedSection({
  children,
  yOffset = 0,
  opacityRange = [1, 1]
}: {
  children: ReactNode
  yOffset?: number
  opacityRange?: [number, number]
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [yOffset, 0])
  const opacity = useTransform(scrollYProgress, [0, 1], opacityRange)

  return (
    <motion.section
      ref={ref}
      style={{ y, opacity }}
      transition={{ type: 'spring', damping: 15 }}
    >
      {children}
    </motion.section>
  )
}