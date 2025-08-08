import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import MainWeb from './pages/MainWeb'
import NotFound from './pages/NotFound'
import AdminPage from './admin/AdminPage'

const App = () => {
  return (
    <div className='bg-neutral-900'>
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<MainWeb />} />
            <Route path="/thiswebsiteadmin" element={<AdminPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<NotFound />} />
         </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
