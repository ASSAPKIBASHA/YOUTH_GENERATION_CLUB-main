// API Service for main website components
// Using backend API for cross-device data persistence

// Use environment variable for production, fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

export const fetchGalleryItems = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/gallery`)
    if (!response.ok) {
      throw new Error('Failed to fetch gallery items')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching gallery items:', error)
    return []
  }
}

export const fetchBlogPosts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs`)
    if (!response.ok) {
      throw new Error('Failed to fetch blog posts')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

export const submitJoinForm = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/join-submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        submissionDate: new Date().toISOString(),
        status: 'pending'
      })
    })
    
    if (!response.ok) {
      throw new Error('Failed to submit join form')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error submitting join form:', error)
    throw error
  }
} 