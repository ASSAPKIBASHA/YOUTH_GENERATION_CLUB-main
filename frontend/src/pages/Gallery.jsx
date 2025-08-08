import React, { useState, useEffect } from 'react'
import { fetchGalleryItems } from '../services/apiService'
import logo from '../assets/logo_png.png'

const Gallery = () => {
  const [visibleCount, setVisibleCount] = useState(6)
  const [galleryData, setGalleryData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load gallery data from backend API
    const loadGalleryData = async () => {
      try {
        setLoading(true)
        const items = await fetchGalleryItems()
        setGalleryData(items)
      } catch (error) {
        console.error('Error loading gallery data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadGalleryData()
    
    // Refresh data every 30 seconds to get updates from admin
    const interval = setInterval(loadGalleryData, 30000)
    return () => clearInterval(interval)
  }, [])

  const visibleImages = galleryData.slice(0, visibleCount)
  const hasMore = visibleCount < galleryData.length

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading gallery...</p>
        </div>
      </div>
    )
  }

  return (
    <div id="gallery" className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header Section */}
      <div className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Youth Generation Club Logo" className="h-16 md:h-20 w-auto" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Gallery
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Explore the vibrant moments and achievements of our youth community
          </p>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-6xl mx-auto">
          {galleryData.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No gallery items available yet.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {visibleImages.map((item) => (
                  <div
                    key={item.id}
                    className="group relative overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
                      
                      {/* Content Overlay - Always Visible */}
                      <div className="absolute inset-0 flex flex-col justify-end p-3">
                        <div className="space-y-1">
                          <h3 className="text-sm font-semibold text-white leading-tight">
                            {item.title}
                          </h3>
                          <p className="text-xs text-gray-200 leading-tight">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="text-center mt-8">
                  <button
                    onClick={() => setVisibleCount(prev => Math.min(prev + 6, galleryData.length))}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 font-medium text-base transition-all duration-300 transform hover:scale-105"
                  >
                    Load More
                  </button>
                </div>
              )}

              {/* Show Less Button */}
              {!hasMore && visibleCount === galleryData.length && galleryData.length > 6 && (
                <div className="text-center mt-8">
                  <button
                    onClick={() => setVisibleCount(6)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 font-medium text-base transition-all duration-300 transform hover:scale-105"
                  >
                    Show Less
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Gallery
