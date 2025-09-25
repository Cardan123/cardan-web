# 🎨 Guía de Personalización Avanzada

## 🎯 Personalización Rápida

### 1. Información Personal

**Archivo**: `src/components/Hero.jsx`
```jsx
// Cambia tu nombre y descripción
<span className="gradient-text">TuNombre</span>

// Actualiza el texto que se escribe
const fullText = "Tu Profesión & Especialidad"
```

**Archivo**: `src/components/About.jsx`
```jsx
// Estadísticas personales
const stats = [
  { number: "X+", label: "Años de experiencia" },
  { number: "XX+", label: "Proyectos completados" },
  // ...
]
```

### 2. Colores y Tema

**Archivo**: `tailwind.config.js`
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#eff6ff',
        // Personaliza toda la paleta
        900: '#1e3a8a',
      },
      // Añade tus colores custom
      accent: {
        500: '#ff6b6b', // Color de acento
        600: '#ff5252',
      }
    }
  }
}
```

### 3. Skills y Tecnologías

**Archivo**: `src/components/Skills.jsx`
```jsx
const skills = {
  "Frontend": [
    { name: "Tu Framework", level: 95, color: "from-blue-400 to-blue-600" },
    // Añade tus skills aquí
  ]
}
```

## 🚀 Personalizaciones Avanzadas

### PC Gamer 3D Customization

**Archivo**: `src/components/PCGamer3D.jsx`

#### Cambiar Colores RGB
```jsx
// Personaliza el ciclo de colores RGB
const rgbColor = `hsl(${rgbCycle}, 100%, 60%)`
// Cambia a colores fijos:
// const rgbColor = '#your-color'
```

#### Modificar Componentes Internos
```jsx
// GPU personalizada
<motion.div className="absolute bottom-8 left-6 right-6 h-6 bg-gradient-to-r from-tu-color-600 to-tu-color-400">

// RAM con tus colores
<motion.div className="h-2 bg-gradient-to-r from-tu-color-500 to-tu-color-300 rounded">
```

#### Añadir Nuevos Componentes
```jsx
// Dentro del PC, después de los componentes existentes:
{/* Tu nuevo componente */}
<motion.div
  className="absolute top-X left-X w-X h-X bg-tu-gradiente rounded"
  animate={{ tu-animacion }}
  transition={{ duration: X }}
>
  {/* Contenido del componente */}
</motion.div>
```

### Sistema de Partículas

**Archivo**: `src/components/ParticleSystem.jsx`

#### Configuración de Partículas
```jsx
<ParticleSystem
  particleCount={100}        // Número de partículas
  mouseInfluence={150}       // Radio de influencia del mouse
  particleSize={4}           // Tamaño base de partículas
  colors={['#tu-color-1', '#tu-color-2']} // Colores personalizados
/>
```

#### Crear Nuevo Tipo de Partícula
```jsx
// Añade al final del archivo
export const TuParticleSystem = () => {
  return (
    <ParticleSystem
      particleCount={50}
      colors={['#tu-esquema-de-colores']}
      mouseInfluence={200}
      particleSize={2}
      // Configuraciones específicas
    />
  )
}
```

### Cursor Personalizado

**Archivo**: `src/components/CustomCursor.jsx`

#### Añadir Nuevos Estados
```jsx
const variants = {
  // Estados existentes...

  // Tu nuevo estado
  tuEstado: {
    x: mousePosition.x - 25,
    y: mousePosition.y - 25,
    scale: 2.5,
    rotate: 45,
    backgroundColor: 'rgba(tu, r, g, b)',
    mixBlendMode: 'multiply'
  }
}
```

#### Detectar Nuevos Elementos
```jsx
// En useEffect, añade:
const tusElementos = document.querySelectorAll('.tu-clase-personalizada')
tusElementos.forEach(element => {
  element.addEventListener('mouseenter', () => setCursorVariant('tuEstado'))
  element.addEventListener('mouseleave', () => setCursorVariant('default'))
})
```

## 🎪 Animaciones Personalizadas

### Framer Motion Custom

#### Variantes de Animación Personalizadas
```jsx
const tusVariantes = {
  inicial: {
    opacity: 0,
    scale: 0.8,
    rotate: -90
  },
  animada: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  },
  hover: {
    scale: 1.05,
    rotate: [0, -5, 5, 0],
    transition: { duration: 0.3 }
  }
}
```

#### Animaciones de Scroll Personalizadas
```jsx
const [isVisible, setIsVisible] = useState(false)
const ref = useRef()

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
      }
    },
    { threshold: 0.3 } // Ajusta el threshold
  )

  if (ref.current) observer.observe(ref.current)
  return () => observer.disconnect()
}, [])
```

### CSS 3D Personalizado

#### Nuevas Transformaciones 3D
```jsx
<motion.div
  style={{
    transformStyle: "preserve-3d",
    perspective: "1200px"
  }}
  animate={{
    rotateX: isHovered ? 15 : 0,
    rotateY: isHovered ? -10 : 0,
    translateZ: isHovered ? 50 : 0,
  }}
  transition={{ type: "spring", stiffness: 100 }}
