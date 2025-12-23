import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const LoadingScreen = ({ onComplete }) => {
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const loadingSteps = [
    "Initializing systems...",
    "Loading React components...",
    "Configuring animations...",
    "Connecting to the matrix...",
    "Compiling source code...",
    "Optimizing performance...",
    "Welcome to the portfolio!"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        const newProgress = prev + Math.random() * 15 + 5

        if (newProgress >= 100) {
          clearInterval(interval)
          setIsComplete(true)
          setTimeout(() => {
            onComplete && onComplete()
          }, 1500)
          return 100
        }

        // Update current step based on progress
        const stepIndex = Math.floor((newProgress / 100) * (loadingSteps.length - 1))
        setCurrentStep(stepIndex)

        return newProgress
      })
    }, 200 + Math.random() * 300)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-gray-900 flex items-center justify-center overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Matrix Background */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-green-400 font-mono text-xs"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                opacity: [0, 1, 0],
                y: [0, -100, -200]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "linear"
              }}
            >
              {Math.random().toString(36).substring(7)}
            </motion.div>
          ))}
        </div>

        {/* Main Loading Container */}
        <div className="relative z-10 text-center max-w-md mx-auto px-6">
          {/* Logo/Brand */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 100 }}
            className="mb-12"
          >
            <div className="relative">
              {/* Outer rotating ring */}
              <motion.div
                className="w-32 h-32 mx-auto border-4 border-primary-500/30 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />

              {/* Inner rotating ring */}
              <motion.div
                className="absolute inset-4 border-4 border-cyan-400/50 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />

              {/* Center logo */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="text-4xl font-bold gradient-text">C</div>
              </motion.div>

              {/* Orbiting particles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-primary-400 rounded-full"
                  style={{
                    top: '50%',
                    left: '50%',
                    transformOrigin: '0 0'
                  }}
                  animate={{
                    rotate: 360,
                    scale: [0, 1, 0]
                  }}
                  transition={{
                    rotate: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                      delay: i * 0.25
                    },
                    scale: {
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.25
                    }
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Loading Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-white mb-4">
              Carlos<span className="gradient-text">.dev</span>
            </h1>
            <motion.p
              key={currentStep}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-gray-400 text-lg"
            >
              {loadingSteps[currentStep]}
            </motion.p>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="mb-8"
          >
            <div className="relative">
              {/* Background bar */}
              <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
                {/* Progress fill */}
                <motion.div
                  className="h-full bg-gradient-to-r from-primary-500 via-cyan-500 to-purple-500 rounded-full relative"
                  initial={{ width: 0 }}
                  animate={{ width: `${loadingProgress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                      x: ['-100%', '100%']
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </motion.div>
              </div>

              {/* Percentage */}
              <motion.div
                className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-white font-bold"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                {Math.round(loadingProgress)}%
              </motion.div>
            </div>
          </motion.div>

          {/* Code Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="font-mono text-sm text-gray-500 space-y-1"
          >
            {[
              "import React from 'react'",
              "import { motion } from 'framer-motion'",
              "const Portfolio = () => {",
              "  return <Amazing />",
              "}"
            ].map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + index * 0.2 }}
                className="text-left"
              >
                <span className="text-cyan-400">{'> '}</span>
                {line}
              </motion.div>
            ))}
          </motion.div>

          {/* Success Animation */}
          <AnimatePresence>
            {isComplete && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-gray-900/90"
              >
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.6, type: "spring" }}
                    className="text-6xl mb-4"
                  >
                    ✨
                  </motion.div>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl font-bold text-white mb-2"
                  >
                    Loading Complete!
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-400"
                  >
                    Preparing awesome experience...
                  </motion.p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {['{', '}', '<', '>', '(', ')', '[', ']'].map((symbol, i) => (
              <motion.div
                key={symbol}
                className="absolute text-primary-400/20 text-2xl font-mono"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`
                }}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 360, 0],
                  opacity: [0.2, 0.6, 0.2]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              >
                {symbol}
              </motion.div>
            ))}
          </div>

          {/* Loading dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-2"
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-primary-500 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default LoadingScreen