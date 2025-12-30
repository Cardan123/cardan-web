import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import AnimatedBackground from './AnimatedBackground'

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
      { threshold: 0.2 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const sectionVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  }

  const certifications = [
    "ScrumMaster - Scrum Alliance",
    "MIT Digital Transformation",
    "Professional Coaching"
  ]

  return (
    <section id="experience" ref={ref} className="py-24 bg-gray-800 relative overflow-hidden">
      <AnimatedBackground variant="experience" />

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="max-w-4xl mx-auto px-6 relative z-10"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <span className="text-blue-400 text-sm font-medium tracking-wider uppercase mb-4 block">Career</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Experience
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </motion.div>

        {/* Senior Role */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 mb-6 hover:border-blue-500/30 transition-all duration-300 group"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div>
              <h3 className="text-2xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                Senior Member of Technical Staff
              </h3>
              <p className="text-blue-400 text-lg">Oracle Utilities</p>
            </div>
            <span className="text-gray-400 text-sm md:text-base whitespace-nowrap px-3 py-1 bg-gray-800 rounded-full">
              Oct 2025 — Present
            </span>
          </div>

          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              Lead engineer specializing in database migrations across on-prem and cloud environments.
              Core contributor to the Cloud Premigration Advisor Tool (CPAT).
            </p>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span>Designed virtualized database testing platform, improving validation throughput by 40%+</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span>Led cross-product technical alignment with ZDM, DMS, and Oracle State Explorer teams</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span>Drove integration of AI-assisted diagnostics and predictive insights into internal tooling</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span>Mentored engineers on CI/CD pipelines, automation frameworks, and Oracle toolchains</span>
              </li>
            </ul>
            <div className="flex flex-wrap gap-2 pt-4">
              {["Java", "Python", "Oracle DB", "Linux", "Shell", "DevOps", "AI Engineering"].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-gray-800/80 text-gray-300 text-xs rounded-full border border-gray-700/50"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Previous Role */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 mb-6 hover:border-blue-500/30 transition-all duration-300 group"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div>
              <h3 className="text-2xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                Member of Technical Staff
              </h3>
              <p className="text-blue-400 text-lg">Oracle</p>
            </div>
            <span className="text-gray-400 text-sm md:text-base whitespace-nowrap px-3 py-1 bg-gray-800 rounded-full">
              Feb 2022 — Oct 2025
            </span>
          </div>

          <div className="space-y-4 text-gray-300 leading-relaxed">
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span>Built high-performance Java services for database migration, validation, and performance testing</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span>Developed automation with Jenkins-based CI/CD pipelines for continuous delivery</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span>Implemented threading models and query optimization for improved performance</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span>Led environment virtualization using Docker for multi-platform development</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* AI Project */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8 mb-8 hover:border-blue-500/40 transition-all duration-300 group relative overflow-hidden"
        >
          {/* Glow effect */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/20 rounded-full blur-[60px] group-hover:bg-blue-500/30 transition-all duration-500" />

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-2xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                    AI Engineer
                  </h3>
                  <span className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 text-xs font-medium rounded-full border border-blue-500/30">
                    Multimodal RAG
                  </span>
                </div>
                <p className="text-blue-400 text-lg">ConstructAI — Construction Intelligence Platform</p>
              </div>
              <span className="text-gray-400 text-sm md:text-base whitespace-nowrap px-3 py-1 bg-gray-800/50 rounded-full">
                Sep 2025 — Dec 2025
              </span>
            </div>

            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Designed a production-grade Multimodal RAG system for the AEC industry, enabling
                natural language queries over architectural drawings and technical documentation
                to deliver cost estimations, compliance insights, and material breakdowns.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Built multimodal embedding pipeline: CLIP (ViT-B/16) for image understanding, BGE-M3 for text, OCR for technical documents</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Architected multi-agent system separating visual interpretation, context retrieval, and cost reasoning with LLM-driven explainable outputs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Reduced estimation time from days to minutes with Precision 0.92, F1 0.91, and hallucinations under 3%</span>
                </li>
              </ul>
              <div className="flex flex-wrap gap-2 pt-4">
                {["CLIP", "BGE-M3", "LLMs", "OCR", "MongoDB", "Python", "Multi-Agent RAG"].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full border border-blue-500/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div variants={itemVariants}>
          <h3 className="text-lg font-medium text-white mb-4">Certifications</h3>
          <div className="flex flex-wrap gap-3">
            {certifications.map((cert) => (
              <span
                key={cert}
                className="px-4 py-2 bg-gray-900/50 border border-gray-700/50 text-gray-300 text-sm rounded-full hover:border-blue-500/30 transition-colors"
              >
                {cert}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default About
