import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const ScrollBackground = () => {
  const [scrollY, setScrollY] = useState(0)
  const [currentTheme, setCurrentTheme] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight

      setScrollY(scrollPosition)

      // Cambiar tema basado en la posición del scroll
      const themeIndex = Math.floor(scrollPosition / (windowHeight * 0.8))
      setCurrentTheme(Math.min(themeIndex, 6)) // 7 temas máximo
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const themes = [
    {
      // Hero - Azul profundo con neón
      colors: ['#003791', '#0070d1', '#00ffff'],
      particles: 'tech',
      intensity: 'high'
    },
    {
      // About - Verde matrix
      colors: ['#0d4f3c', '#3ddc84', '#00ffff'],
      particles: 'matrix',
      intensity: 'medium'
    },
    {
      // Skills - Púrpura místico
      colors: ['#2d1b69', '#8338ec', '#ff006e'],
      particles: 'code',
      intensity: 'medium'
    },
    {
      // Timeline - Naranja cálido
      colors: ['#4a2c2a', '#ff6b35', '#ffee00'],
      particles: 'flow',
      intensity: 'low'
    },
    {
      // Projects - Rosa vibrante
      colors: ['#4a1942', '#ff006e', '#00ffff'],
      particles: 'sparks',
      intensity: 'high'
    },
    {
      // Blog - Azul cascada (ya integrado)
      colors: ['#1a2332', '#0072e6', '#00ffff'],
      particles: 'cascade',
      intensity: 'medium'
    },
    {
      // Contact - Verde esmeralda
      colors: ['#0f3460', '#16537e', '#3ddc84'],
      particles: 'glow',
      intensity: 'low'
    }
  ]

  const theme = themes[currentTheme] || themes[0]
  const scrollProgress = (scrollY / (document.documentElement.scrollHeight - window.innerHeight)) || 0

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Base gradient que cambia con el scroll */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: `linear-gradient(135deg, ${theme.colors[0]} 0%, ${theme.colors[1]} 50%, ${theme.colors[2]} 100%)`
        }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        style={{ opacity: 0.15 }}
      />

      {/* Ondas dinámicas */}
      <WavePattern theme={theme} scrollY={scrollY} />

      {/* Partículas temáticas */}
      <ThemeParticles theme={theme} scrollProgress={scrollProgress} />

      {/* Efectos de transición entre secciones */}
      <SectionTransition scrollY={scrollY} theme={theme} />

      {/* Indicador de progreso de scroll sutil */}
      <motion.div
        className="absolute top-0 left-0 h-1 bg-gradient-to-r from-accent-cyan via-accent-pink to-accent-yellow z-10"
        style={{
          width: `${scrollProgress * 100}%`,
          opacity: 0.6
        }}
      />
    </div>
  )
}

const WavePattern = ({ theme, scrollY }) => {
  return (
    <div className="absolute inset-0">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center, ${theme.colors[i % theme.colors.length]}15 0%, transparent 70%)`,
            transform: `translateY(${(scrollY * (0.1 + i * 0.05))}px) scale(${1 + scrollY * 0.0001})`
          }}
        />
      ))}
    </div>
  )
}

const ThemeParticles = ({ theme, scrollProgress }) => {
  const [elements, setElements] = useState([])

  useEffect(() => {
    const generateElements = () => {
      const count = theme.intensity === 'high' ? 15 : theme.intensity === 'medium' ? 10 : 6
      const newElements = [...Array(count)].map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 30 + 20,
        color: theme.colors[Math.floor(Math.random() * theme.colors.length)],
        speed: Math.random() * 2 + 0.5,
        type: theme.particles,
        shape: ['line', 'triangle', 'diamond', 'hexagon'][Math.floor(Math.random() * 4)],
        rotation: Math.random() * 360
      }))
      setElements(newElements)
    }

    generateElements()
  }, [theme])

  const renderShape = (element) => {
    const baseClasses = "absolute border-2 opacity-30"
    const colorStyle = {
      borderColor: element.color + '60',
      filter: `drop-shadow(0 0 8px ${element.color}40)`
    }

    switch (element.shape) {
      case 'line':
        return (
          <div
            className={`${baseClasses} rounded-none`}
            style={{
              ...colorStyle,
              width: element.size,
              height: 2,
              backgroundColor: element.color + '40'
            }}
          />
        )
      case 'triangle':
        return (
          <div
            className={`${baseClasses} triangle`}
            style={{
              ...colorStyle,
              width: 0,
              height: 0,
              borderLeft: `${element.size/2}px solid transparent`,
              borderRight: `${element.size/2}px solid transparent`,
              borderBottom: `${element.size}px solid ${element.color}40`,
              borderTopColor: 'transparent'
            }}
          />
        )
      case 'diamond':
        return (
          <div
            className={`${baseClasses} transform rotate-45`}
            style={{
              ...colorStyle,
              width: element.size * 0.7,
              height: element.size * 0.7,
              backgroundColor: 'transparent'
            }}
          />
        )
      case 'hexagon':
        return (
          <div
            className={baseClasses}
            style={{
              ...colorStyle,
              width: element.size,
              height: element.size,
              backgroundColor: 'transparent',
              clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'
            }}
          />
        )
      default:
        return (
          <div
            className={`${baseClasses} rounded-lg`}
            style={{
              ...colorStyle,
              width: element.size,
              height: element.size,
              backgroundColor: 'transparent'
            }}
          />
        )
    }
  }

  return (
    <div className="absolute inset-0">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.sin(element.id) * 20, 0],
            rotate: [element.rotation, element.rotation + 360],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut"
          }}
        >
          {renderShape(element)}
        </motion.div>
      ))}
    </div>
  )
}

const SectionTransition = ({ scrollY, theme }) => {
  const windowHeight = window.innerHeight
  const sectionProgress = (scrollY % (windowHeight * 0.8)) / (windowHeight * 0.8)

  return (
    <motion.div
      className="absolute inset-0"
      style={{
        background: `radial-gradient(circle at 50% 50%, ${theme.colors[0]}20 0%, transparent 60%)`,
        transform: `scale(${1 + sectionProgress * 0.2})`,
        opacity: Math.sin(sectionProgress * Math.PI) * 0.3
      }}
    />
  )
}

export default ScrollBackground