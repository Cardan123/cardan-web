import { motion } from 'framer-motion'
import { useEffect, useRef, useState, useMemo } from 'react'
import AnimatedBackground from './AnimatedBackground'
import BlogPost from './BlogPost'
import { loadPosts, getCategories } from '../utils/loadPosts'

const Blog = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedPost, setSelectedPost] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [posts, setPosts] = useState([])
  const [categories, setCategories] = useState(['All'])
  const ref = useRef(null)

  // Cargar posts al montar el componente
  useEffect(() => {
    try {
      const loadedPosts = loadPosts()
      const loadedCategories = getCategories()
      setPosts(loadedPosts)
      setCategories(loadedCategories)
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error loading posts:', error)
      }
      // Mostrar mensaje de error al usuario si es necesario
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.disconnect()
      }
    }
  }, [])

  // Memoizar filteredPosts para evitar recálculos innecesarios
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      // Validar que el post tenga las propiedades necesarias
      if (!post || !post.title || !post.excerpt) {
        return false
      }
      
      const matchesCategory = selectedCategory === 'All' || (post.category && post.category === selectedCategory)
      const lowerSearchQuery = searchQuery.toLowerCase()
      const matchesSearch = post.title.toLowerCase().includes(lowerSearchQuery) ||
                            (post.excerpt && post.excerpt.toLowerCase().includes(lowerSearchQuery)) ||
                            (post.tags && Array.isArray(post.tags) && post.tags.some(tag => tag && typeof tag === 'string' && tag.toLowerCase().includes(lowerSearchQuery)))
      return matchesCategory && matchesSearch
    })
  }, [posts, selectedCategory, searchQuery])

  const sectionVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 40, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  return (
    <>
      <section ref={ref} className="py-24 bg-gray-800 relative overflow-hidden" aria-label="Blog section">
        <AnimatedBackground variant="projects" />

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="max-w-7xl mx-auto px-6 relative z-10"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <span className="text-blue-400 text-sm font-medium tracking-wider uppercase mb-4 block">Developer Blog</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Notes, Tutorials & Insights
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Sharing knowledge, experiences, and lessons learned as an AI engineer
            </p>
          </motion.div>

          {/* Search and Filter Bar */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
              {/* Search */}
              <div className="mb-4">
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search posts, tags, or topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-colors"
                    aria-label="Search blog posts"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                        : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700/50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <motion.article
                key={post.slug || post.id}
                variants={itemVariants}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                onClick={() => setSelectedPost(post)}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 cursor-pointer hover:border-blue-500/30 transition-all duration-300 group relative overflow-hidden"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-500" />

                <div className="relative z-10">
                  {/* Category and Featured Badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-medium rounded-full border border-blue-500/30">
                      {post.category}
                    </span>
                    {post.featured && (
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 text-xs font-medium rounded-full border border-blue-500/30">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span>{formatDate(post.date)}</span>
                    <span>{post.readTime}</span>
                  </div>

                  {/* Tags */}
                  {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={`${tag}-${index}`}
                          className="px-2 py-1 bg-gray-800/80 text-gray-400 text-xs rounded border border-gray-700/50"
                        >
                          #{tag}
                        </span>
                      ))}
                      {post.tags.length > 3 && (
                        <span className="px-2 py-1 text-gray-500 text-xs">
                          +{post.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Read More Indicator */}
                  <div className="mt-4 flex items-center text-blue-400 text-sm font-medium group-hover:gap-2 transition-all">
                    <span>Read more</span>
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Empty State */}
          {filteredPosts.length === 0 && posts.length === 0 && (
            <motion.div variants={itemVariants} className="text-center py-12">
              <p className="text-gray-400 text-lg mb-2">No posts loaded.</p>
              <p className="text-gray-500 text-sm">Check console for errors. Make sure dependencies are installed: npm install</p>
            </motion.div>
          )}
          {filteredPosts.length === 0 && posts.length > 0 && (
            <motion.div variants={itemVariants} className="text-center py-12">
              <p className="text-gray-400 text-lg">No posts found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('All')
                }}
                className="mt-4 text-blue-400 hover:text-blue-300 transition-colors"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Post Modal */}
      {selectedPost && (
        <BlogPost post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </>
  )
}

export default Blog

