"use client"

import { useEffect } from 'react'

export default function ClientScrollHandler() {
  useEffect(() => {
    const scrollTarget = window.localStorage.getItem('scrollTarget')
    if (scrollTarget) {
      setTimeout(() => {
        const section = document.getElementById(scrollTarget)
        if (section) {
          const yOffset = -80
          const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset
          window.scrollTo({ top: y, behavior: 'smooth' })
          // Fire a synthetic scroll event so Navbar updates activeSection
          setTimeout(() => {
            window.dispatchEvent(new Event('scroll'))
          }, 400) // Wait for smooth scroll to finish
        }
        window.localStorage.removeItem('scrollTarget')
      }, 100)
    }
  }, [])

  return null
}