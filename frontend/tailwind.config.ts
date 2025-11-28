import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          white: '#ffffff',
          accent: '#d9d9d9',
          background: '#000c2c',
        },
      },
      fontFamily: {
        sans: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
      },
      maxWidth: {
        page: '1512px',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'flow-beam': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        blink: {
          '0%, 100%': { opacity: '0' },
          '50%': { opacity: '1' },
        }
      },
      animation: {
        'flow-beam': 'flow-beam 6s linear infinite',
        blink: 'blink 0.7s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
