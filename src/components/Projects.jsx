import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [hoveredProject, setHoveredProject] = useState(null)
  const ref = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const projects = [
    {
      id: 1,
      title: "Multimodal RAG - AEC Industry",
      description: "Sistema de RAG multimodal para estimación de costos en construcción. Arquitectura multi-agente con embeddings multimodales, OCR, y procesamiento de imágenes. Precisión 92%, F1-Score 0.91, reducción de alucinaciones de 15% a <3%.",
      category: "ai",
      technologies: ["Python", "LangChain", "SAM", "CLIP", "MongoDB", "OCR"],
      image: "/api/placeholder/400/300",
      demoUrl: "#",
      codeUrl: "https://github.com/Cardan123",
      featured: true,
      metrics: { precision: "0.92", recall: "0.90", f1: "0.91" }
    },
    {
      id: 2,
      title: "Multi-Agent RAG Architecture",
      description: "Sistema de orquestación adaptativa con planning layer inteligente, reranking condicional y reflection loops. Redujo tiempo de licitación de 5 días a <1 día (80% mejora).",
      category: "ai",
      technologies: ["Python", "LangChain", "Vector DBs", "OpenAI", "Gradio"],
      image: "/api/placeholder/400/300",
      demoUrl: "#",
      codeUrl: "https://github.com/Cardan123",
      featured: true
    },
    {
      id: 3,
      title: "Computer Vision Pipeline",
      description: "Pipeline de procesamiento de imágenes con Segment Anything Model (SAM) y CLIP para extracción de información de planos arquitectónicos y documentos técnicos.",
      category: "ai",
      technologies: ["PyTorch", "SAM", "CLIP", "OpenCV", "Tesseract"],
      image: "/api/placeholder/400/300",
      demoUrl: "#",
      codeUrl: "https://github.com/Cardan123",
      featured: true
    },
    {
      id: 4,
      title: "Microservicios Backend",
      description: "Sistema de microservicios enterprise con Spring Boot, gestión de transacciones distribuidas, autenticación JWT y documentación OpenAPI.",
      category: "backend",
      technologies: ["Java", "Spring Boot", "PostgreSQL", "Docker", "Kafka"],
      image: "/api/placeholder/400/300",
      demoUrl: "#",
      codeUrl: "https://github.com/Cardan123",
      featured: false
    },
    {
      id: 5,
      title: "REST API Enterprise",
      description: "API RESTful segura con Spring Security, transacciones ACID, rate limiting, caching distribuido y monitoreo con Prometheus.",
      category: "backend",
      technologies: ["Java", "Spring Security", "Redis", "JWT", "Prometheus"],
      image: "/api/placeholder/400/300",
      demoUrl: "#",
      codeUrl: "https://github.com/Cardan123",
      featured: false
    },
    {
      id: 6,
      title: "Data Pipeline MLOps",
      description: "Pipeline de datos end-to-end para entrenamiento y deployment de modelos ML con versionamiento de datos y modelos.",
      category: "ai",
      technologies: ["Python", "MLflow", "DVC", "Docker", "AWS"],
      image: "/api/placeholder/400/300",
      demoUrl: "#",
      codeUrl: "https://github.com/Cardan123",
      featured: false
    }
  ]

  const categories = [
    { id: 'all', name: 'All', count: projects.length },
    { id: 'ai', name: 'AI/ML', count: projects.filter(p => p.category === 'ai').length },
    { id: 'backend', name: 'Backend', count: projects.filter(p => p.category === 'backend').length }
  ]

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(project => project.category === selectedCategory)

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
    hidden: { y: 30, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="projects" ref={ref} className="section-padding bg-gray-800">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="container-max"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Production-grade AI/ML and backend systems with real-world impact metrics
          </p>
          <div className="w-24 h-1 bg-primary-500 mx-auto mt-4"></div>
        </motion.div>

        {/* Category Filter */}
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/25'
                  : 'glass-effect text-gray-300 hover:text-white'
              }`}
            >
              {category.name} ({category.count})
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => setHoveredProject(project.id)}
              onHoverEnd={() => setHoveredProject(null)}
              className="group relative overflow-hidden rounded-2xl glass-effect hover:shadow-2xl transition-all duration-500"
            >
              {/* Featured Badge */}
              {project.featured && (
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: -45 }}
                  className="absolute top-4 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-8 py-1 z-10"
                >
                  FEATURED
                </motion.div>
              )}

              {/* Project Image Placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-primary-500/20 to-purple-500/20 overflow-hidden">
                <motion.div
                  animate={{
                    scale: hoveredProject === project.id ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full bg-gradient-to-br from-primary-400/10 to-purple-400/10 flex items-center justify-center"
                >
                  <div className="text-6xl text-primary-400/50">
                    {project.category === 'ai' ? '🤖' :
                     project.category === 'backend' ? '⚙️' : '🚀'}
                  </div>
                </motion.div>

                {/* Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: hoveredProject === project.id ? 1 : 0
                  }}
                  className="absolute inset-0 bg-black/50 flex items-center justify-center gap-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors"
                    onClick={() => window.open(project.demoUrl, '_blank')}
                  >
                    👁️
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors"
                    onClick={() => window.open(project.codeUrl, '_blank')}
                  >
                    📋
                  </motion.button>
                </motion.div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <motion.span
                      key={tech}
                      initial={{ scale: 0 }}
                      animate={isVisible ? { scale: 1 } : { scale: 0 }}
                      transition={{ delay: 0.5 + techIndex * 0.1 }}
                      className="px-3 py-1 bg-primary-600/20 text-primary-300 text-xs rounded-full border border-primary-500/30"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 btn-primary text-sm py-2"
                    onClick={() => window.open(project.demoUrl, '_blank')}
                  >
                    View Demo
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 btn-outline text-sm py-2"
                    onClick={() => window.open(project.codeUrl, '_blank')}
                  >
                    View Code
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="btn-outline group"
            onClick={() => window.open('https://github.com/Cardan123', '_blank')}
          >
            View more on GitHub
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
    </section>
  )
}

export default Projects