import { motion } from 'framer-motion'
import { useState, useEffect, useCallback, useMemo } from 'react'

const ParticleSystem = ({
  particleCount = 50,
  interactive = true,
  mouseInfluence = 100,
  particleSize = 2,
  colors = ['#3b82f6', '#8b5cf6', '#06d6a0', '#f72585'],
  className = ""
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [particles, setParticles] = useState([])
  const [isMouseInside, setIsMouseInside] = useState(false)

  // Initialize particles
  const initializeParticles = useCallback(() => {
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * particleSize + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      originalX: Math.random() * window.innerWidth,
      originalY: Math.random() * window.innerHeight,
      life: 1,
      trail: []
    }))
    setParticles(newParticles)
  }, [particleCount, particleSize, colors])

  // Mouse move handler
  const handleMouseMove = useCallback((event) => {
    if (!interactive) return

    const rect = event.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    })
  }, [interactive])

  // Update particles
  useEffect(() => {
    if (!interactive) return

    const animationFrame = requestAnimationFrame(function animate() {
      setParticles(prevParticles =>
        prevParticles.map(particle => {
          let { x, y, vx, vy, trail } = particle

          // Mouse influence
          if (isMouseInside) {
            const dx = mousePosition.x - x
            const dy = mousePosition.y - y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < mouseInfluence) {
              const force = (mouseInfluence - distance) / mouseInfluence
              const angle = Math.atan2(dy, dx)
              vx += Math.cos(angle) * force * 0.5
              vy += Math.sin(angle) * force * 0.5
            }
          }

          // Natural drift back to original position
          const returnForce = 0.01
          const dxOriginal = particle.originalX - x
          const dyOriginal = particle.originalY - y
          vx += dxOriginal * returnForce
          vy += dyOriginal * returnForce

          // Apply velocity with damping
          vx *= 0.95
          vy *= 0.95
          x += vx
          y += vy

          // Update trail
          const newTrail = [...trail, { x, y, opacity: 1 }].slice(-5)
          const updatedTrail = newTrail.map((point, index) => ({
            ...point,
            opacity: (index + 1) / newTrail.length * 0.5
          }))

          return {
            ...particle,
            x,
            y,
            vx,
            vy,
            trail: updatedTrail
          }
        })
      )

      requestAnimationFrame(animate)
    })

    return () => cancelAnimationFrame(animationFrame)
  }, [mousePosition, isMouseInside, interactive, mouseInfluence])

  // Initialize particles on mount
  useEffect(() => {
    initializeParticles()
  }, [initializeParticles])

  // Memoized particle connections
  const connections = useMemo(() => {
    const connectionDistance = 100
    const connections = []

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < connectionDistance) {
          connections.push({
            from: particles[i],
            to: particles[j],
            opacity: 1 - (distance / connectionDistance)
          })
        }
      }
    }

    return connections
  }, [particles])

  return (
    <div
      className={`fixed inset-0 pointer-events-none ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsMouseInside(true)}
      onMouseLeave={() => setIsMouseInside(false)}
    >
      <svg className="w-full h-full">
        {/* Particle connections */}
        {connections.map((connection, index) => (
          <motion.line
            key={`connection-${index}`}
            x1={connection.from.x}
            y1={connection.from.y}
            x2={connection.to.x}
            y2={connection.to.y}
            stroke="url(#connectionGradient)"
            strokeWidth="1"
            opacity={connection.opacity * 0.3}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5 }}
          />
        ))}

        {/* Gradient definitions */}
        <defs>
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#06d6a0" stopOpacity="0.4" />
          </linearGradient>

          <radialGradient id="particleGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Particles */}
        {particles.map(particle => (
          <g key={particle.id}>
            {/* Particle trail */}
            {particle.trail.map((trailPoint, trailIndex) => (
              <motion.circle
                key={`${particle.id}-trail-${trailIndex}`}
                cx={trailPoint.x}
                cy={trailPoint.y}
                r={particle.size * 0.5}
                fill={particle.color}
                opacity={trailPoint.opacity}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0, opacity: 0 }}
              />
            ))}

            {/* Main particle */}
            <motion.circle
              cx={particle.x}
              cy={particle.y}
              r={particle.size}
              fill="url(#particleGlow)"
              style={{ color: particle.color }}
              animate={{
                scale: isMouseInside ? [1, 1.5, 1] : [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 2 + Math.random(),
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Particle glow effect */}
            <motion.circle
              cx={particle.x}
              cy={particle.y}
              r={particle.size * 3}
              fill={particle.color}
              opacity={0.1}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: 3 + Math.random(),
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </g>
        ))}
      </svg>

      {/* Mouse interaction visualization */}
      {isMouseInside && interactive && (
        <motion.div
          className="absolute pointer-events-none"
          style={{
            left: mousePosition.x - mouseInfluence,
            top: mousePosition.y - mouseInfluence,
            width: mouseInfluence * 2,
            height: mouseInfluence * 2
          }}
        >
          <motion.div
            className="w-full h-full border border-cyan-400/30 rounded-full"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </motion.div>
      )}

      {/* Floating code snippets */}
      {isMouseInside && (
        <div className="absolute inset-0">
          {['React', 'JS', 'CSS', '{}', '()', '[]'].map((text, index) => (
            <motion.div
              key={text}
              className="absolute text-cyan-400/40 text-sm font-mono pointer-events-none"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: 0
              }}
              animate={{
                x: mousePosition.x + (Math.random() - 0.5) * 200,
                y: mousePosition.y + (Math.random() - 0.5) * 200,
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 3,
                delay: index * 0.2,
                repeat: Infinity,
                ease: "easeOut"
              }}
            >
              {text}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

// Enhanced particle system with specific effects
export const CodeParticleSystem = () => {
  return (
    <ParticleSystem
      particleCount={30}
      colors={['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b']}
      mouseInfluence={120}
      particleSize={3}
    />
  )
}

// Matrix-style particle system
export const MatrixParticleSystem = () => {
  const [matrixChars, setMatrixChars] = useState([])

  useEffect(() => {
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789'
    const columns = Math.floor(window.innerWidth / 20)

    const newChars = Array.from({ length: columns }, (_, i) => ({
      id: i,
      x: i * 20,
      chars: Array.from({ length: Math.floor(Math.random() * 10) + 5 }, () =>
        chars[Math.floor(Math.random() * chars.length)]
      ),
      speed: Math.random() * 3 + 1,
      y: Math.random() * -500
    }))

    setMatrixChars(newChars)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20">
      {matrixChars.map(column => (
        <motion.div
          key={column.id}
          className="absolute text-green-400 font-mono text-sm"
          style={{ left: column.x }}
          animate={{
            y: [column.y, window.innerHeight + 100]
          }}
          transition={{
            duration: 10 / column.speed,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {column.chars.map((char, index) => (
            <motion.div
              key={index}
              className="block"
              animate={{
                opacity: [1, 1, 0],
                color: index === 0 ? '#ffffff' : '#00ff00'
              }}
              transition={{
                duration: 0.1,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              {char}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  )
}

export default ParticleSystem