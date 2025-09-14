"use client"

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import {
  GraduationCap,
  Award,
  Calendar,
  MapPin,
  BookOpen,
  Briefcase,
  ExternalLink,
  CheckCircle,
  Star,
  Target
} from 'lucide-react'

const personalInfo = {
  name: "Dika Putra Susanto",
  title: "Final-year Information System Student | Backend & Full-Stack Developer",
  whoAmI: "Final-year Information System student at Bali State Polytechnic with a strong foundation in backend development and system design. Through academic and internship projects, I've built and tested robust systems using PHP, Laravel, MySQL, and REST APIs — with a focus on reliability, maintainability, and integration. Currently expanding into frontend and full-stack development using React, Next.js, and Tailwind CSS to create seamless, user-friendly experiences. I thrive in collaborative teams, enjoy problem-solving through critical thinking, and am eager to contribute as a versatile and adaptive developer.",
  images: [
    "/img/PFP-1.JPG",
    "/img/pfp-2.jpg",
    "/img/PFP-3.jpg"
  ],
  location: "Bali, Indonesia",
  email: "susantodika123@gmail.com",
  phone: "+62 881-0379-01293"
}

const education = {
  degree: "Associate Degree (D3) in Information Management",
  major: "Information Systems",
  institution: "Bali State Polytechnic",
  gpa: "3.92",
  maxGpa: "4.00",
  period: "2022 - 2025",
  location: "Bali, Indonesia",
  relevantCourses: [
    "Web Programming",
    "Mobile Development",
    "Object-Oriented Programming",
    "Database Design",
    "Cloud Technology",
    "Management Information Systems",
    "System Analysis & Design",
  ],
  summary: "Final-year Information System student with a GPA of 3.92/4.00. Developed a strong foundation in backend development, database design, and web technologies through academic projects and final year thesis. My academic journey has been complemented by hands-on industry experience, bridging theory with practical application."
}

const experiences = [
  {
    title: "System Analyst & UI/UX Designer",
    company: "PT Marktel (Academic Project)",
    type: "Academic Project",
    period: "Sept 2023 - Feb 2024",
    location: "Bali, Indonesia",
    description: "Led the analysis and design of a logistics management system using SDLC methodology and modern prototyping tools.",
    achievements: [
      "Created Figma prototypes and wireframes for multi-department logistics workflows",
      "Designed database schema and reporting flows",
    ],
    technologies: ["SDLC", "Figma", "MySQL", "System Design"]
  },
  {
    title: "Software Engineer Intern",
    company: "PT. Bank Pembangunan Daerah Bali",
    type: "Internship",
    period: "May 2024 - Jul 2025",
    location: "Bali, Indonesia",
    description: "Contributed to backend and API development, system testing, and internal application support in a banking environment.",
    achievements: [
      "Developed and tested 80+ SNAP APIs (Virtual Account, Transfers, Balance Inquiry) with signature authentication and simulators",
      "Built an email service web app with Laravel, RabbitMQ, and Elastic Stack for prioritized batch email processing",
      "Conducted UAT and system testing for key banking features, reducing production issues"
    ],
    technologies: ["Laravel", "PHP", "RabbitMQ", "Elastic Stack", "MySQL", "REST API"]
  },
  {
    title: "Full Stack Developer",
    company: "Bali Pisang Sale - Personal Project",
    type: "Personal - Freelance",
    period: "Jul 2025 - Present",
    location: "Bali, Indonesia",
    description: "Developed an e-commerce platform for a Bali-based UMKM, handling both frontend and backend implementation.",
    achievements: [
      "Integrated Midtrans payment gateway with secure webhook handling",
      "Implemented dynamic shipping via RajaOngkir API",
      "Built an admin dashboard with order management, logging, and validation"
    ],
    technologies: ["Next.js", "Tailwind CSS", "Prisma ORM", "PostgreSQL", "Midtrans API", "Redis"]
  },
]

const certificates = [
  {
    name: "TOEIC Listening & Reading",
    issuer: "ETS",
    date: "2025",
    image: "/certificates/TOEIC-CERTIFICATE.jpg",
    credentialId: "Score: 955 / 990"
  },
  {
    name: "1st Place - Internal English Debate Competition",
    issuer: "Bali State Polytechnic",
    date: "Oct 2023",
    image: "/certificates/debate-win.jpg",
    credentialId: ""
  },
]

