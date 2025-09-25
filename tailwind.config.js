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
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeInDown: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeIn: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
      },
      colors: {
        primary: {
          50: '#e6f3ff',
          100: '#b3d9ff',
          200: '#80bfff',
          300: '#4da6ff',
          400: '#1a8cff',
          500: '#0072e6',
          600: '#005bb3',
          700: '#004580',
          800: '#002e4d',
          900: '#00171a',
        },
        playstation: {
          blue: '#003791',
          lightblue: '#0070d1',
          white: '#ffffff',
          black: '#000000',
          gray: '#1a1a1a',
        },
        accent: {
          pink: '#ff006e',
          cyan: '#00ffff',
          yellow: '#ffee00',
          orange: '#ff6b35',
          purple: '#8338ec',
          green: '#3ddc84',
        },
      },
    },
  },
  plugins: [],
}