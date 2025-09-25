import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef } from 'react'
import { useBlog } from '../context/BlogContext'

const BlogEditor = () => {
  const { addPost, setView, toggleEditor } = useBlog()
  const [isPreview, setIsPreview] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    category: 'React & Hooks',
    preview: '',
    content: '',
    tags: '',
    mood: '💡',
    codeSnippet: '',
    featured: false
  })
  const [errors, setErrors] = useState({})
  const [isSaving, setIsSaving] = useState(false)
  const contentRef = useRef()

  const categories = [
    'React & Hooks',
    'CSS & Animaciones',
    'Performance',
    'Tools & Setup',
    'Experimentos',
    'Reflexiones',
    'JavaScript',
    'Node.js',
    'Databases'
  ]

  const moods = ['💡', '🤯', '🚀', '🎨', '⚙️', '🔍', '💭', '🧪', '📚', '⭐']

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = 'El título es requerido'
    }

    if (!formData.preview.trim()) {
      newErrors.preview = 'El preview es requerido'
    }

    if (!formData.content.trim()) {
      newErrors.content = 'El contenido es requerido'
    }

    if (formData.content.length < 100) {
      newErrors.content = 'El contenido debe tener al menos 100 caracteres'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validateForm()) return

    setIsSaving(true)

    try {
      // Procesar tags
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)

      const postData = {
        ...formData,
        tags: tagsArray,
        readTime: `${Math.ceil(formData.content.split(' ').length / 200)} min`
      }

      await new Promise(resolve => setTimeout(resolve, 1000)) // Simular save
      addPost(postData)

      // Reset form
      setFormData({
        title: '',
        category: 'React & Hooks',
        preview: '',
        content: '',
        tags: '',
        mood: '💡',
        codeSnippet: '',
        featured: false
      })

      setIsSaving(false)
      // No cerramos automáticamente para que el usuario vea el éxito
    } catch (error) {
      setIsSaving(false)
      console.error('Error saving post:', error)
    }
  }

  const insertMarkdown = (syntax, language = 'javascript') => {
    const textarea = contentRef.current
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = textarea.value.substring(start, end)

    let replacement = ''
    let cursorOffset = 0

    switch (syntax) {
      case 'bold':
        replacement = `**${selectedText || 'texto en negrita'}**`
        cursorOffset = selectedText ? replacement.length : 2
        break
      case 'italic':
        replacement = `*${selectedText || 'texto en cursiva'}*`
        cursorOffset = selectedText ? replacement.length : 1
        break
      case 'code':
        replacement = `\`${selectedText || 'código'}\``
        cursorOffset = selectedText ? replacement.length : 1
        break
      case 'codeblock':
        replacement = `\`\`\`${language}\n${selectedText || '// Tu código aquí'}\n\`\`\``
        cursorOffset = selectedText ? replacement.length : 4 + language.length
        break
      case 'h1':
        replacement = `# ${selectedText || 'Título Principal'}`
        cursorOffset = replacement.length
        break
      case 'h2':
        replacement = `## ${selectedText || 'Subtítulo'}`
        cursorOffset = replacement.length
        break
      case 'h3':
        replacement = `### ${selectedText || 'Título de sección'}`
        cursorOffset = replacement.length
        break
      case 'list':
        replacement = `- ${selectedText || 'Elemento de lista'}`
        cursorOffset = replacement.length
        break
      case 'numlist':
        replacement = `1. ${selectedText || 'Elemento numerado'}`
        cursorOffset = replacement.length
        break
      case 'quote':
        replacement = `> ${selectedText || 'Cita o nota importante'}`
        cursorOffset = replacement.length
        break
      case 'link':
        replacement = `[${selectedText || 'texto del enlace'}](url)`
        cursorOffset = selectedText ? replacement.length - 4 : replacement.length - 16
        break
      case 'hr':
        replacement = `\n---\n`
        cursorOffset = replacement.length
        break
      default:
        replacement = selectedText
        cursorOffset = replacement.length
    }

    const newContent =
      textarea.value.substring(0, start) +
      replacement +
      textarea.value.substring(end)

    setFormData(prev => ({ ...prev, content: newContent }))

    // Restore cursor position
    setTimeout(() => {
      textarea.focus()
      if (!selectedText) {
        textarea.selectionStart = start + cursorOffset
        textarea.selectionEnd = start + cursorOffset
      } else {
        textarea.selectionStart = start + replacement.length
        textarea.selectionEnd = start + replacement.length
      }
    }, 0)
  }

  const renderPreview = (content) => {
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
            <div key={`code-${i}`} className="mb-4 rounded-lg overflow-hidden">
              <div className="bg-gray-800 px-3 py-2 text-xs text-gray-400 border-b border-gray-600">
                {codeLanguage || 'code'}
              </div>
              <pre className="bg-gray-900 p-4 text-sm font-mono text-green-400 overflow-x-auto">
                <code>{codeLines.join('\n')}</code>
              </pre>
            </div>
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
        elements.push(<h1 key={i} className="text-3xl font-bold mb-4 gradient-text">{line.replace('# ', '')}</h1>)
        continue
      }
      if (line.startsWith('## ')) {
        elements.push(<h2 key={i} className="text-2xl font-semibold mb-3 text-accent-cyan">{line.replace('## ', '')}</h2>)
        continue
      }
      if (line.startsWith('### ')) {
        elements.push(<h3 key={i} className="text-xl font-medium mb-2 text-accent-pink">{line.replace('### ', '')}</h3>)
        continue
      }

      // Lists
      if (line.startsWith('- ')) {
        elements.push(<li key={i} className="mb-1 text-gray-300 ml-4 list-disc">{processInlineMarkdownPreview(line.replace('- ', ''))}</li>)
        continue
      }
      if (/^\d+\. /.test(line)) {
        elements.push(<li key={i} className="mb-1 text-gray-300 ml-4 list-decimal">{processInlineMarkdownPreview(line.replace(/^\d+\. /, ''))}</li>)
        continue
      }

      // Quote
      if (line.startsWith('> ')) {
        elements.push(<blockquote key={i} className="mb-3 pl-4 border-l-4 border-accent-cyan text-gray-300 italic">{line.replace('> ', '')}</blockquote>)
        continue
      }

      // Horizontal rule
      if (line.trim() === '---') {
        elements.push(<hr key={i} className="my-6 border-gray-600" />)
        continue
      }

      // Regular paragraph
      if (line.trim()) {
        elements.push(<p key={i} className="mb-3 text-gray-300 leading-relaxed">{processInlineMarkdownPreview(line)}</p>)
        continue
      }

      // Empty line
      elements.push(<div key={i} className="mb-2" />)
    }

    return elements
  }

  const processInlineMarkdownPreview = (text) => {
    // Bold text
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    // Italic text
    text = text.replace(/\*(.*?)\*/g, '<em class="text-gray-200 italic">$1</em>')
    // Inline code
    text = text.replace(/`([^`]+)`/g, '<code class="bg-gray-800 text-accent-cyan px-1 py-0.5 rounded text-sm">$1</code>')
    // Links
    text = text.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2" class="text-accent-pink hover:text-accent-cyan transition-colors underline">$1</a>')

    return <span dangerouslySetInnerHTML={{ __html: text }} />
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-playstation-black/95 backdrop-blur-sm z-50 overflow-y-auto"
    >
      <div className="min-h-screen p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            className="flex items-center justify-between mb-8 pt-6"
          >
            <div>
              <h1 className="text-3xl font-bold gradient-text">
                ✍️ Crear Nueva Entrada
              </h1>
              <p className="text-gray-400 mt-2">
                Documenta tu journey de desarrollo
              </p>
            </div>

            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsPreview(!isPreview)}
                className="px-4 py-2 glass-effect rounded-lg text-white hover:bg-white/10 transition-colors"
              >
                {isPreview ? '📝 Editor' : '👁️ Preview'}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleEditor}
                className="px-4 py-2 glass-effect rounded-lg text-white hover:bg-white/10 transition-colors"
              >
                ✕ Cerrar
              </motion.button>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Editor Form */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Título */}
              <div>
                <label className="block text-white font-medium mb-2">
                  📝 Título *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Un título épico para tu entrada..."
                  className={`w-full p-4 bg-gray-800 border rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-accent-cyan transition-colors ${
                    errors.title ? 'border-red-500' : 'border-gray-600'
                  }`}
                />
                {errors.title && (
                  <p className="text-red-400 text-sm mt-1">{errors.title}</p>
                )}
              </div>

              {/* Metadata Row */}
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2">
                    📂 Categoría
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-accent-cyan transition-colors"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    😀 Mood
                  </label>
                  <select
                    name="mood"
                    value={formData.mood}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-accent-cyan transition-colors"
                  >
                    {moods.map(mood => (
                      <option key={mood} value={mood}>{mood}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-end">
                  <label className="flex items-center gap-2 p-3 glass-effect rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleInputChange}
                      className="text-accent-cyan focus:ring-accent-cyan"
                    />
                    <span className="text-white">⭐ Destacar</span>
                  </label>
                </div>
              </div>

              {/* Preview */}
              <div>
                <label className="block text-white font-medium mb-2">
                  👀 Preview *
                </label>
                <textarea
                  name="preview"
                  value={formData.preview}
                  onChange={handleInputChange}
                  placeholder="Un preview atractivo que enganche a los lectores..."
                  rows="3"
                  className={`w-full p-4 bg-gray-800 border rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-accent-cyan transition-colors resize-none ${
                    errors.preview ? 'border-red-500' : 'border-gray-600'
                  }`}
                />
                <div className="flex justify-between mt-1">
                  {errors.preview && (
                    <p className="text-red-400 text-sm">{errors.preview}</p>
                  )}
                  <p className="text-gray-500 text-sm ml-auto">
                    {formData.preview.length}/200 caracteres
                  </p>
                </div>
              </div>

              {/* Tags y Code Snippet */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2">
                    🏷️ Tags
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="React, CSS, Performance (separados por comas)"
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-accent-cyan transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    💻 Code Snippet
                  </label>
                  <input
                    type="text"
                    name="codeSnippet"
                    value={formData.codeSnippet}
                    onChange={handleInputChange}
                    placeholder="useState(), transform3d(), etc."
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-accent-cyan transition-colors"
                  />
                </div>
              </div>

              {/* Markdown Toolbar */}
              <div>
                <label className="block text-white font-medium mb-2">
                  📄 Contenido * (Markdown soportado)
                </label>
                <div className="flex flex-wrap gap-2 mb-3 p-4 bg-gray-800/50 rounded-lg border border-gray-600/30">
                  <div className="w-full text-xs text-gray-400 mb-2">Formato de texto</div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {[
                      { label: '# H1', action: 'h1', desc: 'Título principal' },
                      { label: '## H2', action: 'h2', desc: 'Subtítulo' },
                      { label: '### H3', action: 'h3', desc: 'Sección' },
                      { label: '**B**', action: 'bold', desc: 'Negrita' },
                      { label: '*I*', action: 'italic', desc: 'Cursiva' },
                      { label: '`code`', action: 'code', desc: 'Código inline' },
                    ].map(btn => (
                      <motion.button
                        key={btn.label}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => insertMarkdown(btn.action)}
                        className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded transition-colors font-mono"
                        title={btn.desc}
                      >
                        {btn.label}
                      </motion.button>
                    ))}
                  </div>

                  <div className="w-full text-xs text-gray-400 mb-2">Bloques de código</div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {[
                      { label: '{ JS }', action: 'codeblock', lang: 'javascript', desc: 'Bloque JavaScript' },
                      { label: '< CSS >', action: 'codeblock', lang: 'css', desc: 'Bloque CSS' },
                      { label: '{ JSON }', action: 'codeblock', lang: 'json', desc: 'Bloque JSON' },
                      { label: '$ Bash', action: 'codeblock', lang: 'bash', desc: 'Comando terminal' },
                      { label: '⚛️ JSX', action: 'codeblock', lang: 'jsx', desc: 'Bloque JSX' },
                      { label: '# Python', action: 'codeblock', lang: 'python', desc: 'Bloque Python' },
                    ].map(btn => (
                      <motion.button
                        key={btn.label}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => insertMarkdown(btn.action, btn.lang)}
                        className="px-3 py-1.5 bg-accent-cyan/20 hover:bg-accent-cyan/30 text-accent-cyan text-xs rounded transition-colors"
                        title={btn.desc}
                      >
                        {btn.label}
                      </motion.button>
                    ))}
                  </div>

                  <div className="w-full text-xs text-gray-400 mb-2">Listas y elementos</div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: '• Lista', action: 'list', desc: 'Lista con viñetas' },
                      { label: '1. Numerada', action: 'numlist', desc: 'Lista numerada' },
                      { label: '> Quote', action: 'quote', desc: 'Cita o nota' },
                      { label: '[Link]()', action: 'link', desc: 'Enlace' },
                      { label: '---', action: 'hr', desc: 'Línea divisoria' },
                    ].map(btn => (
                      <motion.button
                        key={btn.label}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => insertMarkdown(btn.action)}
                        className="px-3 py-1.5 bg-accent-pink/20 hover:bg-accent-pink/30 text-accent-pink text-xs rounded transition-colors"
                        title={btn.desc}
                      >
                        {btn.label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <textarea
                  ref={contentRef}
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="# Mi Nueva Entrada

Escribe tu contenido aquí usando Markdown...

## Lo que aprendí

- Punto importante 1
- Punto importante 2

```javascript
const ejemplo = 'código de ejemplo'
```

**Conclusión**: ¡Documentar es clave!"
                  rows="20"
                  className={`w-full p-4 bg-gray-800 border rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-accent-cyan transition-colors resize-none font-mono text-sm ${
                    errors.content ? 'border-red-500' : 'border-gray-600'
                  }`}
                />
                <div className="flex justify-between mt-1">
                  {errors.content && (
                    <p className="text-red-400 text-sm">{errors.content}</p>
                  )}
                  <p className="text-gray-500 text-sm ml-auto">
                    {formData.content.split(' ').length} palabras
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex-1 btn-primary relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
                    <div className="flex items-center justify-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                      Guardando...
                    </div>
                  ) : (
                    '💾 Publicar Entrada'
                  )}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={toggleEditor}
                  className="px-8 py-3 glass-effect rounded-lg text-white hover:bg-white/10 transition-colors"
                >
                  Cancelar
                </motion.button>
              </div>
            </motion.div>

            {/* Preview Panel */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="glass-effect rounded-2xl p-6 h-fit sticky top-6"
            >
              <h3 className="text-xl font-semibold mb-4 gradient-text">
                🔮 Preview
              </h3>

              <AnimatePresence mode="wait">
                {isPreview ? (
                  <motion.div
                    key="preview-content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="prose prose-invert prose-sm max-w-none"
                  >
                    {formData.content ? (
                      <div>
                        <h1 className="text-lg font-bold gradient-text mb-2">
                          {formData.title || 'Título de tu entrada'}
                        </h1>
                        <div className="text-sm text-gray-400 mb-4">
                          {formData.category} • {formData.mood}
                        </div>
                        <p className="text-gray-300 text-sm mb-4 italic">
                          {formData.preview || 'Tu preview aparecerá aquí...'}
                        </p>
                        <div className="border-t border-gray-600 pt-4">
                          {renderPreview(formData.content)}
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-400 text-center py-8">
                        Escribe contenido para ver el preview...
                      </p>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="preview-tips"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <h4 className="font-semibold mb-3 text-accent-cyan">
                      💡 Tips para escribir
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li>• Usa títulos (# ## ###) para estructura</li>
                      <li>• Incluye código con ```</li>
                      <li>• Agrega **negritas** e *cursivas*</li>
                      <li>• Lista elementos con -</li>
                      <li>• Sé auténtico y comparte aprendizajes</li>
                    </ul>

                    <div className="mt-6 p-3 bg-gray-800/50 rounded-lg">
                      <h5 className="text-sm font-semibold text-accent-pink mb-2">
                        📊 Estadísticas
                      </h5>
                      <div className="text-xs text-gray-400 space-y-1">
                        <div>Palabras: {formData.content.split(' ').length}</div>
                        <div>Tiempo de lectura: ~{Math.ceil(formData.content.split(' ').length / 200)} min</div>
                        <div>Caracteres: {formData.content.length}</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default BlogEditor