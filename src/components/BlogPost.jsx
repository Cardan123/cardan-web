import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useBlog } from '../context/BlogContext'

const BlogPost = ({ post }) => {
  const { setView, toggleLike, filteredPosts } = useBlog()
  const [isLiked, setIsLiked] = useState(false)
  const [readingProgress, setReadingProgress] = useState(0)
  const [estimatedReadTime, setEstimatedReadTime] = useState(0)
  const [relatedPosts, setRelatedPosts] = useState([])

  useEffect(() => {
    // Calcular posts relacionados
    const related = filteredPosts
      .filter(p => p.id !== post.id)
      .filter(p =>
        p.category === post.category ||
        p.tags.some(tag => post.tags.includes(tag))
      )
      .slice(0, 3)

    setRelatedPosts(related)

    // Calcular tiempo de lectura estimado
    const words = post.content.split(' ').length
    setEstimatedReadTime(Math.ceil(words / 200)) // 200 palabras por minuto
  }, [post, filteredPosts])

  useEffect(() => {
    const handleScroll = () => {
      const article = document.getElementById('blog-article')
      if (article) {
        const rect = article.getBoundingClientRect()
        const scrolled = window.pageYOffset
        const rate = scrolled / (article.offsetHeight - window.innerHeight)
        setReadingProgress(Math.min(100, Math.max(0, rate * 100)))
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    }
    return new Date(dateString).toLocaleDateString('es-ES', options)
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    toggleLike(post.id)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.preview,
          url: window.location.href
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback: copiar al clipboard
      navigator.clipboard.writeText(window.location.href)
      // Mostrar tooltip o notification
    }
  }

  const renderContent = (content) => {
    const lines = content.split('\n')
    const elements = []
    let inCodeBlock = false
    let codeLines = []
    let codeLanguage = ''

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      // Code blocks
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          // Closing code block
          elements.push(
            <motion.div
              key={`code-${i}`}
              className="mb-6 rounded-xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.02 }}
            >
              <div className="bg-gray-900 px-4 py-2 text-sm text-gray-400 border-b border-gray-700 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="font-mono">{codeLanguage || 'code'}</span>
                </span>
                <button
                  onClick={() => navigator.clipboard.writeText(codeLines.join('\n'))}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                  title="Copiar código"
                >
                  📋
                </button>
              </div>
              <pre className="bg-gray-900 p-4 text-sm font-mono text-green-400 overflow-x-auto leading-relaxed">
                <code>{codeLines.join('\n')}</code>
              </pre>
            </motion.div>
          )
          inCodeBlock = false
          codeLines = []
          codeLanguage = ''
        } else {
          // Opening code block
          inCodeBlock = true
          codeLanguage = line.replace('```', '').trim()
        }
        continue
      }

      if (inCodeBlock) {
        codeLines.push(line)
        continue
      }

      // Headers
      if (line.startsWith('# ')) {
        elements.push(
          <motion.h1
            key={i}
            className="text-3xl md:text-4xl font-bold mb-6 mt-8 gradient-text"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            {line.replace('# ', '')}
          </motion.h1>
        )
        continue
      }

      if (line.startsWith('## ')) {
        elements.push(
          <motion.h2
            key={i}
            className="text-2xl md:text-3xl font-semibold mb-4 mt-6 text-accent-cyan"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            {line.replace('## ', '')}
          </motion.h2>
        )
        continue
      }

      if (line.startsWith('### ')) {
        elements.push(
          <motion.h3
            key={i}
            className="text-xl md:text-2xl font-medium mb-3 mt-4 text-accent-pink"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            {line.replace('### ', '')}
          </motion.h3>
        )
        continue
      }

      // Lists
      if (line.startsWith('- ')) {
        elements.push(
          <motion.li
            key={i}
            className="mb-2 text-gray-300 ml-6 list-disc leading-relaxed"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.03 }}
          >
            {processInlineMarkdown(line.replace('- ', ''))}
          </motion.li>
        )
        continue
      }

      // Numbered lists
      if (/^\d+\. /.test(line)) {
        elements.push(
          <motion.li
            key={i}
            className="mb-2 text-gray-300 ml-6 list-decimal leading-relaxed"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.03 }}
          >
            {processInlineMarkdown(line.replace(/^\d+\. /, ''))}
          </motion.li>
        )
        continue
      }

      // Regular paragraph
      if (line.trim()) {
        elements.push(
          <motion.p
            key={i}
            className="mb-4 text-gray-300 leading-relaxed text-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
          >
            {processInlineMarkdown(line)}
          </motion.p>
        )
        continue
      }

      // Empty line
      elements.push(<div key={i} className="mb-2" />)
    }

    return elements
  }

  const processInlineMarkdown = (text) => {
    // Bold text
    const boldRegex = /\*\*(.*?)\*\*/g
    text = text.replace(boldRegex, '<strong class="text-white font-semibold">$1</strong>')

    // Italic text
    const italicRegex = /\*(.*?)\*/g
    text = text.replace(italicRegex, '<em class="text-gray-200 italic">$1</em>')

    // Inline code
    const codeRegex = /`([^`]+)`/g
    text = text.replace(codeRegex, '<code class="bg-gray-800 text-accent-cyan px-2 py-1 rounded font-mono text-sm mx-1">$1</code>')

    // Links
    const linkRegex = /\[([^\]]+)\]\(([^\)]+)\)/g
    text = text.replace(linkRegex, '<a href="$2" class="text-accent-pink hover:text-accent-cyan transition-colors underline" target="_blank" rel="noopener noreferrer">$1</a>')

    return <span dangerouslySetInnerHTML={{ __html: text }} />
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-playstation-black text-white relative"
    >
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-accent-cyan to-accent-pink z-50"
        style={{ width: `${readingProgress}%` }}
      />

      {/* Back Button */}
      <motion.button
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        onClick={() => setView('list')}
        className="fixed top-20 left-6 z-40 glass-effect p-3 rounded-full hover:bg-white/20 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        ← Volver al blog
      </motion.button>

      {/* Article Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="pt-32 pb-16 px-6 md:px-12 max-w-4xl mx-auto"
      >
        <div className="flex items-center gap-4 mb-6 text-sm text-gray-400">
          <span className="px-3 py-1 bg-primary-600/20 text-primary-300 rounded-full">
            {post.category}
          </span>
          <span>{formatDate(post.date)}</span>
          <span>·</span>
          <span>{estimatedReadTime} min de lectura</span>
          <span>·</span>
          <span>👁️ {post.views} vistas</span>
        </div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold mb-6 gradient-text leading-tight"
        >
          {post.title}
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-gray-300 leading-relaxed mb-8"
        >
          {post.preview}
        </motion.p>

        {/* Tags */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-700/50 text-gray-300 text-sm rounded-full"
            >
              #{tag}
            </span>
          ))}
        </motion.div>

        {/* Author Info */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="w-12 h-12 bg-gradient-to-r from-accent-cyan to-accent-pink rounded-full flex items-center justify-center text-2xl">
            👨‍💻
          </div>
          <div>
            <div className="font-semibold">{post.author}</div>
            <div className="text-gray-400 text-sm">Full Stack Developer</div>
          </div>
        </motion.div>
      </motion.header>

      {/* Article Content */}
      <motion.article
        id="blog-article"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="max-w-4xl mx-auto px-6 md:px-12 pb-16"
      >
        <div className="prose prose-invert prose-lg max-w-none">
          {renderContent(post.content)}
        </div>
      </motion.article>

      {/* Article Actions */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="max-w-4xl mx-auto px-6 md:px-12 pb-8"
      >
        <div className="glass-effect p-6 rounded-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                  isLiked
                    ? 'bg-accent-pink/20 text-accent-pink'
                    : 'bg-gray-700/50 text-gray-300 hover:text-white'
                }`}
              >
                <span>{isLiked ? '❤️' : '🤍'}</span>
                <span>{post.likes + (isLiked ? 1 : 0)} me gusta</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-700/50 text-gray-300 hover:text-white transition-colors"
              >
                <span>🔗</span>
                <span>Compartir</span>
              </motion.button>
            </div>

            <div className="text-gray-400 text-sm">
              {Math.round(readingProgress)}% leído
            </div>
          </div>
        </div>
      </motion.div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className="max-w-6xl mx-auto px-6 md:px-12 pb-16"
        >
          <h3 className="text-2xl font-semibold mb-8 text-center">
            Posts <span className="gradient-text">Relacionados</span>
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost, index) => (
              <motion.article
                key={relatedPost.id}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                className="glass-effect rounded-xl p-6 cursor-pointer hover:shadow-lg transition-all duration-300"
                whileHover={{ y: -5 }}
                onClick={() => setView('post')}
              >
                <div className="text-sm text-accent-cyan mb-2">{relatedPost.category}</div>
                <h4 className="font-semibold mb-2 text-white hover:text-accent-pink transition-colors">
                  {relatedPost.title}
                </h4>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {relatedPost.preview}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{formatDate(relatedPost.date)}</span>
                  <span>{relatedPost.readTime}</span>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>
      )}
    </motion.div>
  )
}

export default BlogPost