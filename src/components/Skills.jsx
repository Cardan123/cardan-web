import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import AnimatedBackground from './AnimatedBackground'

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
      title: "Languages & Backend",
      icon: "⚡",
      description: "Enterprise Java development with modern frameworks and design patterns.",
      skills: ["Java", "Python", "SQL", "Ruby", "Shell Scripting", "REST APIs"],
      color: "blue"
    },
    {
      title: "DevOps & Cloud",
      icon: "☁️",
      description: "Building reliable CI/CD pipelines and cloud infrastructure at scale.",
      skills: ["Docker", "Oracle Cloud", "Linux", "Jenkins", "DevOps Automation", "Testing"],
      color: "purple"
    },
    {
      title: "AI & Architecture",
      icon: "🤖",
      description: "Applied AI systems with focus on RAG architectures and enterprise patterns.",
      skills: ["AI/ML", "RAG Systems", "Design Patterns", "Data Structures", "OO Design", "Cloud Computing"],
      color: "cyan"
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
    hidden: { y: 40, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        border: "hover:border-blue-500/50",
        icon: "bg-blue-500/10 text-blue-400",
        glow: "group-hover:shadow-blue-500/20"
      },
      purple: {
        border: "hover:border-purple-500/50",
        icon: "bg-purple-500/10 text-purple-400",
        glow: "group-hover:shadow-purple-500/20"
      },
      cyan: {
        border: "hover:border-cyan-500/50",
        icon: "bg-cyan-500/10 text-cyan-400",
        glow: "group-hover:shadow-cyan-500/20"
      }
    }
    return colors[color]
  }

  return (
    <section id="skills" ref={ref} className="py-24 bg-gray-900 relative overflow-hidden">
      <AnimatedBackground variant="skills" />

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="max-w-6xl mx-auto px-6 relative z-10"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <span className="text-blue-400 text-sm font-medium tracking-wider uppercase mb-4 block">Expertise</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Technical Skills
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Enterprise software engineering with AI and cloud expertise
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category) => {
            const colorClasses = getColorClasses(category.color)
            return (
              <motion.div
                key={category.title}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className={`bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 transition-all duration-300 group ${colorClasses.border} ${colorClasses.glow} group-hover:shadow-xl`}
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl ${colorClasses.icon} flex items-center justify-center text-2xl mb-6`}>
                  {category.icon}
                </div>

                {/* Category Header */}
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {category.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  {category.description}
                </p>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 bg-gray-700/50 text-gray-300 text-sm rounded-lg border border-gray-600/30 hover:border-blue-500/30 hover:text-white transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}

export default Skills
