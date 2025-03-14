'use client'

import { useState, useEffect } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

const floatingPackages = [
  { text: 'package.sop', color: 'from-purple-400 to-purple-600' },
  { text: 'web.sop', color: 'from-blue-400 to-blue-600' },
  { text: 'api.sop', color: 'from-indigo-400 to-indigo-600' },
  { text: 'auth.sop', color: 'from-violet-400 to-violet-600' },
  { text: 'db.sop', color: 'from-fuchsia-400 to-fuchsia-600' },
]

export function Hero() {
  const [searchQuery, setSearchQuery] = useState('')
  const [displayText, setDisplayText] = useState('')
  const fullText = 'Welcome to Soplang Hub'

  useEffect(() => {
    let currentIndex = 0
    const intervalId = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(intervalId)
      }
    }, 100)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="relative min-h-[80vh] overflow-hidden bg-gradient-to-b from-black to-gray-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-50">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
          <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
        </div>
      </div>

      {/* Floating packages */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingPackages.map((pkg, index) => (
          <motion.div
            key={pkg.text}
            className={`absolute bg-gradient-to-r ${pkg.color} p-3 rounded-lg shadow-lg`}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0,
              rotate: Math.random() * 360,
            }}
            animate={{
              x: [null, Math.random() * window.innerWidth],
              y: [null, Math.random() * window.innerHeight],
              scale: [0, 1],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              delay: index * 0.5,
            }}
          >
            <span className="text-white text-sm font-mono">{pkg.text}</span>
          </motion.div>
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Logo or Icon */}
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 rounded-2xl shadow-2xl transform -rotate-12" />

          {/* Typing Animation Title */}
          <div className="h-20"> {/* Fixed height to prevent layout shift */}
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-600">
                {displayText}
              </span>
              <span className="inline-block w-[3px] h-8 ml-1 bg-purple-500 animate-blink" />
            </h1>
          </div>

          {/* Subtitle with gradient text */}
          <p className="mx-auto max-w-2xl text-xl sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-indigo-200 to-blue-200">
            The official package registry for Soplang
          </p>

          {/* Search bar */}
          <div className="mx-auto max-w-2xl mt-8">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              <div className="relative flex items-center bg-black rounded-lg">
                <MagnifyingGlassIcon className="h-6 w-6 text-gray-400 absolute left-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type 'S' or '/' to search..."
                  className="block w-full bg-black pl-12 pr-4 py-4 text-white placeholder-gray-400 rounded-lg ring-1 ring-gray-800 focus:ring-2 focus:ring-purple-500 transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-8 mt-16">
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200" />
              <div className="relative px-6 py-4 bg-black rounded-lg">
                <div className="text-4xl font-bold text-white">0</div>
                <div className="text-sm text-gray-400">Total Downloads</div>
              </div>
            </div>
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200" />
              <div className="relative px-6 py-4 bg-black rounded-lg">
                <div className="text-4xl font-bold text-white">0</div>
                <div className="text-sm text-gray-400">Total Packages</div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg hover:from-purple-500 hover:to-indigo-500 transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
            >
              Install Packages
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 text-lg font-semibold text-white bg-black rounded-lg hover:bg-gray-900 transition-all duration-200 ring-1 ring-gray-800 hover:ring-purple-500"
            >
              Documentation
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Add animation keyframes */}
      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </div>
  )
} 