import { motion } from 'framer-motion'
import { scrollToElement } from '../utils/scroll'

const stats = [
  { value: '7+', label: 'YEARS' },
  { value: '+30%', label: 'DEV EFFICIENCY' },
  { value: '99.9%', label: 'RELIABILITY' },
]

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.12,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 22, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <header id="top" className="pt-[120px] pb-24 text-center" aria-label="Hero section">
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-[9px] font-mono text-[11px] font-medium tracking-[0.14em] text-accent-br border border-line-str px-3.5 py-[7px] rounded-full mb-[34px]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent-br animate-blink" />
          AVAILABLE FOR SENIOR AI ROLES
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="m-0 font-semibold text-[clamp(44px,7vw,84px)] leading-none tracking-[-0.04em] text-ink"
        >
          Carlos Villena
        </motion.h1>

        <motion.div
          variants={itemVariants}
          className="mt-[26px] font-mono text-[15px] font-medium text-accent-br tracking-[0.02em]"
        >
          Senior AI Engineer · AI Architect · Applied GenAI
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="mt-7 mx-auto max-w-[560px] text-[17px] leading-[1.6] text-muted"
        >
          Leading applied AI at Ford Motor Company. 7+ years building RAG systems, agentic
          workflows and cloud-native AI platforms with measurable business impact.
        </motion.p>

        <motion.div variants={itemVariants} className="flex gap-3 justify-center mt-10 flex-wrap">
          <button
            onClick={() => scrollToElement('experience')}
            className="pf-hover bg-accent text-on-accent font-mono text-[13px] font-semibold px-6 py-3.5 rounded-lg border border-transparent"
            aria-label="Scroll to experience section"
          >
            view_experience()
          </button>
          <button
            onClick={() => scrollToElement('contact')}
            className="pf-hover border border-line-str text-ink font-mono text-[13px] font-medium px-6 py-3.5 rounded-lg"
            aria-label="Scroll to contact section"
          >
            get_in_touch
          </button>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex justify-center mt-[72px] border border-line rounded-xl overflow-hidden max-w-[560px] mx-auto"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`flex-1 py-[22px] px-3.5 ${index < stats.length - 1 ? 'border-r border-line' : ''}`}
            >
              <div className="text-[26px] font-bold text-accent-br">{stat.value}</div>
              <div className="font-mono text-[10.5px] font-medium text-muted mt-1 tracking-[0.04em]">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </header>
  )
}

export default Hero
