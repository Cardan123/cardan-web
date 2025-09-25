import { createContext, useContext, useReducer, useEffect } from 'react'

const BlogContext = createContext()

export const useBlog = () => {
  const context = useContext(BlogContext)
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider')
  }
  return context
}

// Estado inicial con posts de ejemplo
const initialState = {
  posts: [
    {
      id: 1,
      title: "Construyendo mi PC Gamer 3D con CSS",
      date: "2024-01-15",
      category: "CSS & Animaciones",
      readTime: "8 min",
      preview: "Hoy documenté cómo crear transformaciones 3D complejas usando solo CSS. Los transform3d son increíbles para performance...",
      content: `# El Viaje del CSS 3D

Después de horas experimentando, logré crear un PC completamente animado usando transformaciones CSS. Lo más interesante fue descubrir que:

\`\`\`css
.pc-component {
  transform-style: preserve-3d;
  perspective: 1000px;
}
\`\`\`

**Lo que aprendí:**
- Las transformaciones 3D deben usar GPU acceleration
- \`will-change: transform\` mejora significativamente la performance
- Los efectos RGB se logran mejor con animaciones HSL

**Próximos experimentos:**
- WebGL integration
- Particle systems más complejos
- Real-time lighting effects

## El Proceso de Desarrollo

Inicié este proyecto porque quería agregar algo único a mi portfolio. La idea era crear una representación 3D de una PC gamer que fuera interactiva y visualmente impactante.

### Desafíos Técnicos

1. **Performance**: Las animaciones CSS pueden ser costosas
2. **Compatibilidad**: No todos los navegadores soportan las mismas características
3. **Responsive Design**: Hacer que el 3D funcione en móviles

### Soluciones Implementadas

Para resolver el problema de performance, implementé:
- Hardware acceleration con \`transform3d(0,0,0)\`
- Uso de \`will-change\` solo cuando es necesario
- Optimización de repaint con \`backface-visibility: hidden\`

## Conclusión

Este proyecto me enseñó mucho sobre las capacidades modernas del CSS. Es increíble lo que se puede lograr sin JavaScript adicional.`,
      tags: ["CSS3D", "Performance", "Animation"],
      mood: "🤯",
      codeSnippet: "transform3d(0, 0, 0)",
      featured: true,
      slug: "construyendo-pc-gamer-3d-css",
      author: "Cardan",
      views: 1247,
      likes: 89,
      comments: []
    },
    {
      id: 2,
      title: "React Hooks: useCallback vs useMemo",
      date: "2024-01-12",
      category: "React & Hooks",
      readTime: "5 min",
      preview: "Optimizando renders innecesarios en mi portfolio. La diferencia entre useCallback y useMemo es sutil pero crucial...",
      content: `# Optimización de Renders

Mientras optimizaba las animaciones del portfolio, me topé con renders innecesarios que afectaban la fluidez.

\`\`\`jsx
// Antes - Re-crea la función en cada render
const handleClick = () => setCount(count + 1)

// Después - Memoiza la función
const handleClick = useCallback(() =>
  setCount(c => c + 1), [])
\`\`\`

**Key insights:**
- useCallback para funciones
- useMemo para valores computados pesados
- Dependency arrays son cruciales

## Casos de Uso Reales

En mi portfolio, encontré estos casos donde la memoización marcaba la diferencia:

### useCallback
- Event handlers para animaciones
- Funciones pasadas como props a componentes hijos
- Callbacks para efectos que se ejecutan frecuentemente

### useMemo
- Cálculos complejos de posiciones de partículas
- Filtrado de arrays grandes
- Transformaciones de datos costosas

## Medición del Impacto

Antes de la optimización:
- 15-20 renders por segundo en hover
- Lag visible en animaciones

Después de la optimización:
- 5-8 renders por segundo
- Animaciones fluidas a 60fps`,
      tags: ["React", "Performance", "Hooks"],
      mood: "💡",
      codeSnippet: "useCallback(() => {}, [])",
      featured: false,
      slug: "react-hooks-usecallback-usememo",
      author: "Cardan",
      views: 892,
      likes: 67,
      comments: []
    },
    {
      id: 3,
      title: "Intersection Observer + Framer Motion",
      date: "2024-01-10",
      category: "Performance",
      readTime: "6 min",
      preview: "Combinando Intersection Observer con Framer Motion para animaciones de scroll súper fluidas...",
      content: `# Scroll Animations Done Right

Las animaciones de scroll pueden ser costosas. Mi solución combina lo mejor de ambos mundos:

\`\`\`jsx
const [isVisible, setIsVisible] = useState(false)

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => setIsVisible(entry.isIntersecting),
    { threshold: 0.3 }
  )
  // Observer logic
}, [])
\`\`\`

Resultado: 60fps consistentes en todas las animaciones.

## La Importancia del Threshold

El threshold determina cuándo se activa la animación:
- 0.1: Apenas visible
- 0.3: 30% visible (mi favorito)
- 0.5: Mitad visible
- 1.0: Completamente visible

Para mi portfolio elegí 0.3 porque da el mejor balance entre anticipación y performance.

## Optimizaciones Adicionales

1. **Disconnect del Observer**: Siempre limpiar en unmount
2. **Root Margin**: Para pre-cargar animaciones
3. **Throttling**: Para evitar updates excesivos`,
      tags: ["Animation", "Performance", "UX"],
      mood: "🚀",
      codeSnippet: "IntersectionObserver()",
      featured: false,
      slug: "intersection-observer-framer-motion",
      author: "Cardan",
      views: 634,
      likes: 45,
      comments: []
    }
  ],
  currentView: 'list', // 'list', 'post', 'editor'
  currentPost: null,
  isEditorOpen: false,
  searchTerm: '',
  selectedCategory: 'all',
  sortBy: 'date' // 'date', 'views', 'likes'
}

