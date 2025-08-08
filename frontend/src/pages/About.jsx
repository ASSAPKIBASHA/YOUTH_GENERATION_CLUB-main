import React, { useState, useEffect } from 'react'
import JoinModal from '../components/JoinModal'
import self from '../assets/other_images/self-learning.jpg'
import logo from '../assets/logo_png.png'

const About = () => {
  const [activeSection, setActiveSection] = useState(0)
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % 3)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div id="mission" className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <img src={logo} alt="Youth Generation Club Logo" className="h-16 md:h-20 w-auto" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
              Our Mission
            </h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-2xl md:text-3xl text-gray-800 leading-tight mb-6 font-medium">
                To teach young people to strive for
                <span className="text-green-700 font-bold mx-2 border-b-4 border-green-700">self-learning</span>
                , empowering them to become independent thinkers and lifelong learners.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed font-light">
                We believe that the greatest gift we can give to youth is not just knowledge, 
                but the ability to acquire knowledge independently, adapt to change, and shape their own future.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
                Why Self-Learning Matters
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Adaptability</h3>
                    <p className="text-gray-700 leading-relaxed">In a rapidly changing world, self-learners can adapt and thrive in any situation.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Independence</h3>
                    <p className="text-gray-700 leading-relaxed">Self-learners don't wait for others to teach them - they take initiative.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Lifelong Growth</h3>
                    <p className="text-gray-700 leading-relaxed">The ability to learn independently ensures continuous personal and professional development.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative h-full">
              <div className="w-full h-full bg-cover bg-center bg-no-repeat shadow-lg" 
                   style={{
                     backgroundImage: `url(${self})`
                   }}>
                {/* Dark overlay for better text contrast if needed */}
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div id="join" className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-900 to-neutral-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Join Us in This Mission
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Together, we can empower the next generation to become confident, independent learners 
            who will shape the future of Africa and the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setIsJoinModalOpen(true)}
              className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 font-semibold text-lg transition-all duration-300 transform hover:scale-105"
            >
              Get Involved
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

export default About
