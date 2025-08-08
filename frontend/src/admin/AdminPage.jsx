import React, { useState, useEffect } from 'react'
import Login from './Login'
import AdminPanel from './AdminPanel'

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check if user is already logged in
    const loginStatus = localStorage.getItem('ygc_admin_logged_in')
    if (loginStatus === 'true') {
      setIsLoggedIn(true)
    }
  }, [])

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  return (
    <div>
      {isLoggedIn ? (
        <AdminPanel onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  )
}

export default AdminPage 