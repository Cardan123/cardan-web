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
        delayChildren: 0.2,
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  return (
    <section id="about" ref={ref} className="py-24 bg-gray-800">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="max-w-4xl mx-auto px-6"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About Me
          </h2>
          <div className="w-16 h-1 bg-blue-500 mx-auto"></div>
        </motion.div>

        {/* Content */}
        <div className="space-y-8">
          <motion.p
            variants={itemVariants}
            className="text-gray-300 text-lg leading-relaxed"
          >
            I'm a <span className="text-white font-medium">Senior Software Engineer</span> with
            a Master's degree in Applied Artificial Intelligence from{' '}
            <span className="text-blue-400">Tecnológico de Monterrey</span>. My expertise lies
            at the intersection of AI/ML systems and robust backend architectures.
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-gray-300 text-lg leading-relaxed"
          >
            Recently, I led the development of a{' '}
            <span className="text-white font-medium">Multimodal RAG system</span> for the
            AEC (Architecture, Engineering & Construction) industry. The system achieved{' '}
            <span className="text-blue-400">92% precision</span> and reduced hallucination
            rates from 15% to under 3%, transforming how professionals interact with
            technical documentation.
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-gray-300 text-lg leading-relaxed"
          >
            I'm passionate about building production-grade AI solutions that solve real
            industry problems. My toolkit includes multi-agent RAG architectures,
            computer vision pipelines, and scalable backend systems with Java/Spring
            and Python.
          </motion.p>
        </div>

        {/* Highlights */}
        <motion.div
          variants={itemVariants}
          className="mt-16 grid md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: "🎓",
              title: "Education",
              text: "M.S. Applied AI - Tec de Monterrey"
            },
            {
              icon: "🎯",
              title: "Focus",
              text: "Multimodal RAG & Production AI"
            },
            {
              icon: "📍",
              title: "Location",
              text: "Monterrey, Mexico"
            }
          ].map((item) => (
            <div
              key={item.title}
              className="text-center p-6 bg-gray-900/50 rounded-xl border border-gray-700/50"
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="text-white font-medium mb-1">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.text}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

export default About
