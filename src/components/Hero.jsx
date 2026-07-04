import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import AnimatedBackground from './AnimatedBackground'
import { scrollToElement } from '../utils/scroll'

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden" aria-label="Hero section">
      <AnimatedBackground variant="hero" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold text-white mb-4"
          >
            Carlos Villena
          </motion.h1>

          <motion.h2
            variants={itemVariants}
            className="text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-10 font-medium"
          >
            Senior AI Engineer | AI Architect | Applied GenAI
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-gray-400 text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Leading applied AI initiatives at Ford Motor Company. 7+ years of experience building
            RAG systems, agentic workflows, and cloud-native AI platforms with measurable business impact.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(59, 130, 246, 0.4)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToElement('experience')}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-medium rounded-lg transition-all duration-300 shadow-lg shadow-blue-500/25"
              aria-label="Scroll to experience section"
            >
              View Experience
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, borderColor: 'rgba(59, 130, 246, 0.5)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToElement('contact')}
              className="px-8 py-3 border border-gray-600 hover:border-blue-500/50 text-gray-300 hover:text-white font-medium rounded-lg transition-all duration-300 backdrop-blur-sm"
              aria-label="Scroll to contact section"
            >
              Get in Touch
            </motion.button>

            <Link to="/blog">
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(139, 92, 246, 0.4)' }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white font-medium rounded-lg transition-all duration-300 shadow-lg shadow-purple-500/25"
                aria-label="Go to blog"
              >
                📝 Blog
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-700 rounded-full flex justify-center cursor-pointer hover:border-blue-500/50 transition-colors"
          onClick={() => scrollToElement('experience')}
          aria-label="Scroll down"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
