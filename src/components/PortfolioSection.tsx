"use client"
import React, { useState } from 'react'
import { projects as allProjects } from '../data/projects'
import Image from 'next/image'

const categories = ['All', 'Web Development', 'Mobile Apps', 'UI/UX Design', 'E-commerce']

const PortfolioSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All')
  const [showAll, setShowAll] = useState<boolean>(false)

  // Filtering logic
  const filteredProjects = allProjects.filter(project =>
    activeFilter === 'All' ? true : project.category === activeFilter
  )
  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6)

  // Grid classes logic
  let gridClasses = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  if (displayedProjects.length === 1) gridClasses = 'grid grid-cols-1 justify-center max-w-md mx-auto'
  else if (displayedProjects.length === 2) gridClasses = 'grid grid-cols-1 md:grid-cols-2 justify-center max-w-4xl mx-auto'

  return (
    <section id="portfolio" className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gray-600/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-gray-700/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gray-500/10 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            My <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Portfolio</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            A selection of projects reflecting my passion for backend development and seamless user experiences—demonstrating my growth as an aspiring full stack engineer.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => { setActiveFilter(category); setShowAll(false) }}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105
                ${activeFilter === category
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                  : 'bg-gray-700 text-gray-300 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-cyan-600/20 hover:border-blue-500/50 shadow-md border border-gray-600'
                }`
              }
            >
              {category}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className={`${gridClasses} gap-8`}>
          {displayedProjects.map(project => (
            <div
              key={project.id}
              className="group relative bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                width={400}
                height={256}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex space-x-2">
                      {project.technologies.map(tech => (
                        <span key={tech} className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-semibold rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Project Stats */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      {/* Duration Icon */}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{project.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {/* Views Icon */}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>{project.views}</span>
                    </div>
                  </div>
                  {/* Rating */}
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <svg
                        key={star}
                        className={`w-4 h-4 ${star <= project.rating ? 'text-yellow-400' : 'text-gray-500'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-center py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-md"
                  >
                    Live Demo
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 border-2 border-blue-500/50 hover:border-blue-400 text-gray-300 hover:text-blue-300 text-center py-3 px-4 rounded-lg font-semibold transition-all duration-300 hover:bg-blue-500/10"
                  >
                    Code
                  </a>
                </div>
              </div>

              {/* Hover Effect Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-cyan-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-16">
          {!showAll && filteredProjects.length > 6 && (
            <button
              onClick={() => setShowAll(true)}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Load More Projects
            </button>
          )}
          {showAll && (
            <p className="text-gray-400 italic">
              You&apos;ve seen all my amazing projects! 🎉
            </p>
          )}
        </div>

        {/* Contact CTA */}
        <div className="mt-20 text-center">
          <div className="bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-600 max-w-2xl mx-auto relative">
            {/* Decorative elements */}
            <div className="absolute -top-3 -right-3 w-16 h-16 bg-blue-500/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-3 -left-3 w-20 h-20 bg-cyan-500/10 rounded-full blur-xl"></div>

            <div className="relative">
              <h3 className="text-2xl font-bold text-white mb-4">
                Like what you see?
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                I&apos;m always excited to work on new projects and collaborate with amazing people.
                Let&apos;s discuss how we can bring your ideas to life.
              </p>
              <button
                onClick={() => {
                  const el = document.getElementById('contact')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Start a Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PortfolioSection