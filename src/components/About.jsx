import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const About = () => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

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
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const stats = [
    { number: "5+", label: "Años de experiencia" },
    { number: "M.S.", label: "Applied AI - Tec de Monterrey" },
    { number: "92%", label: "Precision en sistemas RAG" },
    { number: "<3%", label: "Tasa de alucinación AI" }
  ]

  return (
    <section id="about" ref={ref} className="section-padding bg-gray-800">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="container-max"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Sobre <span className="gradient-text">Mí</span>
          </h2>
          <div className="w-24 h-1 bg-primary-500 mx-auto"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-semibold text-white mb-6">
              Transformando industrias con AI de grado producción
            </h3>

            <p className="text-gray-300 text-lg leading-relaxed">
              Senior Software Engineer con Master's en Applied AI del Tecnológico de Monterrey.
              Recientemente completé un proyecto de tesis desarrollando un sistema Multimodal RAG
              para la industria AEC (Arquitectura, Ingeniería y Construcción) que logró 92% de precisión
              y redujo la tasa de alucinación de 15% a menos del 3%.
            </p>

            <p className="text-gray-300 text-lg leading-relaxed">
              Experiencia construyendo arquitecturas multi-agente RAG con embeddings multimodales,
              procesamiento OCR, descripciones de imágenes y orquestación adaptativa. Especializado
              en sistemas backend escalables con Java/Spring Boot y pipelines de ML con Python.
              Apasionado por crear soluciones AI que resuelven problemas reales de la industria.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              {['Multimodal RAG', 'Computer Vision', 'Java/Spring', 'Python/ML'].map((value, index) => (
                <motion.div
                  key={value}
                  initial={{ scale: 0 }}
                  animate={isVisible ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                  className="glass-effect px-4 py-2 rounded-full text-sm font-medium"
                >
                  {value}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="relative">
            <div className="relative">
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-0 rounded-full border-2 border-primary-500 border-dashed opacity-20"
              />

              <div className="glass-effect rounded-2xl p-8 relative z-10">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                      transition={{ delay: 0.7 + index * 0.1, type: "spring" }}
                      className="text-center"
                    >
                      <motion.div
                        initial={{ y: 20 }}
                        animate={isVisible ? { y: 0 } : { y: 20 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        className="text-3xl md:text-4xl font-bold gradient-text mb-2"
                      >
                        {stat.number}
                      </motion.div>
                      <div className="text-gray-300 text-sm font-medium">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="mt-16 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary group"
            onClick={() => document.getElementById('skills').scrollIntoView({ behavior: 'smooth' })}
          >
            Conoce mis habilidades
            <motion.span
              className="inline-block ml-2"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              ↓
            </motion.span>
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default About