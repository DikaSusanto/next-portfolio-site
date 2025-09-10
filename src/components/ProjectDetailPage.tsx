"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Project } from '../data/projects'

interface ProjectDetailPageProps {
  project: Project
}

const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ project }) => {
  const [selectedImage, setSelectedImage] = useState<string>(project.images[0])
  const [showFullImage, setShowFullImage] = useState<boolean>(false)

  // Particles state - more like HeroSection
  const [particles, setParticles] = useState<
    { left: string; top: string; size: string; color: string; duration: number; delay: number }[]
  >([])

  useEffect(() => {
    // Generate particles similar to HeroSection
    const particleCount = window.innerWidth < 768 ? 12 : 20
    setParticles(
      Array.from({ length: particleCount }).map((_, i) => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: ['w-0.5 h-0.5', 'w-1 h-1', 'w-1.5 h-1.5'][i % 3],
        color: ['bg-blue-400', 'bg-cyan-400', 'bg-purple-400', 'bg-pink-400'][i % 4],
        duration: 4 + Math.random() * 4,
        delay: Math.random() * 4,
      }))
    )
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  } as const

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden pt-20">
      {/* Enhanced Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient overlays */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500/5 to-cyan-500/5"></div>
        
        {/* Large animated blobs - more prominent */}
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [-60, 60, -60],
            y: [-30, 30, -30],
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: '10%', right: '5%' }}
        />
        <motion.div
          className="absolute w-80 h-80 bg-gradient-to-l from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-full blur-3xl"
          animate={{
            x: [60, -60, 60],
            y: [30, -30, 30],
            scale: [1, 1.4, 1],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          style={{ bottom: '10%', left: '5%' }}
        />
        <motion.div
          className="absolute w-72 h-72 bg-gradient-to-br from-cyan-500/15 to-blue-500/15 rounded-full blur-3xl"
          animate={{
            x: [0, 40, 0],
            y: [0, -40, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        />

        {/* Floating particles - more vibrant */}
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${particle.size} ${particle.color} opacity-60`}
            style={{
              left: particle.left,
              top: particle.top,
            }}
            animate={{
              y: [-30, 30, -30],
              x: [-15, 15, -15],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.5, 1.2, 0.5]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Additional moving elements */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"
          animate={{ 
            scale: [1, 1.3, 1], 
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, 360]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl"
          animate={{ 
            scale: [1, 1.4, 1], 
            opacity: [0.1, 0.4, 0.1],
            rotate: [360, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
      </div>

      <motion.div
        className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Enhanced Back Button */}
        <motion.div className="mb-8" variants={itemVariants}>
          <Link 
            href="/" 
            className="inline-flex items-center space-x-3 group bg-gray-800/30 backdrop-blur-md border border-gray-700/50 hover:border-blue-500/50 px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
          >
            <motion.div 
              className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center"
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </motion.div>
            <span className="font-medium text-gray-300 group-hover:text-white transition-colors duration-300">Back to Portfolio</span>
          </Link>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Left Column - Image Gallery + Action Buttons */}
          <motion.div className="order-2 lg:order-1 space-y-6" variants={itemVariants}>
            {/* Main Image */}
            <div className="relative group">
              <motion.div 
                className="relative overflow-hidden rounded-2xl bg-gray-800 border border-gray-700/50"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={selectedImage}
                  alt={`${project.title} - Main View`}
                  width={800}
                  height={450}
                  className="w-full h-[300px] sm:h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Enhanced overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Full View Button */}
                <motion.button
                  onClick={() => setShowFullImage(true)}
                  className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white p-3 rounded-xl backdrop-blur-sm"
                  whileHover={{ scale: 1.1, rotate: 12 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </motion.button>
              </motion.div>
            </div>

            {/* Thumbnails */}
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {project.images.map((image, index) => (
                <motion.button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={`relative flex-shrink-0 overflow-hidden rounded-lg transition-all duration-300 ${
                    selectedImage === image 
                      ? 'ring-2 ring-blue-500 scale-105' 
                      : 'opacity-70 hover:opacity-100'
                  }`}
                  whileHover={{ scale: selectedImage === image ? 1.05 : 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image
                    src={image}
                    alt={`${project.title} - View ${index + 1}`}
                    width={80}
                    height={50}
                    className="w-20 h-12 object-cover"
                  />
                  {selectedImage === image && (
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-blue-500/40 to-cyan-500/40"
                      layoutId="selected-image"
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Action Buttons - Moved here */}
            <div className="space-y-3">
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl transition-all duration-300 group relative overflow-hidden"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 10px 40px rgba(59, 130, 246, 0.4)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    layoutId="live-demo-bg"
                  />
                  <div className="flex items-center space-x-3 relative z-10">
                    <motion.div 
                      className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center"
                      whileHover={{ rotate: 12, scale: 1.1 }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </motion.div>
                    <div>
                      <div className="font-semibold">Live Demo</div>
                      <div className="text-sm text-blue-100">Experience the project</div>
                    </div>
                  </div>
                  <motion.svg 
                    className="w-5 h-5 relative z-10" 
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </motion.svg>
                </motion.a>
              )}
              
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-4 bg-gray-800/50 backdrop-blur-md border border-gray-600 hover:border-blue-400 text-gray-300 hover:text-blue-300 rounded-xl transition-all duration-300 group relative overflow-hidden"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 10px 30px rgba(100, 116, 139, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  layoutId="github-bg"
                />
                <div className="flex items-center space-x-3 relative z-10">
                  <motion.div 
                    className="w-10 h-10 bg-gray-700 group-hover:bg-gray-600 rounded-lg flex items-center justify-center"
                    whileHover={{ rotate: 12, scale: 1.1 }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </motion.div>
                  <div>
                    <div className="font-semibold">Source Code</div>
                    <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Explore on GitHub</div>
                  </div>
                </div>
                <motion.svg 
                  className="w-5 h-5 relative z-10" 
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </motion.svg>
              </motion.a>
            </div>
          </motion.div>

          {/* Right Column - Project Info */}
          <motion.div className="order-1 lg:order-2 space-y-6" variants={itemVariants}>
            
            {/* Header */}
            <div>
              <motion.div 
                className="flex flex-wrap gap-2 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {project.category.map((cat, index) => (
                  <motion.span 
                    key={cat}
                    className="px-3 py-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-medium rounded-full"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 5px 15px rgba(59, 130, 246, 0.4)"
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 300 }}
                  >
                    {cat}
                  </motion.span>
                ))}
              </motion.div>
              
              <motion.h1 
                className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
                whileHover={{ 
                  scale: 1.02,
                  textShadow: "0 0 30px rgba(59, 130, 246, 0.3)"
                }}
              >
                <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
                  {project.title}
                </span>
              </motion.h1>

              <motion.div 
                className="flex items-center space-x-3 mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.div 
                  className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </motion.div>
                <div>
                  <div className="text-lg font-semibold text-white">{project.duration}</div>
                  <div className="text-sm text-gray-400">Development Period</div>
                </div>
              </motion.div>

              <motion.p 
                className="text-gray-300 leading-relaxed mb-6 text-justify"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {project.detailedDescription}
              </motion.p>
            </div>

            {/* Tech Stack */}
            <motion.div 
              className="bg-gray-800/30 backdrop-blur-md rounded-xl p-5 border border-gray-700/50"
              whileHover={{ 
                borderColor: "rgba(147, 51, 234, 0.5)",
                boxShadow: "0 10px 30px rgba(147, 51, 234, 0.1)"
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.h3 
                className="text-lg font-semibold mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Tech Stack
                </span>
              </motion.h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <motion.span
                    key={tech}
                    className="px-3 py-1.5 bg-gray-700/50 text-gray-200 rounded-lg text-sm font-medium border border-gray-600/50 hover:border-purple-500/50 transition-colors duration-300 cursor-default"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.05 }}
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: "rgba(147, 51, 234, 0.1)",
                      borderColor: "rgba(147, 51, 234, 0.5)"
                    }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Key Features */}
            <motion.div 
              className="bg-gray-800/30 backdrop-blur-md rounded-xl p-5 border border-gray-700/50"
              whileHover={{ 
                borderColor: "rgba(34, 197, 94, 0.5)",
                boxShadow: "0 10px 30px rgba(34, 197, 94, 0.1)"
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.h3 
                className="text-lg font-semibold mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  Key Features
                </span>
              </motion.h3>
              <div className="space-y-2">
                {project.features.slice(0, 6).map((feature, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-start space-x-3 group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <motion.div 
                      className="w-2 h-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 mt-2 flex-shrink-0"
                      whileHover={{ scale: 1.5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">{feature}</span>
                  </motion.div>
                ))}
                {project.features.length > 6 && (
                  <motion.div 
                    className="text-xs text-gray-400 pt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6 }}
                  >
                    +{project.features.length - 6} more features
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced Full Image Modal */}
      {showFullImage && (
        <motion.div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative max-w-7xl max-h-full">
            <motion.button
              onClick={() => setShowFullImage(false)}
              className="absolute -top-16 right-0 bg-gray-800/80 hover:bg-gray-700 text-white p-3 rounded-xl transition-all duration-300 backdrop-blur-sm"
              whileHover={{ 
                scale: 1.1, 
                rotate: 90,
                backgroundColor: "rgba(59, 130, 246, 0.2)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
            <motion.div 
              className="relative overflow-hidden rounded-2xl shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Image
                src={selectedImage}
                alt={`${project.title} - Full View`}
                width={1400}
                height={900}
                className="max-w-full max-h-[90vh] object-contain"
              />
              <div className="absolute inset-0 ring-1 ring-white/10 rounded-2xl pointer-events-none"></div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default ProjectDetailPage