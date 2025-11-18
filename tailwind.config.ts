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
    },
  },
  plugins: [],
}

export default config

