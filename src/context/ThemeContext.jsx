import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext({ light: false, toggle: () => {} })

export const ThemeProvider = ({ children }) => {
  const [light, setLight] = useState(() => {
    try {
      return localStorage.getItem('theme') === 'light'
    } catch {
      return false
    }
  })

  useEffect(() => {
    document.documentElement.classList.toggle('light', light)
    try {
      localStorage.setItem('theme', light ? 'light' : 'dark')
    } catch {
      // localStorage unavailable (private mode) — theme just won't persist
    }
  }, [light])

  return (
    <ThemeContext.Provider value={{ light, toggle: () => setLight((l) => !l) }}>
      {children}
    </ThemeContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext)
