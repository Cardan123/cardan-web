import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import PCGamer3D from './PCGamer3D'
import { CodeParticleSystem, MatrixParticleSystem } from './ParticleSystem'

const Hero = () => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showMatrix, setShowMatrix] = useState(false)
  const fullText = "Desarrollador Full Stack & Creative Coder"

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + fullText[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, fullText])


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  const floatingAnimation = {
    y: [-10, 10],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-playstation-black via-playstation-blue to-playstation-gray">
      {/* Particle Systems */}
      <CodeParticleSystem />
      {showMatrix && <MatrixParticleSystem />}

      {/* Enhanced Background Animation */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent-cyan rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Floating geometric shapes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`geo-${i}`}
            className="absolute border border-accent-cyan/20"
            style={{
              width: 20 + Math.random() * 40,
              height: 20 + Math.random() * 40,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>


      <div className="container-max relative z-10 px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left side - Text content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <motion.div
              variants={itemVariants}
              className="mb-8"
            >
              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
                animate={floatingAnimation}
              >
                Hola, soy{' '}
                <span className="gradient-text">
                  Cardan
                </span>
              </motion.h1>

              {/* Interactive greeting */}
              <motion.div
                className="text-lg md:text-xl text-gray-400 mb-4 cursor-pointer"
                onClick={() => setShowMatrix(!showMatrix)}
                whileHover={{ scale: 1.05, color: "#00ffff" }}
                whileTap={{ scale: 0.95 }}
              >
                {showMatrix ? "🔗 Modo Matrix Activado" : "👋 Click para activar Matrix Mode"}
              </motion.div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mb-8 h-16 flex items-center justify-center lg:justify-start"
            >
              <h2 className="text-xl md:text-3xl lg:text-4xl text-gray-300 font-light">
                {displayText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block w-1 h-6 md:h-8 bg-accent-cyan ml-1"
                />
              </h2>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Especializado en crear experiencias web modernas y funcionales.
              Apasionado por el código limpio, las mejores prácticas y las tecnologías de vanguardia.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary group relative overflow-hidden"
                onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="relative z-10">Ver mis proyectos</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-500 to-purple-600"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline group"
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              >
                Contactáme
                <motion.span
                  className="inline-block ml-2"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  →
                </motion.span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right side - PC Gamer 3D */}
          <motion.div
            initial={{ opacity: 0, x: 100, rotateY: -30 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="order-1 lg:order-2 flex justify-center items-center"
          >
            <PCGamer3D size="large" className="transform scale-110 lg:scale-125" />

            {/* Floating tech icons around PC */}
            {[
              { icon: "⚛️", name: "React", delay: 0 },
              { icon: "📱", name: "Mobile", delay: 0.2 },
              { icon: "🎨", name: "Design", delay: 0.4 },
              { icon: "⚡", name: "Performance", delay: 0.6 },
              { icon: "🛠️", name: "Tools", delay: 0.8 },
              { icon: "🚀", name: "Deploy", delay: 1 }
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                className="absolute text-2xl cursor-pointer"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.8, scale: 1 }}
                transition={{ delay: 1 + tech.delay, type: "spring" }}
                whileHover={{
                  scale: 1.5,
                  rotate: 360,
                  transition: { duration: 0.3 }
                }}
                style={{
                  top: `${30 + Math.sin(index * Math.PI / 3) * 40}%`,
                  left: `${50 + Math.cos(index * Math.PI / 3) * 45}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className="relative group">
                  {tech.icon}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    {tech.name}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          variants={itemVariants}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-white cursor-pointer text-center"
            onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
          >
            <div className="text-sm mb-2">Scroll para conocer más</div>
            <div className="w-6 h-10 border-2 border-white rounded-full mx-auto relative">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-3 bg-white rounded-full absolute left-1/2 top-2 transform -translate-x-1/2"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero