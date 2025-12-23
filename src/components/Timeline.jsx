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
      year: "2024 - Present",
      title: "Master's in Applied Artificial Intelligence",
      company: "Tecnológico de Monterrey",
      location: "Monterrey, Mexico",
      description: "Graduate program focused on production-grade AI systems, specializing in Multimodal RAG architectures for the AEC industry.",
      technologies: ["Python", "LangChain", "PyTorch", "Computer Vision", "RAG", "MongoDB"],
      achievements: [
        "Developed Multimodal RAG system with 92% precision",
        "Reduced AI hallucination rate from 15% to <3%",
        "Technical rating of 9.3/10 on thesis project"
      ],
      type: "education",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 2,
      year: "2024",
      title: "Multimodal RAG System - AEC Industry",
      company: "Master's Thesis Project",
      location: "Tecnológico de Monterrey",
      description: "Led development of a multi-agent RAG architecture for construction cost estimation, processing architectural blueprints and technical documents.",
      technologies: ["SAM", "CLIP", "OCR", "LangChain", "Vector DBs", "OpenAI"],
      achievements: [
        "80% reduction in bidding time (5 days to <1 day)",
        "70% reduction in transcription errors",
        "40% increase in operational efficiency"
      ],
      type: "achievement",
      color: "from-cyan-500 to-blue-500"
    },
    {
      id: 3,
      year: "2022 - 2024",
      title: "Senior Software Engineer",
      company: "Enterprise Solutions",
      location: "Monterrey, Mexico",
      description: "Backend development and architecture design for enterprise applications, focusing on scalable microservices and API design.",
      technologies: ["Java", "Spring Boot", "PostgreSQL", "Docker", "Kafka", "AWS"],
      achievements: [
        "Architected microservices handling 100k+ daily transactions",
        "Implemented CI/CD pipelines reducing deployment time by 60%",
        "Led migration from monolith to microservices architecture"
      ],
      type: "work",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 4,
      year: "2020 - 2022",
      title: "Full Stack Developer",
      company: "Tech Startup",
      location: "Monterrey, Mexico",
      description: "End-to-end development of web applications, from database design to frontend implementation.",
      technologies: ["React", "Node.js", "Python", "MongoDB", "Redis", "REST APIs"],
      achievements: [
        "Built and launched 3 production applications",
        "Scaled platform to support 10k+ concurrent users",
        "Implemented real-time features using WebSockets"
      ],
      type: "work",
      color: "from-indigo-500 to-blue-500"
    },
    {
      id: 5,
      year: "2016 - 2020",
      title: "Bachelor's in Computer Science",
      company: "University",
      location: "Mexico",
      description: "Computer Science degree with focus on software engineering, algorithms, and database systems.",
      technologies: ["Java", "Python", "SQL", "Algorithms", "Data Structures"],
      achievements: [
        "Graduated with honors",
        "Senior project on distributed systems",
        "Teaching assistant for programming courses"
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
            My <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            A path of continuous growth, learning, and achievements in software engineering and AI
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
                          ✨ Key achievements:
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
            { number: "5+", label: "Years of experience", icon: "⏱️" },
            { number: "M.S.", label: "Applied AI - Tec de Monterrey", icon: "🎓" },
            { number: "92%", label: "RAG System Precision", icon: "🎯" },
            { number: "<3%", label: "AI Hallucination Rate", icon: "🧠" }
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