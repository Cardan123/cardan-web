import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredSkill, setHoveredSkill] = useState(null)
  const ref = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const skills = {
    "Frontend": [
      { name: "React", level: 95, color: "from-blue-400 to-blue-600" },
      { name: "TypeScript", level: 90, color: "from-blue-600 to-blue-800" },
      { name: "Tailwind CSS", level: 92, color: "from-teal-400 to-teal-600" },
      { name: "Next.js", level: 85, color: "from-gray-600 to-gray-800" },
      { name: "Vue.js", level: 78, color: "from-green-400 to-green-600" }
    ],
    "Backend": [
      { name: "Node.js", level: 88, color: "from-green-500 to-green-700" },
      { name: "Python", level: 85, color: "from-yellow-400 to-yellow-600" },
      { name: "Express", level: 90, color: "from-gray-500 to-gray-700" },
      { name: "PostgreSQL", level: 82, color: "from-blue-500 to-blue-700" },
      { name: "MongoDB", level: 80, color: "from-green-600 to-green-800" }
    ],
    "Tools & Others": [
      { name: "Git", level: 92, color: "from-orange-500 to-orange-700" },
      { name: "Docker", level: 75, color: "from-blue-400 to-blue-600" },
      { name: "AWS", level: 70, color: "from-yellow-500 to-orange-500" },
      { name: "GraphQL", level: 73, color: "from-pink-500 to-pink-700" },
      { name: "Jest", level: 85, color: "from-red-500 to-red-700" }
    ]
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <section id="skills" ref={ref} className="section-padding bg-gray-900">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="container-max"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Mis <span className="gradient-text">Habilidades</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Tecnologías y herramientas que domino para crear experiencias digitales excepcionales
          </p>
          <div className="w-24 h-1 bg-primary-500 mx-auto mt-4"></div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {Object.entries(skills).map(([category, skillList], categoryIndex) => (
            <motion.div
              key={category}
              variants={itemVariants}
              className="space-y-6"
            >
              <h3 className="text-2xl font-semibold text-center mb-8 gradient-text">
                {category}
              </h3>

              <div className="space-y-6">
                {skillList.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                    transition={{ delay: categoryIndex * 0.2 + index * 0.1 }}
                    onHoverStart={() => setHoveredSkill(skill.name)}
                    onHoverEnd={() => setHoveredSkill(null)}
                    className="glass-effect p-6 rounded-xl cursor-pointer transform transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-white font-medium">{skill.name}</span>
                      <motion.span
                        className="text-primary-400 font-bold"
                        animate={{
                          scale: hoveredSkill === skill.name ? 1.1 : 1,
                          color: hoveredSkill === skill.name ? "#60a5fa" : "#3b82f6"
                        }}
                      >
                        {skill.level}%
                      </motion.span>
                    </div>

                    <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className={`absolute left-0 top-0 h-full bg-gradient-to-r ${skill.color} rounded-full`}
                        initial={{ width: 0 }}
                        animate={isVisible ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{
                          duration: 1.5,
                          delay: categoryIndex * 0.2 + index * 0.1,
                          ease: "easeOut"
                        }}
                      />

                      <motion.div
                        className="absolute right-0 top-0 h-full w-1 bg-white rounded-full opacity-60"
                        initial={{ x: -100 }}
                        animate={isVisible ? { x: `${(skill.level - 100)}%` } : { x: -100 }}
                        transition={{
                          duration: 1.5,
                          delay: categoryIndex * 0.2 + index * 0.1 + 0.5,
                          ease: "easeOut"
                        }}
                      />
                    </div>

                    <motion.div
                      className="mt-3 text-gray-400 text-sm"
                      animate={{
                        opacity: hoveredSkill === skill.name ? 1 : 0,
                        y: hoveredSkill === skill.name ? 0 : 10
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {skill.level >= 90 ? "Experto" :
                       skill.level >= 80 ? "Avanzado" :
                       skill.level >= 70 ? "Intermedio" : "Básico"}
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={itemVariants}
          className="text-center mt-16"
        >
          <div className="glass-effect p-8 rounded-2xl max-w-3xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4 gradient-text">
              Siempre Aprendiendo
            </h3>
            <p className="text-gray-300 mb-6">
              La tecnología evoluciona constantemente, y yo con ella. Actualmente estoy explorando:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {['Machine Learning', 'Web3', 'React Native', 'Rust'].map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ scale: 0 }}
                  animate={isVisible ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: 1.5 + index * 0.1, type: "spring" }}
                  className="px-4 py-2 bg-primary-600/20 text-primary-300 rounded-full text-sm font-medium border border-primary-500/30"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Skills