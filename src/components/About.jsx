import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import AnimatedBackground from './AnimatedBackground'

const About = () => {
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
      { threshold: 0.2 }
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

  const education = [
    {
      degree: "M.Sc. in Artificial Intelligence",
      school: "Tecnológico de Monterrey",
      period: "2023 — 2025"
    },
    {
      degree: "B.Eng. in Computer Systems Engineering (Software)",
      school: "Instituto Politécnico Nacional",
      period: "2018 — 2022"
    }
  ]

  const certifications = [
    "Digital Transformation — MIT (2021)"
  ]

  const languages = [
    "Spanish — Native",
    "English — Advanced Professional"
  ]

  return (
    <section id="experience" ref={ref} className="py-24 bg-gray-800 relative overflow-hidden" aria-label="Experience section">
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
                Senior AI Engineer
              </h3>
              <p className="text-blue-400 text-lg">Ford Motor Company</p>
            </div>
            <span className="text-gray-400 text-sm md:text-base whitespace-nowrap px-3 py-1 bg-gray-800 rounded-full">
              Apr 2026 — Present
            </span>
          </div>

          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              Leading applied AI and platform engineering initiatives focused on GenAI-powered
              developer productivity, secure AI adoption, and production-grade engineering workflows.
            </p>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span>Lead the development of CodeGuardians, an AI-assisted code review platform integrating repository events, pull request context, and asynchronous LLM workflows</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span>Design agentic workflows combining retrieval, context construction, reasoning, validation, structured outputs, and automated feedback loops</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span>Develop evaluation frameworks, regression tests, and validation pipelines to measure LLM quality and reduce hallucinations</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span>Contribute to enterprise AI security, including protections against prompt injection and other LLM-specific attack vectors</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span>Improved software development efficiency by 30% through LLM-based automation and multi-agent architectures</span>
              </li>
            </ul>
            <div className="flex flex-wrap gap-2 pt-4">
              {["Python", "LLMs", "RAG", "Agentic Workflows", "AI Evaluation", "GCP", "CI/CD"].map((tech) => (
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
                Senior Member of Technical Staff
              </h3>
              <p className="text-blue-400 text-lg">Oracle</p>
            </div>
            <span className="text-gray-400 text-sm md:text-base whitespace-nowrap px-3 py-1 bg-gray-800 rounded-full">
              Feb 2022 — Mar 2026
            </span>
          </div>

          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              Owned backend, automation, validation, and cloud-migration capabilities for enterprise
              platforms. Core contributor and owner of key Cloud Pre-migration Analysis Tool (CPAT)
              capabilities, including backend analysis flows, HTML reporting, and CLI tooling.
            </p>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span>Co-architected an automation module within Oracle AutoUpgrade, reducing customer onboarding time by 30%+</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span>Architected high-performance Java services for data validation and migration analysis, achieving 99.9% reliability</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span>Developed a virtualized database testing platform that increased validation throughput by 40%</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span>Led cross-product technical alignment with ZDM, DMS, and Oracle State Explorer teams</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span>Mentored and onboarded engineers on CI/CD, automation frameworks, clean code, and code reviews</span>
              </li>
            </ul>
            <div className="flex flex-wrap gap-2 pt-4">
              {["Java", "SQL", "Oracle DB", "Docker", "Jenkins", "Linux", "Shell"].map((tech) => (
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

        {/* Freelance Role */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 mb-6 hover:border-blue-500/30 transition-all duration-300 group"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div>
              <h3 className="text-2xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                Full-Stack Developer
              </h3>
              <p className="text-blue-400 text-lg">Freelance</p>
            </div>
            <span className="text-gray-400 text-sm md:text-base whitespace-nowrap px-3 py-1 bg-gray-800 rounded-full">
              Aug 2018 — Feb 2022
            </span>
          </div>

          <div className="space-y-4 text-gray-300 leading-relaxed">
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span>Designed and delivered 10+ full-stack web applications from requirements to production deployment</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span>Built responsive React interfaces integrated with Node.js and Express REST APIs</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span>Implemented authentication, RBAC, secure session management, request validation, and error handling</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span>Automated manual business workflows, improving client operational efficiency by 30–50%</span>
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
                <p className="text-blue-400 text-lg">Construct AI — Master's Project · Tecnológico de Monterrey</p>
              </div>
              <span className="text-gray-400 text-sm md:text-base whitespace-nowrap px-3 py-1 bg-gray-800/50 rounded-full">
                Sep 2025 — Dec 2025
              </span>
            </div>

            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Designed and implemented a production-grade multimodal RAG system to automate
                construction cost estimation using visual blueprints and textual technical
                specifications.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Built AI pipelines with OCR, image understanding, and multimodal embeddings — CLIP (ViT-B/16) for images, BGE-M3 for text</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Engineered adaptive query routing, conditional reranking, reflection, and validation loops for hallucination control</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Achieved 0.92 precision, 0.90 recall, and 0.91 F1 with hallucinations under 3% — enabling 80% faster bidding and 70% fewer calculation errors</span>
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

        {/* Education */}
        <motion.div variants={itemVariants} className="mb-8">
          <h3 className="text-lg font-medium text-white mb-4">Education</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {education.map((edu) => (
              <div
                key={edu.degree}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-5 hover:border-blue-500/30 transition-colors"
              >
                <p className="text-white font-medium">{edu.degree}</p>
                <p className="text-blue-400 text-sm mt-1">{edu.school}</p>
                <p className="text-gray-500 text-sm mt-1">{edu.period}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Certification & Languages */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Certification</h3>
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
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Languages</h3>
            <div className="flex flex-wrap gap-3">
              {languages.map((lang) => (
                <span
                  key={lang}
                  className="px-4 py-2 bg-gray-900/50 border border-gray-700/50 text-gray-300 text-sm rounded-full hover:border-blue-500/30 transition-colors"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default About
