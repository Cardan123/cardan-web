import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simular envío de formulario
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })

      setTimeout(() => {
        setSubmitStatus(null)
      }, 5000)
    }, 2000)
  }

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      value: 'cardan.dev@gmail.com',
      link: 'mailto:cardan.dev@gmail.com'
    },
    {
      icon: '💼',
      title: 'LinkedIn',
      value: 'Connect with me',
      link: 'https://linkedin.com/in/cardan'
    },
    {
      icon: '🐙',
      title: 'GitHub',
      value: 'github.com/cardan',
      link: 'https://github.com/cardan'
    },
    {
      icon: '📍',
      title: 'Ubicación',
      value: 'Monterrey, México',
      link: '#'
    }
  ]

  const socialLinks = [
    { name: 'GitHub', icon: '🐙', url: 'https://github.com', color: 'from-gray-600 to-gray-800' },
    { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com', color: 'from-blue-600 to-blue-800' },
    { name: 'Twitter', icon: '🐦', url: 'https://twitter.com', color: 'from-sky-500 to-sky-700' },
    { name: 'Instagram', icon: '📸', url: 'https://instagram.com', color: 'from-pink-500 to-purple-600' }
  ]

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
    <section id="contact" ref={ref} className="section-padding bg-gray-900">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="container-max"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Open to senior engineering roles in AI/ML and backend development. Let's discuss how I can contribute to your team.
          </p>
          <div className="w-24 h-1 bg-primary-500 mx-auto mt-4"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6 gradient-text">
                Información de Contacto
              </h3>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.title}
                    href={info.link}
                    initial={{ x: -30, opacity: 0 }}
                    animate={isVisible ? { x: 0, opacity: 1 } : { x: -30, opacity: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ x: 10, scale: 1.02 }}
                    className="flex items-center p-4 glass-effect rounded-xl hover:bg-white/5 transition-all duration-300 group"
                  >
                    <div className="text-3xl mr-4 group-hover:scale-110 transition-transform">
                      {info.icon}
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">{info.title}</div>
                      <div className="text-white font-medium">{info.value}</div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-xl font-semibold mb-4 text-white">
                Sígueme en redes sociales
              </h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isVisible ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                    transition={{ delay: 0.6 + index * 0.1, type: "spring" }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 rounded-full bg-gradient-to-r ${social.color} text-white hover:shadow-lg transition-shadow`}
                    title={social.name}
                  >
                    <span className="text-xl">{social.icon}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <div className="glass-effect p-8 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-6 gradient-text">
                Envíame un mensaje
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={isVisible ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <label className="block text-gray-300 mb-2">Nombre</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-white transition-colors"
                      placeholder="Tu nombre"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={isVisible ? { x: 0, opacity: 1 } : { x: 20, opacity: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <label className="block text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-white transition-colors"
                      placeholder="tu@email.com"
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={isVisible ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className="block text-gray-300 mb-2">Asunto</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-white transition-colors"
                    placeholder="¿En qué puedo ayudarte?"
                  />
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={isVisible ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <label className="block text-gray-300 mb-2">Mensaje</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-white transition-colors resize-none"
                    placeholder="Cuéntame sobre tu proyecto..."
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  initial={{ y: 20, opacity: 0 }}
                  animate={isVisible ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                  transition={{ delay: 0.8 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-primary relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span className={isSubmitting ? 'opacity-0' : 'opacity-100'}>
                    Enviar mensaje
                  </span>
                  {isSubmitting && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                    </motion.div>
                  )}
                </motion.button>
              </form>

              {/* Success Message */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-green-600/20 border border-green-500/30 rounded-lg text-green-300 text-center"
                >
                  ✅ ¡Mensaje enviado correctamente! Te responderé pronto.
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          variants={itemVariants}
          className="mt-16 pt-8 border-t border-gray-700 text-center"
        >
          <p className="text-gray-400">
            © 2025 Cardan. Senior Software Engineer | AI/ML Specialist
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Contact