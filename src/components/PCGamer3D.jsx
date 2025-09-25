import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const PCGamer3D = ({ className = "", size = "large" }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [rgbCycle, setRgbCycle] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRgbCycle(prev => (prev + 1) % 360)
    }, 100)
    return () => clearInterval(interval)
  }, [])

  const sizeClasses = {
    small: "w-32 h-40",
    medium: "w-48 h-60",
    large: "w-64 h-80"
  }

  const rgbColor = `hsl(${rgbCycle}, 100%, 60%)`

  return (
    <div className={`${sizeClasses[size]} ${className} relative perspective-1000`}>
      <motion.div
        className="relative w-full h-full transform-gpu"
        animate={{
          rotateY: isHovered ? 15 : -5,
          rotateX: isHovered ? -10 : 5,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* PC Case */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-2xl transform translate-z-0">
          {/* Glass Side Panel */}
          <motion.div
            className="absolute left-2 top-6 bottom-6 w-1 bg-gradient-to-b from-cyan-400/30 to-purple-400/30 rounded-full"
            animate={{
              boxShadow: [
                `0 0 10px ${rgbColor}`,
                `0 0 20px ${rgbColor}`,
                `0 0 10px ${rgbColor}`
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Front Panel */}
          <div className="absolute front face bg-gradient-to-b from-gray-700 to-gray-800 rounded-lg">
            {/* Power Button */}
            <motion.div
              className="absolute top-4 left-4 w-3 h-3 rounded-full"
              animate={{
                backgroundColor: isHovered ? '#10b981' : '#ef4444',
                boxShadow: isHovered
                  ? '0 0 15px #10b981'
                  : '0 0 15px #ef4444'
              }}
              transition={{ duration: 0.3 }}
            />

            {/* LED Strip */}
            <div className="absolute bottom-4 left-4 right-4 h-1 rounded-full overflow-hidden">
              <motion.div
                className="h-full w-full"
                animate={{
                  background: `linear-gradient(90deg, ${rgbColor} 0%, transparent 50%, ${rgbColor} 100%)`
                }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Ventilation Grilles */}
            <div className="absolute top-8 left-4 right-4 space-y-1">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-0.5 bg-gray-600 rounded opacity-60" />
              ))}
            </div>
          </div>

          {/* Internal Components Glow */}
          <motion.div
            className="absolute inset-4 rounded bg-gradient-to-t from-purple-500/10 to-cyan-500/10"
            animate={{
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* GPU */}
          <motion.div
            className="absolute bottom-8 left-6 right-6 h-6 bg-gradient-to-r from-green-600 to-green-400 rounded shadow-lg"
            animate={{
              boxShadow: [
                '0 0 10px rgba(34, 197, 94, 0.5)',
                '0 0 25px rgba(34, 197, 94, 0.8)',
                '0 0 10px rgba(34, 197, 94, 0.5)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {/* GPU Fans */}
            <div className="absolute top-1 left-2 flex gap-1">
              {[...Array(2)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 border border-gray-300 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-1 h-1 bg-gray-300 rounded-full" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RAM Sticks */}
          <div className="absolute top-12 left-6 right-6 space-y-2">
            {[...Array(2)].map((_, i) => (
              <motion.div
                key={i}
                className="h-2 bg-gradient-to-r from-blue-500 to-blue-300 rounded"
                animate={{
                  opacity: [0.6, 1, 0.6],
                  boxShadow: [
                    '0 0 5px rgba(59, 130, 246, 0.3)',
                    '0 0 15px rgba(59, 130, 246, 0.6)',
                    '0 0 5px rgba(59, 130, 246, 0.3)'
                  ]
                }}
                transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }}
              />
            ))}
          </div>

          {/* CPU Cooler */}
          <motion.div
            className="absolute top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-r from-gray-400 to-gray-300"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute inset-2 rounded-full bg-gradient-to-r from-gray-600 to-gray-500">
              <div className="absolute inset-1 rounded-full bg-gradient-to-r from-gray-300 to-gray-200 flex items-center justify-center">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              </div>
            </div>
          </motion.div>

          {/* Side RGB Strips */}
          <div className="absolute right-0 top-0 bottom-0 w-2">
            <motion.div
              className="w-full h-full rounded-r-lg"
              animate={{
                background: `linear-gradient(0deg,
                  hsl(${rgbCycle}, 100%, 60%) 0%,
                  hsl(${(rgbCycle + 60) % 360}, 100%, 60%) 50%,
                  hsl(${(rgbCycle + 120) % 360}, 100%, 60%) 100%
                )`
              }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Motherboard Lines */}
          <svg className="absolute inset-4 w-auto h-auto opacity-30">
            <motion.path
              d="M10,20 Q20,10 40,20 T80,20"
              stroke={rgbColor}
              strokeWidth="1"
              fill="none"
              animate={{
                pathLength: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            />
            <motion.path
              d="M15,40 L70,40 L70,60 L15,60 Z"
              stroke={rgbColor}
              strokeWidth="1"
              fill="none"
              animate={{
                pathLength: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            />
          </svg>
        </div>

        {/* Floating Particles */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                initial={{
                  x: Math.random() * 200,
                  y: Math.random() * 250,
                  opacity: 0
                }}
                animate={{
                  y: [null, -50],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  delay: Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        )}

        {/* Screen/Monitor */}
        <motion.div
          className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-20 h-12 bg-black rounded-t-lg border-2 border-gray-600"
          animate={{
            rotateY: isHovered ? 5 : 0,
          }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
        >
          {/* Screen Content */}
          <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 rounded-t-lg overflow-hidden">
            <motion.div
              className="w-full h-full flex items-center justify-center text-xs font-mono text-green-400"
              animate={{
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="text-center">
                <div>SYSTEM</div>
                <div>ONLINE</div>
              </div>
            </motion.div>
          </div>

          {/* Monitor Stand */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-gray-600 rounded-b" />
        </motion.div>

        {/* Keyboard */}
        <motion.div
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-gray-700 rounded"
          animate={{
            rotateX: isHovered ? -10 : 0,
          }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
        >
          <div className="grid grid-cols-8 gap-0.5 p-1">
            {[...Array(16)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-1 bg-gray-500 rounded-sm"
                animate={{
                  backgroundColor: Math.random() > 0.95 ? rgbColor : '#6b7280'
                }}
                transition={{ duration: 0.5 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Mouse */}
        <motion.div
          className="absolute -bottom-6 -right-8 w-6 h-8 bg-gray-600 rounded-lg"
          animate={{
            rotateZ: isHovered ? 5 : 0,
          }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
        >
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-2 h-3 bg-gray-500 rounded" />
          <motion.div
            className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}

export default PCGamer3D