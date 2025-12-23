import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const ref = useRef()

  const testimonials = [
    {
      id: 1,
      name: "Fernando Maytorena",
      role: "Project Sponsor",
      company: "Tecnológico de Monterrey",
      image: "👨‍🏫",
      rating: 5,
      text: "Carlos demonstrated exceptional technical leadership in developing our Multimodal RAG system. His ability to integrate complex AI components while maintaining production-grade quality is remarkable.",
      project: "Multimodal RAG for AEC Industry"
    },
    {
      id: 2,
      name: "Gustavo García",
      role: "AI Engineer, Team Member",
      company: "Master's Project Team",
      image: "👨‍💻",
      rating: 5,
      text: "Working with Carlos on our thesis project was an incredible experience. His deep understanding of RAG architectures and computer vision helped us achieve a 92% precision rate.",
      project: "Multi-Agent RAG Architecture"
    },
    {
      id: 3,
      name: "Edwin Hernández",
      role: "AI Engineer, Team Member",
      company: "Master's Project Team",
      image: "👨‍🔬",
      rating: 5,
      text: "Carlos's expertise in building production-grade AI systems was instrumental in reducing our hallucination rate from 15% to under 3%. His technical vision guided our entire project.",
      project: "Computer Vision Pipeline"
    },
    {
      id: 4,
      name: "Tech Lead",
      role: "Engineering Manager",
      company: "Enterprise Solutions",
      image: "👨‍💼",
      rating: 5,
      text: "Carlos architected our microservices infrastructure handling 100k+ daily transactions. His attention to scalability and clean code practices significantly improved our deployment pipeline.",
      project: "Enterprise Microservices Architecture"
    },
    {
      id: 5,
      name: "Project Manager",
      role: "Product Owner",
      company: "Tech Startup",
      image: "👩‍💻",
      rating: 5,
      text: "From MVP to production scale, Carlos was instrumental in our growth. His full-stack expertise and ability to deliver high-quality code on time made him an invaluable team member.",
      project: "Full Stack Web Platform"
    }
  ]

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

  useEffect(() => {
    if (!isAutoPlaying || !isVisible) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, isVisible, testimonials.length])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToTestimonial = (index) => {
    setCurrentIndex(index)
  }

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <motion.span
        key={i}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
        className={`text-xl ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`}
      >
        ⭐
      </motion.span>
    ))
  }

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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <section id="testimonials" ref={ref} className="section-padding bg-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400 rounded-full filter blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-orange-500 rounded-full filter blur-3xl animate-pulse-slow" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="container-max relative z-10"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What my <span className="gradient-text">Colleagues</span> Say
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Real testimonials from successful projects and exceptional collaborations
          </p>
          <div className="w-24 h-1 bg-primary-500 mx-auto mt-4"></div>
        </motion.div>

        {/* Main Testimonial Display */}
        <motion.div
          variants={itemVariants}
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50, rotateY: -15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -50, rotateY: 15 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="glass-effect p-8 md:p-12 rounded-3xl relative"
            >
              {/* Quote Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="absolute -top-4 -left-4 text-6xl text-primary-400/30"
              >
                "
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8 items-center">
                {/* Testimonial Content */}
                <div className="md:col-span-2 space-y-6">
                  {/* Rating */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex gap-1"
                  >
                    {renderStars(testimonials[currentIndex].rating)}
                  </motion.div>

                  {/* Testimonial Text */}
                  <motion.blockquote
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl md:text-2xl text-gray-200 leading-relaxed font-light italic"
                  >
                    {testimonials[currentIndex].text}
                  </motion.blockquote>

                  {/* Project */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-primary-400 font-semibold"
                  >
                    Project: {testimonials[currentIndex].project}
                  </motion.div>
                </div>

                {/* Client Info */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, type: "spring" }}
                  className="text-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full flex items-center justify-center text-4xl"
                  >
                    {testimonials[currentIndex].image}
                  </motion.div>

                  <h4 className="text-xl font-semibold text-white mb-1">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-primary-400 font-medium mb-1">
                    {testimonials[currentIndex].role}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {testimonials[currentIndex].company}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <motion.button
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-primary-600/80 hover:bg-primary-500 rounded-full flex items-center justify-center text-white text-xl transition-colors"
          >
            ←
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-primary-600/80 hover:bg-primary-500 rounded-full flex items-center justify-center text-white text-xl transition-colors"
          >
            →
          </motion.button>
        </motion.div>

        {/* Indicators */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center gap-3 mt-8"
        >
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-primary-500 scale-125'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </motion.div>

        {/* Auto-play indicator */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center items-center gap-2 mt-4 text-sm text-gray-400"
        >
          <motion.div
            animate={{ rotate: isAutoPlaying ? 360 : 0 }}
            transition={{ duration: 2, repeat: isAutoPlaying ? Infinity : 0, ease: "linear" }}
            className="w-4 h-4"
          >
            ⚡
          </motion.div>
          {isAutoPlaying ? 'Auto-play active' : 'Paused - Hover to resume'}
        </motion.div>

        {/* Floating testimonials preview */}
        <motion.div
          variants={itemVariants}
          className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-4"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              whileHover={{ scale: 1.05, y: -5 }}
              onClick={() => goToTestimonial(index)}
              className={`cursor-pointer glass-effect p-4 rounded-xl text-center transition-all duration-300 ${
                index === currentIndex ? 'ring-2 ring-primary-500' : ''
              }`}
            >
              <div className="text-2xl mb-2">{testimonial.image}</div>
              <div className="text-sm font-semibold text-white truncate">
                {testimonial.name}
              </div>
              <div className="text-xs text-gray-400 truncate">
                {testimonial.company}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { number: "10+", label: "Successful projects", icon: "🚀" },
            { number: "5.0", label: "Average rating", icon: "⭐" },
            { number: "100%", label: "Projects delivered", icon: "✅" },
            { number: "92%", label: "AI system precision", icon: "🎯" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center glass-effect p-6 rounded-xl"
              initial={{ scale: 0, rotate: -180 }}
              animate={isVisible ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
              transition={{ delay: 1 + index * 0.1, type: "spring" }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold gradient-text">{stat.number}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Testimonials