function useExperienceTransforms(scrollYProgress: MotionValue<number>, length: number) {
  // Create individual useTransform calls for each experience at top level
  const progress0 = useTransform(scrollYProgress, [0 / length, 1 / length], [0, 1])
  const progress1 = useTransform(scrollYProgress, [1 / length, 2 / length], [0, 1])
  const progress2 = useTransform(scrollYProgress, [2 / length, 3 / length], [0, 1])

  // Create filter transforms at top level
  const filter0 = useTransform(
    progress0,
    [0, 0.3, 0.7, 1],
    [
      "grayscale(100%) brightness(0.4)",
      "grayscale(80%) brightness(0.6)",
      "grayscale(20%) brightness(0.9)",
      "grayscale(0%) brightness(1)"
    ]
  )
  const filter1 = useTransform(
    progress1,
    [0, 0.3, 0.7, 1],
    [
      "grayscale(100%) brightness(0.4)",
      "grayscale(80%) brightness(0.6)",
      "grayscale(20%) brightness(0.9)",
      "grayscale(0%) brightness(1)"
    ]
  )
  const filter2 = useTransform(
    progress2,
    [0, 0.3, 0.7, 1],
    [
      "grayscale(100%) brightness(0.4)",
      "grayscale(80%) brightness(0.6)",
      "grayscale(20%) brightness(0.9)",
      "grayscale(0%) brightness(1)"
    ]
  )

  // Create color transforms at top level
  const color0 = useTransform(progress0, [0, 0.5, 1], ["#6b7280", "#9ca3af", "#60a5fa"])
  const color1 = useTransform(progress1, [0, 0.5, 1], ["#6b7280", "#9ca3af", "#60a5fa"])
  const color2 = useTransform(progress2, [0, 0.5, 1], ["#6b7280", "#9ca3af", "#60a5fa"])

  // Return arrays with the exact number of items as experiences
  const itemFilters = [filter0, filter1, filter2].slice(0, length)
  const nodeColors = [color0, color1, color2].slice(0, length)

  return { itemFilters, nodeColors }
}

