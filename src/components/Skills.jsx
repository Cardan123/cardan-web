import { motion } from 'framer-motion'

const skillCategories = [
  {
    tag: 'AI_GENAI',
    count: '08',
    title: 'AI & GenAI',
    description:
      'Production LLM applications with retrieval, agents, evaluation and secure enterprise adoption.',
    skills: [
      'LLMs',
      'RAG Systems',
      'Agentic Workflows',
      'Prompt Engineering',
      'Multimodal AI',
      'AI Evaluation',
      'Hallucination Control',
      'Prompt Injection Defense',
    ],
  },
  {
    tag: 'BACKEND',
    count: '09',
    title: 'Languages & Backend',
    description:
      'Backend architecture and full-stack development with secure, scalable API patterns.',
    skills: [
      'Python',
      'Java',
      'TypeScript',
      'React',
      'Spring Boot',
      'Node.js',
      'REST APIs',
      'Microservices',
      'SQL',
    ],
  },
  {
    tag: 'CLOUD_OPS',
    count: '09',
    title: 'Cloud & DevOps',
    description:
      'Cloud-native deployments, containerized applications and CI/CD automation at enterprise scale.',
    skills: ['GCP', 'OCI', 'Azure', 'Docker', 'Linux', 'CI/CD', 'Git', 'MongoDB', 'Oracle DB'],
  },
]

const Skills = () => (
  <motion.section
    id="skills"
    className="py-20"
    aria-label="Skills section"
    initial={{ opacity: 0, y: 34 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.12 }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
  >
    <div className="font-mono text-[11px] font-medium tracking-[0.14em] text-accent-br mb-3.5">
      {'// EXPERTISE'}
    </div>
    <h2 className="m-0 mb-2 font-semibold text-[clamp(30px,4vw,44px)] leading-[1.05] tracking-[-0.03em] text-ink">
      Technical skills
    </h2>
    <p className="m-0 mb-11 text-[15px] text-muted">
      Applied GenAI, backend architecture and cloud-native systems.
    </p>

    <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[18px]">
      {skillCategories.map((category) => (
        <div
          key={category.tag}
          className="pf-hover border border-line bg-surf rounded-[14px] p-[26px]"
        >
          <div className="flex items-center justify-between mb-[18px]">
            <div className="font-mono text-[11px] font-semibold tracking-[0.06em] text-accent-br">
              {category.tag}
            </div>
            <span className="font-mono text-[11px] font-medium text-muted">{category.count}</span>
          </div>
          <h3 className="m-0 mb-2.5 text-[19px] font-semibold tracking-[-0.01em] text-ink">
            {category.title}
          </h3>
          <p className="m-0 mb-[18px] text-[13px] leading-[1.6] text-muted">
            {category.description}
          </p>
          <div className="flex flex-wrap gap-[7px]">
            {category.skills.map((skill) => (
              <span
                key={skill}
                className="font-mono text-[11.5px] font-medium px-[11px] py-[5px] bg-chip border border-line rounded-md text-ink"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </motion.section>
)

export default Skills
