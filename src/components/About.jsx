import { motion } from 'framer-motion'

const roles = [
  {
    slug: 'SENIOR_AI_ENGINEER',
    status: '● ACTIVE',
    statusAccent: true,
    title: 'Senior AI Engineer',
    company: 'Ford Motor Company',
    period: 'Apr 2026 — Now',
    summary:
      'Leading CodeGuardians, an AI-assisted code review platform with agentic pipelines combining retrieval, context construction, validation and automated feedback loops. Improved dev efficiency by 30%.',
    tech: ['Python', 'LLMs', 'RAG', 'Agentic Workflows', 'AI Evaluation', 'GCP', 'CI/CD'],
  },
  {
    slug: 'SR_TECHNICAL_STAFF',
    status: '2022—2026',
    statusAccent: false,
    title: 'Senior Member of Technical Staff',
    company: 'Oracle',
    period: 'Feb 2022 — Mar 2026',
    summary:
      'Core contributor and owner of key CPAT capabilities — backend analysis flows, HTML reporting and CLI tooling. Co-architected an automation module in Oracle AutoUpgrade, cutting onboarding time 30%+.',
    tech: ['Java', 'SQL', 'Oracle DB', 'Docker', 'Jenkins', 'Linux', 'Shell'],
  },
  {
    slug: 'AI_ENGINEER',
    status: 'MASTER’S PROJECT',
    statusAccent: true,
    title: 'AI Engineer — ConstructAI',
    company: 'Tecnológico de Monterrey',
    period: 'Sep 2025 — Dec 2025',
    summary:
      'Production-grade multimodal RAG for construction cost estimation from blueprints and specs. Achieved 0.92 precision, 0.91 F1, hallucinations under 3% — 80% faster bidding.',
    tech: ['CLIP', 'BGE-M3', 'LLMs', 'OCR', 'MongoDB', 'Multi-Agent RAG'],
  },
  {
    slug: 'FULL_STACK_DEV',
    status: '2018—2022',
    statusAccent: false,
    title: 'Full-Stack Developer',
    company: 'Freelance',
    period: 'Aug 2018 — Feb 2022',
    summary:
      'Designed and delivered 10+ full-stack web applications from requirements to production. Built React interfaces on Node.js/Express APIs and automated business workflows.',
    tech: ['React', 'Node.js', 'Express', 'REST', 'Auth/RBAC'],
  },
]

const education = [
  {
    degree: 'M.Sc. in Artificial Intelligence',
    school: 'Tecnológico de Monterrey',
    period: '2023 — 2025',
  },
  {
    degree: 'B.Eng. in Computer Systems Engineering (Software)',
    school: 'Instituto Politécnico Nacional',
    period: '2018 — 2022',
  },
]

const extras = ['Digital Transformation — MIT (2021)', 'Spanish — Native', 'English — Advanced Professional']

const About = () => (
  <motion.section
    id="experience"
    className="py-20"
    aria-label="Experience section"
    initial={{ opacity: 0, y: 34 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.12 }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
  >
    <div className="font-mono text-[11px] font-medium tracking-[0.14em] text-accent-br mb-3.5">
      {'// CAREER'}
    </div>
    <h2 className="m-0 mb-11 font-semibold text-[clamp(30px,4vw,44px)] leading-[1.05] tracking-[-0.03em] text-ink">
      Experience
    </h2>

    <div className="flex flex-col gap-4">
      {roles.map((role) => (
        <div key={role.slug} className="pf-hover border border-line rounded-[14px] overflow-hidden bg-surf">
          {/* Header strip */}
          <div className="flex items-center justify-between px-5 py-3 bg-surf2 border-b border-line font-mono text-[10.5px] font-medium tracking-[0.05em] text-muted">
            <span>{role.slug}</span>
            <span className={role.statusAccent ? 'text-accent-br' : 'text-muted'}>{role.status}</span>
          </div>

          <div className="px-5 py-6">
            <div className="flex justify-between items-baseline gap-3.5 flex-wrap">
              <div>
                <div className="text-[21px] font-semibold tracking-[-0.01em] text-ink">{role.title}</div>
                <div className="text-accent-br text-sm mt-[3px]">{role.company}</div>
              </div>
              <span className="font-mono text-xs font-medium text-muted whitespace-nowrap">
                {role.period}
              </span>
            </div>
            <p className="my-4 text-sm leading-[1.65] text-muted">{role.summary}</p>
            <div className="flex flex-wrap gap-[7px]">
              {role.tech.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[11px] font-medium px-2.5 py-1 bg-chip rounded-[5px] text-ink"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Education & extras */}
    <div className="mt-12">
      <div className="font-mono text-[11px] font-medium tracking-[0.14em] text-muted mb-4">
        {'// EDUCATION'}
      </div>
      <div className="grid sm:grid-cols-2 gap-3.5">
        {education.map((edu) => (
          <div key={edu.degree} className="pf-hover border border-line bg-surf rounded-xl p-5">
            <p className="m-0 text-[15px] font-medium text-ink">{edu.degree}</p>
            <p className="m-0 mt-1 text-sm text-accent-br">{edu.school}</p>
            <p className="m-0 mt-1 font-mono text-[11px] font-medium text-muted">{edu.period}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-[7px] mt-4">
        {extras.map((item) => (
          <span
            key={item}
            className="font-mono text-[11px] font-medium px-2.5 py-1.5 bg-chip border border-line rounded-[5px] text-muted"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  </motion.section>
)

export default About
