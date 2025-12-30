import { motion } from 'framer-motion'

const AnimatedBackground = ({ variant = 'default' }) => {
  const variants = {
    hero: {
      orbs: [
        { color: 'bg-blue-500/20', size: 'w-96 h-96', position: 'top-0 -left-48', delay: 0 },
        { color: 'bg-purple-500/20', size: 'w-80 h-80', position: 'bottom-0 -right-40', delay: 1 },
        { color: 'bg-cyan-500/10', size: 'w-[500px] h-[500px]', position: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2', delay: 2 },
      ],
      showGrid: true,
      showParticles: true,
      particleCount: 200
    },
    experience: {
      orbs: [
        { color: 'bg-blue-500/10', size: 'w-[400px] h-[400px]', position: 'top-20 -right-20', delay: 0 },
        { color: 'bg-purple-500/10', size: 'w-[300px] h-[300px]', position: 'bottom-40 -left-20', delay: 1.5 },
      ],
      showGrid: false,
      showParticles: true
    },
    skills: {
      orbs: [
        { color: 'bg-cyan-500/10', size: 'w-[600px] h-[600px]', position: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2', delay: 0 },
        { color: 'bg-blue-500/10', size: 'w-80 h-80', position: '-top-20 -left-20', delay: 1 },
      ],
      showGrid: true,
      showParticles: false
    },
    projects: {
      orbs: [
        { color: 'bg-purple-500/10', size: 'w-[400px] h-[400px]', position: 'top-0 left-1/4', delay: 0 },
        { color: 'bg-blue-500/10', size: 'w-[350px] h-[350px]', position: 'bottom-20 right-1/4', delay: 1 },
      ],
      showGrid: false,
      showParticles: true
    },
    contact: {
      orbs: [
        { color: 'bg-blue-500/10', size: 'w-[500px] h-[500px]', position: 'top-0 left-1/2 -translate-x-1/2', delay: 0 },
        { color: 'bg-purple-500/10', size: 'w-72 h-72', position: 'bottom-0 right-0', delay: 1.5 },
      ],
      showGrid: true,
      showParticles: false
    }
  }

  const config = variants[variant] || variants.default

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated Orbs */}
      {config.orbs.map((orb, index) => (
        <motion.div
          key={index}
          className={`absolute ${orb.size} ${orb.color} rounded-full blur-[100px] ${orb.position}`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: orb.delay,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Animated Grid */}
      {config.showGrid && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.03 }}
          transition={{ duration: 1 }}
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      )}

      {/* Floating Particles */}
      {config.showParticles && (
        <div className="absolute inset-0">
          {[...Array(config.particleCount || 15)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${i % 3 === 0 ? 'w-1.5 h-1.5 bg-blue-400/40' : i % 3 === 1 ? 'w-1 h-1 bg-purple-400/30' : 'w-0.5 h-0.5 bg-cyan-400/50'}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -50 - Math.random() * 50, 0],
                x: [0, (Math.random() - 0.5) * 30, 0],
                opacity: [0, 0.8, 0],
                scale: [0, 1.2, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900/50" />
    </div>
  )
}

export default AnimatedBackground
