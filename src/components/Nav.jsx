import ThemeToggle from './ThemeToggle'

const navLinks = [
  { label: 'SKILLS', href: '#skills' },
  { label: 'WORK', href: '#experience' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'BLOG', href: '#writing' },
  { label: 'CONTACT', href: '#contact' },
]

const Nav = () => (
  <nav className="sticky top-0 z-20 flex items-center justify-between py-[22px] bg-[color-mix(in_srgb,var(--bg)_82%,transparent)] backdrop-blur-[14px] border-b border-line">
    <a href="#top" className="flex items-center gap-[9px] font-mono text-sm font-semibold text-ink" aria-label="Back to top">
      <span className="text-accent-br">›</span>carlos_villena
    </a>
    <div className="flex items-center gap-[22px] max-sm:gap-[14px]">
      {navLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className="hidden sm:inline font-mono text-xs font-medium tracking-[0.04em] text-muted hover:text-accent-br transition-colors"
          aria-label={`Navigate to ${link.label.toLowerCase()} section`}
        >
          {link.label}
        </a>
      ))}
      <ThemeToggle />
    </div>
  </nav>
)

export default Nav
