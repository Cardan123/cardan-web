import matter from 'gray-matter'
import { Buffer } from 'buffer'

// Make Buffer available globally for gray-matter
if (typeof window !== 'undefined') {
  window.Buffer = Buffer
}

// Cargar todos los archivos markdown de la carpeta posts
// En Vite, la ruta debe ser relativa desde donde se importa o absoluta desde src
const postsModules = import.meta.glob('/src/posts/*.md', { eager: true, as: 'raw' })

/**
 * Carga y parsea todos los posts desde archivos markdown
 * @returns {Array} Array de objetos con metadata y contenido
 */
// Cache para posts cargados (solo se cargan una vez)
let cachedPosts = null

export const loadPosts = () => {
  // Retornar cache si ya se cargaron los posts
  if (cachedPosts !== null) {
    return cachedPosts
  }

  const posts = []

  for (const path in postsModules) {
    try {
      const rawContent = postsModules[path]
      const { data, content: markdownContent } = matter(rawContent)

      // Extraer el slug del nombre del archivo
      const slug = path
        .split('/')
        .pop()
        .replace(/\.md$/, '')

      // Convertir tags de string a array si es necesario
      const tags = Array.isArray(data.tags) ? data.tags : (data.tags ? data.tags.split(',').map(t => t.trim()) : [])

      // Omitir borradores (draft: true en el frontmatter)
      if (data.draft) {
        continue
      }

      // Validar que los datos requeridos estén presentes
      if (!data.title || !data.date) {
        if (process.env.NODE_ENV === 'development') {
          console.warn(`Post ${slug} is missing required fields (title or date)`)
        }
        continue
      }

      posts.push({
        ...data,
        tags: tags || [],
        category: data.category || 'Uncategorized',
        slug,
        content: markdownContent.trim(),
      })
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(`Error loading post from ${path}:`, error)
      }
      // Continuar con otros posts aunque uno falle
    }
  }

  // Ordenar por fecha (más recientes primero)
  cachedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date))
  return cachedPosts
}

/**
 * Obtiene un post por su slug
 * @param {string} slug - El slug del post
 * @returns {Object|null} El post o null si no se encuentra
 */
export const getPostBySlug = (slug) => {
  const posts = loadPosts()
  return posts.find(post => post.slug === slug) || null
}

/**
 * Obtiene todas las categorías únicas
 * @returns {Array} Array de categorías
 */
export const getCategories = () => {
  const posts = loadPosts()
  const categories = new Set(
    posts
      .map(post => post.category)
      .filter(cat => cat && cat !== 'undefined' && cat !== undefined)
  )
  return ['All', ...Array.from(categories).sort()]
}

