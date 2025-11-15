//src/components/AboutSection.tsx

"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  Code2,
  Database,
  Palette,
  GitBranch,
  Container,
  Rabbit,
  Zap,
  Server,
  Globe
} from 'lucide-react'

// Using proper icons from Lucide React
const skills = [
  { name: 'Laravel', icon: Code2, color: 'text-red-400' },
  { name: 'Vue.js', icon: Globe, color: 'text-green-400' },
  { name: 'PHP', icon: Server, color: 'text-indigo-400' },
  { name: 'JavaScript', icon: Zap, color: 'text-yellow-400' },
  { name: 'MySQL', icon: Database, color: 'text-blue-400' },
  { name: 'Tailwind', icon: Palette, color: 'text-cyan-400' },
  { name: 'Git', icon: GitBranch, color: 'text-orange-400' },
  { name: 'Docker', icon: Container, color: 'text-blue-500' },
  { name: 'RabbitMQ', icon: Rabbit, color: 'text-orange-500' },
  { name: 'Next.js', icon: Globe, color: 'text-white' },
  { name: 'React', icon: Code2, color: 'text-cyan-300' },
  { name: 'Node.js', icon: Server, color: 'text-green-500' },
]

const AboutSection: React.FC = () => {
  // Dots state
  const [dots, setDots] = useState<
    { left: string; top: string; size: string; color: string; duration: number; delay: number }[]
  >([])
  // Geometric shapes state
  const [shapes, setShapes] = useState<
    { top: string; left: string; size: string; color: string; rotate: number; duration: number }[]
  >([])

  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    // Fewer dots for mobile performance
    const dotCount = window.innerWidth < 768 ? 12 : 24
    setDots(
      Array.from({ length: dotCount }).map((_, i) => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: [
          'w-1 h-1', 'w-2 h-2', 'w-1.5 h-1.5', 'w-2.5 h-2.5'
        ][i % 4],
        color: [
          'bg-blue-400/20', 'bg-cyan-400/15', 'bg-indigo-400/25', 'bg-purple-400/20'
        ][i % 4],
        duration: 8 + Math.random() * 8,
        delay: Math.random() * 8,
      }))
    )
    // Fewer shapes for mobile
    const shapeCount = window.innerWidth < 768 ? 3 : 6
    setShapes(
      Array.from({ length: shapeCount }).map((_, i) => ({
        top: `${10 + Math.random() * 70}%`,
        left: `${10 + Math.random() * 80}%`,
        size: i % 2 === 0 ? 'w-12 h-12 sm:w-16 sm:h-16' : 'w-8 h-8 sm:w-12 sm:h-12',
        color: i % 2 === 0 ? 'border-blue-400/20' : 'border-cyan-400/20',
        rotate: Math.random() * 360,
        duration: 18 + i * 2,
      }))
    )
  }, [])

  // Carousel rows - adjusted for mobile
  const skillRows = [
    [...skills.slice(0, 4), ...skills.slice(0, 4), ...skills.slice(0, 4), ...skills.slice(0, 4), ...skills.slice(0, 4)],
    [...skills.slice(4, 8), ...skills.slice(4, 8), ...skills.slice(4, 8), ...skills.slice(4, 8), ...skills.slice(4, 8)],
    [...skills.slice(8, 12), ...skills.slice(8, 12), ...skills.slice(8, 12), ...skills.slice(8, 12), ...skills.slice(8, 12)]
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
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

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        delay: 0.3
      }
    }
  } as const

  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 bg-gray-900 relative overflow-hidden">
      {/* Enhanced Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Floating Dots */}
        {dots.map((dot, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${dot.size} ${dot.color}`}
            style={{
              left: dot.left,
              top: dot.top,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.08, 0.4, 0.08],
              scale: [0.5, 1.2, 0.5]
            }}
            transition={{
              duration: dot.duration,
              repeat: Infinity,
              delay: dot.delay,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Animated Grid Pattern - Less intensive on mobile */}
        <motion.div
          className="absolute inset-0 opacity-5 sm:opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px sm:40px sm:40px'
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%']
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Blobs - Smaller on mobile */}
        <motion.div
          className="absolute w-48 h-48 sm:w-80 sm:h-80 lg:w-[32rem] lg:h-[32rem] bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-indigo-500/10 sm:from-blue-500/15 sm:via-cyan-500/15 sm:to-indigo-500/15 rounded-full blur-2xl sm:blur-3xl"
          animate={{
            x: [-60, 60, -60],
            y: [-30, 30, -30],
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: '8%', right: '10%' }}
        />
        <motion.div
          className="absolute w-40 h-40 sm:w-72 sm:h-72 lg:w-[28rem] lg:h-[28rem] bg-gradient-to-l from-purple-500/10 via-blue-500/10 to-cyan-500/10 sm:from-purple-500/15 sm:via-blue-500/15 sm:to-cyan-500/15 rounded-full blur-2xl sm:blur-3xl"
          animate={{
            x: [60, -60, 60],
            y: [30, -30, 30],
            scale: [1, 1.3, 1],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 36, repeat: Infinity, ease: "easeInOut" }}
          style={{ bottom: '10%', left: '5%' }}
        />

        {/* Geometric Shapes */}
        {shapes.map((shape, i) => (
          <motion.div
            key={i}
            className={`absolute border rounded-lg ${shape.color} ${shape.size}`}
            style={{
              top: shape.top,
              left: shape.left,
              transform: `rotate(${shape.rotate}deg)`,
            }}
            animate={{
              rotate: [0, 360],
              x: [0, (i % 2 === 0 ? 20 : -20), 0],
              y: [0, (i % 2 === 0 ? -15 : 15), 0],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: shape.duration,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <motion.div
        className="container mx-auto px-4 sm:px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Image Column */}
          <motion.div
            className="relative w-full max-w-sm sm:max-w-md mx-auto lg:mx-0 order-1 lg:order-1"
            variants={itemVariants}
          >
            <motion.div
              className="relative z-10"
              variants={imageVariants}
            >
              <motion.div
                whileHover={{
                  scale: 1.02,
                  rotateY: 2,
                  rotateX: 1
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative group cursor-pointer"
                onHoverStart={() => setHovered(true)}
                onHoverEnd={() => setHovered(false)}
              >
                <Image
                  src="/img/PFP-3.jpg"
                  alt="About me"
                  width={400}
                  height={400}
                  className="rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl w-full aspect-square object-cover relative z-10 transition-all duration-300 group-hover:shadow-blue-500/25 group-hover:shadow-2xl"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Blurred lights, now smoothly fade in/out with hover */}
                <motion.div
                  className="absolute -top-3 -right-3 sm:-top-6 sm:-right-6 w-16 h-16 sm:w-24 sm:h-24 bg-blue-500 rounded-full blur-xl pointer-events-none"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: hovered ? [0.2, 0.3, 0.2] : 0
                  }}
                  transition={{
                    scale: { duration: 4, repeat: Infinity },
                    opacity: { duration: 0.4 }
                  }}
                />
                <motion.div
                  className="absolute -bottom-3 -left-3 sm:-bottom-6 sm:-left-6 w-20 h-20 sm:w-32 sm:h-32 bg-cyan-500 rounded-full blur-xl pointer-events-none"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: hovered ? [0.2, 0.35, 0.2] : 0
                  }}
                  transition={{
                    scale: { duration: 6, repeat: Infinity, delay: 2 },
                    opacity: { duration: 0.4 }
                  }}
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Content Column - Now below image for mobile */}
          <motion.div variants={itemVariants} className="order-2 lg:order-2 w-full">
            <motion.h2
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 sm:mb-6 text-center lg:text-left"
              whileHover={{
                scale: 1.02,
                textShadow: "0 0 20px rgba(59, 130, 246, 0.3)"
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              About{' '}
              <motion.span
                className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent inline-block"
                whileHover={{
                  scale: 1.05,
                  rotateY: 10
                }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                Me
              </motion.span>
            </motion.h2>

            <motion.p
              className="text-sm sm:text-base lg:text-lg text-gray-300 mb-4 sm:mb-6 leading-relaxed text-justify"
              variants={itemVariants}
              whileHover={{ color: "#e5e7eb" }}
              transition={{ duration: 0.3 }}
            >
              Graduate in Information Management from Bali State Polytechnic with a strong foundation in software development and a broad interest in technology. Experienced in building scalable systems and web applications using Laravel, Next.js, and RESTful APIs through academic, internship, and personal projects.
            </motion.p>

            <motion.p
              className="text-sm sm:text-base lg:text-lg text-gray-300 mb-6 sm:mb-8 leading-relaxed text-justify"
              variants={itemVariants}
              whileHover={{ color: "#e5e7eb" }}
              transition={{ duration: 0.3 }}
            >
              Expanding my skillset into full-stack development to deliver seamless and user-friendly digital solutions. Strong in collaboration, critical thinking, and project execution—with fluency in both English and Indonesian—I am eager to contribute to dynamic technology teams and grow as a versatile developer.
            </motion.p>

            {/* Skills Belt Carousel - Responsive */}
            <motion.div
              className="mb-6 sm:mb-8"
              variants={itemVariants}
            >
              <motion.h3
                className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6 text-center lg:text-left"
                whileHover={{
                  color: "#60A5FA",
                  scale: 1.02
                }}
                transition={{ duration: 0.3 }}
              >
                Skills &amp; Technologies
              </motion.h3>

              <div className="relative overflow-hidden bg-gray-800/30 rounded-xl sm:rounded-2xl p-3 sm:p-6 border border-gray-700/30 space-y-2 sm:space-y-4">
                {/* Row 1 - Moving Right to Left */}
                <div className="relative overflow-hidden">
                  <motion.div
                    className="flex space-x-2 sm:space-x-4"
                    animate={{
                      x: [0, -1200]
                    }}
                    transition={{
                      x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 60,
                        ease: "linear",
                      },
                    }}
                  >
                    {skillRows[0].map((skill, index) => {
                      const IconComponent = skill.icon
                      return (
                        <motion.div
                          key={`row1-${skill.name}-${index}`}
                          className="flex-shrink-0 flex items-center justify-center space-x-2 sm:space-x-3 bg-gray-800/60 rounded-full px-2 py-1 sm:px-4 sm:py-2 border border-gray-600/40 min-w-[100px] w-[100px] sm:min-w-[140px] sm:w-[140px]"
                          whileHover={{
                            scale: 1.05,
                            background: "linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(34, 197, 94, 0.15))",
                            borderColor: "rgba(59, 130, 246, 0.4)"
                          }}
                          transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        >
                          <IconComponent className={`w-3 h-3 sm:w-4 sm:h-4 ${skill.color} flex-shrink-0`} />
                          <span className="text-gray-300 font-medium whitespace-nowrap text-xs sm:text-sm truncate">{skill.name}</span>
                        </motion.div>
                      )
                    })}
                  </motion.div>
                </div>

                {/* Row 2 - Moving Left to Right */}
                <div className="relative overflow-hidden">
                  <motion.div
                    className="flex space-x-2 sm:space-x-4"
                    animate={{
                      x: [-1200, 0]
                    }}
                    transition={{
                      x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 70,
                        ease: "linear",
                      },
                    }}
                  >
                    {skillRows[1].map((skill, index) => {
                      const IconComponent = skill.icon
                      return (
                        <motion.div
                          key={`row2-${skill.name}-${index}`}
                          className="flex-shrink-0 flex items-center justify-center space-x-2 sm:space-x-3 bg-gray-800/60 rounded-full px-2 py-1 sm:px-4 sm:py-2 border border-gray-600/40 min-w-[100px] w-[100px] sm:min-w-[140px] sm:w-[140px]"
                          whileHover={{
                            scale: 1.05,
                            background: "linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(236, 72, 153, 0.15))",
                            borderColor: "rgba(168, 85, 247, 0.4)"
                          }}
                          transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        >
                          <IconComponent className={`w-3 h-3 sm:w-4 sm:h-4 ${skill.color} flex-shrink-0`} />
                          <span className="text-gray-300 font-medium whitespace-nowrap text-xs sm:text-sm truncate">{skill.name}</span>
                        </motion.div>
                      )
                    })}
                  </motion.div>
                </div>

                {/* Row 3 - Moving Right to Left */}
                <div className="relative overflow-hidden">
                  <motion.div
                    className="flex space-x-2 sm:space-x-4"
                    animate={{
                      x: [0, -1200]
                    }}
                    transition={{
                      x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 80,
                        ease: "linear",
                      },
                    }}
                  >
                    {skillRows[2].map((skill, index) => {
                      const IconComponent = skill.icon
                      return (
                        <motion.div
                          key={`row3-${skill.name}-${index}`}
                          className="flex-shrink-0 flex items-center justify-center space-x-2 sm:space-x-3 bg-gray-800/60 rounded-full px-2 py-1 sm:px-4 sm:py-2 border border-gray-600/40 min-w-[100px] w-[100px] sm:min-w-[140px] sm:w-[140px]"
                          whileHover={{
                            scale: 1.05,
                            background: "linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(59, 130, 246, 0.15))",
                            borderColor: "rgba(34, 197, 94, 0.4)"
                          }}
                          transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        >
                          <IconComponent className={`w-3 h-3 sm:w-4 sm:h-4 ${skill.color} flex-shrink-0`} />
                          <span className="text-gray-300 font-medium whitespace-nowrap text-xs sm:text-sm truncate">{skill.name}</span>
                        </motion.div>
                      )
                    })}
                  </motion.div>
                </div>

                {/* Gradient fade edges */}
                <div className="absolute top-0 left-0 w-8 sm:w-16 h-full bg-gradient-to-r from-gray-900 to-transparent pointer-events-none z-10" />
                <div className="absolute top-0 right-0 w-8 sm:w-16 h-full bg-gradient-to-l from-gray-900 to-transparent pointer-events-none z-10" />
              </div>
            </motion.div>

            {/* Stats - Responsive grid */}
            <motion.div
              className="grid grid-cols-3 gap-3 sm:gap-6 mb-6 sm:mb-8"
              variants={itemVariants}
            >
              {[
                { value: "1+", label: "Year Internship" },
                { value: "9+", label: "Technologies Mastered" },
                { value: "3.95+", label: "GPA Achievement" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  whileHover={{
                    scale: 1.05,
                    y: -2
                  }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <motion.div
                    className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-1"
                    whileHover={{
                      textShadow: "0 0 20px rgba(59, 130, 246, 0.5)"
                    }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons - Responsive */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <motion.a
                href="/about"
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-6 py-2 sm:px-8 sm:py-3 rounded-full font-semibold transition-all duration-300 shadow-lg inline-block relative overflow-hidden group text-sm sm:text-base text-center"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 40px rgba(59, 130, 246, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  layoutId="learn-more-bg"
                />
                <span className="relative z-10">Learn More About Me</span>
              </motion.a>

              <motion.a
                href="/cv/CV_Dika Putra Susanto_2025.pdf"
                download
                className="border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-6 py-2 sm:px-8 sm:py-3 rounded-full font-semibold transition-all duration-300 shadow-lg inline-block relative overflow-hidden group text-sm sm:text-base text-center"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 40px rgba(59, 130, 246, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="relative z-10">Download Resume</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default AboutSection