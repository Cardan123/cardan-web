import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import AnimatedBackground from './AnimatedBackground'

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Stop observing once visible to improve performance
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.disconnect()
      }
    }
  }, [])

  const projects = [
    {
      title: "CodeGuardians — AI Code Review",
      subtitle: "Ford Motor Company",
      description: "AI-assisted code review platform integrating repository events, pull request context, review comments, and asynchronous LLM workflows. Agentic pipelines combine retrieval, context construction, validation, structured outputs, and automated feedback loops.",
      technologies: ["LLMs", "Agentic Workflows", "Python", "AI Evaluation", "REST APIs", "GCP"],
      metrics: [
        { label: "Dev Efficiency", value: "+30%" },
        { label: "Scale", value: "Enterprise" }
      ],
      featured: true,
      gradient: "from-blue-500/20 to-purple-500/20"
    },
    {
      title: "ConstructAI — Multimodal RAG",
      subtitle: "Construction Cost Estimation — Master's Project",
      description: "Production-grade multimodal RAG automating construction cost estimation from visual blueprints and technical specifications. OCR and multimodal embeddings with adaptive query routing, conditional reranking, reflection, and validation loops for hallucination control.",
      technologies: ["CLIP", "BGE-M3", "LLMs", "OCR", "MongoDB", "Multi-Agent RAG"],
      metrics: [
        { label: "Precision", value: "0.92" },
        { label: "F1-Score", value: "0.91" },
        { label: "Faster Bidding", value: "+80%" }
      ],
      featured: true,
      gradient: "from-purple-500/20 to-pink-500/20"
    },
    {
      title: "Cloud Pre-migration Analysis Tool",
      subtitle: "Oracle",
      description: "Core contributor and owner of key CPAT capabilities — backend analysis flows, HTML reporting, CLI tooling, parameterized execution, and migration risk assessment. Co-architected an automation module within Oracle AutoUpgrade.",
      technologies: ["Java", "SQL", "Oracle DB", "Shell", "Linux"],
      metrics: [
        { label: "Reliability", value: "99.9%" },
        { label: "Onboarding Time", value: "-30%" }
      ],
      featured: false,
      gradient: "from-cyan-500/20 to-blue-500/20"
    },
    {
      title: "Database Testing Platform",
      subtitle: "Oracle — Infrastructure",
      description: "Fully virtualized database testing platform improving validation throughput, reducing feedback loops and accelerating release cycles across heterogeneous environments.",
      technologies: ["Java", "Docker", "Jenkins", "CI/CD", "Automation"],
      metrics: [
        { label: "Validation", value: "+40%" },
        { label: "Environments", value: "Multi-platform" }
      ],
      featured: false,
      gradient: "from-emerald-500/20 to-cyan-500/20"
    }
  ]

  const sectionVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.98 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  }

  return (
    <section id="projects" ref={ref} className="py-24 bg-gray-800 relative overflow-hidden" aria-label="Projects section">
      <AnimatedBackground variant="projects" />

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="max-w-6xl mx-auto px-6 relative z-10"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <span className="text-blue-400 text-sm font-medium tracking-wider uppercase mb-4 block">Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Enterprise systems and AI solutions with measurable impact
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className={`bg-gradient-to-br ${project.gradient} backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-blue-500/30 transition-all duration-300 group relative overflow-hidden ${
                project.featured ? 'md:p-10' : ''
              }`}
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-500" />

              <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 text-xs font-medium rounded-full border border-blue-500/30">
                        Featured
                      </span>
                    )}
                  </div>

                  <p className="text-blue-400 text-sm mb-4">{project.subtitle}</p>

                  <p className="text-gray-400 leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-800/80 text-gray-300 text-sm rounded-lg border border-gray-700/50 hover:border-blue-500/30 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Metrics */}
                <div className="flex md:flex-col gap-6 md:gap-4 md:min-w-[160px] md:text-right">
                  {project.metrics.map((metric) => (
                    <div key={metric.label} className="text-center md:text-right">
                      <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                        {metric.value}
                      </div>
                      <div className="text-gray-500 text-sm">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default Projects
