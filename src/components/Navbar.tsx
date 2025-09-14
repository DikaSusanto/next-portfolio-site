'use client'

import React, { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX, HiHome, HiUser, HiBriefcase, HiMail } from 'react-icons/hi'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('dashboard')
  const [isNavigating, setIsNavigating] = useState(false)
  const [navigationTimeout, setNavigationTimeout] = useState<NodeJS.Timeout | null>(null)

  const pathname = usePathname()
  const router = useRouter()

  // Set active section based on route
  useEffect(() => {
    if (pathname === '/') {
      // Scroll-based logic (handled below)
      return
    }
    if (pathname.startsWith('/portfolio')) {
      setActiveSection('portfolio')
    } else if (pathname.startsWith('/about')) {
      setActiveSection('about')
    } else {
      setActiveSection('')
    }
  }, [pathname])

  // Track scroll position for navbar background and active section
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50
      setScrolled(isScrolled)

      // Only do active section logic on home page
      if (pathname === '/' && !isNavigating) {
        const sections = ['dashboard', 'about', 'portfolio', 'contact']
        const scrollPosition = window.scrollY + 100

        for (const section of sections) {
          const element = document.getElementById(section)
          if (element) {
            const { offsetTop, offsetHeight } = element
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setActiveSection(section)
              break
            }
          }
        }
      }
    }

    // Use requestAnimationFrame to throttle scroll events
    let ticking = false
    const optimizedScrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(handleScroll)
        ticking = true
        setTimeout(() => { ticking = false }, 16) // ~60fps
      }
    }

    window.addEventListener('scroll', optimizedScrollHandler, { passive: true })
    return () => window.removeEventListener('scroll', optimizedScrollHandler)
  }, [isNavigating, pathname])

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  const scrollToSection = (sectionId: string) => {
    if (navigationTimeout) clearTimeout(navigationTimeout)

    // If not on home, set scroll target and navigate to home
    if (pathname !== '/') {
      window.localStorage.setItem('scrollTarget', sectionId)
      router.push('/')
      closeMenu()
      return
    }

    // On home, scroll as usual
    setIsNavigating(true)
    setActiveSection(sectionId)
    const section = document.getElementById(sectionId)
    if (section) {
      const yOffset = -80
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
      const timeout = setTimeout(() => {
        setIsNavigating(false)
        setNavigationTimeout(null)
      }, 1000)
      setNavigationTimeout(timeout)
    }
    closeMenu()
  }

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: HiHome },
    { id: 'about', label: 'About', icon: HiUser },
    { id: 'portfolio', label: 'Portfolio', icon: HiBriefcase },
    { id: 'contact', label: 'Contact', icon: HiMail },
  ]

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed w-full top-0 z-50 transition-all duration-300 border-b ${scrolled
            ? 'bg-gray-900/90 backdrop-blur-md border-white/10'
            : 'bg-transparent border-transparent'
          }`}
        style={{
          willChange: 'auto',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo/Brand */}
            <motion.div
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.button
                onClick={() => scrollToSection('dashboard')}
                className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
                whileHover={{
                  scale: 1.02,
                  textShadow: "0 0 20px rgba(59, 130, 246, 0.5)"
                }}
              >
                Dika Putra
              </motion.button>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="flex items-center space-x-1 lg:space-x-2 bg-gray-800/30 backdrop-blur-sm rounded-full px-2 py-2 border border-white/10">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative px-4 lg:px-6 py-2 lg:py-3 rounded-full text-sm lg:text-base font-medium transition-all duration-300 ${activeSection === item.id
                        ? 'text-white bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }`}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="hidden lg:inline">{item.label}</span>
                    <item.icon className="lg:hidden text-xl" />
                    {/* Active indicator */}
                    {activeSection === item.id && (
                      <motion.div
                        key={`active-${item.id}`}
                        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full -z-10"
                        layoutId={isNavigating ? undefined : "activeSection"}
                        initial={isNavigating ? { scale: 0, opacity: 0 } : false}
                        animate={isNavigating ? { scale: 1, opacity: 1 } : {}}
                        transition={
                          isNavigating
                            ? { type: "spring", stiffness: 400, damping: 25, duration: 0.2 }
                            : { type: "spring", stiffness: 300, damping: 30 }
                        }
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden relative z-50 p-2 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-white/10"
              onClick={toggleMenu}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMenuOpen ? (
                  <HiX className="text-2xl text-white" />
                ) : (
                  <HiMenu className="text-2xl text-white" />
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
              onClick={closeMenu}
            />

            {/* Mobile Menu */}
            <motion.nav
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-gradient-to-br from-gray-900 via-gray-800 to-black shadow-2xl z-50 md:hidden border-l border-white/10"
            >
              {/* Menu Header */}
              <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Dika Putra
                  </h2>
                  <p className="text-sm text-gray-400">Full Stack Developer</p>
                </div>
                <motion.button
                  onClick={closeMenu}
                  className="p-2 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors"
                  whileTap={{ scale: 0.9 }}
                >
                  <HiX className="text-xl text-white" />
                </motion.button>
              </div>

              {/* Menu Items */}
              <div className="p-6 space-y-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full flex items-center gap-4 p-4 text-left rounded-xl transition-all duration-200 group ${activeSection === item.id
                        ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-white border border-blue-500/30'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`p-2 rounded-lg transition-colors ${activeSection === item.id
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
                        : 'bg-gray-700/50 group-hover:bg-gray-700'
                      }`}>
                      <item.icon className="text-xl" />
                    </div>
                    <div>
                      <span className="font-medium">{item.label}</span>
                      {activeSection === item.id && (
                        <div className="text-xs text-blue-400">Active</div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Mobile CTA */}
              <div className="absolute bottom-6 left-6 right-6">
                <motion.button
                  onClick={() => scrollToSection('contact')}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white py-4 rounded-xl font-medium shadow-lg"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Let&apos;s Work Together
                </motion.button>
              </div>

              {/* Decorative particles for mobile menu */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [-10, 10, -10],
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar