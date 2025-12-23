/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'fade-in-down': 'fadeInDown 0.8s ease-out',
        'fade-in': 'fadeIn 1s ease-out',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'flicker': 'flicker 3s linear infinite',
        'scan-line': 'scanLine 2s linear infinite',
        'cyber-pulse': 'cyberPulse 1.5s ease-in-out infinite',
        'neon-border': 'neonBorder 2s linear infinite',
        'matrix-rain': 'matrixRain 20s linear infinite',
        'hologram': 'hologram 4s ease-in-out infinite',
        'circuit': 'circuit 10s linear infinite',
        'data-stream': 'dataStream 3s linear infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 15px #00ffff' },
          '100%': { boxShadow: '0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff' },
        },
        flicker: {
          '0%, 18%, 22%, 25%, 53%, 57%, 100%': { opacity: '1' },
          '20%, 24%, 55%': { opacity: '0.4' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        cyberPulse: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.8' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        neonBorder: {
          '0%': { borderColor: '#ff0080' },
          '25%': { borderColor: '#00ffff' },
          '50%': { borderColor: '#ff8000' },
          '75%': { borderColor: '#8000ff' },
          '100%': { borderColor: '#ff0080' },
        },
        matrixRain: {
          '0%': { transform: 'translateY(-100px)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(calc(100vh + 100px))', opacity: '0' },
        },
        hologram: {
          '0%, 100%': { opacity: '0.8', filter: 'hue-rotate(0deg)' },
          '50%': { opacity: '0.6', filter: 'hue-rotate(180deg)' },
        },
        circuit: {
          '0%': { strokeDashoffset: '100' },
          '100%': { strokeDashoffset: '0' },
        },
        dataStream: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100vw)' },
        },
      },
      colors: {
        // Paleta Cyberpunk Principal
        cyber: {
          // Neones principales
          pink: '#ff0080',
          cyan: '#00ffff',
          green: '#00ff80',
          purple: '#8000ff',
          orange: '#ff8000',

          // Fondos oscuros
          dark: '#0a0a0a',
          black: '#000000',
          gray: '#1a1a1a',
          'gray-light': '#2a2a2a',
          'gray-medium': '#333333',

          // Acentos retro
          'neon-blue': '#0080ff',
          'neon-pink': '#ff0080',
          'neon-yellow': '#ffff00',
          'electric-blue': '#0040ff',
          'matrix-green': '#00ff41',

          // Gradientes base
          'gradient-start': '#ff0080',
          'gradient-middle': '#00ffff',
          'gradient-end': '#8000ff',
        },

        // Colores de estado cyberpunk
        status: {
          success: '#00ff80',
          warning: '#ffff00',
          error: '#ff0040',
          info: '#0080ff',
        },

        // Grises con tinte azul
        slate: {
          50: '#f1f5f9',
          100: '#e2e8f0',
          200: '#cbd5e1',
          300: '#94a3b8',
          400: '#64748b',
          500: '#475569',
          600: '#334155',
          700: '#1e293b',
          800: '#0f172a',
          900: '#020617',
        },

        // Colores legacy (mantener compatibilidad)
        primary: {
          50: '#e6f3ff',
          100: '#b3d9ff',
          500: '#0072e6',
          900: '#00171a',
        },
      },

      // Efectos y filtros
      backdropBlur: {
        'xs': '2px',
        'cyber': '8px',
      },

      boxShadow: {
        'neon': '0 0 5px currentColor, 0 0 20px currentColor, 0 0 35px currentColor',
        'neon-sm': '0 0 2px currentColor, 0 0 8px currentColor',
        'neon-lg': '0 0 10px currentColor, 0 0 40px currentColor, 0 0 80px currentColor',
        'cyber': '0 4px 14px 0 rgba(0, 255, 255, 0.2)',
        'cyber-hover': '0 8px 32px 0 rgba(255, 0, 128, 0.3)',
        'hologram': 'inset 0 0 20px rgba(0, 255, 255, 0.1), 0 0 20px rgba(0, 255, 255, 0.1)',
      },

      // Tipografía cyberpunk
      fontFamily: {
        'cyber': ['Orbitron', 'monospace'],
        'matrix': ['Courier New', 'monospace'],
        'code': ['Fira Code', 'Courier New', 'monospace'],
      },

      // Tamaños y espaciado
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },

      // Anchos y alturas especiales
      width: {
        '128': '32rem',
      },
      height: {
        '128': '32rem',
      },
    },
  },
  plugins: [],
}