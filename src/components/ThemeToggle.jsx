import { useTheme } from '../context/ThemeContext'

const ThemeToggle = () => {
  const { light, toggle } = useTheme()

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="flex items-center gap-[7px] cursor-pointer font-mono text-[11px] font-medium text-ink bg-chip border border-line px-3 py-[7px] rounded-md"
    >
      <span className="w-2 h-2 rounded-full bg-accent-br inline-block" />
      {light ? 'LIGHT' : 'DARK'}
    </button>
  )
}

export default ThemeToggle
