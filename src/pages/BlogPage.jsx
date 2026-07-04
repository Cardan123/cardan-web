import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Blog from '../components/Blog'

const BlogPage = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/95 backdrop-blur-sm border-b border-gray-800' : 'bg-transparent'
      }`}>
        <nav className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-xl font-semibold text-white" aria-label="Go to homepage">
              cardan<span className="text-blue-400">.dev</span>
            </Link>

            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="text-gray-300 hover:text-white transition-colors text-sm"
                aria-label="Go back to portfolio"
              >
                ← Portfolio
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Blog Content */}
      <main className="pt-20">
        <Blog />
      </main>
    </div>
  )
}

export default BlogPage

