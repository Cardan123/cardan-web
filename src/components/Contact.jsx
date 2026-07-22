import { motion } from 'framer-motion'

const contactLinks = [
  {
    label: 'EMAIL',
    value: 'carlosdanielvillena@gmail.com',
    href: 'mailto:carlosdanielvillena@gmail.com',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    label: 'LINKEDIN',
    value: 'carlos-villena',
    href: 'https://www.linkedin.com/in/carlos-villena/',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'GITHUB',
    value: 'Cardan123',
    href: 'https://github.com/Cardan123',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
]

const Contact = () => (
  <motion.section
    id="contact"
    className="pt-20 pb-10 text-center"
    aria-label="Contact section"
    initial={{ opacity: 0, y: 34 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.12 }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
  >
    <div className="font-mono text-[11px] font-medium tracking-[0.14em] text-accent-br mb-3.5">
      {'// CONTACT'}
    </div>
    <h2 className="m-0 mb-3 font-semibold text-[clamp(32px,5vw,56px)] leading-[1.02] tracking-[-0.03em] text-ink">
      Let&apos;s build something.
    </h2>
    <p className="m-0 mx-auto mb-10 max-w-[520px] text-base leading-[1.6] text-muted">
      Open to Senior AI Engineer, AI Architect and applied GenAI opportunities. Let&apos;s discuss
      how I can contribute to your team.
    </p>

    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3.5 max-w-[720px] mx-auto mb-11">
      {contactLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target={link.href.startsWith('http') ? '_blank' : undefined}
          rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="pf-hover flex flex-col gap-1 text-left border border-line bg-surf rounded-xl px-5 py-[18px]"
        >
          <span className="flex items-center gap-2 font-mono text-[10.5px] font-medium tracking-[0.06em] text-muted">
            {link.icon}
            {link.label}
          </span>
          <span className="text-sm font-medium text-ink truncate">{link.value}</span>
        </a>
      ))}
    </div>

    <a
      href="mailto:carlosdanielvillena@gmail.com"
      className="pf-hover inline-block bg-accent text-on-accent font-mono text-sm font-semibold px-[34px] py-4 rounded-[10px] border border-transparent"
    >
      send_message() →
    </a>

    {/* Footer */}
    <div className="mt-20 pt-[26px] border-t border-line flex justify-between items-center flex-wrap gap-2.5">
      <span className="font-mono text-[11px] font-medium text-muted">© 2026 CARLOS_VILLENA</span>
      <span className="font-mono text-[11px] font-medium text-muted">
        Built with React · Ember Copper system
      </span>
    </div>
  </motion.section>
)

export default Contact
