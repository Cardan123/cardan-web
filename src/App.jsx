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
import CyberBackground from './components/CyberBackground'
import AdminLogin from './components/AdminLogin'
import { BlogProvider } from './context/BlogContext'
import { AuthProvider, useAuth } from './context/AuthContext'

// Simple router sin dependencias
const useRouter = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = (path) => {
    window.history.pushState({}, '', path)
    setCurrentPath(path)
  }

  return { currentPath, navigate }
}

// Componente principal del portfolio
const PortfolioApp = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { currentPath, navigate } = useRouter()
  const { isAdmin } = useAuth()

  // Determinar el modo basado en la ruta
  const isAdminRoute = currentPath === '/admin'
  const isPublicView = !isAdminRoute // Vista pública por defecto
  const isCyberMode = !isAdminRoute // Cyberpunk para público, simple para admin

  // Si es ruta admin y no está autenticado, mostrar login
  if (isAdminRoute && !isAdmin) {
    return <AdminLogin onBack={() => navigate('/')} />
  }

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      <div className={`min-h-screen bg-cyber-dark text-white ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500 relative`}>

        {/* Fondo cyberpunk solo en vista pública */}
        {isCyberMode && <CyberBackground />}

        <div className="relative z-10">
          <Header isAdminRoute={isAdminRoute} navigate={navigate} />
          <main>
            <Hero isAdminRoute={isAdminRoute} />
            <About isAdminRoute={isAdminRoute} />
            <Skills isAdminRoute={isAdminRoute} />
            <Timeline isAdminRoute={isAdminRoute} />
            <Projects isAdminRoute={isAdminRoute} />
            <TechBlog isAdminRoute={isAdminRoute} />
            <Testimonials isAdminRoute={isAdminRoute} />
            <Contact isAdminRoute={isAdminRoute} />
          </main>
        </div>
      </div>
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <BlogProvider>
        <PortfolioApp />
      </BlogProvider>
    </AuthProvider>
  )
}

export default App