import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Contraseña simple para demostración (en producción usar algo más seguro)
  const ADMIN_PASSWORD = 'cardan2024'

  useEffect(() => {
    // Verificar si ya está logueado
    const savedAuth = localStorage.getItem('cardan_admin_auth')
    if (savedAuth === 'true') {
      setIsAdmin(true)
    }
    setIsLoading(false)
  }, [])

  const login = (password) => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true)
      localStorage.setItem('cardan_admin_auth', 'true')
      return true
    }
    return false
  }

  const logout = () => {
    setIsAdmin(false)
    localStorage.removeItem('cardan_admin_auth')
  }

  const value = {
    isAdmin,
    isLoading,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}