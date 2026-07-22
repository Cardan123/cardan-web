import { motion } from 'framer-motion'

const projects = [
  {
    title: 'CodeGuardians',
    subtitle: 'Ford Motor Company',
    featured: true,
    description:
      'AI-assisted code review integrating repository events, PR context and asynchronous LLM workflows with retrieval, validation and automated feedback loops.',
    metrics: [
      { value: '+30%', label: 'DEV EFFICIENCY' },
      { value: 'Enterprise', label: 'SCALE' },
    ],
    tech: ['LLMs', 'Agentic Workflows', 'Python', 'GCP'],
  },
  {
    title: 'ConstructAI',
    subtitle: 'Multimodal RAG — Master’s',
    featured: true,
    description:
      'Multimodal RAG automating construction cost estimation from visual blueprints and specs, with adaptive routing, reranking and reflection loops.',
    metrics: [
      { value: '0.92', label: 'PRECISION' },
      { value: '+80%', label: 'FASTER BIDDING' },
    ],
    tech: ['CLIP', 'BGE-M3', 'OCR', 'MongoDB'],
  },
  {
    title: 'CPAT',
    subtitle: 'Oracle',
    featured: false,
    description:
      'Cloud Pre-migration Analysis Tool — backend analysis flows, HTML reporting, CLI tooling and migration risk assessment. Co-architected AutoUpgrade automation.',
    metrics: [
      { value: '99.9%', label: 'RELIABILITY' },
      { value: '-30%', label: 'ONBOARDING' },
    ],
    tech: ['Java', 'SQL', 'Oracle DB', 'Shell'],
  },
  {
    title: 'DB Testing Platform',
    subtitle: 'Oracle — Infrastructure',
    featured: false,
    description:
      'Fully virtualized database testing platform improving validation throughput and accelerating release cycles across heterogeneous environments.',
    metrics: [
      { value: '+40%', label: 'VALIDATION' },
      { value: 'Multi', label: 'PLATFORMS' },
    ],
    tech: ['Java', 'Docker', 'Jenkins', 'CI/CD'],
  },
]

const Projects = () => (
  <motion.section
    id="projects"
    className="py-20"
    aria-label="Projects section"
    initial={{ opacity: 0, y: 34 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.12 }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
  >
    <div className="font-mono text-[11px] font-medium tracking-[0.14em] text-accent-br mb-3.5">
      {'// PORTFOLIO'}
    </div>
    <h2 className="m-0 mb-11 font-semibold text-[clamp(30px,4vw,44px)] leading-[1.05] tracking-[-0.03em] text-ink">
      Featured projects
    </h2>

    <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[18px]">
      {projects.map((project) => (
        <div
          key={project.title}
          className="pf-hover border border-line bg-surf rounded-2xl p-[26px] flex flex-col"
        >
          <div className="flex items-center gap-[9px] mb-1.5">
            <h3 className="m-0 text-[19px] font-semibold tracking-[-0.01em] text-ink">
              {project.title}
            </h3>
            {project.featured && (
              <span className="font-mono text-[9.5px] font-semibold tracking-[0.06em] text-accent-br border border-line-str px-2 py-[3px] rounded-full">
                FEATURED
              </span>
            )}
          </div>
          <div className="font-mono text-xs font-medium text-accent-br mb-3.5">
            {project.subtitle}
          </div>
          <p className="m-0 mb-[18px] text-[13px] leading-[1.6] text-muted flex-1">
            {project.description}
          </p>
          <div className="flex gap-5 py-3.5 border-t border-b border-line mb-4">
            {project.metrics.map((metric) => (
              <div key={metric.label}>
                <div className="text-xl font-bold text-accent-br">{metric.value}</div>
                <div className="font-mono text-[10px] font-medium text-muted mt-0.5">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-[7px]">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[11px] font-medium px-2.5 py-1 bg-chip rounded-[5px] text-ink"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </motion.section>
)

export default Projects
