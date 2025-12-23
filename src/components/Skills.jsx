import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const Skills = () => {
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

  const skillCategories = [
    {
      title: "AI & Machine Learning",
      icon: "🤖",
      description: "Building production-grade AI systems with focus on RAG architectures and computer vision.",
      skills: ["Multimodal RAG", "LangChain", "OpenAI/LLMs", "Computer Vision", "PyTorch", "Vector Databases"],
      highlight: "92% precision achieved"
    },
    {
      title: "Backend Development",
      icon: "⚙️",
      description: "Scalable backend systems and APIs with enterprise-grade reliability.",
      skills: ["Java", "Spring Boot", "Python", "PostgreSQL", "MongoDB", "REST APIs"],
      highlight: "100k+ daily transactions"
    },
    {
      title: "Tools & Infrastructure",
      icon: "🛠️",
      description: "Modern DevOps practices and cloud infrastructure management.",
      skills: ["Docker", "AWS", "Git", "CI/CD", "Linux", "MLOps"],
      highlight: "End-to-end pipelines"
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
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="skills" ref={ref} className="py-24 bg-gray-900">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="max-w-6xl mx-auto px-6"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Technical Expertise
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Specialized in AI/ML systems and scalable backend architectures
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-8 hover:border-blue-500/30 transition-all duration-300"
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl">{category.icon}</span>
                <h3 className="text-xl font-semibold text-white">
                  {category.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                {category.description}
              </p>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-gray-700/50 text-gray-300 text-sm rounded-lg border border-gray-600/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Highlight */}
              <div className="pt-4 border-t border-gray-700/50">
                <div className="flex items-center gap-2 text-blue-400 text-sm font-medium">
                  <span>✓</span>
                  <span>{category.highlight}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          variants={itemVariants}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: "5+", label: "Years Experience" },
            { value: "M.S.", label: "Applied AI" },
            { value: "<3%", label: "Hallucination Rate" },
            { value: "F1: 0.91", label: "RAG Performance" }
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Skills
