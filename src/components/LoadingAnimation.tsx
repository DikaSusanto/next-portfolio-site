"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoadingAnimationProps {
  onLoadingComplete?: () => void
  duration?: number
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({
  onLoadingComplete,
  duration = 3000
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentPhase, setCurrentPhase] = useState(0)
  const [screenHeight, setScreenHeight] = useState(800)

  // Loading phases for text animation
  const loadingPhases = [
    "Initializing...",
    "Loading Components...",
    "Preparing Experience...",
    "Almost Ready...",
    "Complete!"
  ]

  useEffect(() => {
    // Set mounted state immediately to prevent delay
    setIsMounted(true)

    // Set screen height on client side
    if (typeof window !== 'undefined') {
      setScreenHeight(window.innerHeight)
    }

    // Start progress immediately
    let progressValue = 0
    const progressInterval = setInterval(() => {
      progressValue += Math.random() * 15 + 5
      if (progressValue >= 100) {
        clearInterval(progressInterval)
        setProgress(100)
      } else {
        setProgress(progressValue)
      }
    }, 150) // Slightly faster for better perceived performance

    // Phase animation
    const phaseInterval = setInterval(() => {
      setCurrentPhase(prev => Math.min(prev + 1, loadingPhases.length - 1))
    }, duration / loadingPhases.length)

    // Complete loading
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false)
      onLoadingComplete?.()
    }, duration)

    return () => {
      clearInterval(progressInterval)
      clearInterval(phaseInterval)
      clearTimeout(loadingTimeout)
    }
  }, [duration, onLoadingComplete, loadingPhases.length])

  // Generate random particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 3,
    size: 2 + Math.random() * 4,
    startX: Math.random() * 100,
    startY: Math.random() * 100
  }))

  // Binary rain effect
  const binaryColumns = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    delay: Math.random() * 3,
    chars: Array.from({ length: 10 }, () => Math.random() > 0.5 ? '1' : '0')
  }))

  // Render immediately if mounted, don't wait for AnimatePresence
  if (!isMounted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-black">
        <div className="flex items-center space-x-2">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-blue-400 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 0.8,
                delay: i * 0.2,
                repeat: Infinity
              }}
              style={{ opacity: 1 }}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-black overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.05,
        transition: { duration: 0.8, ease: "easeInOut" }
      }}
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <motion.path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-blue-400"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Binary Rain Effect */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {binaryColumns.map(column => (
          <motion.div
            key={column.id}
            className="absolute top-0 text-green-400 font-mono text-sm"
            style={{ left: `${(column.id / binaryColumns.length) * 100}%` }}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: screenHeight + 100, opacity: [0, 1, 0] }}
            transition={{
              duration: 4,
              delay: column.delay,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {column.chars.map((char, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              >
                {char}
              </motion.div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Floating Particles */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute bg-blue-400 rounded-full opacity-60"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.startX}%`,
            top: `${particle.startY}%`
          }}
          animate={{
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * 200 - 100],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Central Loading Content */}
      <div className="relative z-10 text-center max-w-md mx-auto px-8">
        {/* Main Logo/Icon Animation */}
        <motion.div
          className="mb-8 flex justify-center"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
        >
          <motion.div
            className="relative w-24 h-24 border-4 border-blue-500 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            {/* Inner spinning elements */}
            <motion.div
              className="absolute inset-2 border-2 border-cyan-400 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-4 border-2 border-blue-300 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />

            {/* Center dot */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-3 h-3 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1]
              }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>

        {/* Brand Name */}
        <motion.h1
          className="text-3xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <motion.span
            className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Dika Putra Susanto
          </motion.span>
        </motion.h1>

        {/* Loading Phase Text */}
        <motion.div className="mb-6 h-6">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentPhase}
              className="text-gray-300 text-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {loadingPhases[currentPhase]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full relative"
              initial={{ width: "0%" }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Animated glow effect */}
              <motion.div
                className="absolute inset-0 bg-white opacity-30 rounded-full"
                animate={{ x: ["-100%", "100%"] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{ width: "50%" }}
              />
            </motion.div>
          </div>
          <motion.p
            className="text-blue-300 text-sm mt-2 font-mono"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            {Math.round(Math.min(progress, 100))}%
          </motion.p>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-blue-400 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 0.8,
                delay: i * 0.2,
                repeat: Infinity
              }}
            />
          ))}
        </div>
      </div>

      {/* Animated Corner Elements */}
      {[
        { corner: "top-left", rotate: 0 },
        { corner: "top-right", rotate: 90 },
        { corner: "bottom-right", rotate: 180 },
        { corner: "bottom-left", rotate: 270 }
      ].map(({ corner, rotate }) => (
        <motion.div
          key={corner}
          className={`absolute ${corner === "top-left" ? "top-8 left-8" : ""} ${corner === "top-right" ? "top-8 right-8" : ""} ${corner === "bottom-right" ? "bottom-8 right-8" : ""} ${corner === "bottom-left" ? "bottom-8 left-8" : ""} w-16 h-16 border-l-2 border-t-2 border-blue-400`}
          style={{ transform: `rotate(${rotate}deg)` }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 2,
            delay: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Exit Animation Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600"
        initial={{ scaleX: 0 }}
        animate={!isLoading ? { scaleX: 1 } : {}}
        style={{ transformOrigin: "left" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
    </motion.div>
  )
}

export default LoadingAnimation