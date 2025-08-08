import React, { useState, useEffect } from 'react'
import JoinModal from '../components/JoinModal'
import image1 from '../assets/home_images/image1.jpg'
import image2 from '../assets/home_images/image2.jpg'
import image3 from '../assets/home_images/image3.jpg'

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  // Sample slides data with African youth placeholder images
  const slides = [
    {
      id: 1,
      title: "Empowering African Youth",
      subtitle: "Building Tomorrow's Leaders",
      description: "Join us in creating a brighter future for African youth through education, leadership, and community engagement.",
      image: image1,
      cta: "Discover More"
    },
    {
      id: 2,
      title: "Community Impact",
      subtitle: "Making a Difference Together",
      description: "Our programs focus on developing skills, fostering connections, and creating positive change in African communities.",
      image: image2,
      cta: "Get Involved"
    },
    {
      id: 3,
      title: "Innovation & Growth",
      subtitle: "Nurturing Potential",
      description: "We provide opportunities for young Africans to explore, learn, and grow in a supportive and inspiring environment.",
      image: image3,
      cta: "Join Us"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000) // Auto-advance every 5 seconds

    return () => clearInterval(interval)
  }, [currentSlide])

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true)
      setCurrentSlide((prev) => (prev + 1) % slides.length)
      setTimeout(() => setIsTransitioning(false), 500)
    }
  }

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true)
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
      setTimeout(() => setIsTransitioning(false), 500)
    }
  }

  const goToSlide = (index) => {
    if (!isTransitioning && index !== currentSlide) {
      setIsTransitioning(true)
      setCurrentSlide(index)
      setTimeout(() => setIsTransitioning(false), 500)
    }
  }

  const scrollToBlog = () => {
    const blogSection = document.getElementById('blog')
    if (blogSection) {
      blogSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Touch handlers for swipe functionality
  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextSlide()
    }
    if (isRightSwipe) {
      prevSlide()
    }
  }

  return (
    <div id="home" className="relative h-screen bg-neutral-900 overflow-hidden">
      {/* Main Slideshow Container */}
      <div 
        className="relative h-full w-full"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide
                ? 'opacity-100 translate-x-0'
                : index < currentSlide
                ? 'opacity-0 -translate-x-full'
                : 'opacity-0 translate-x-full'
            }`}
          >
            {/* Background Image Container */}
            <div className="absolute inset-0">
              <div 
                className="w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-black/40"></div>
              </div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 h-full flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                  
                  {/* Left Section - Main Content */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="space-y-4">
                      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                        {slide.title}
                      </h1>
                      <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-green-400 leading-relaxed">
                        {slide.subtitle}
                      </h2>
                      <p className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed">
                        {slide.description}
                      </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <button 
                        onClick={() => setIsJoinModalOpen(true)}
                        className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-lg font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                      >
                        {slide.cta}
                      </button>
                      <button 
                        onClick={scrollToBlog}
                        className="border-2 border-white text-white hover:bg-white hover:text-neutral-900 px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-lg font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 transform hover:scale-105"
                      >
                        Learn More
                      </button>
                    </div>
                  </div>

                  {/* Right Section - Visual Element */}
                  <div className="hidden lg:block">
                    <div className="relative">
                      {/* Placeholder for additional visual content */}
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="hidden md:block absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20"
        disabled={isTransitioning}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="hidden md:block absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20"
        disabled={isTransitioning}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-green-500 scale-125'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            disabled={isTransitioning}
          />
        ))}
      </div>

      {/* Floating Elements for Visual Interest */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-blue-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-white/30 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 right-10 w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
      </div>

      {/* Join Modal */}
      <JoinModal 
        isOpen={isJoinModalOpen} 
        onClose={() => setIsJoinModalOpen(false)} 
      />
    </div>
  )
}

export default Home
