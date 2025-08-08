import React, { useState } from 'react'
import JoinModal from '../components/JoinModal'
import project from '../assets/other_images/project.jpg'
import vision from '../assets/other_images/vision.jpg'
import logo from '../assets/logo_png.png'

const Vision = () => {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false)

  const impactMetrics = [
    {
      metric: "1M+",
      label: "Youth Empowered",
      description: "Self-directed learners across Africa"
    },
    {
      metric: "100+",
      label: "Communities",
      description: "Transformed through youth initiatives"
    },
    {
      metric: "50+",
      label: "Innovation Hubs",
      description: "Supporting young entrepreneurs"
    },
    {
      metric: "95%",
      label: "Success Rate",
      description: "Of our program participants"
    }
  ]

  return (
    <div id="vision" className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <img src={logo} alt="Youth Generation Club Logo" className="h-16 md:h-20 w-auto" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
              Our Vision
            </h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-2xl md:text-3xl text-gray-800 leading-tight mb-6 font-medium">
                To become the leading force in
                <span className="text-green-700 font-bold mx-2 border-b-4 border-green-700">youth empowerment</span>
                across Africa, creating a future where every young person has the tools, confidence, and opportunities to shape their destiny.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed font-light">
                We envision a continent where self-learning is not just a skill, but a way of life that drives innovation,
                economic growth, and social transformation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Metrics Section */}
      <div className="relative py-12 px-4 sm:px-6 lg:px-8">
        {/* Fixed Background Image */}
        <div className="absolute inset-0 bg-cover bg-center bg-fixed bg-no-repeat" 
             style={{
               backgroundImage: `url(${project})`
             }}>
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Projected Impact by 2030
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {impactMetrics.map((metric, index) => (
              <div
                key={index}
                className="text-center bg-white/20 backdrop-blur-md p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white/30"
              >
                <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">
                  {metric.metric}
                </div>
                <div className="text-lg font-semibold text-white mb-2">
                  {metric.label}
                </div>
                <div className="text-sm text-gray-200">
                  {metric.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Future Impact Section */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
                The Future We're Building
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Mental learning transformation</h3>
                    <p className="text-gray-700 leading-relaxed">Encourage youth to be self-driven learners who actively seek knowledge and take responsibility for their personal growth.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Cultivate a lifelong love for learning </h3>
                    <p className="text-gray-700 leading-relaxed">Inspire a mindset where learning is not limited to school but continues throughout life, driven by curiosity and passion.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Equip youth with skills and a mindset for future success </h3>
                    <p className="text-gray-700 leading-relaxed">Provide practical abilities and positive thinking habits that prepare young people to succeed in their careers and personal lives.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative h-full">
              <div className="w-full h-full bg-cover bg-center bg-no-repeat shadow-lg" 
                   style={{
                     backgroundImage: `url(${vision})`
                   }}>
                {/* Dark overlay for better text contrast if needed */}
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-900 to-neutral-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Be Part of This Vision
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Join us in building a future where every African youth has the opportunity to learn, grow, and lead.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setIsJoinModalOpen(true)}
              className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 font-semibold text-lg transition-all duration-300 transform hover:scale-105"
            >
              Support Our Vision
            </button>


            <a href="#blog">
            <button className="w-full border-2 border-white text-white hover:bg-white hover:text-neutral-900 px-8 py-4 font-semibold text-lg transition-all duration-300 transform hover:scale-105">
              Learn More
            </button>
            </a>
          </div>
        </div>
      </div>

      {/* Join Modal */}
      <JoinModal 
        isOpen={isJoinModalOpen} 
        onClose={() => setIsJoinModalOpen(false)} 
      />
    </div>
  )
}

export default Vision 