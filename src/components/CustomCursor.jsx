import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState('default')
  const [isVisible, setIsVisible] = useState(true)
  const [clickEffect, setClickEffect] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    const handleMouseDown = () => {
      setClickEffect(true)
      setTimeout(() => setClickEffect(false), 200)
    }

    // Add event listeners for interactive elements
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll('button, a, [role="button"], input, textarea, select')

      interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => setCursorVariant('hover'))
        element.addEventListener('mouseleave', () => setCursorVariant('default'))
      })

      // Text elements
      const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span')
      textElements.forEach(element => {
        element.addEventListener('mouseenter', () => setCursorVariant('text'))
        element.addEventListener('mouseleave', () => setCursorVariant('default'))
      })

      // Code elements
      const codeElements = document.querySelectorAll('code, pre, .font-mono')
      codeElements.forEach(element => {
        element.addEventListener('mouseenter', () => setCursorVariant('code'))
        element.addEventListener('mouseleave', () => setCursorVariant('default'))
      })
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mousedown', handleMouseDown)

    // Initial setup and periodic refresh for dynamic content
    addHoverListeners()
    const interval = setInterval(addHoverListeners, 2000)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mousedown', handleMouseDown)
      clearInterval(interval)
    }
  }, [])

  const variants = {
    default: {
      x: mousePosition.x - 10,
      y: mousePosition.y - 10,
      scale: 1,
      rotate: 0,
      backgroundColor: 'rgba(59, 130, 246, 0.8)',
      mixBlendMode: 'difference'
    },
    hover: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      scale: 2,
      rotate: 0,
      backgroundColor: 'rgba(16, 185, 129, 0.8)',
      mixBlendMode: 'difference'
    },
    text: {
      x: mousePosition.x - 15,
      y: mousePosition.y - 15,
      scale: 1.5,
      rotate: 0,
      backgroundColor: 'rgba(139, 92, 246, 0.8)',
      mixBlendMode: 'difference'
    },
    code: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      scale: 0.8,
      rotate: 45,
      backgroundColor: 'rgba(245, 101, 101, 0.8)',
      mixBlendMode: 'difference'
    }
  }

  if (!isVisible) return null

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 w-5 h-5 rounded-full"
        animate={variants[cursorVariant]}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
        style={{ mixBlendMode: 'difference' }}
      />

      {/* Cursor trail */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-40 w-8 h-8 rounded-full border border-white/30"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: clickEffect ? 1.5 : 1,
          opacity: clickEffect ? 0.8 : 0.3
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
      />

      {/* Click ripple effect */}
      {clickEffect && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-30"
          initial={{
            x: mousePosition.x - 25,
            y: mousePosition.y - 25,
            scale: 0,
            opacity: 1
          }}
          animate={{
            scale: 2,
            opacity: 0
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="w-12 h-12 border-2 border-primary-400 rounded-full" />
        </motion.div>
      )}

      {/* Floating particles around cursor */}
      <div className="fixed top-0 left-0 pointer-events-none z-20">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary-400 rounded-full"
            animate={{
              x: mousePosition.x + Math.cos(Date.now() * 0.001 + i * 2) * 30 - 4,
              y: mousePosition.y + Math.sin(Date.now() * 0.001 + i * 2) * 30 - 4,
              opacity: cursorVariant === 'hover' ? 0.6 : 0.2,
              scale: cursorVariant === 'hover' ? 1.2 : 0.8
            }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
          />
        ))}
      </div>

      {/* Text indicator for different cursor states */}
      {cursorVariant !== 'default' && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-60 text-xs text-white bg-gray-800 px-2 py-1 rounded"
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: 1,
            x: mousePosition.x + 20,
            y: mousePosition.y - 30
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {cursorVariant === 'hover' && '🎯 Interactuar'}
          {cursorVariant === 'text' && '📝 Texto'}
          {cursorVariant === 'code' && '💻 Código'}
        </motion.div>
      )}
    </>
  )
}

// Hook para ocultar el cursor por defecto
export const useCustomCursor = () => {
  useEffect(() => {
    document.body.style.cursor = 'none'

    return () => {
      document.body.style.cursor = 'auto'
    }
  }, [])
}

export default CustomCursor