const AboutDetails: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  })
  const timelineProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  // <-- FIX: use the helper hook so useTransform calls are at top-level inside a hook
  const { itemFilters, nodeColors } = useExperienceTransforms(
    scrollYProgress,
    experiences.length
  )

  const [showCertModal, setShowCertModal] = useState(false)
  const [selectedCert, setSelectedCert] = useState<typeof certificates[0] | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  } as const

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    }
  } as const

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden pt-20">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
          animate={{
            backgroundPosition: ['0% 0%', '50px 50px']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Secondary grid for net effect */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 197, 94, 0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 197, 94, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: '25px 25px'
          }}
          animate={{
            backgroundPosition: ['25px 25px', '0% 0%']
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <motion.div
        className="container mx-auto px-4 sm:px-6 relative z-10 py-8 sm:py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >

        {/* Enhanced Back Button */}
        <motion.div className="mb-6 sm:mb-8" variants={itemVariants}>
          <Link
            href="/"
            className="inline-flex items-center space-x-2 sm:space-x-3 group bg-gray-800/30 backdrop-blur-md border border-gray-700/50 hover:border-blue-500/50 px-4 sm:px-6 py-2 sm:py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
          >
            <motion.div
              className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center"
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </motion.div>
            <span className="font-medium text-sm sm:text-base text-gray-300 group-hover:text-white transition-colors duration-300">Back to Portfolio</span>
          </Link>
        </motion.div>

        {/* Who Am I Section */}
        <motion.section
          className="mb-12 sm:mb-16 lg:mb-20"
          variants={itemVariants}
        >
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Left: Who Am I Content */}
            <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
              <motion.div
                whileHover={{
                  scale: 1.02,
                  textShadow: "0 0 20px rgba(59, 130, 246, 0.3)"
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.h1
                  className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Who am{' '}
                  <motion.span
                    className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent inline-block"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    I?
                  </motion.span>
                </motion.h1>
              </motion.div>

              <motion.p
                className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                whileHover={{ color: "#e5e7eb" }}
              >
                {personalInfo.whoAmI}
              </motion.p>

              <motion.div
                className="space-y-2 sm:space-y-3 pt-3 sm:pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="flex items-center text-sm sm:text-base text-gray-300">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mr-2 sm:mr-3 flex-shrink-0" />
                  <span>{personalInfo.location}</span>
                </div>
                <div className="flex items-center text-sm sm:text-base text-gray-300">
                  <Target className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 mr-2 sm:mr-3 flex-shrink-0" />
                  <span>Ready for new opportunities</span>
                </div>
              </motion.div>
            </div>

            {/* Right: 3-Image Diagonal Collage */}
            <motion.div
              className="relative h-80 sm:h-96 lg:h-[500px] w-full order-1 lg:order-2"
              variants={itemVariants}
            >
              {/* Image 1 - Top Left */}
              <motion.div
                className="absolute top-0 left-0 w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48"
                whileHover={{ scale: 1.05, zIndex: 10 }}
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src={personalInfo.images[0]}
                  alt="Profile 1"
                  fill
                  className="rounded-xl shadow-lg object-cover border-2 border-gray-800"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-xl" />
              </motion.div>

              {/* Image 2 - Center Right */}
              <motion.div
                className="absolute top-8 sm:top-12 right-4 w-36 h-36 sm:w-44 sm:h-44 lg:w-56 lg:h-56 z-10"
                whileHover={{ scale: 1.05, zIndex: 20 }}
                animate={{ y: [0, -30, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <Image
                  src={personalInfo.images[1]}
                  alt="Profile 2"
                  fill
                  className="rounded-xl shadow-xl object-cover border-2 border-gray-700"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-xl" />
              </motion.div>

              {/* Image 3 - Bottom Left */}
              <motion.div
                className="absolute bottom-0 left-8 sm:left-12 w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44"
                whileHover={{ scale: 1.05, zIndex: 15 }}
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <Image
                  src={personalInfo.images[2]}
                  alt="Profile 3"
                  fill
                  className="rounded-xl shadow-lg object-cover border-2 border-gray-800"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-xl" />
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Education Section - Hybrid Layout */}
        <motion.section
          className="mb-16 sm:mb-24 lg:mb-32"
          variants={itemVariants}
        >
          <motion.h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-8 sm:mb-12 text-center"
            whileHover={{
              scale: 1.02,
              textShadow: "0 0 30px rgba(59, 130, 246, 0.4)"
            }}
          >
            Education
          </motion.h2>

          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Institution & Degree */}
            <motion.div
              className="bg-gray-800/40 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-700/50 lg:col-span-2"
              whileHover={{
                background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(34, 197, 94, 0.1))",
                borderColor: "rgba(59, 130, 246, 0.3)",
                scale: 1.02
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start sm:items-center mb-4 sm:mb-6">
                <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 mr-3 sm:mr-4 mt-1 sm:mt-0 flex-shrink-0" />
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">{education.degree}</h3>
                  <p className="text-base sm:text-lg text-cyan-400 font-semibold">{education.major}</p>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                <h4 className="text-base sm:text-lg font-semibold text-white">{education.institution}</h4>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-gray-300 space-y-2 sm:space-y-0 sm:space-x-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-400 flex-shrink-0" />
                    <span className="text-sm sm:text-base">{education.period}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-cyan-400 flex-shrink-0" />
                    <span className="text-sm sm:text-base">{education.location}</span>
                  </div>
                </div>
              </div>

              <motion.p
                className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg"
                whileHover={{ color: "#e5e7eb" }}
              >
                {education.summary}
              </motion.p>
            </motion.div>

            {/* GPA Container */}
            <motion.div
              className="bg-gray-800/40 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-700/50 flex flex-col items-center justify-center text-center"
              whileHover={{
                background: "linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1))",
                borderColor: "rgba(168, 85, 247, 0.3)",
                scale: 1.02
              }}
              transition={{ duration: 0.3 }}
            >
              <Star className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-400 mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Current GPA</h3>
              <motion.div
                className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"
                whileHover={{ scale: 1.1 }}
              >
                {education.gpa}
              </motion.div>
            </motion.div>
          </div>

          {/* Relevant Coursework - Hybrid Layout */}
          <motion.div
            className="mt-6 sm:mt-8 bg-gray-800/40 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-700/50"
            whileHover={{
              background: "linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(59, 130, 246, 0.1))",
              borderColor: "rgba(34, 197, 94, 0.3)"
            }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-6 sm:mb-8 flex items-center justify-center">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-cyan-400" />
              Relevant Coursework
            </h3>

            {/* Mobile Layout */}
            <div className="block lg:hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {education.relevantCourses.map((course, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-700/30 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center border border-gray-600/30"
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(59, 130, 246, 0.1)",
                      borderColor: "rgba(59, 130, 246, 0.3)"
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <CheckCircle className="w-4 h-4 text-green-400 mb-2 mx-auto" />
                    <span className="text-gray-300 font-medium text-xs sm:text-sm leading-tight">{course}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Desktop Layout - Original centered rows of 4 */}
            <div className="hidden lg:block">
              {Array.from({ length: Math.ceil(education.relevantCourses.length / 4) }).map((_, rowIdx) => {
                const start = rowIdx * 4
                const rowCourses = education.relevantCourses.slice(start, start + 4)
                return (
                  <div
                    key={rowIdx}
                    className="flex justify-center gap-4 mb-4"
                  >
                    {rowCourses.map((course, index) => (
                      <motion.div
                        key={index}
                        className="bg-gray-700/30 rounded-xl p-4 text-center border border-gray-600/30 min-w-[120px] flex-1"
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: "rgba(59, 130, 246, 0.1)",
                          borderColor: "rgba(59, 130, 246, 0.3)"
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: (rowIdx * 4 + index) * 0.1 }}
                      >
                        <CheckCircle className="w-4 h-4 text-green-400 mb-2 mx-auto" />
                        <span className="text-gray-300 font-medium text-sm">{course}</span>
                      </motion.div>
                    ))}
                  </div>
                )
              })}
            </div>
          </motion.div>
        </motion.section>

        {/* Experience Section - Mobile Optimized Central Timeline */}
        <motion.section
          className="mb-12 sm:mb-16 lg:mb-20"
          variants={itemVariants}
          ref={timelineRef}
        >
          <motion.h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-8 sm:mb-12 text-center"
            whileHover={{
              scale: 1.02,
              textShadow: "0 0 20px rgba(59, 130, 246, 0.3)"
            }}
          >
            Professional Experience
          </motion.h2>

          <div className="relative max-w-4xl mx-auto">
            {/* Central Timeline Line for Mobile */}
            <div className="absolute left-6 sm:left-8 md:left-1/2 md:transform md:-translate-x-1/2 w-0.5 sm:w-1 h-full bg-gray-700 rounded-full">
              <motion.div
                className="w-full bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full origin-top"
                style={{ height: timelineProgress }}
              />
            </div>

            <div className="space-y-8 sm:space-y-12 lg:space-y-16">
              {experiences.map((exp, index) => {
                const itemFilter = itemFilters[index]
                const nodeColor = nodeColors[index]

                return (
                  <motion.div
                    key={index}
                    className="relative"
                    initial={{
                      opacity: 0,
                      x: -30
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0
                    }}
                    style={{
                      filter: itemFilter
                    }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    {/* Mobile/Tablet: Left-aligned with central timeline */}
                    <div className="md:hidden pl-16 sm:pl-20">
                      <motion.div
                        className="bg-gray-800/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-700/40"
                        whileHover={{
                          background: "rgba(31, 41, 55, 0.6)",
                          borderColor: "rgba(59, 130, 246, 0.4)",
                          scale: 1.02,
                          y: -3
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-3 sm:mb-4">
                          <div className="flex items-center">
                            <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 mr-2 sm:mr-3 mt-0.5" />
                            <span className="text-xs text-cyan-400 bg-cyan-400/10 px-2 sm:px-3 py-1 rounded-full font-medium border border-cyan-400/20">
                              {exp.type}
                            </span>
                          </div>
                        </div>

                        {/* Company & Title */}
                        <div className="mb-3 sm:mb-4">
                          <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-1 leading-tight">{exp.title}</h3>
                          <p className="text-blue-400 font-semibold mb-2 text-sm sm:text-base">{exp.company}</p>

                          {/* Period & Location */}
                          <div className="flex flex-col sm:flex-row sm:items-center text-gray-400 text-xs sm:text-sm space-y-1 sm:space-y-0 sm:space-x-4">
                            <div className="flex items-center">
                              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                              <span>{exp.period}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                              <span>{exp.location}</span>
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-300 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed">
                          {exp.description}
                        </p>

                        {/* Achievements */}
                        <div className="mb-3 sm:mb-4">
                          <h4 className="text-white font-semibold mb-2 sm:mb-3 text-xs sm:text-sm flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                            Key Achievements
                          </h4>
                          <ul className="space-y-1 sm:space-y-2">
                            {exp.achievements.map((achievement, i) => (
                              <li key={i} className="text-gray-300 text-xs sm:text-sm flex items-start">
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full mt-1.5 sm:mt-2 mr-2 sm:mr-3 flex-shrink-0" />
                                <span className="leading-relaxed">{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {exp.technologies.map((tech, i) => (
                            <motion.span
                              key={i}
                              className="text-xs bg-gray-700/50 text-gray-300 px-2 sm:px-3 py-1 rounded-full border border-gray-600/30"
                              whileHover={{
                                backgroundColor: "rgba(59, 130, 246, 0.1)",
                                borderColor: "rgba(59, 130, 246, 0.3)",
                                color: "#93c5fd"
                              }}
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    </div>

                    {/* Desktop: Alternating sides */}
                    <div className="hidden md:flex items-center">
                      <div className={`w-1/2 ${index % 2 === 0 ? 'pr-6 lg:pr-8' : 'pl-6 lg:pl-8 order-2'}`}>
                        <motion.div
                          className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/40"
                          whileHover={{
                            background: "rgba(31, 41, 55, 0.6)",
                            borderColor: "rgba(59, 130, 246, 0.4)",
                            scale: 1.02,
                            y: -3
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {/* Header */}
                          <div className={`flex items-center justify-between mb-4 ${index % 2 === 0 ? '' : 'flex-row-reverse'}`}>
                            <div className={`flex items-center ${index % 2 === 0 ? '' : 'flex-row-reverse'}`}>
                              <Briefcase className="w-6 h-6 text-blue-400" />
                              <span className={`text-xs text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full font-medium border border-cyan-400/20 ${index % 2 === 0 ? 'ml-3' : 'mr-3'}`}>
                                {exp.type}
                              </span>
                            </div>
                          </div>

                          {/* Company & Title */}
                          <div className={`mb-4 ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>
                            <h3 className="text-lg lg:text-xl font-bold text-white mb-1">{exp.title}</h3>
                            <p className="text-blue-400 font-semibold mb-2">{exp.company}</p>

                            {/* Period & Location */}
                            <div className={`flex items-center text-gray-400 text-sm space-x-4 ${index % 2 === 0 ? 'justify-start' : 'justify-end flex-row-reverse space-x-reverse'}`}>
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-2" />
                                <span>{exp.period}</span>
                              </div>
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-2" />
                                <span>{exp.location}</span>
                              </div>
                            </div>
                          </div>

                          {/* Description */}
                          <p className={`text-gray-300 mb-4 text-sm leading-relaxed ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>
                            {exp.description}
                          </p>

                          {/* Achievements */}
                          <div className="mb-4">
                            <h4 className={`text-white font-semibold mb-3 text-sm flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                              <CheckCircle className={`w-4 h-4 text-green-400 ${index % 2 === 0 ? 'mr-2' : 'ml-2 order-2'}`} />
                              Key Achievements
                            </h4>
                            <ul className="space-y-2">
                              {exp.achievements.map((achievement, i) => (
                                <li key={i} className={`text-gray-300 text-sm flex items-start ${index % 2 === 0 ? '' : 'flex-row-reverse text-right'}`}>
                                  <div className={`w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0 ${index % 2 === 0 ? 'mr-3' : 'ml-3'}`} />
                                  <span>{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Technologies */}
                          <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                            {exp.technologies.map((tech, i) => (
                              <motion.span
                                key={i}
                                className="text-xs bg-gray-700/50 text-gray-300 px-3 py-1 rounded-full border border-gray-600/30"
                                whileHover={{
                                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                                  borderColor: "rgba(59, 130, 246, 0.3)",
                                  color: "#93c5fd"
                                }}
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>
                        </motion.div>
                      </div>

                      <div className="w-1/2" />
                    </div>

                    {/* Timeline Node - Responsive positioning */}
                    <motion.div
                      className="absolute left-5 sm:left-7 md:left-1/2 md:transform md:-translate-x-1/2 top-6 w-3 h-3 sm:w-4 sm:h-4 bg-blue-400 rounded-full border-2 sm:border-4 border-gray-900 z-10"
                      initial={{ scale: 0 }}
                      whileInView={{
                        scale: 1
                      }}
                      whileHover={{
                        scale: 1.3,
                        backgroundColor: "#3b82f6",
                        boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)"
                      }}
                      style={{
                        backgroundColor: nodeColor
                      }}
                      transition={{ type: "spring", stiffness: 400, delay: index * 0.2 }}
                      viewport={{ once: true, amount: 0.3 }}
                    />
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.section>

        {/* Achievements Section - Hybrid Layout */}
        <motion.section variants={itemVariants}>
          <motion.h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-8 sm:mb-12 text-center"
            whileHover={{
              scale: 1.02,
              textShadow: "0 0 20px rgba(59, 130, 246, 0.3)"
            }}
          >
            Achievements & Certificates
          </motion.h2>

          {/* Mobile Layout */}
          <div className="block lg:hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
              {certificates.map((cert, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-800/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-700/40 w-full"
                  whileHover={{
                    background: "rgba(31, 41, 55, 0.4)",
                    borderColor: "rgba(59, 130, 246, 0.3)",
                    scale: 1.02,
                    y: -3
                  }}
                  transition={{ duration: 0.3 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center mb-3 sm:mb-4">
                    <Award className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-gray-400">{cert.date}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-tight">{cert.name}</h3>
                  <p className="text-blue-400 font-semibold mb-3 sm:mb-4 text-sm sm:text-base">{cert.issuer}</p>
                  {cert.credentialId && (
                    <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
                      Credential ID: {cert.credentialId}
                    </p>
                  )}
                  <motion.button
                    className="text-cyan-400 hover:text-cyan-300 flex items-center text-xs sm:text-sm font-medium"
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => {
                      setSelectedCert(cert)
                      setShowCertModal(true)
                    }}
                  >
                    View Certificate <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 flex-shrink-0" />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Desktop Layout - Original centered rows */}
          <div className="hidden lg:block">
            {Array.from({ length: Math.ceil(certificates.length / 3) }).map((_, rowIdx) => {
              const start = rowIdx * 3
              const rowCerts = certificates.slice(start, start + 3)
              return (
                <div
                  key={rowIdx}
                  className="flex justify-center gap-6 xl:gap-8 mb-6"
                >
                  {rowCerts.map((cert, index) => (
                    <motion.div
                      key={index}
                      className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/40 w-full max-w-sm"
                      whileHover={{
                        background: "rgba(31, 41, 55, 0.4)",
                        borderColor: "rgba(59, 130, 246, 0.3)",
                        scale: 1.02,
                        y: -3
                      }}
                      transition={{ duration: 0.3 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center mb-4">
                        <Award className="w-6 h-6 text-yellow-400 mr-3" />
                        <span className="text-sm text-gray-400">{cert.date}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{cert.name}</h3>
                      <p className="text-blue-400 font-semibold mb-4">{cert.issuer}</p>
                      {cert.credentialId && (
                        <p className="text-gray-400 text-sm mb-4">
                          Credential ID: {cert.credentialId}
                        </p>
                      )}
                      <motion.button
                        className="text-cyan-400 hover:text-cyan-300 flex items-center text-sm font-medium"
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => {
                          setSelectedCert(cert)
                          setShowCertModal(true)
                        }}
                      >
                        View Certificate <ExternalLink className="w-4 h-4 ml-2" />
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              )
            })}
          </div>
        </motion.section>
      </motion.div>

      {/* Certificate Modal - Mobile Optimized */}
      {showCertModal && selectedCert && (
        <motion.div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-3 sm:p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => setShowCertModal(false)}
        >
          <motion.button
            onClick={() => setShowCertModal(false)}
            className="absolute top-4 sm:top-6 right-4 sm:right-6 bg-gray-800/80 hover:bg-gray-700 text-white p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300 backdrop-blur-sm z-50"
            whileHover={{
              scale: 1.1,
              rotate: 90,
              backgroundColor: "rgba(59, 130, 246, 0.2)"
            }}
            whileTap={{ scale: 0.95 }}
            aria-label="Close certificate modal"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
          <div className="relative max-w-4xl w-full max-h-full" onClick={e => e.stopPropagation()}>
            <motion.div
              className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Image
                src={selectedCert.image}
                alt={selectedCert.name}
                width={1200}
                height={800}
                className="max-w-full max-h-[70vh] sm:max-h-[80vh] object-contain"
              />
              <div className="absolute inset-0 ring-1 ring-white/10 rounded-xl sm:rounded-2xl pointer-events-none"></div>
            </motion.div>
            <div className="mt-3 sm:mt-4 text-center text-white px-2">
              <div className="font-bold text-base sm:text-lg leading-tight">{selectedCert.name}</div>
              <div className="text-sm text-gray-300 mt-1">{selectedCert.issuer} &middot; {selectedCert.date}</div>
              {selectedCert.credentialId && (
                <div className="text-xs text-gray-400 mt-1 leading-relaxed">{selectedCert.credentialId}</div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default AboutDetails
