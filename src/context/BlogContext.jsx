import { createContext, useContext, useReducer, useEffect, useState } from 'react'
import blogService from '../services/blogService'

const BlogContext = createContext()

export const useBlog = () => {
  const context = useContext(BlogContext)
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider')
  }
  return context
}

// Estado inicial simplificado - los posts vienen del servicio
const initialState = {
  posts: [],
  currentView: 'list', // 'list', 'post', 'editor'
  currentPost: null,
  isEditorOpen: false,
  searchTerm: '',
  selectedCategory: 'all',
  sortBy: 'date', // 'date', 'views', 'likes'
  loading: false,
  error: null,
  stats: {
    totalPosts: 0,
    publishedPosts: 0,
    totalViews: 0,
    totalLikes: 0,
    averageViews: 0
  }
}

// Reducer para manejar las acciones del blog
const blogReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }

    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }

    case 'SET_VIEW':
      return { ...state, currentView: action.payload }

    case 'SET_CURRENT_POST':
      return { ...state, currentPost: action.payload, currentView: 'post' }

    case 'LOAD_POSTS':
      return {
        ...state,
        posts: action.payload,
        loading: false,
        error: null
      }

    case 'ADD_POST':
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        currentView: 'list',
        isEditorOpen: false,
        loading: false,
        error: null
      }

    case 'UPDATE_POST':
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.payload.id
            ? action.payload
            : post
        ),
        loading: false,
        error: null
      }

    case 'DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload),
        currentView: 'list',
        currentPost: null,
        loading: false,
        error: null
      }

    case 'TOGGLE_EDITOR':
      return { ...state, isEditorOpen: !state.isEditorOpen }

    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload }

    case 'SET_CATEGORY':
      return { ...state, selectedCategory: action.payload }

    case 'SET_SORT_BY':
      return { ...state, sortBy: action.payload }

    case 'SET_STATS':
      return { ...state, stats: action.payload }

    case 'INCREMENT_POST_VIEWS':
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.payload.id
            ? { ...post, views: action.payload.views }
            : post
        )
      }

    case 'TOGGLE_POST_LIKE':
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.payload.id
            ? { ...post, likes: action.payload.likes }
            : post
        )
      }

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

  // Cargar posts al inicializar
  useEffect(() => {
    const initializeData = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true })
        const posts = await blogService.getPosts({ published: true })
        dispatch({ type: 'LOAD_POSTS', payload: posts })

        const stats = await blogService.getStats()
        dispatch({ type: 'SET_STATS', payload: stats })
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message })
      }
    }

    initializeData()
  }, [])

  // Funciones del servicio
  const loadPosts = async (filters = {}) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })

      // Aplicar filtros del estado actual si no se proporcionan
      const appliedFilters = {
        published: true, // Solo posts publicados por defecto
        search: state.searchTerm || filters.search,
        tags: filters.tags,
        ...filters
      }

      const posts = await blogService.getPosts(appliedFilters)
      dispatch({ type: 'LOAD_POSTS', payload: posts })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
    }
  }

  const loadStats = async () => {
    try {
      const stats = await blogService.getStats()
      dispatch({ type: 'SET_STATS', payload: stats })
    } catch (error) {
      console.error('Error loading stats:', error)
    }
  }

  const createPost = async (postData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const newPost = await blogService.createPost(postData)
      dispatch({ type: 'ADD_POST', payload: newPost })
      await loadStats() // Actualizar estadísticas
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
    }
  }

  const updatePost = async (id, updates) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const updatedPost = await blogService.updatePost(id, updates)
      dispatch({ type: 'UPDATE_POST', payload: updatedPost })
      await loadStats()
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
    }
  }

  const deletePost = async (id) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      await blogService.deletePost(id)
      dispatch({ type: 'DELETE_POST', payload: id })
      await loadStats()
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
    }
  }

  const getPostById = async (id) => {
    try {
      const post = await blogService.getPostById(id)
      dispatch({ type: 'INCREMENT_POST_VIEWS', payload: { id, views: post.views } })
      return post
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
      return null
    }
  }

  const toggleLike = async (id) => {
    try {
      const newLikes = await blogService.toggleLike(id)
      dispatch({ type: 'TOGGLE_POST_LIKE', payload: { id, likes: newLikes } })
    } catch (error) {
      console.error('Error toggling like:', error)
    }
  }

  const getTags = async () => {
    try {
      return await blogService.getTags()
    } catch (error) {
      console.error('Error getting tags:', error)
      return []
    }
  }

  // Filtrar y ordenar posts en el frontend
  const getFilteredPosts = () => {
    let filtered = state.posts

    // Filtrar por categoría (mapear al nuevo formato de tags)
    if (state.selectedCategory !== 'all') {
      filtered = filtered.filter(post =>
        post.tags?.includes(state.selectedCategory)
      )
    }

    // La búsqueda ya se maneja en el servicio, pero podemos filtrar localmente también
    if (state.searchTerm) {
      const term = state.searchTerm.toLowerCase()
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(term) ||
        post.content.toLowerCase().includes(term) ||
        post.excerpt?.toLowerCase().includes(term) ||
        post.tags?.some(tag => tag.toLowerCase().includes(term))
      )
    }

    // Ordenar
    switch (state.sortBy) {
      case 'views':
        return filtered.sort((a, b) => (b.views || 0) - (a.views || 0))
      case 'likes':
        return filtered.sort((a, b) => (b.likes || 0) - (a.likes || 0))
      case 'date':
      default:
        return filtered.sort((a, b) =>
          new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date)
        )
    }
  }

  // Actualizar posts cuando cambien los filtros - Removed to prevent infinite loops
  // Los filtros ahora se manejan en getFilteredPosts()

  const value = {
    ...state,
    dispatch,
    filteredPosts: getFilteredPosts(),

    // Service actions
    loadPosts,
    loadStats,
    createPost,
    updatePost,
    deletePost,
    getPostById,
    toggleLike,
    getTags,

    // Legacy compatibility
    addPost: createPost, // Para compatibilidad con componentes existentes

    // UI actions
    setView: (view) => dispatch({ type: 'SET_VIEW', payload: view }),
    setCurrentPost: async (post) => {
      // Si es un ID, cargar el post completo
      if (typeof post === 'string') {
        const fullPost = await getPostById(post)
        if (fullPost) {
          dispatch({ type: 'SET_CURRENT_POST', payload: fullPost })
        }
      } else {
        dispatch({ type: 'SET_CURRENT_POST', payload: post })
      }
    },
    toggleEditor: () => dispatch({ type: 'TOGGLE_EDITOR' }),
    setSearchTerm: (term) => dispatch({ type: 'SET_SEARCH_TERM', payload: term }),
    setCategory: (category) => dispatch({ type: 'SET_CATEGORY', payload: category }),
    setSortBy: (sortBy) => dispatch({ type: 'SET_SORT_BY', payload: sortBy }),
    clearError: () => dispatch({ type: 'SET_ERROR', payload: null })
  }

  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  )
}

export default BlogContext