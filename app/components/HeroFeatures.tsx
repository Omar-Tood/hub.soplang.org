'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface HeroFeaturesProps {
  features: string[]
}

export function HeroFeatures({ features }: HeroFeaturesProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <motion.div
      initial={mounted ? { opacity: 0, y: 20 } : false}
      animate={mounted ? { opacity: 1, y: 0 } : false}
      transition={{ duration: 0.8 }}
      className="grid grid-cols-1 gap-8 sm:grid-cols-2"
    >
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={mounted ? { opacity: 0, y: 20 } : false}
          animate={mounted ? { opacity: 1, y: 0 } : false}
          transition={{ duration: 0.8, delay: index * 0.2 }}
          className="relative flex gap-x-4"
        >
          <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-indigo-600">
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <div className="flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
              {feature}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
} 