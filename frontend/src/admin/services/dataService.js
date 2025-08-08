// Data Service for Admin Panel
// Using backend API for cross-device data persistence

// Use environment variable for production, fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

// Gallery CRUD operations
export const getGalleryItems = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/gallery`)
    if (!response.ok) throw new Error('Failed to fetch gallery items')
    return await response.json()
  } catch (error) {
    console.error('Error fetching gallery items:', error)
    return []
  }
}

export const addGalleryItem = async (item) => {
  try {
    const response = await fetch(`${API_BASE_URL}/gallery`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item)
    })
    if (!response.ok) throw new Error('Failed to add gallery item')
    return await response.json()
  } catch (error) {
    console.error('Error adding gallery item:', error)
    throw error
  }
}

export const updateGalleryItem = async (id, updates) => {
  try {
    const response = await fetch(`${API_BASE_URL}/gallery/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates)
    })
    if (!response.ok) throw new Error('Failed to update gallery item')
    return await response.json()
  } catch (error) {
    console.error('Error updating gallery item:', error)
    throw error
  }
}

export const deleteGalleryItem = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/gallery/${id}`, {
      method: 'DELETE'
    })
    if (!response.ok) throw new Error('Failed to delete gallery item')
    return await response.json()
  } catch (error) {
    console.error('Error deleting gallery item:', error)
    throw error
  }
}

// Blog CRUD operations
export const getBlogPosts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs`)
    if (!response.ok) throw new Error('Failed to fetch blog posts')
    return await response.json()
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

export const addBlogPost = async (post) => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post)
    })
    if (!response.ok) throw new Error('Failed to add blog post')
    return await response.json()
  } catch (error) {
    console.error('Error adding blog post:', error)
    throw error
  }
}

export const updateBlogPost = async (id, updates) => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates)
    })
    if (!response.ok) throw new Error('Failed to update blog post')
    return await response.json()
  } catch (error) {
    console.error('Error updating blog post:', error)
    throw error
  }
}

export const deleteBlogPost = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: 'DELETE'
    })
    if (!response.ok) throw new Error('Failed to delete blog post')
    return await response.json()
  } catch (error) {
    console.error('Error deleting blog post:', error)
    throw error
  }
}

// Join submissions operations
export const getJoinSubmissions = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/join-submissions`)
    if (!response.ok) throw new Error('Failed to fetch join submissions')
    return await response.json()
  } catch (error) {
    console.error('Error fetching join submissions:', error)
    return []
  }
}

export const addJoinSubmission = async (submission) => {
  try {
    const response = await fetch(`${API_BASE_URL}/join-submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submission)
    })
    if (!response.ok) throw new Error('Failed to add join submission')
    return await response.json()
  } catch (error) {
    console.error('Error adding join submission:', error)
    throw error
  }
}

export const updateJoinSubmissionStatus = async (id, status) => {
  try {
    const response = await fetch(`${API_BASE_URL}/join-submissions/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status })
    })
    if (!response.ok) throw new Error('Failed to update join submission status')
    return await response.json()
  } catch (error) {
    console.error('Error updating join submission status:', error)
    throw error
  }
}

export const deleteJoinSubmission = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/join-submissions/${id}`, {
      method: 'DELETE'
    })
    if (!response.ok) throw new Error('Failed to delete join submission')
    return await response.json()
  } catch (error) {
    console.error('Error deleting join submission:', error)
    throw error
  }
}

// Image upload helper (converts to base64 for storage)
export const handleImageUpload = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
} 