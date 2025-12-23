// Blog Service - Abstrae la capa de datos para preparar migración a base de datos

// Generador de UUID simple sin dependencias
function generateId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

class BlogService {
  constructor() {
    this.storageKey = 'blog_posts'
    this.initializeStorage()
  }

  // Inicializar almacenamiento con posts de ejemplo
  initializeStorage() {
    const existingPosts = this.getPosts()
    if (existingPosts.length === 0) {
      const samplePosts = [
        {
          id: generateId(),
          title: "El Futuro del Desarrollo Web en 2024",
          excerpt: "Explorando las tecnologías emergentes que están definiendo el desarrollo web moderno.",
          content: `# El Futuro del Desarrollo Web en 2024

## Tecnologías Emergentes

El panorama del desarrollo web continúa evolucionando a un ritmo acelerado. En 2024, hemos visto el surgimiento de tecnologías que están redefiniendo cómo construimos aplicaciones web.

### 1. Server Components y Edge Computing
React Server Components han madurado significativamente, ofreciendo una nueva forma de pensar sobre la renderización del lado del servidor.

### 2. AI-Driven Development
La integración de IA en herramientas de desarrollo está cambiando cómo escribimos y optimizamos código.

## Conclusión
El futuro se ve brillante para los desarrolladores web que se mantengan actualizados con estas tecnologías.`,
          tags: ["React", "Web Development", "Technology", "AI"],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          published: true,
          views: 342,
          likes: 23
        },
        {
          id: generateId(),
          title: "Optimización de Performance en React",
          excerpt: "Técnicas avanzadas para mejorar el rendimiento de aplicaciones React a gran escala.",
          content: `# Optimización de Performance en React

## Introducción
El rendimiento es crucial para una buena experiencia de usuario. En este artículo exploraremos técnicas avanzadas para optimizar aplicaciones React.

## Técnicas de Optimización

### 1. Memoización Inteligente
\`\`\`jsx
const OptimizedComponent = React.memo(({ data }) => {
  return <div>{data.name}</div>
})
\`\`\`

### 2. Code Splitting
\`\`\`jsx
const LazyComponent = React.lazy(() => import('./LazyComponent'))
\`\`\`

### 3. Virtual Scrolling
Para listas grandes, el virtual scrolling puede mejorar significativamente el rendimiento.

## Herramientas de Medición
- React DevTools Profiler
- Chrome DevTools Performance
- Web Vitals

## Conclusión
La optimización debe ser un proceso continuo, no una reflexión tardía.`,
          tags: ["React", "Performance", "Optimization", "JavaScript"],
          createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 día atrás
          updatedAt: new Date(Date.now() - 86400000).toISOString(),
          published: true,
          views: 187,
          likes: 15
        }
      ]
      this.savePosts(samplePosts)
    }
  }

  // CRUD Operations - Preparadas para migración a base de datos

