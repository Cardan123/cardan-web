import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

const Header = ({ isAdminRoute, navigate }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isAdmin, logout } = useAuth()

  const isPublicView = !isAdminRoute
  const isCyberMode = !isAdminRoute // Cyberpunk para público, simple para admin

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Inicio', href: '#hero' },
    { name: 'Sobre mí', href: '#about' },
    { name: 'Habilidades', href: '#skills' },
    { name: 'Experiencia', href: '#timeline' },
    { name: 'Proyectos', href: '#projects' },
    { name: 'Blog', href: '#blog' },
    { name: 'Testimonios', href: '#testimonials' },
    { name: 'Contacto', href: '#contact' },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? isCyberMode
            ? 'bg-cyber-gray/10 backdrop-blur-cyber border-b border-cyber-cyan/20 shadow-cyber'
            : 'bg-gray-900/90 backdrop-blur-sm border-b border-gray-600/30 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-max mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`flex items-center space-x-3 ${
              isCyberMode
                ? 'cyber-title font-cyber'
                : 'text-white font-semibold'
            }`}
          >
            {/* Logo Icon */}
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              isCyberMode
                ? 'bg-gradient-to-br from-cyber-cyan to-cyber-pink shadow-neon-sm'
                : 'bg-gradient-to-br from-blue-600 to-cyan-600 shadow-lg'
            }`}>
              <span className="text-white font-bold text-lg">C</span>
            </div>

            {/* Logo Text */}
            <div className="text-2xl font-bold">
              {isCyberMode ? (
                <span className="glitch-effect" data-text="CARDAN.DEV">CARDAN.DEV</span>
              ) : (
                <span>Cardan.dev</span>
              )}
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6 flex-1 justify-center mx-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`transition-all duration-300 relative group ${
                  isCyberMode
                    ? 'text-gray-300 hover:text-cyber-cyan font-cyber text-sm tracking-wider uppercase'
                    : 'text-gray-300 hover:text-blue-400 font-medium'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${
                  isCyberMode
                    ? 'bg-cyber-cyan shadow-neon-sm'
                    : 'bg-blue-400'
                }`}></span>
              </motion.a>
            ))}
          </div>

          {/* View Controls - Solo mostrar en vista admin */}
          {isAdminRoute && (
            <div className="hidden lg:flex items-center space-x-4">
              <motion.button
                onClick={() => navigate('/')}
                className={`px-3 py-1 rounded text-sm font-medium transition-all duration-300 ${
                  isCyberMode
                    ? 'bg-blue-900/20 text-blue-400 border border-blue-400/30 hover:bg-blue-900/30'
                    : 'bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/30 hover:bg-cyber-cyan/20'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                👥 Público
              </motion.button>

              {/* Logout button (only show if admin is logged in) */}
              {isAdmin && (
                <motion.button
                  onClick={logout}
                  className={`px-3 py-1 rounded text-sm font-medium transition-all duration-300 ${
                    isCyberMode
                      ? 'bg-red-900/20 text-red-400 border border-red-400/30 hover:bg-red-900/30'
                      : 'bg-cyber-pink/10 text-cyber-pink border border-cyber-pink/30 hover:bg-cyber-pink/20'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Salir
                </motion.button>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className={`lg:hidden focus:outline-none transition-all duration-300 p-2 rounded-lg ${
              isCyberMode
                ? 'text-cyber-cyan hover:bg-cyber-cyan/10 border border-cyber-cyan/30'
                : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="w-6 h-6 relative">
              <span
                className={`absolute block h-0.5 w-6 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 top-3' : 'top-1'
                }`}
              ></span>
              <span
                className={`absolute block h-0.5 w-6 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : 'top-3'
                }`}
              ></span>
              <span
                className={`absolute block h-0.5 w-6 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 top-3' : 'top-5'
                }`}
              ></span>
            </div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={isMobileMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden overflow-hidden"
        >
          <div className={`py-6 space-y-4 border-t mt-4 ${
            isCyberMode
              ? 'border-cyber-cyan/20'
              : 'border-gray-600/30'
          }`}>
            {/* Mobile Navigation Links */}
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                whileHover={{ x: 10 }}
                className={`block py-2 px-4 rounded-lg transition-all duration-300 ${
                  isCyberMode
                    ? 'text-gray-300 hover:text-cyber-cyan hover:bg-cyber-cyan/10 font-cyber tracking-wider'
                    : 'text-gray-300 hover:text-blue-400 hover:bg-gray-700/50'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </motion.a>
            ))}

            {/* Mobile View Controls - Solo mostrar en vista admin */}
            {isAdminRoute && (
              <div className="pt-4 space-y-3 border-t border-gray-600/30">
                <motion.button
                  onClick={() => {
                    navigate('/')
                    setIsMobileMenuOpen(false)
                  }}
                  className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isCyberMode
                      ? 'bg-blue-900/20 text-blue-400 border border-blue-400/30 hover:bg-blue-900/30'
                      : 'bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/30 hover:bg-cyber-cyan/20'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  👥 Público
                </motion.button>

                {/* Mobile Logout button */}
                {isAdmin && (
                  <motion.button
                    onClick={() => {
                      logout()
                      setIsMobileMenuOpen(false)
                    }}
                    className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isCyberMode
                        ? 'bg-red-900/20 text-red-400 border border-red-400/30 hover:bg-red-900/30'
                        : 'bg-cyber-pink/10 text-cyber-pink border border-cyber-pink/30 hover:bg-cyber-pink/20'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Salir
                  </motion.button>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </nav>
    </motion.header>
  )
}

export default Header