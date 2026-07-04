import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Portfolio from './pages/Portfolio'
import BlogPage from './pages/BlogPage'

// Simple Header component
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-gray-900/95 backdrop-blur-sm border-b border-gray-800' : 'bg-transparent'
    }`}>
      <nav className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold text-white" aria-label="Go to homepage">
            carlosvillena<span className="text-blue-400">.dev</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors text-sm"
                aria-label={`Navigate to ${item.name} section`}
              >
                {item.name}
              </a>
            ))}
            <Link
              to="/blog"
              className="text-gray-300 hover:text-white transition-colors text-sm"
              aria-label="Navigate to Blog"
            >
              Blog
            </Link>
          </div>

          <a
            href="mailto:carlosdanielvillena@gmail.com"
            className="hidden md:inline-flex px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
            aria-label="Send email to Carlos Villena"
          >
            Get in Touch
          </a>
        </div>
      </nav>
    </header>
  )
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <main>
                <Portfolio />
              </main>
            </>
          } />
          <Route path="/blog" element={<BlogPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
