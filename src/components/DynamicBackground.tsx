// src/components/DynamicBackground.tsx
"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Blob {
  left: string
  top: string
  size: number
  color: string
  duration: number
  delay: number
}

interface DynamicBackgroundProps {
  particleCount?: number
  blobCount?: number
  blobColors?: string[]
  particleColor?: string
}

const DynamicBackground: React.FC<DynamicBackgroundProps> = ({
  particleCount = 25,
  blobCount = 10,
  blobColors = ["bg-blue-500/30", "bg-cyan-500/30"],
  particleColor = "bg-blue-300"
}) => {
  const [blobs, setBlobs] = useState<Blob[]>([])
  const [particles, setParticles] = useState<
    { left: string; top: string; duration: number; delay: number }[]
  >([])

  useEffect(() => {
    // Generate particles
    const count = typeof window !== "undefined" && window.innerWidth < 768 ? Math.min(particleCount, 15) : particleCount
    const particlePositions = Array.from({ length: count }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }))
    setParticles(particlePositions)

    // Generate blobs
    const bCount = typeof window !== "undefined" && window.innerWidth < 768 ? Math.min(blobCount, 5) : blobCount
    const blobConfigs = Array.from({ length: bCount }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 120 + Math.random() * 200, // 120px – 320px
      color: blobColors[Math.floor(Math.random() * blobColors.length)],
      duration: 6 + Math.random() * 4,
      delay: Math.random() * 4,
    }))
    setBlobs(blobConfigs)
  }, [particleCount, blobCount])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Floating Particles */}
      {particles.map((pos, i) => (
        <motion.div
          key={`particle-${i}`}
          className={`absolute w-1 h-1 sm:w-1.5 sm:h-1.5 ${particleColor} rounded-full opacity-70`}
          style={{ left: pos.left, top: pos.top }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.3, 0.9, 0.3],
            scale: [0.6, 1.2, 0.6],
          }}
          transition={{
            duration: pos.duration,
            repeat: Infinity,
            delay: pos.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Glowing Blobs */}
      {blobs.map((blob, i) => (
        <motion.div
          key={`blob-${i}`}
          className={`absolute rounded-full blur-3xl ${blob.color}`}
          style={{
            left: blob.left,
            top: blob.top,
            width: blob.size,
            height: blob.size,
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            delay: blob.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

export default DynamicBackground