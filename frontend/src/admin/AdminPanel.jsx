import React, { useState, useEffect } from 'react'
import { 
  getGalleryItems, 
  getBlogPosts, 
  getJoinSubmissions,
  deleteGalleryItem,
  deleteBlogPost,
  deleteJoinSubmission,
  updateJoinSubmissionStatus
} from './services/dataService'
import GalleryManager from './components/GalleryManager'
import BlogManager from './components/BlogManager'
import JoinSubmissionsManager from './components/JoinSubmissionsManager'

const AdminPanel = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('gallery')
  const [galleryItems, setGalleryItems] = useState([])
  const [blogPosts, setBlogPosts] = useState([])
  const [joinSubmissions, setJoinSubmissions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [gallery, blogs, submissions] = await Promise.all([
        getGalleryItems(),
        getBlogPosts(),
        getJoinSubmissions()
      ])
      setGalleryItems(gallery)
      setBlogPosts(blogs)
      setJoinSubmissions(submissions)
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('ygc_admin_logged_in')
    onLogout()
  }

  const tabs = [
    { id: 'gallery', name: 'Gallery', icon: '🖼️' },
    { id: 'blogs', name: 'Blogs', icon: '📝' },
    { id: 'submissions', name: 'Join Submissions', icon: '👥' }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
              <p className="text-sm text-gray-600">Youth Generation Club</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-300 ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'gallery' && (
          <GalleryManager 
            items={galleryItems} 
            onDataChange={loadData}
          />
        )}
        
        {activeTab === 'blogs' && (
          <BlogManager 
            posts={blogPosts} 
            onDataChange={loadData}
          />
        )}
        
        {activeTab === 'submissions' && (
          <JoinSubmissionsManager 
            submissions={joinSubmissions} 
            onDataChange={loadData}
          />
        )}
      </div>
    </div>
  )
}

export default AdminPanel
