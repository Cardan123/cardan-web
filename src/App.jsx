import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Timeline from './components/Timeline'
import Testimonials from './components/Testimonials'
import TechBlog from './components/TechBlog'
import LoadingScreen from './components/LoadingScreen'
import ScrollBackground from './components/ScrollBackground'
import { BlogProvider } from './context/BlogContext'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <BlogProvider>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      <div className={`min-h-screen bg-playstation-black text-white ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500 relative`}>
        {/* Fondo dinámico basado en scroll */}
        <ScrollBackground />

        <div className="relative z-10">
          <Header />
          <main>
            <Hero />
            <About />
            <Skills />
            <Timeline />
            <Projects />
            <TechBlog />
            <Testimonials />
            <Contact />
          </main>
        </div>
      </div>
    </BlogProvider>
  )
}

export default App