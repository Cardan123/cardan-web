import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const Timeline = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
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

  const experiences = [
    {
      id: 1,
      year: "2024 - Presente",
      title: "Senior Full Stack Developer",
      company: "Tech Solutions Inc.",
      location: "Remote",
      description: "Liderazgo de equipo de desarrollo, arquitectura de aplicaciones escalables y mentoring de desarrolladores junior.",
      technologies: ["React", "Node.js", "AWS", "Docker", "TypeScript"],
      achievements: [
        "Aumenté la performance del sistema en 40%",
        "Lideré migración de monolito a microservicios",
        "Mentoré a 5 desarrolladores junior"
      ],
      type: "work",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      year: "2023",
      title: "Certificación AWS Solutions Architect",
      company: "Amazon Web Services",
      location: "Online",
      description: "Certificación profesional en diseño de arquitecturas escalables y seguras en AWS.",
      technologies: ["AWS", "Lambda", "S3", "EC2", "RDS"],
      achievements: [
        "Aprobé con puntuación del 92%",
        "Especialización en serverless architecture",
        "Implementé 10+ proyectos en AWS"
      ],
      type: "certification",
      color: "from-orange-500 to-red-500"
    },
    {
      id: 3,
      year: "2022 - 2024",
      title: "Full Stack Developer",
      company: "StartupXYZ",
      location: "Ciudad, País",
      description: "Desarrollo de MVP y producto completo para startup en crecimiento, desde 0 a 50k usuarios activos.",
      technologies: ["React", "Python", "PostgreSQL", "Redis", "GraphQL"],
      achievements: [
        "Construí la aplicación desde cero",
        "Escalé la infraestructura para 50k usuarios",
        "Implementé sistema de pagos completo"
      ],
      type: "work",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 4,
      year: "2022",
      title: "Hackathon Winner - Best Innovation",
      company: "Global Dev Summit",
      location: "Virtual Event",
      description: "Primer lugar en hackathon internacional con solución innovadora para educación remota.",
      technologies: ["React Native", "Socket.io", "MongoDB", "Express"],
      achievements: [
        "Desarrollé en 48 horas una app completa",
        "Competí contra 200+ equipos",
        "Premio de $5,000 USD"
      ],
      type: "achievement",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 5,
      year: "2021 - 2022",
      title: "Frontend Developer",
      company: "Digital Agency Pro",
      location: "Ciudad, País",
      description: "Desarrollo de interfaces web modernas y responsivas para clientes Fortune 500.",
      technologies: ["React", "Vue.js", "Sass", "Webpack", "Figma"],
      achievements: [
        "Entregué 20+ proyectos exitosos",
        "Mejoré conversión de clientes en 25%",
        "Implementé design system corporativo"
      ],
      type: "work",
      color: "from-indigo-500 to-blue-500"
    },
    {
      id: 6,
      year: "2020 - 2021",
      title: "Ingeniería en Sistemas",
      company: "Universidad Tecnológica",
      location: "Ciudad, País",
      description: "Graduado con honores, especialización en desarrollo de software y bases de datos.",
      technologies: ["Java", "Python", "SQL", "Algorithms", "Data Structures"],
      achievements: [
        "Graduado Summa Cum Laude",
        "Tesis sobre Machine Learning",
        "Presidente del club de programación"
      ],
      type: "education",
      color: "from-teal-500 to-green-500"
    }
  ]

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
    hidden: { y: 50, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const getIcon = (type) => {
    switch (type) {
      case 'work': return '💼'
      case 'education': return '🎓'
      case 'certification': return '📜'
      case 'achievement': return '🏆'
      default: return '⭐'
    }
  }

  return (
    <section id="timeline" ref={ref} className="section-padding bg-gray-800 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full filter blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse-slow" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="container-max relative z-10"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Mi <span className="gradient-text">Trayectoria</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Un viaje de crecimiento constante, aprendizaje y logros en el mundo del desarrollo
          </p>
          <div className="w-24 h-1 bg-primary-500 mx-auto mt-4"></div>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <motion.div
            className="absolute left-8 md:left-1/2 top-0 w-1 bg-gradient-to-b from-primary-500 to-purple-500 transform md:-translate-x-1/2"
            initial={{ height: 0 }}
            animate={isVisible ? { height: "100%" } : { height: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />

          {/* Timeline Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                variants={itemVariants}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
                onHoverStart={() => setActiveIndex(index)}
                onHoverEnd={() => setActiveIndex(-1)}
              >
                {/* Timeline Node */}
                <motion.div
                  className={`absolute left-8 md:left-1/2 w-4 h-4 rounded-full border-4 border-white transform md:-translate-x-1/2 z-20 ${
                    activeIndex === index ? 'scale-150' : 'scale-100'
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${exp.color.split(' ')[1]}, ${exp.color.split(' ')[3]})`
                  }}
                  animate={{
                    scale: activeIndex === index ? 1.5 : 1,
                    boxShadow: activeIndex === index
                      ? '0 0 20px rgba(59, 130, 246, 0.6)'
                      : '0 0 0px rgba(59, 130, 246, 0)'
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />

                {/* Content Card */}
                <motion.div
                  className={`ml-16 md:ml-0 md:w-5/12 ${
                    index % 2 === 0 ? 'md:mr-16' : 'md:ml-16'
                  }`}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="glass-effect p-6 rounded-2xl group hover:shadow-2xl transition-all duration-300">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <motion.div
                          className="text-3xl"
                          animate={{ rotate: activeIndex === index ? 360 : 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          {getIcon(exp.type)}
                        </motion.div>
                        <div>
                          <h3 className="text-xl font-semibold text-white group-hover:text-primary-400 transition-colors">
                            {exp.title}
                          </h3>
                          <p className="text-primary-400 font-medium">{exp.company}</p>
                        </div>
                      </div>
                      <motion.div
                        className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${exp.color} text-white`}
                        whileHover={{ scale: 1.05 }}
                      >
                        {exp.year}
                      </motion.div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2 mb-3 text-gray-400 text-sm">
                      <span>📍</span>
                      <span>{exp.location}</span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {exp.technologies.map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          className="px-3 py-1 bg-primary-600/20 text-primary-300 rounded-full text-xs border border-primary-500/30"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                          transition={{ delay: 0.8 + techIndex * 0.1, type: "spring" }}
                          whileHover={{ scale: 1.1, backgroundColor: "rgba(59, 130, 246, 0.3)" }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    {/* Achievements */}
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: activeIndex === index ? 'auto' : 0,
                        opacity: activeIndex === index ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-gray-600 pt-4 mt-4">
                        <h4 className="text-sm font-semibold text-primary-400 mb-2">
                          ✨ Logros destacados:
                        </h4>
                        <ul className="space-y-1">
                          {exp.achievements.map((achievement, achIndex) => (
                            <motion.li
                              key={achIndex}
                              className="text-sm text-gray-300 flex items-center gap-2"
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: achIndex * 0.1 }}
                            >
                              <span className="text-green-400">▸</span>
                              {achievement}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Floating Animation */}
                {activeIndex === index && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-primary-400 rounded-full"
                        initial={{
                          x: Math.random() * 300,
                          y: Math.random() * 200,
                          scale: 0
                        }}
                        animate={{
                          y: [null, -50],
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0]
                        }}
                        transition={{
                          duration: 2,
                          delay: i * 0.1,
                          repeat: Infinity,
                          ease: "easeOut"
                        }}
                      />
                    ))}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Summary */}
        <motion.div
          variants={itemVariants}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { number: "4+", label: "Años de experiencia", icon: "⏱️" },
            { number: "100+", label: "Proyectos completados", icon: "🚀" },
            { number: "5", label: "Certificaciones", icon: "📜" },
            { number: "50k+", label: "Usuarios impactados", icon: "👥" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center glass-effect p-4 rounded-xl"
              initial={{ scale: 0, rotate: -180 }}
              animate={isVisible ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
              transition={{ delay: 1 + index * 0.1, type: "spring" }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold gradient-text">{stat.number}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Timeline