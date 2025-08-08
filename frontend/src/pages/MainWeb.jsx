import react from 'react'
import Home from './Home'
import About from './About'
import Gallery from './Gallery'
import Blog from './Blog'
import Contact from './Contact'
import Join from './Join'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Vision from './Vision'

const MainWeb = () => {
  return(
    <div>
      <Navbar />
      <Home />
      <About />
      <Gallery />
      <Blog />
      <Vision />
      <Contact />
      <Join />
      <Footer />
    </div>
  )
}

export default MainWeb