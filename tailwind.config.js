/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Ember Copper tokens — CSS variables switched by the .light class on <html>
      colors: {
        bg: 'var(--bg)',
        surf: 'var(--surf)',
        surf2: 'var(--surf2)',
        ink: 'var(--text)',
        muted: 'var(--muted)',
        accent: 'var(--accent)',
        'accent-br': 'var(--accent-br)',
        'on-accent': 'var(--on-accent)',
        line: 'var(--border)',
        'line-str': 'var(--border-str)',
        chip: 'var(--chip)',
        hair: 'var(--hair)',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        blink: 'blink 1.6s infinite',
      },
      keyframes: {
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0.2' },
        },
      },
    },
  },
  plugins: [],
}
