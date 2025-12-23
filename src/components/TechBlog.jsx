import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useBlog } from '../context/BlogContext'
import { useAuth } from '../context/AuthContext'
import BlogPost from './BlogPost'
import BlogEditor from './BlogEditor'
import CascadeBackground from './CascadeBackground'

const TechBlog = ({ isAdminRoute }) => {
  const { isAdmin } = useAuth()
  const isPublicView = !isAdminRoute // Público cyberpunk, admin simple
  const {
    currentView,
    currentPost,
    filteredPosts,
    selectedCategory,
    searchTerm,
    sortBy,
    isEditorOpen,
    setView,
    setCurrentPost,
    setCategory,
    setSearchTerm,
    setSortBy,
    toggleEditor
  } = useBlog()

  const [isVisible, setIsVisible] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6
  const ref = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])


  const categories = [
    { id: 'all', name: 'Todas las entradas', icon: '📚' },
    { id: 'React & Hooks', name: 'React & Hooks', icon: '⚛️' },
    { id: 'CSS & Animaciones', name: 'CSS & Animaciones', icon: '🎨' },
    { id: 'Performance', name: 'Performance', icon: '⚡' },
    { id: 'Tools & Setup', name: 'Tools & Setup', icon: '🛠️' },
    { id: 'Experimentos', name: 'Experimentos', icon: '🧪' },
    { id: 'Reflexiones', name: 'Reflexiones', icon: '💭' }
  ]

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)

  // Render different views based on current state
  if (currentView === 'post' && currentPost) {
    return <BlogPost post={currentPost} />
  }

  if (currentView === 'editor' || isEditorOpen) {
    return <BlogEditor />
  }
  const startIndex = (currentPage - 1) * postsPerPage
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('es-ES', options)
  }

  return (
    <section id="blog" ref={ref} className={`section-padding relative overflow-hidden min-h-screen ${
      isPublicView ? 'bg-gray-900' : 'bg-gray-800'
    }`}>
      {/* Cascade Background - Solo en modo cyberpunk (público) */}
      {isPublicView && <CascadeBackground intensity="medium" colors="blue" />}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="container-max relative z-10"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
            isPublicView ? 'text-white' : 'text-white'
          }`}>
            {isPublicView ? (
              <>Blog <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Técnico</span></>
            ) : (
              <>Diario <span className="gradient-text">Técnico</span></>
            )}
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            isPublicView ? 'text-gray-300' : 'text-gray-300'
          }`}>
            Documentando mi viaje como desarrollador. Experimentos, aprendizajes y reflexiones sobre código, tecnología y crecimiento profesional.
          </p>
          <div className={`w-24 h-1 mx-auto mt-4 ${
            isPublicView ? 'bg-blue-500' : 'bg-primary-500'
          }`}></div>

          {/* New Entry Button - Solo para administradores */}
          {isAdmin && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleEditor}
              className={`mt-8 flex items-center gap-2 mx-auto ${
                isPublicView
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300'
                  : 'btn-primary'
              }`}
            >
              <span>✍️</span>
              Nueva entrada
            </motion.button>
          )}
        </motion.div>

        {/* Search and Filters */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="max-w-4xl mx-auto mb-8">
            <div className="glass-effect p-6 rounded-2xl">
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                {/* Search Bar */}
                <div className="relative flex-grow max-w-md">
                  <input
                    type="text"
                    placeholder="Buscar en el diario..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-cyan transition-colors"
                  />
                  <div className="absolute right-3 top-2.5 text-gray-400">
                    🔍
                  </div>
                </div>

                {/* Sort Options */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-gray-800/50 border border-gray-600/30 rounded-lg text-white focus:outline-none focus:border-accent-cyan"
                >
                  <option value="date">Más reciente</option>
                  <option value="views">Más visto</option>
                  <option value="likes">Más gustado</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCategory(category.id)
                  setCurrentPage(1)
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/25'
                    : 'glass-effect text-gray-300 hover:text-white'
                }`}
              >
                <span>{category.icon}</span>
                <span className="hidden sm:inline">{category.name}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <AnimatePresence mode="wait">
            {currentPosts.map((post, index) => (
              <motion.article
                key={post.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                layout
                className="glass-effect rounded-2xl overflow-hidden group hover:shadow-2xl transition-all duration-300 cursor-pointer"
                whileHover={{ y: -5 }}
                onClick={() => setCurrentPost(post)}
              >
                {/* Post Header */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium px-2 py-1 bg-primary-600/20 text-primary-300 rounded-full">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <span>👁️ {post.views}</span>
                      <span>❤️ {post.likes}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-accent-cyan transition-colors">
                    {post.title}
                  </h3>

                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <span>📅 {formatDate(post.date)}</span>
                    <span>⏱️ {post.readTime || '5 min'}</span>
                    <span className="text-lg">{post.mood}</span>
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.preview}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div variants={itemVariants} className="flex justify-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 glass-effect rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Anterior
            </motion.button>

            {[...Array(totalPages)].map((_, i) => (
              <motion.button
                key={i + 1}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  currentPage === i + 1
                    ? 'bg-primary-600 text-white'
                    : 'glass-effect text-gray-300 hover:text-white'
                }`}
              >
                {i + 1}
              </motion.button>
            ))}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 glass-effect rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Siguiente →
            </motion.button>
          </motion.div>
        )}

        {/* Blog Stats */}
        <motion.div
          variants={itemVariants}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { number: filteredPosts.length, label: "Entradas totales", icon: "📝" },
            { number: categories.length - 1, label: "Categorías", icon: "📂" },
            { number: "24/7", label: "Escribiendo código", icon: "💻" },
            { number: "∞", label: "Cosas por aprender", icon: "🚀" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center glass-effect p-6 rounded-xl"
              initial={{ scale: 0, rotate: -180 }}
              animate={isVisible ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
              transition={{ delay: 1 + index * 0.1, type: "spring" }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold gradient-text">{stat.number}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

export default TechBlog