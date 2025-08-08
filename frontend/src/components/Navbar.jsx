import React, { useState, useEffect } from 'react'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Check if scrolled past threshold for background change
      setIsScrolled(currentScrollY > 10)
      
      // Determine scroll direction and update visibility
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past initial 100px - hide navbar
        setIsVisible(false)
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show navbar
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const blogSubmenu = [
    { name: 'Gallery', href: '#gallery' },
    { name: 'News', href: '#news' },
    { name: 'Events', href: '#events' }
  ]

  const aboutSubmenu = [
    { name: 'Mission', href: '#mission' },
    { name: 'Vision', href: '#vision' },
    { name: 'Contact', href: '#contact' }
  ]

  const handleDropdownToggle = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
  }

  const handleDropdownClose = () => {
    setActiveDropdown(null)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled
        ? 'bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50'
        : 'bg-transparent'
    } ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className={`text-xl lg:text-2xl font-bold font-serif transition-colors duration-300 ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}>
              YOUTH GENERATION CLUB
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Home Link */}
            <a
              href="#home"
              className={`text-sm font-medium transition-colors duration-300 hover:text-green-700 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Home
            </a>

            {/* Blog Dropdown */}
            <div className="relative group">
              <button
                onClick={() => handleDropdownToggle('blog')}
                onMouseEnter={() => setActiveDropdown('blog')}
                className={`text-sm font-medium transition-colors duration-300 hover:text-green-700 flex items-center space-x-1 ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`}
              >
                <span>Blog</span>
                <svg className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Blog Dropdown Menu */}
              <div 
                className={`absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 transition-all duration-300 transform origin-top ${
                  activeDropdown === 'blog' 
                    ? 'opacity-100 scale-100 translate-y-0' 
                    : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                }`}
                onMouseLeave={handleDropdownClose}
              >
                <div className="py-2">
                  {blogSubmenu.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* About Us Dropdown */}
            <div className="relative group">
              <button
                onClick={() => handleDropdownToggle('about')}
                onMouseEnter={() => setActiveDropdown('about')}
                className={`text-sm font-medium transition-colors duration-300 hover:text-green-700 flex items-center space-x-1 ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`}
              >
                <span>About Us</span>
                <svg className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* About Us Dropdown Menu */}
              <div 
                className={`absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 transition-all duration-300 transform origin-top ${
                  activeDropdown === 'about' 
                    ? 'opacity-100 scale-100 translate-y-0' 
                    : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                }`}
                onMouseLeave={handleDropdownClose}
              >
                <div className="py-2">
                  {aboutSubmenu.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Join Button */}
            <a href="#join">
            <button className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Join
            </button>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-md transition-colors duration-300 ${
                isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white hover:text-gray-200'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`lg:hidden transition-all duration-300 ${
          isMobileMenuOpen 
            ? 'max-h-96 opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md rounded-lg mt-2 shadow-lg border border-gray-200/50">
            <a 
              href="#home" 
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-700 hover:bg-green-50 rounded-md transition-colors duration-200"
            >
              Home
            </a>
            
            {/* Mobile Blog Submenu */}
            <div>
              <button
                onClick={() => handleDropdownToggle('blog')}
                className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-green-700 hover:bg-green-50 rounded-md transition-colors duration-200 flex items-center justify-between"
              >
                <span>Blog</span>
                <svg className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'blog' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`ml-4 space-y-1 transition-all duration-300 ${
                activeDropdown === 'blog' ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
              }`}>
                {blogSubmenu.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-green-700 hover:bg-green-50 rounded-md transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile About Us Submenu */}
            <div>
              <button
                onClick={() => handleDropdownToggle('about')}
                className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-green-700 hover:bg-green-50 rounded-md transition-colors duration-200 flex items-center justify-between"
              >
                <span>About Us</span>
                <svg className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'about' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`ml-4 space-y-1 transition-all duration-300 ${
                activeDropdown === 'about' ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
              }`}>
                {aboutSubmenu.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-green-700 hover:bg-green-50 rounded-md transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            <a href="#join">
            <button className="w-full bg-green-700 hover:bg-green-800 text-white px-3 py-2 rounded-md font-medium transition-colors duration-300">
              Join
            </button>
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
