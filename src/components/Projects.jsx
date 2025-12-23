import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false)
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
      title: "Multimodal RAG System",
      subtitle: "AEC Industry - Master's Thesis",
      description: "Production-grade RAG system for construction cost estimation. Multi-agent architecture processing architectural blueprints and technical documents with 92% precision.",
      technologies: ["Python", "LangChain", "SAM", "CLIP", "MongoDB"],
      metrics: [
        { label: "Precision", value: "92%" },
        { label: "F1-Score", value: "0.91" },
        { label: "Hallucination", value: "<3%" }
      ],
      link: "https://github.com/Cardan123",
      featured: true
    },
    {
      title: "Computer Vision Pipeline",
      subtitle: "Document Processing",
      description: "Image segmentation and OCR pipeline using Segment Anything Model (SAM) and CLIP for extracting information from technical drawings.",
      technologies: ["PyTorch", "SAM", "CLIP", "OpenCV", "Tesseract"],
      metrics: [
        { label: "Processing", value: "Real-time" },
        { label: "Accuracy", value: "95%" }
      ],
      link: "https://github.com/Cardan123",
      featured: true
    },
    {
      title: "Enterprise Backend",
      subtitle: "Microservices Architecture",
      description: "Scalable microservices infrastructure handling 100k+ daily transactions with comprehensive monitoring and CI/CD pipelines.",
      technologies: ["Java", "Spring Boot", "PostgreSQL", "Docker", "AWS"],
      metrics: [
        { label: "Transactions", value: "100k+/day" },
        { label: "Uptime", value: "99.9%" }
      ],
      link: "https://github.com/Cardan123",
      featured: false
    }
  ]

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
    <section id="projects" ref={ref} className="py-24 bg-gray-800">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="max-w-6xl mx-auto px-6"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Production-grade AI/ML systems with measurable impact
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`bg-gray-900/50 border border-gray-700/50 rounded-2xl p-8 hover:border-blue-500/30 transition-all duration-300 ${
                project.featured ? 'md:p-10' : ''
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-semibold text-white">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs font-medium rounded">
                        Featured
                      </span>
                    )}
                  </div>

                  <p className="text-blue-400 text-sm mb-4">{project.subtitle}</p>

                  <p className="text-gray-400 leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-lg"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Link */}
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    View on GitHub
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>

                {/* Metrics */}
                <div className="flex md:flex-col gap-4 md:gap-3 md:min-w-[140px]">
                  {project.metrics.map((metric) => (
                    <div key={metric.label} className="text-center md:text-right">
                      <div className="text-xl font-bold text-white">{metric.value}</div>
                      <div className="text-gray-500 text-sm">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* GitHub Link */}
        <motion.div variants={itemVariants} className="text-center mt-12">
          <a
            href="https://github.com/Cardan123"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white rounded-lg transition-colors"
          >
            View more on GitHub
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Projects