// Reducer para manejar las acciones del blog
const blogReducer = (state, action) => {
  switch (action.type) {
    case 'SET_VIEW':
      return { ...state, currentView: action.payload }

    case 'SET_CURRENT_POST':
      return { ...state, currentPost: action.payload, currentView: 'post' }

    case 'ADD_POST':
      const newPost = {
        ...action.payload,
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        author: 'Cardan',
        views: 0,
        likes: 0,
        comments: [],
        slug: generateSlug(action.payload.title)
      }
      return {
        ...state,
        posts: [newPost, ...state.posts],
        currentView: 'list',
        isEditorOpen: false
      }

    case 'UPDATE_POST':
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.payload.id
            ? { ...post, ...action.payload.updates }
            : post
        )
      }

    case 'DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload),
        currentView: 'list',
        currentPost: null
      }

    case 'TOGGLE_EDITOR':
      return { ...state, isEditorOpen: !state.isEditorOpen }

    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload }

    case 'SET_CATEGORY':
      return { ...state, selectedCategory: action.payload }

    case 'SET_SORT_BY':
      return { ...state, sortBy: action.payload }

    case 'INCREMENT_VIEWS':
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.payload
            ? { ...post, views: post.views + 1 }
            : post
        )
      }

    case 'TOGGLE_LIKE':
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.payload
            ? { ...post, likes: post.likes + (post.liked ? -1 : 1), liked: !post.liked }
            : post
        )
      }

    case 'LOAD_POSTS':
      return { ...state, posts: action.payload }

    default:
      return state
  }
}

// Función para generar slug
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export const BlogProvider = ({ children }) => {
  const [state, dispatch] = useReducer(blogReducer, initialState)

  // Persistir en localStorage
  useEffect(() => {
    const savedPosts = localStorage.getItem('blog-posts')
    if (savedPosts) {
      dispatch({ type: 'LOAD_POSTS', payload: JSON.parse(savedPosts) })
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('blog-posts', JSON.stringify(state.posts))
  }, [state.posts])

  // Filtrar y ordenar posts
  const getFilteredPosts = () => {
    let filtered = state.posts

    // Filtrar por categoría
    if (state.selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === state.selectedCategory)
    }

    // Filtrar por búsqueda
    if (state.searchTerm) {
      const term = state.searchTerm.toLowerCase()
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(term) ||
        post.content.toLowerCase().includes(term) ||
        post.tags.some(tag => tag.toLowerCase().includes(term))
      )
    }

    // Ordenar
    switch (state.sortBy) {
      case 'views':
        return filtered.sort((a, b) => b.views - a.views)
      case 'likes':
        return filtered.sort((a, b) => b.likes - a.likes)
      case 'date':
      default:
        return filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
    }
  }

  const value = {
    ...state,
    dispatch,
    filteredPosts: getFilteredPosts(),

    // Actions
    setView: (view) => dispatch({ type: 'SET_VIEW', payload: view }),
    setCurrentPost: (post) => {
      dispatch({ type: 'INCREMENT_VIEWS', payload: post.id })
      dispatch({ type: 'SET_CURRENT_POST', payload: post })
    },
    addPost: (post) => dispatch({ type: 'ADD_POST', payload: post }),
    updatePost: (id, updates) => dispatch({ type: 'UPDATE_POST', payload: { id, updates } }),
    deletePost: (id) => dispatch({ type: 'DELETE_POST', payload: id }),
    toggleEditor: () => dispatch({ type: 'TOGGLE_EDITOR' }),
    setSearchTerm: (term) => dispatch({ type: 'SET_SEARCH_TERM', payload: term }),
    setCategory: (category) => dispatch({ type: 'SET_CATEGORY', payload: category }),
    setSortBy: (sortBy) => dispatch({ type: 'SET_SORT_BY', payload: sortBy }),
    toggleLike: (id) => dispatch({ type: 'TOGGLE_LIKE', payload: id })
  }

  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  )
}

export default BlogContext