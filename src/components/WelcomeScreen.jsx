import { useState } from 'react'
import { motion } from 'framer-motion'

const WelcomeScreen = ({ onViewSelect }) => {
  const [selectedView, setSelectedView] = useState(null)

  const views = [
    {
      id: 'public',
      title: 'Public View',
      description: 'Professional portfolio for visitors and potential collaborators',
      icon: '👥',
      gradient: 'from-blue-500 to-cyan-500',
      features: [
        'Professional portfolio',
        'Featured projects',
        'Tech blog',
        'Contact information'
      ]
    },
    {
      id: 'admin',
      title: 'Admin Panel',
      description: 'Full portfolio and blog management',
      icon: '⚙️',
      gradient: 'from-purple-500 to-pink-500',
      features: [
        'Blog post management',
        'Detailed statistics',
        'Advanced settings',
        'Full cyberpunk mode'
      ]
    }
  ]

  const handleViewSelect = (viewId) => {
    setSelectedView(viewId)
    setTimeout(() => {
      onViewSelect(viewId)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      {/* Background subtle effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: 0
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 4,
                delay: Math.random() * 2,
                repeat: Infinity,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container-max relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            CARLOS VILLENA
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Senior Software Engineer | AI/ML Specialist
          </motion.p>

          <motion.p
            className="text-gray-400 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Welcome to my digital portfolio. Select how you want to explore my work:
          </motion.p>
        </motion.div>

        {/* View Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {views.map((view, index) => (
            <motion.div
              key={view.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
              whileHover={{
                y: -10,
                transition: { duration: 0.2 }
              }}
              className={`relative group cursor-pointer ${
                selectedView === view.id ? 'ring-2 ring-blue-400' : ''
              }`}
              onClick={() => handleViewSelect(view.id)}
            >
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-xl p-8 h-full transition-all duration-300 hover:border-gray-400/50 hover:bg-gray-800/70">
                {/* Icon and Title */}
                <div className="text-center mb-6">
                  <div className="text-4xl mb-4">{view.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {view.title}
                  </h3>
                  <p className="text-gray-400">
                    {view.description}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {view.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <motion.button
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 bg-gradient-to-r ${view.gradient} text-white hover:shadow-lg hover:shadow-blue-500/25`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {selectedView === view.id ? 'Loading...' : 'Select View'}
                </motion.button>

                {/* Hover Effect */}
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${view.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="text-center mt-16 text-gray-500 text-sm"
        >
          <p>Portfolio built with React + Vite + Tailwind CSS</p>
          <p className="mt-1">© 2025 Carlos Villena - All rights reserved</p>
        </motion.div>
      </div>

      {/* Loading overlay */}
      {selectedView && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-gray-900 z-50 flex items-center justify-center"
        >
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-3 border-blue-400 border-t-transparent rounded-full mb-4 mx-auto"
            />
            <p className="text-white text-lg">Loading {selectedView === 'public' ? 'public' : 'admin'} view...</p>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default WelcomeScreen