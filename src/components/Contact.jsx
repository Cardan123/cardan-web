import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import AnimatedBackground from './AnimatedBackground'

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
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

  const contactLinks = [
    {
      label: "Email",
      value: "carlosdanielvillena@gmail.com",
      href: "mailto:carlosdanielvillena@gmail.com",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: "blue"
    },
    {
      label: "LinkedIn",
      value: "carlos-villena",
      href: "https://www.linkedin.com/in/carlos-villena/",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      color: "cyan"
    },
    {
      label: "GitHub",
      value: "Cardan123",
      href: "https://github.com/Cardan123",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      ),
      color: "purple"
    }
  ]

  const getColorClasses = (color) => {
    const colors = {
      blue: "group-hover:border-blue-500/50 group-hover:bg-blue-500/5",
      cyan: "group-hover:border-cyan-500/50 group-hover:bg-cyan-500/5",
      purple: "group-hover:border-purple-500/50 group-hover:bg-purple-500/5"
    }
    return colors[color]
  }

  return (
    <section id="contact" ref={ref} className="py-24 bg-gray-900 relative overflow-hidden">
      <AnimatedBackground variant="contact" />

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="max-w-4xl mx-auto px-6 relative z-10"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <span className="text-blue-400 text-sm font-medium tracking-wider uppercase mb-4 block">Contact</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Let's Connect
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Open to new opportunities in software engineering and AI/ML.
            Let's discuss how I can contribute to your team.
          </p>
        </motion.div>

        {/* Contact Links */}
        <motion.div
          variants={itemVariants}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          {contactLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className={`flex items-center gap-4 p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl transition-all duration-300 group overflow-hidden ${getColorClasses(link.color)}`}
            >
              <div className="text-gray-400 group-hover:text-blue-400 transition-colors flex-shrink-0">
                {link.icon}
              </div>
              <div className="min-w-0">
                <div className="text-gray-500 text-sm">{link.label}</div>
                <div className="text-white group-hover:text-blue-400 transition-colors text-sm md:text-base truncate">
                  {link.value}
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div variants={itemVariants} className="text-center">
          <motion.a
            href="mailto:carlosdanielvillena@gmail.com"
            whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(59, 130, 246, 0.3)' }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-medium rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/25"
          >
            Get in Touch
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.a>
        </motion.div>

        {/* Footer */}
        <motion.div
          variants={itemVariants}
          className="mt-24 pt-8 border-t border-gray-800 text-center"
        >
          <p className="text-gray-500 text-sm">
            © 2025 Carlos Villena. Built with React & Tailwind CSS.
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Contact
