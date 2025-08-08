import React, { useState, useEffect } from 'react'
import { fetchBlogPosts } from '../services/apiService'
import logo from '../assets/logo_png.png'

const Blog = () => {
  const [visibleCount, setVisibleCount] = useState(4)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentBlogIndex, setCurrentBlogIndex] = useState(0)
  const [blogData, setBlogData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load blog data from backend API
    const loadBlogData = async () => {
      try {
        setLoading(true)
        const posts = await fetchBlogPosts()
        setBlogData(posts)
      } catch (error) {
        console.error('Error loading blog data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadBlogData()
    
    // Refresh data every 30 seconds to get updates from admin
    const interval = setInterval(loadBlogData, 30000)
    return () => clearInterval(interval)
  }, [])

  const visibleBlogs = blogData.slice(0, visibleCount)
  const hasMore = visibleCount < blogData.length

  const openModal = (index) => {
    setCurrentBlogIndex(index)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const nextBlog = () => {
    setCurrentBlogIndex((prev) => (prev + 1) % blogData.length)
  }

  const prevBlog = () => {
    setCurrentBlogIndex((prev) => (prev - 1 + blogData.length) % blogData.length)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading blog posts...</p>
        </div>
      </div>
    )
  }

  return (
    <div id="blog" className="min-h-screen bg-neutral-900">
      {/* Header Section */}
      <div className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Youth Generation Club Logo" className="h-16 md:h-20 w-auto" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Our Blog
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Insights, stories, and updates from our youth community
          </p>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-6xl mx-auto">
          {blogData.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No blog posts available yet.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {visibleBlogs.map((blog, index) => (
                  <div
                    key={blog.id}
                    className="group bg-neutral-800 hover:bg-neutral-700 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                    onClick={() => openModal(index)}
                  >
                    {/* Image Container */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-transparent"></div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-green-600 text-white text-xs font-medium">
                          {blog.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-gray-400">{blog.date}</span>
                        <span className="text-sm text-gray-400">{blog.readTime}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-green-400 transition-colors duration-300">
                        {blog.title}
                      </h3>
                      
                      <p className="text-gray-300 text-sm leading-relaxed mb-4">
                        {blog.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">By {blog.author}</span>
                        <button className="text-green-400 hover:text-green-300 text-sm font-medium transition-colors duration-300">
                          Read More →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="text-center mt-8">
                  <button
                    onClick={() => setVisibleCount(prev => Math.min(prev + 2, blogData.length))}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 font-medium text-base transition-all duration-300 transform hover:scale-105"
                  >
                    Load More
                  </button>
                </div>
              )}

              {/* Show Less Button */}
              {!hasMore && visibleCount === blogData.length && blogData.length > 4 && (
                <div className="text-center mt-8">
                  <button
                    onClick={() => setVisibleCount(4)}
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

      {/* Modal */}
      {isModalOpen && blogData[currentBlogIndex] && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-800 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-neutral-800 p-6 border-b border-neutral-700 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Blog Post</h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="mb-6">
                <img
                  src={blogData[currentBlogIndex].image}
                  alt={blogData[currentBlogIndex].title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-green-600 text-white text-sm font-medium rounded">
                    {blogData[currentBlogIndex].category}
                  </span>
                  <div className="text-sm text-gray-400">
                    <span>{blogData[currentBlogIndex].date}</span>
                    <span className="mx-2">•</span>
                    <span>{blogData[currentBlogIndex].readTime}</span>
                  </div>
                </div>

                <h1 className="text-3xl font-bold text-white mb-4">
                  {blogData[currentBlogIndex].title}
                </h1>

                <p className="text-gray-300 mb-4">
                  By <span className="text-green-400">{blogData[currentBlogIndex].author}</span>
                </p>

                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {blogData[currentBlogIndex].content}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Navigation */}
            <div className="sticky bottom-0 bg-neutral-800 p-6 border-t border-neutral-700 flex justify-between">
              <button
                onClick={prevBlog}
                className="bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-2 rounded transition-colors duration-200"
              >
                ← Previous
              </button>
              <span className="text-gray-400 self-center">
                {currentBlogIndex + 1} of {blogData.length}
              </span>
              <button
                onClick={nextBlog}
                className="bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-2 rounded transition-colors duration-200"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Blog
