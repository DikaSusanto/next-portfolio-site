"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const HeroSection = () => {
  const [currentRole, setCurrentRole] = useState(0)
  const roles = [
    "Backend Developer",
    "Full Stack Engineer",
    "System Analyst",
    "Web Developer",
    "PHP Specialist"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [roles.length])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  // Particle logic with SSR-safe responsive count
  const [particlePositions, setParticlePositions] = useState<
    { left: string; top: string; duration: number; delay: number }[]
  >([])

  useEffect(() => {
    const count = typeof window !== "undefined" && window.innerWidth < 768 ? 8 : 15
    const positions = Array.from({ length: count }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }))
    setParticlePositions(positions)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  } as const

  const nameVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 10,
        delay: 0.5
      }
    }
  } as const

  return (
    <section
      id="dashboard"
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center relative overflow-hidden pt-20 lg:pt-24"
    >
      {/* Animated Moon Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Realistic Moon */}
        <motion.div
          className="absolute w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-36 lg:h-36
                     top-8 right-4 sm:top-12 sm:right-8 md:top-16 md:right-12 lg:top-16 lg:right-16"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.6, 0.8, 0.6]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg
            className="w-full h-full drop-shadow-lg"
            viewBox="0 0 144 144"
          >
            <defs>
              {/* Moon gradient */}
              <radialGradient id="moonGradient" cx="0.3" cy="0.3" r="0.8">
                <stop offset="0%" stopColor="#f8fafc" stopOpacity="0.9" />
                <stop offset="30%" stopColor="#e2e8f0" stopOpacity="0.8" />
                <stop offset="70%" stopColor="#cbd5e1" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.4" />
              </radialGradient>

              {/* Shadow gradient for crescent effect */}
              <radialGradient id="moonShadow" cx="0.8" cy="0.2" r="0.9">
                <stop offset="0%" stopColor="#1e293b" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#334155" stopOpacity="0.2" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>

              {/* Crater gradients */}
              <radialGradient id="crater1" cx="0.5" cy="0.3" r="0.7">
                <stop offset="0%" stopColor="#64748b" stopOpacity="0.4" />
                <stop offset="70%" stopColor="#94a3b8" stopOpacity="0.2" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>

              <radialGradient id="crater2" cx="0.5" cy="0.5" r="0.6">
                <stop offset="0%" stopColor="#475569" stopOpacity="0.3" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>

              {/* Subtle glow around moon */}
              <filter id="moonGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Moon glow */}
            <circle
              cx="72"
              cy="72"
              r="76"
              fill="url(#moonGradient)"
              opacity="0.1"
              filter="url(#moonGlow)"
            />

            {/* Main moon body */}
            <circle
              cx="72"
              cy="72"
              r="68"
              fill="url(#moonGradient)"
              filter="url(#moonGlow)"
            />

            {/* Large crater */}
            <circle
              cx="58"
              cy="48"
              r="12"
              fill="url(#crater1)"
            />

            {/* Medium crater */}
            <circle
              cx="85"
              cy="65"
              r="8"
              fill="url(#crater2)"
            />

            {/* Small craters */}
            <circle cx="45" cy="75" r="4" fill="url(#crater2)" opacity="0.6" />
            <circle cx="92" cy="45" r="3" fill="url(#crater1)" opacity="0.5" />
            <circle cx="68" cy="85" r="5" fill="url(#crater2)" opacity="0.4" />
            <circle cx="35" cy="55" r="2" fill="url(#crater1)" opacity="0.7" />

            {/* Surface details - subtle texture */}
            <circle cx="75" cy="55" r="1.5" fill="#94a3b8" opacity="0.3" />
            <circle cx="52" cy="68" r="1" fill="#64748b" opacity="0.4" />
            <circle cx="88" cy="78" r="1.5" fill="#94a3b8" opacity="0.2" />
            <circle cx="42" cy="42" r="1" fill="#64748b" opacity="0.3" />
            <circle cx="78" cy="38" r="0.8" fill="#94a3b8" opacity="0.5" />

            {/* Subtle shadow overlay for 3D effect */}
            <circle
              cx="72"
              cy="72"
              r="68"
              fill="url(#moonShadow)"
            />
          </svg>
        </motion.div>

        {/* Improved Mountain/Hill Silhouette with better coverage */}
        <div className="absolute bottom-0 left-0 w-full h-32 sm:h-40 md:h-48 bg-gradient-to-t from-gray-900 to-transparent">
          <svg
            className="absolute bottom-0 w-full h-full"
            viewBox="0 0 1920 300"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Multiple mountain layers for better coverage */}
            <path
              d="M-100 300V200C100 150 300 180 500 160C700 140 900 170 1100 150C1300 130 1500 160 1700 140C1900 120 2000 150 2100 130V300H-100Z"
              fill="url(#mountainGradient1)"
            />
            <path
              d="M-100 300V220C200 170 400 200 600 180C800 160 1000 190 1200 170C1400 150 1600 180 1800 160C2000 140 2100 170 2200 150V300H-100Z"
              fill="url(#mountainGradient2)"
              opacity="0.7"
            />
            <path
              d="M-100 300V240C150 190 350 220 550 200C750 180 950 210 1150 190C1350 170 1550 200 1750 180C1950 160 2050 190 2200 170V300H-100Z"
              fill="url(#mountainGradient3)"
              opacity="0.5"
            />
            <defs>
              <linearGradient id="mountainGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(30, 58, 138, 0.4)" />
                <stop offset="100%" stopColor="rgba(17, 24, 39, 0.9)" />
              </linearGradient>
              <linearGradient id="mountainGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
                <stop offset="100%" stopColor="rgba(31, 41, 55, 0.8)" />
              </linearGradient>
              <linearGradient id="mountainGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(96, 165, 250, 0.2)" />
                <stop offset="100%" stopColor="rgba(55, 65, 81, 0.7)" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Floating Particles - SSR safe */}
        {particlePositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 sm:w-1 sm:h-1 bg-blue-400 rounded-full opacity-60"
            style={{
              left: pos.left,
              top: pos.top,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: pos.duration,
              repeat: Infinity,
              delay: pos.delay,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Gradient Overlays - Mobile optimized */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500/5 to-cyan-500/5"></div>
        <motion.div
          className="absolute top-12 left-4 sm:top-20 sm:left-10 w-24 h-24 sm:w-32 sm:h-32 bg-blue-500/10 rounded-full blur-xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-12 right-4 sm:bottom-20 sm:right-10 w-32 h-32 sm:w-48 sm:h-48 bg-cyan-500/10 rounded-full blur-xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-16 h-16 sm:w-24 sm:h-24 bg-blue-400/10 rounded-full blur-2xl"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <motion.div
        className="container mx-auto px-4 sm:px-6 relative z-10 flex-1 flex items-center justify-center py-16 sm:py-20 md:py-0"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center max-w-5xl mx-auto">
          {/* Profile Image with mobile-optimized sizing */}
          <motion.div
            className="mb-6 sm:mb-8 flex justify-center"
            variants={itemVariants}
          >
            <motion.div
              className="relative"
              animate={{
                y: [-4, 4, -4]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <motion.div
                className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 p-1"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src="/img/pfp-2.jpg"
                  alt="Profile"
                  width={160}
                  height={160}
                  className="w-full h-full rounded-full object-cover object-center border-2 sm:border-4 border-white/10"
                  style={{
                    objectPosition: 'center 20%',
                    transform: 'scale(1.2)'
                  }}
                  priority
                />
              </motion.div>
              <motion.div
                className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-green-500 rounded-full border-2 sm:border-3 md:border-4 border-gray-900"
                animate={{
                  scale: [1, 1.2, 1],
                  boxShadow: [
                    "0 0 0 0 rgba(34, 197, 94, 0.4)",
                    "0 0 0 6px rgba(34, 197, 94, 0)",
                    "0 0 0 0 rgba(34, 197, 94, 0)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>

          {/* Main Content with responsive typography */}
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight px-2"
            variants={nameVariants}
          >
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              Hi, I&apos;m{' '}
            </motion.span>
            <motion.span
              className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent inline-block"
              initial={{ opacity: 0, scale: 0.7, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{
                delay: 1.2,
                duration: 1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{
                scale: 1.01,
                textShadow: "0 0 30px rgba(59, 130, 246, 0.5)"
              }}
            >
              Dika Putra Susanto
            </motion.span>
          </motion.h1>

          {/* Dynamic Role with responsive text */}
          <motion.div
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-3 sm:mb-4 max-w-3xl mx-auto h-6 sm:h-8 px-2"
            variants={itemVariants}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={currentRole}
                initial={{ opacity: 0, y: 15, rotateX: 90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -15, rotateX: -90 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                className="inline-block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent font-semibold"
              >
                {roles[currentRole]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          <motion.p
            className="text-sm sm:text-base md:text-lg text-gray-400 mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed px-4 sm:px-6"
            variants={itemVariants}
          >
            I specialize in backend development with PHP, Laravel, and MySQL.
            I&apos;m also expanding into frontend and web development to create seamless user experiences.
          </motion.p>

          {/* CTA Buttons - Mobile optimized layout */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-6 sm:mb-8 px-4"
            variants={itemVariants}
          >
            <motion.button
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold shadow-lg relative overflow-hidden group text-sm sm:text-base"
              onClick={() => scrollToSection('portfolio')}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 8px 32px rgba(59, 130, 246, 0.4)"
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                layoutId="button-bg"
              />
              <span className="relative z-10">View My Work</span>
            </motion.button>
            <motion.button
              className="w-full sm:w-auto border-2 border-blue-500/50 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-blue-500/10 hover:border-blue-400 transition-all duration-300 relative overflow-hidden group text-sm sm:text-base"
              onClick={() => scrollToSection('contact')}
              whileHover={{
                scale: 1.02,
                borderColor: "rgba(59, 130, 246, 0.8)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                layoutId="button-bg-2"
              />
              <span className="relative z-10">Contact Me</span>
            </motion.button>
          </motion.div>

          {/* Social Links - Mobile optimized */}
          <motion.div
            className="flex justify-center space-x-4 sm:space-x-6"
            variants={itemVariants}
          >
            {[
              {
                href: "https://www.instagram.com/dik.ps?igsh=bTJ1N2g5bzM5aDAw",
                path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
              },
              {
                href: "https://www.linkedin.com/in/dikasusanto",
                path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
              },
              {
                href: "https://github.com/DikaSusanto",
                path: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
              }
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  color: "#60A5FA"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d={social.path} />
                </svg>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="flex justify-center w-full pb-4 sm:pb-6 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          className="cursor-pointer"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={() => scrollToSection('about')}
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HeroSection