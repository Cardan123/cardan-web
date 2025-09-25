import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const CascadeBackground = ({ intensity = 'medium', colors = 'blue' }) => {
  const [drops, setDrops] = useState([])
  const [ripples, setRipples] = useState([])

  const colorSchemes = {
    blue: {
      drops: ['#0072e6', '#00ffff', '#4da6ff'],
      ripples: ['#00ffff', '#0072e6'],
      gradients: 'from-blue-500/20 to-cyan-500/20'
    },
    purple: {
      drops: ['#8338ec', '#ff006e', '#b3d9ff'],
      ripples: ['#ff006e', '#8338ec'],
      gradients: 'from-purple-500/20 to-pink-500/20'
    },
    green: {
      drops: ['#3ddc84', '#00ffff', '#ffee00'],
      ripples: ['#3ddc84', '#00ffff'],
      gradients: 'from-green-500/20 to-cyan-500/20'
    }
  }

  const currentScheme = colorSchemes[colors]

  const intensityLevels = {
    low: { dropCount: 15, speed: 8, size: { min: 2, max: 6 } },
    medium: { dropCount: 25, speed: 12, size: { min: 3, max: 8 } },
    high: { dropCount: 40, speed: 16, size: { min: 4, max: 10 } }
  }

  const config = intensityLevels[intensity]

  useEffect(() => {
    const createDrop = () => {
      const id = Date.now() + Math.random()
      const newDrop = {
        id,
        x: Math.random() * window.innerWidth,
        y: -20,
        size: config.size.min + Math.random() * (config.size.max - config.size.min),
        color: currentScheme.drops[Math.floor(Math.random() * currentScheme.drops.length)],
        speed: config.speed * (0.8 + Math.random() * 0.4),
        opacity: 0.3 + Math.random() * 0.4,
        trail: []
      }

      setDrops(prev => [...prev, newDrop].slice(-config.dropCount))
    }

    const interval = setInterval(createDrop, 400)
    return () => clearInterval(interval)
  }, [config.dropCount, config.size, config.speed, currentScheme.drops])

  useEffect(() => {
    const animateDrops = () => {
      setDrops(prev => prev.map(drop => {
        const newY = drop.y + drop.speed

        // Crear trail
        const newTrail = [...drop.trail, { x: drop.x, y: drop.y, opacity: drop.opacity * 0.5 }].slice(-8)

        // Si la gota toca el "suelo", crear ondas
        if (newY > window.innerHeight) {
          const rippleId = Date.now() + Math.random()
          setRipples(prevRipples => [...prevRipples, {
            id: rippleId,
            x: drop.x,
            y: window.innerHeight - 50,
            color: currentScheme.ripples[Math.floor(Math.random() * currentScheme.ripples.length)],
            startTime: Date.now()
          }])

          // Remover la gota
          return null
        }

        return { ...drop, y: newY, trail: newTrail }
      }).filter(Boolean))
    }

    const animationFrame = requestAnimationFrame(function animate() {
      animateDrops()
      requestAnimationFrame(animate)
    })

    return () => cancelAnimationFrame(animationFrame)
  }, [currentScheme.ripples])

  useEffect(() => {
    // Limpiar ondas viejas
    const cleanupInterval = setInterval(() => {
      setRipples(prev => prev.filter(ripple =>
        Date.now() - ripple.startTime < 3000
      ))
    }, 1000)

    return () => clearInterval(cleanupInterval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-60">
      {/* Gradient overlay suave */}
      <div className={`absolute inset-0 bg-gradient-to-b ${currentScheme.gradients}`} />

      {/* Gotas de cascada */}
      {drops.map(drop => (
        <div key={drop.id}>
          {/* Trail de la gota */}
          {drop.trail.map((point, index) => (
            <motion.div
              key={`${drop.id}-trail-${index}`}
              className="absolute rounded-full"
              style={{
                left: point.x - 1,
                top: point.y,
                width: 2,
                height: 4,
                backgroundColor: drop.color,
                opacity: point.opacity * (index / drop.trail.length)
              }}
            />
          ))}

          {/* Gota principal */}
          <motion.div
            className="absolute rounded-full"
            style={{
              left: drop.x - drop.size / 2,
              top: drop.y,
              width: drop.size,
              height: drop.size * 1.5,
              background: `radial-gradient(ellipse, ${drop.color}dd, ${drop.color}44)`,
              opacity: drop.opacity,
              filter: 'blur(0.5px)'
            }}
            animate={{
              scaleY: [1, 1.2, 1],
              opacity: [drop.opacity, drop.opacity * 0.8, drop.opacity]
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      ))}

      {/* Ondas en el suelo */}
      {ripples.map(ripple => {
        const age = (Date.now() - ripple.startTime) / 3000
        return (
          <motion.div
            key={ripple.id}
            className="absolute rounded-full border-2"
            style={{
              left: ripple.x - 25,
              top: ripple.y,
              width: 50,
              height: 50,
              borderColor: ripple.color + '44',
              backgroundColor: 'transparent'
            }}
            animate={{
              scale: [0, 3, 4],
              opacity: [0.8, 0.3, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 3,
              ease: "easeOut"
            }}
          />
        )
      })}

      {/* Burbujas flotantes ocasionales */}
      <BubbleEffect colorScheme={currentScheme} />
    </div>
  )
}

const BubbleEffect = ({ colorScheme }) => {
  const [bubbles, setBubbles] = useState([])

  useEffect(() => {
    const createBubble = () => {
      if (Math.random() < 0.3) { // 30% chance
        const bubble = {
          id: Date.now() + Math.random(),
          x: Math.random() * window.innerWidth,
          y: window.innerHeight + 20,
          size: 10 + Math.random() * 20,
          color: colorScheme.drops[Math.floor(Math.random() * colorScheme.drops.length)],
          speed: 2 + Math.random() * 3
        }

        setBubbles(prev => [...prev, bubble].slice(-10))
      }
    }

    const interval = setInterval(createBubble, 2000)
    return () => clearInterval(interval)
  }, [colorScheme.drops])

  useEffect(() => {
    const animateBubbles = () => {
      setBubbles(prev => prev.map(bubble => {
        const newY = bubble.y - bubble.speed

        if (newY < -50) return null

        return {
          ...bubble,
          y: newY,
          x: bubble.x + Math.sin(newY * 0.01) * 2 // Movimiento ondulante
        }
      }).filter(Boolean))
    }

    const animationFrame = requestAnimationFrame(function animate() {
      animateBubbles()
      requestAnimationFrame(animate)
    })

    return () => cancelAnimationFrame(animationFrame)
  }, [])

  return (
    <>
      {bubbles.map(bubble => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full"
          style={{
            left: bubble.x - bubble.size / 2,
            top: bubble.y,
            width: bubble.size,
            height: bubble.size,
            background: `radial-gradient(circle, ${bubble.color}22, ${bubble.color}08)`,
            border: `1px solid ${bubble.color}44`,
            backdropFilter: 'blur(1px)'
          }}
          animate={{
            scale: [0.8, 1.1, 0.9, 1],
            opacity: [0.6, 0.8, 0.4, 0.7]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </>
  )
}

export default CascadeBackground