>
  {/* Tu contenido 3D */}
</motion.div>
```

## 🎨 Temas y Modos

### Crear Modo Oscuro/Claro
```jsx
// En App.jsx, añade:
const [darkMode, setDarkMode] = useState(true)

// En tailwind.config.js:
module.exports = {
  darkMode: 'class', // Habilita modo oscuro por clase
  // ...
}

// Usar en componentes:
<div className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900">
```

### Temas de Color Dinámicos
```jsx
const temas = {
  default: {
    primary: 'blue',
    accent: 'purple',
    background: 'gray'
  },
  gaming: {
    primary: 'green',
    accent: 'red',
    background: 'black'
  },
  creative: {
    primary: 'pink',
    accent: 'yellow',
    background: 'purple'
  }
}

const [tema, setTema] = useState('default')
```

## 🚀 Componentes Nuevos

### Template para Nuevo Componente
```jsx
import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

const TuComponente = ({ prop1, prop2 = 'default' }) => {
  const [estado, setEstado] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef()

  // Intersection Observer para animaciones de scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <motion.section
      ref={ref}
      className="section-padding bg-tu-background"
    >
      <motion.div
        variants={variants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="container-max"
      >
        {/* Tu contenido aquí */}
      </motion.div>
    </motion.section>
  )
}

export default TuComponente
```

## 🎯 Tips de Performance

### Optimizaciones de Animaciones
```jsx
// Usa transform en lugar de cambiar left/top
animate={{ x: 100, y: 50 }} // ✅ Correcto
animate={{ left: 100, top: 50 }} // ❌ Evitar

// Usa will-change para animaciones complejas
<motion.div style={{ willChange: 'transform' }}>

// Limita las animaciones en móvil
const shouldAnimate = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
```

### Lazy Loading de Componentes
```jsx
import { lazy, Suspense } from 'react'

const TuComponentePesado = lazy(() => import('./TuComponentePesado'))

// En el render:
<Suspense fallback={<div>Cargando...</div>}>
  <TuComponentePesado />
</Suspense>
```

## 🎪 Easter Eggs y Efectos Especiales

### Konami Code
```jsx
useEffect(() => {
  const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
  ]
  let konamiIndex = 0

  const handleKeyDown = (e) => {
    if (e.code === konamiCode[konamiIndex]) {
      konamiIndex++
      if (konamiIndex === konamiCode.length) {
        // ¡Easter Egg activado!
        setEasterEggMode(true)
        konamiIndex = 0
      }
    } else {
      konamiIndex = 0
    }
  }

  document.addEventListener('keydown', handleKeyDown)
  return () => document.removeEventListener('keydown', handleKeyDown)
}, [])
```

### Efectos de Temporada
```jsx
const getSeasonalEffect = () => {
  const month = new Date().getMonth()
  if (month === 11) return 'snow' // Diciembre
  if (month >= 2 && month <= 4) return 'flowers' // Primavera
  if (month >= 5 && month <= 7) return 'sun' // Verano
  return 'leaves' // Otoño
}
```

¡Experimenta y crea tu propio portfolio único! 🚀