  // Obtener todos los posts
  async getPosts(filters = {}) {
    try {
      // En producción, esto será una llamada a la API/DB
      const posts = JSON.parse(localStorage.getItem(this.storageKey) || '[]')

      let filteredPosts = [...posts]

      // Filtrar por estado de publicación
      if (filters.published !== undefined) {
        filteredPosts = filteredPosts.filter(post => post.published === filters.published)
      }

      // Filtrar por tags
      if (filters.tags && filters.tags.length > 0) {
        filteredPosts = filteredPosts.filter(post =>
          post.tags.some(tag => filters.tags.includes(tag))
        )
      }

      // Búsqueda por texto
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        filteredPosts = filteredPosts.filter(post =>
          post.title.toLowerCase().includes(searchLower) ||
          post.content.toLowerCase().includes(searchLower) ||
          post.excerpt.toLowerCase().includes(searchLower)
        )
      }

      // Ordenar por fecha (más reciente primero)
      filteredPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

      // Paginación
      if (filters.limit) {
        const offset = filters.offset || 0
        filteredPosts = filteredPosts.slice(offset, offset + filters.limit)
      }

      return filteredPosts
    } catch (error) {
      console.error('Error obteniendo posts:', error)
      throw new Error('Error al obtener los posts')
    }
  }

  // Obtener post por ID
  async getPostById(id) {
    try {
      const posts = await this.getPosts()
      const post = posts.find(p => p.id === id)

      if (!post) {
        throw new Error('Post no encontrado')
      }

      // Incrementar vistas
      post.views = (post.views || 0) + 1
      await this.updatePost(id, { views: post.views })

      return post
    } catch (error) {
      console.error('Error obteniendo post:', error)
      throw error
    }
  }

  // Crear nuevo post
  async createPost(postData) {
    try {
      const posts = await this.getPosts()
      const newPost = {
        id: generateId(),
        title: postData.title,
        excerpt: postData.excerpt,
        content: postData.content,
        tags: postData.tags || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        published: postData.published || false,
        views: 0,
        likes: 0,
        ...postData
      }

      posts.unshift(newPost) // Agregar al inicio
      this.savePosts(posts)

      return newPost
    } catch (error) {
      console.error('Error creando post:', error)
      throw new Error('Error al crear el post')
    }
  }

  // Actualizar post
  async updatePost(id, updates) {
    try {
      const posts = await this.getPosts()
      const postIndex = posts.findIndex(p => p.id === id)

      if (postIndex === -1) {
        throw new Error('Post no encontrado')
      }

      posts[postIndex] = {
        ...posts[postIndex],
        ...updates,
        updatedAt: new Date().toISOString()
      }

      this.savePosts(posts)
      return posts[postIndex]
    } catch (error) {
      console.error('Error actualizando post:', error)
      throw error
    }
  }

  // Eliminar post
  async deletePost(id) {
    try {
      const posts = await this.getPosts()
      const filteredPosts = posts.filter(p => p.id !== id)

      if (filteredPosts.length === posts.length) {
        throw new Error('Post no encontrado')
      }

      this.savePosts(filteredPosts)
      return true
    } catch (error) {
      console.error('Error eliminando post:', error)
      throw error
    }
  }

  // Like/Unlike post
  async toggleLike(id) {
    try {
      const post = await this.getPostById(id)
      const newLikes = (post.likes || 0) + 1

      await this.updatePost(id, { likes: newLikes })
      return newLikes
    } catch (error) {
      console.error('Error toggling like:', error)
      throw error
    }
  }

  // Obtener tags únicos
  async getTags() {
    try {
      const posts = await this.getPosts()
      const allTags = posts.flatMap(post => post.tags || [])
      const uniqueTags = [...new Set(allTags)]

      // Contar frecuencia de cada tag
      const tagCounts = uniqueTags.map(tag => ({
        name: tag,
        count: allTags.filter(t => t === tag).length
      }))

      return tagCounts.sort((a, b) => b.count - a.count)
    } catch (error) {
      console.error('Error obteniendo tags:', error)
      throw error
    }
  }

  // Obtener estadísticas del blog
  async getStats() {
    try {
      const posts = await this.getPosts()
      const publishedPosts = posts.filter(p => p.published)

      return {
        totalPosts: posts.length,
        publishedPosts: publishedPosts.length,
        totalViews: posts.reduce((sum, post) => sum + (post.views || 0), 0),
        totalLikes: posts.reduce((sum, post) => sum + (post.likes || 0), 0),
        averageViews: publishedPosts.length > 0
          ? Math.round(publishedPosts.reduce((sum, post) => sum + (post.views || 0), 0) / publishedPosts.length)
          : 0
      }
    } catch (error) {
      console.error('Error obteniendo estadísticas:', error)
      throw error
    }
  }

  // Métodos auxiliares
  savePosts(posts) {
    localStorage.setItem(this.storageKey, JSON.stringify(posts))
  }

  // Preparar para migración a base de datos
  // Estos métodos serán reemplazados por llamadas a API
  async migrateToDatabase() {
    // TODO: Implementar migración a base de datos real
    // Ejemplo para diferentes bases de datos:

    // Para MongoDB:
    // const posts = await this.getPosts()
    // await db.collection('posts').insertMany(posts)

    // Para PostgreSQL/MySQL:
    // const posts = await this.getPosts()
    // await db.query('INSERT INTO posts (...) VALUES (...)', posts)

    console.log('Migración a base de datos pendiente de implementación')
  }

  // Configurar para producción
  setProductionConfig(config) {
    // TODO: Configurar para diferentes entornos
    this.apiUrl = config.apiUrl
    this.authToken = config.authToken
    this.useDatabase = config.useDatabase || false
  }
}

// Instancia singleton del servicio
const blogService = new BlogService()

export default blogService