"use client"
import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
  honeypot?: string
}

interface ContactErrors {
  [key: string]: string
}

const ContactSection: React.FC = () => {
  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: ''
  })

  const [errors, setErrors] = useState<ContactErrors>({})
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [showSuccess, setShowSuccess] = useState<boolean>(false)

  const validateForm = (): boolean => {
    const newErrors: ContactErrors = {}

    if (!form.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!isValidEmail(form.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!form.subject.trim()) {
      newErrors.subject = 'Subject is required'
    }

    if (!form.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (form.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Clear previous errors
    setErrors({})

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      if (response.ok) {
        // Reset form on success
        setForm({
          name: '',
          email: '',
          subject: '',
          message: '',
          honeypot: ''
        })

        setShowSuccess(true)
        setTimeout(() => {
          setShowSuccess(false)
        }, 5000)
      } else {
        const errorData = await response.json()
        
        if (response.status === 422 && errorData.errors) {
          setErrors(errorData.errors)
        } else {
          setErrors({
            general: 'Sorry, there was an error sending your message. Please try again later.'
          })
        }
      }
    } catch (error) {
      console.error('Error sending message:', error)
      setErrors({
        general: 'Sorry, there was an error sending your message. Please try again later.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-gray-900 relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Get In <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Touch</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Have a project in mind? Let&apos;s discuss how we can work together to bring your ideas to life.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Let&apos;s talk about your project</h3>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  I&apos;m always excited to work on new projects and collaborate with amazing people.
                  Whether you need a complete web application, mobile app, or just want to discuss
                  an idea, I&apos;m here to help.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Email</h4>
                    <p className="text-gray-300">susantodika123@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Phone</h4>
                    <p className="text-gray-300">+62 881 037 901 293</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Location</h4>
                    <p className="text-gray-300">Bali, Indonesia</p>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-semibold text-white">Quick Response</span>
                </div>
                <p className="text-gray-300">
                  I typically respond within 24 hours and love discussing new opportunities.
                </p>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="font-semibold text-white mb-4">Follow me</h4>
                <div className="flex space-x-4">
                  <a
                    href="https://www.instagram.com/dik.ps?igsh=bTJ1N2g5bzM5aDAw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110 group"
                  >
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/dikasusanto"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110 group"
                  >
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a
                    href="https://github.com/DikaSusanto"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110 group"
                  >
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-purple-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              {/* General Error Message */}
              {errors.general && (
                <div className="mb-6 p-4 bg-red-900/50 border border-red-700 rounded-lg">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-red-300 font-medium">{errors.general}</p>
                  </div>
                </div>
              )}

              <div className="relative">
                {/* Decorative elements with breathing animation - optimized to prevent layout shifts */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <motion.div 
                    className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500/20 rounded-full blur-xl"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.4, 0.8, 0.4],
                      rotate: [0, 360, 0]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    style={{
                      willChange: 'transform',
                      transform: 'translateZ(0)',
                      backfaceVisibility: 'hidden'
                    }}
                  />
                  <motion.div 
                    className="absolute -bottom-6 -left-6 w-32 h-32 bg-cyan-500/20 rounded-full blur-xl"
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [0.3, 0.7, 0.3],
                      rotate: [360, 0, 360]
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.5
                    }}
                    style={{
                      willChange: 'transform',
                      transform: 'translateZ(0)',
                      backfaceVisibility: 'hidden'
                    }}
                  />
                  {/* New purple blob top-left */}
                  <motion.div
                    className="absolute -top-8 -left-8 w-16 h-16 bg-purple-500/20 rounded-full blur-2xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3],
                      rotate: [0, 180, 0]
                    }}
                    transition={{
                      duration: 4.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.7
                    }}
                    style={{
                      willChange: 'transform',
                      transform: 'translateZ(0)',
                      backfaceVisibility: 'hidden'
                    }}
                  />
                  {/* New blue blob bottom-right */}
                  <motion.div
                    className="absolute -bottom-10 -right-10 w-28 h-28 bg-blue-400/20 rounded-full blur-2xl"
                    animate={{
                      scale: [1, 1.25, 1],
                      opacity: [0.2, 0.5, 0.2],
                      rotate: [0, 270, 0]
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 2
                    }}
                    style={{
                      willChange: 'transform',
                      transform: 'translateZ(0)',
                      backfaceVisibility: 'hidden'
                    }}
                  />
                </div>

                <div className="relative bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700">
                  <h3 className="text-2xl font-bold text-white mb-6">Send me a message</h3>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={form.name}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border ${
                            errors.name ? 'border-red-500' : 'border-gray-600'
                          } bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
                          placeholder="Your name"
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={form.email}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border ${
                            errors.email ? 'border-red-500' : 'border-gray-600'
                          } bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
                          placeholder="your@email.com"
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold text-gray-300 mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={form.subject}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border ${
                          errors.subject ? 'border-red-500' : 'border-gray-600'
                        } bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
                        placeholder="Project inquiry"
                      />
                      {errors.subject && <p className="mt-1 text-sm text-red-400">{errors.subject}</p>}
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={form.message}
                        onChange={handleInputChange}
                        rows={5}
                        className={`w-full px-4 py-3 border ${
                          errors.message ? 'border-red-500' : 'border-gray-600'
                        } bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none`}
                        placeholder="Tell me about your project..."
                      />
                      {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
                    </div>

                    {/* Honeypot field */}
                    <input
                      type="text"
                      name="honeypot"
                      value={form.honeypot}
                      onChange={handleInputChange}
                      style={{ display: 'none' }}
                      autoComplete="off"
                    />

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      {!isSubmitting ? (
                        'Send Message'
                      ) : (
                        <span className="flex items-center justify-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Sending...
                        </span>
                      )}
                    </button>
                  </form>

                  {/* Success Message */}
                  {showSuccess && (
                    <div className="mt-6 p-4 bg-green-900/50 border border-green-700 rounded-lg">
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 text-green-400 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <p className="text-green-300 font-medium">
                          Message sent successfully! I&apos;ll get back to you soon.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection