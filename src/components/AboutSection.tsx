import React from 'react'
import Image from 'next/image'

const skills = [
  'Laravel',
  'Vue.js',
  'PHP',
  'JavaScript',
  'MySQL',
  'Tailwind CSS',
  'Git',
  'Docker',
  'RabbitMQ',
]

const AboutSection: React.FC = () => (
  <section id="about" className="py-20 bg-gray-900">
    <div className="container mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Column - Image */}
        <div className="relative">
          <div className="relative z-10">
          <Image
            src="https://media.licdn.com/dms/image/v2/D5603AQE1dAd66Mlw0w/profile-displayphoto-shrink_800_800/B56ZQsMhXOGoAc-/0/1735908268086?e=1756339200&v=beta&t=t0Zx-gtWrpFhOQHV3ZnIwozYdM01qpqFObUemMxFGPo"
            alt="About me"
            width={400}
            height={400}
            className="rounded-2xl shadow-2xl w-full max-w-md mx-auto lg:mx-0"
            priority
          />
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500 rounded-full opacity-20 blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-cyan-500 rounded-full opacity-20 blur-xl"></div>
          </div>
        </div>

        {/* Right Column - Content */}
        <div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            About{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Me
            </span>
          </h2>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed text-justify">
            Final-year Information System student at Bali State Polytechnic with a strong foundation in backend development and system design. Experienced in building and testing robust systems using PHP, Laravel, MySQL, and RESTful APIs, focusing on reliability and integration.
          </p>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed text-justify">
            Currently expanding into frontend and full-stack development to deliver seamless, user-friendly web experiences. I thrive in collaborative teams, enjoy solving problems, and am fluent in both English and Indonesian. Eager to contribute and grow as a versatile web developer.
          </p>

          {/* Skills */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Skills &amp; Technologies</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {skills.map((skill) => (
                <div key={skill} className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-300 font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-1">
                1+
              </div>
              <div className="text-sm text-gray-400">Year Internship</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-1">
                9+
              </div>
              <div className="text-sm text-gray-400">Technologies Mastered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-1">
                3.9+
              </div>
              <div className="text-sm text-gray-400">GPA Achievement</div>
            </div>
          </div>

          {/* CTA Button */}
          <a
            href="/cv/CV_Dika Putra Susanto_2025.pdf"
            download
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg inline-block"
          >
            Download Resume
          </a>
        </div>
      </div>
    </div>
  </section>
)

export default AboutSection